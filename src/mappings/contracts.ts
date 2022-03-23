import {
  EventHandlerContext,
  Store
} from "@subsquid/substrate-processor";
import { ContractState, PublicIp, NameContract, NodeContract, ContractBillReport, DiscountLevel, ContractUsedResources } from "../model";
import { SmartContractModuleContractCreatedEvent, SmartContractModuleContractUpdatedEvent, SmartContractModuleNodeContractCanceledEvent, SmartContractModuleNameContractCanceledEvent, SmartContractModuleContractBilledEvent, SmartContractModuleUpdatedUsedResourcesEvent } from "../types/events";
import { Contract } from "../types/v9";

export async function contractCreated(ctx: EventHandlerContext) {
  let contractCreatedEvent = new SmartContractModuleContractCreatedEvent(ctx)

  if (!contractCreatedEvent.isV9) return

  const contractCreatedEventV9 = contractCreatedEvent.asV9

  let state = ContractState.Created

  let contract
  if (contractCreatedEventV9.contractType.__kind === "NameContract") {
    let newNameContract = new NameContract()
    newNameContract.id = ctx.event.id
    contract = contractCreatedEventV9.contractType.value
    newNameContract.name = contract.name.toString()
    newNameContract.contractID = contractCreatedEventV9.contractId
    newNameContract.version = contractCreatedEventV9.version
    newNameContract.twinID = contractCreatedEventV9.twinId
    newNameContract.state = state
    await ctx.store.save<NameContract>(newNameContract)
  }
  else if (contractCreatedEventV9.contractType.__kind === "NodeContract") {
    let newNodeContract = new NodeContract()
    newNodeContract.id = ctx.event.id

    contract = contractCreatedEventV9.contractType.value

    newNodeContract.contractID = contractCreatedEventV9.contractId
    newNodeContract.version = contractCreatedEventV9.version
    newNodeContract.twinID = contractCreatedEventV9.twinId
    newNodeContract.nodeID = contract.nodeId
    newNodeContract.numberOfPublicIPs = contract.publicIps
    newNodeContract.deploymentData = contract.deploymentData.toString()
    newNodeContract.deploymentHash = contract.deploymentHash.toString()
    newNodeContract.state = state
    await ctx.store.save<NodeContract>(newNodeContract)

    contract.publicIpsList.forEach(async ip => {
      const savedIp = await ctx.store.get(PublicIp, { where: { ip: ip.ip.toString() } })

      if (savedIp) {
        // savedIp.contractId = newNodeContract.contractId
        await ctx.store.save<PublicIp>(savedIp)
      }
    })
  }
}

export async function contractUpdated(ctx: EventHandlerContext) {
  const contract = new SmartContractModuleContractUpdatedEvent(ctx).asV9

  const SavedNodeContract = await ctx.store.get(NodeContract, { where: { contractID: contract.contractId } })
  if (SavedNodeContract) {
    await updateNodeContract(contract, SavedNodeContract, ctx.store)
  }

  const SavedNameContract = await ctx.store.get(NameContract, { where: { contractID: contract.contractId } })
  if (SavedNameContract) {
    await updateNameContract(contract, SavedNameContract, ctx.store)
  }
}

async function updateNodeContract(ctr: Contract, contract: NodeContract, store: Store) {
  if (ctr.contractType.__kind !== "NodeContract") return

  const parsedNodeContract = ctr.contractType.value

  contract.contractID = ctr.contractId
  contract.version = ctr.version
  contract.twinID = ctr.twinId
  contract.nodeID = parsedNodeContract.nodeId
  contract.numberOfPublicIPs = parsedNodeContract.publicIps
  contract.deploymentData = parsedNodeContract.deploymentData.toString()
  contract.deploymentHash = parsedNodeContract.deploymentHash.toString()

  let state = ContractState.OutOfFunds
  switch (ctr.state.__kind) {
    case 'Created': 
      state = ContractState.Created
      break
    case 'Deleted':
      state = ContractState.Deleted
      break
  }
  contract.state = state
  await store.save<NodeContract>(contract)
}

async function updateNameContract(ctr: Contract, contract: NameContract, store: Store) {
  if (ctr.contractType.__kind !== "NameContract") return

  const parsedNameContract = ctr.contractType.value

  contract.contractID = ctr.contractId
  contract.version = ctr.version
  contract.twinID = ctr.twinId
  contract.name = parsedNameContract.name.toString()

  let state = ContractState.OutOfFunds
  switch (ctr.state.__kind) {
    case 'Created': 
      state = ContractState.Created
      break
    case 'Deleted':
      state = ContractState.Deleted
      break
  }
  contract.state = state
  await store.save<NameContract>(contract)
}

export async function nodeContractCanceled(ctx: EventHandlerContext) {
  console.log('found node contract cancel event')
  const cancelEvent = new SmartContractModuleNodeContractCanceledEvent(ctx).asV19

  const savedContract = await ctx.store.get(NodeContract, { where: { contractID: cancelEvent[0] } })

  if (!savedContract) return

  // const savedIps = await ctx.store.getMany(PublicIp, { where: { contractId: id.toNumber() } })
  // await savedIps.forEach(async ip => {
  //   ip.contractId = 0
  //   await store.save<PublicIp>(ip)
  // })

  savedContract.state = ContractState.Deleted

  console.log(`saving contract to delete state ${cancelEvent[0]}`)

  await ctx.store.save<NodeContract>(savedContract)
}

export async function nameContractCanceled(ctx: EventHandlerContext) {
  console.log('found name contract cancel event')
  const id = new SmartContractModuleNameContractCanceledEvent(ctx).asV19

  const savedContract = await ctx.store.get(NameContract, { where: { contractID: id } })

  if (!savedContract) return

  savedContract.state = ContractState.Deleted

  await ctx.store.save<NameContract>(savedContract)
}

export async function contractBilled(ctx: EventHandlerContext) {
  const contract_billed_event = new SmartContractModuleContractBilledEvent(ctx).asV9
  
  const newContractBilledReport = new ContractBillReport()

  newContractBilledReport.id = ctx.event.id
  newContractBilledReport.contractID = contract_billed_event.contractId

  let level = DiscountLevel.None
  switch (contract_billed_event.discountLevel.__kind) {
    case 'None': break
    case 'Default':
      level = DiscountLevel.Default
      break
    case 'Bronze':
      level = DiscountLevel.Bronze
      break
    case 'Silver':
      level = DiscountLevel.Silver
      break
    case 'Gold': level = DiscountLevel.Gold
  }
  newContractBilledReport.discountReceived = level
  newContractBilledReport.amountBilled = contract_billed_event.amountBilled
  newContractBilledReport.timestamp = contract_billed_event.timestamp

  await ctx.store.save<ContractBillReport>(newContractBilledReport)
}

export async function contractUpdateUsedResources(ctx: EventHandlerContext) {
  const usedResources = new SmartContractModuleUpdatedUsedResourcesEvent(ctx).asV49
  
  const contractUsedResources = new ContractUsedResources()

  const savedContract = await ctx.store.get(NodeContract, { where: { contractID: usedResources.contractId } })
  if (!savedContract) return

  contractUsedResources.cru = usedResources.used.cru
  contractUsedResources.sru = usedResources.used.sru
  contractUsedResources.hru = usedResources.used.hru
  contractUsedResources.mru = usedResources.used.mru

  savedContract.resourcesUsed = contractUsedResources

  await ctx.store.save<NodeContract>(savedContract)
}