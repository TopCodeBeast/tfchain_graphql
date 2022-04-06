import {
  EventHandlerContext,
} from "@subsquid/substrate-processor";
import { Node, Location, PublicConfig, CertificationType, Interfaces, UptimeEvent, NodeResourcesUsed, NodeResourcesFree, NodeResourcesTotal } from "../model";
import { TfgridModuleNodeDeletedEvent, TfgridModuleNodePublicConfigStoredEvent, TfgridModuleNodeStoredEvent, TfgridModuleNodeUpdatedEvent, TfgridModuleNodeUptimeReportedEvent } from "../types/events";

export async function nodeStored(ctx: EventHandlerContext) {
  const node  = new TfgridModuleNodeStoredEvent(ctx)
  let nodeEvent
  if (node.isV9) {
    nodeEvent = node.asV9
  } else if (node.isV28) {
    nodeEvent = node.asV28
  } else if (node.isV43) {
    nodeEvent = node.asV43
  }
  
  if (!nodeEvent) return
  
  const newNode = new Node()
  newNode.id = ctx.event.id
  newNode.gridVersion = nodeEvent.version
  newNode.farmID = nodeEvent.farmId
  newNode.nodeID = nodeEvent.id
  newNode.twinID = nodeEvent.twinId

  newNode.createdAt = BigInt(ctx.event.blockTimestamp)
  newNode.updatedAt = BigInt(ctx.event.blockTimestamp)

  newNode.country = nodeEvent.country.toString()
  newNode.city = nodeEvent.city.toString()

  newNode.created = Number(nodeEvent.created)
  newNode.farmingPolicyId = nodeEvent.farmingPolicyId

  const newLocation = new Location()
  newLocation.id = ctx.event.id
  newLocation.latitude = nodeEvent.location.latitude.toString()
  newLocation.longitude = nodeEvent.location.longitude.toString()
  await ctx.store.save<Location>(newLocation)

  newNode.location = newLocation

  if (node.isV28) {
    const nodeAsV28 = node.asV28
    if (nodeAsV28.certificationType) {
      const certificationTypeAsString = nodeAsV28.certificationType.toString()
      let certType = CertificationType.Diy
      switch (certificationTypeAsString) {
        case 'Diy': 
          certType = CertificationType.Diy
        break
        case 'Certified': 
          certType = CertificationType.Certified
        break
    }
      newNode.certificationType = certType
    } else {
      newNode.certificationType = CertificationType.Diy
    }
  }

  if (node.isV43) {
    const nodeAsV43 = node.asV43 
    newNode.secure = nodeAsV43.secureBoot ? true : false
    newNode.virtualized = nodeAsV43.virtualized ? true : false
    newNode.serialNumber = nodeAsV43.serialNumber.toString()
    if (nodeAsV43.certificationType) {
      const certificationTypeAsString = nodeAsV43.certificationType.toString()
      let certType = CertificationType.Diy
      switch (certificationTypeAsString) {
        case 'Diy': 
          certType = CertificationType.Diy
        break
        case 'Certified': 
          certType = CertificationType.Certified
        break
    }
      newNode.certificationType = certType
    } else {
      newNode.certificationType = CertificationType.Diy
    }
  }

  await ctx.store.save<Node>(newNode)

  const resourcesTotal = new NodeResourcesTotal()
  resourcesTotal.node = newNode
  resourcesTotal.id = ctx.event.id
  resourcesTotal.sru = nodeEvent.resources.sru
  resourcesTotal.hru = nodeEvent.resources.hru
  resourcesTotal.mru = nodeEvent.resources.mru
  resourcesTotal.cru = nodeEvent.resources.cru

  const resourcesUsed = new NodeResourcesUsed()
  resourcesUsed.node = newNode
  resourcesUsed.id = ctx.event.id
  resourcesUsed.sru = BigInt(0)
  resourcesUsed.hru = BigInt(0)
  resourcesUsed.mru = BigInt(0)
  resourcesUsed.cru = BigInt(0)

  const resourcesFree = new NodeResourcesFree()
  resourcesFree.node = newNode
  resourcesFree.id = ctx.event.id
  resourcesFree.sru = nodeEvent.resources.sru
  resourcesFree.hru = nodeEvent.resources.hru
  resourcesFree.mru = nodeEvent.resources.mru
  resourcesFree.cru = nodeEvent.resources.cru

  await ctx.store.save<NodeResourcesTotal>(resourcesTotal)
  await ctx.store.save<NodeResourcesUsed>(resourcesUsed)
  await ctx.store.save<NodeResourcesFree>(resourcesFree)

  if (nodeEvent.publicConfig) {
    const pubConfig = new PublicConfig()
    pubConfig.node = newNode
    pubConfig.id = ctx.event.id
    pubConfig.ipv4 = nodeEvent.publicConfig.ipv4.toString()
    pubConfig.ipv6 = nodeEvent.publicConfig.ipv6.toString()
    pubConfig.gw4 = nodeEvent.publicConfig.gw4.toString()
    pubConfig.gw6 = nodeEvent.publicConfig.gw6.toString()
    pubConfig.domain = nodeEvent.publicConfig.domain.toString() || ''

    await ctx.store.save<PublicConfig>(pubConfig)
    newNode.publicConfig = pubConfig
  }

  newNode.interfaces = []

  const interfacesPromisses = nodeEvent.interfaces.map(async intf => {
    const newInterface = new Interfaces()
    newInterface.id = ctx.event.id
    newInterface.node = newNode
    newInterface.name = intf.name.toString()
    newInterface.mac = intf.mac.toString()
    newInterface.ips = intf.ips.map(ip => ip.toString()).join(',')
    await ctx.store.save<Interfaces>(newInterface)
    newNode.interfaces.push(newInterface)
  })

  await Promise.all(interfacesPromisses)
  await ctx.store.save<Node>(newNode)
}

export async function nodeUpdated(ctx: EventHandlerContext) {
  const node  = new TfgridModuleNodeUpdatedEvent(ctx)

  let nodeEvent
  if (node.isV9) {
    nodeEvent = node.asV9
  } else if (node.isV28) {
    nodeEvent = node.asV28
  } else if (node.isV43) {
    nodeEvent = node.asV43
  }

  if (!nodeEvent) return

  const savedNode = await ctx.store.get(Node, { where: { nodeID: nodeEvent.id } })
  if (!savedNode) return

  savedNode.gridVersion = nodeEvent.version
  savedNode.farmID = nodeEvent.farmId
  savedNode.nodeID = nodeEvent.id
  savedNode.twinID = nodeEvent.twinId
  savedNode.updatedAt = BigInt(ctx.event.blockTimestamp)

  if (savedNode.resourcesTotal) {
    savedNode.resourcesTotal.sru = nodeEvent.resources.sru
    savedNode.resourcesTotal.hru = nodeEvent.resources.hru
    savedNode.resourcesTotal.mru = nodeEvent.resources.mru
    savedNode.resourcesTotal.cru = nodeEvent.resources.cru
    await ctx.store.save<NodeResourcesTotal>(savedNode.resourcesTotal)
  }

  savedNode.country = nodeEvent.country.toString()
  savedNode.city = nodeEvent.city.toString()

  savedNode.created = Number(nodeEvent.created)
  savedNode.farmingPolicyId = nodeEvent.farmingPolicyId

  const newLocation = new Location()
  newLocation.id = ctx.event.id
  newLocation.latitude = nodeEvent.location.latitude.toString()
  newLocation.longitude = nodeEvent.location.longitude.toString()
  await ctx.store.save<Location>(newLocation)

  savedNode.location = newLocation

  if (node.isV28) {
    const nodeAsV28 = node.asV28
    if (nodeAsV28.certificationType) {
      const certificationTypeAsString = nodeAsV28.certificationType.toString()
      let certType = CertificationType.Diy
      switch (certificationTypeAsString) {
        case 'Diy': 
          certType = CertificationType.Diy
        break
        case 'Certified': 
          certType = CertificationType.Certified
        break
    }
      savedNode.certificationType = certType
    } else {
      savedNode.certificationType = CertificationType.Diy
    }
  }

  if (nodeEvent.publicConfig) {
    const pubConfig = new PublicConfig()
    pubConfig.node = savedNode
    pubConfig.id = ctx.event.id
    pubConfig.ipv4 = nodeEvent.publicConfig.ipv4.toString()
    pubConfig.ipv6 = nodeEvent.publicConfig.ipv6.toString()
    pubConfig.gw4 = nodeEvent.publicConfig.gw4.toString()
    pubConfig.gw6 = nodeEvent.publicConfig.gw6.toString()
    pubConfig.domain = nodeEvent.publicConfig.domain.toString() || ''

    await ctx.store.save<PublicConfig>(pubConfig)
    savedNode.publicConfig = pubConfig
  }

  if (node.isV43) {
    const nodeAsV43 = node.asV43 
    savedNode.secure = nodeAsV43.secureBoot ? true : false
    savedNode.virtualized = nodeAsV43.virtualized ? true : false
    savedNode.serialNumber = nodeAsV43.serialNumber.toString()
    if (nodeAsV43.certificationType) {
      const certificationTypeAsString = nodeAsV43.certificationType.toString()
      let certType = CertificationType.Diy
      switch (certificationTypeAsString) {
        case 'Diy': 
          certType = CertificationType.Diy
        break
        case 'Certified': 
          certType = CertificationType.Certified
        break
    }
      savedNode.certificationType = certType
    } else {
      savedNode.certificationType = CertificationType.Diy
    }
  }

  await ctx.store.save<Node>(savedNode)

  // savedNode.interfaces = []

  const interfacesPromisses = nodeEvent.interfaces.map(async intf => {
    let newInterface

    if (savedNode.interfaces) {
      // if an interface with same name exists
      const found = savedNode.interfaces.findIndex(interf => interf.name === intf.name.toString())
      if (found > 0) {
        newInterface = savedNode.interfaces[found]    
      } else {
        newInterface = new Interfaces()
        newInterface.id = ctx.event.id
      }
    }
    
    if (!newInterface) return

    newInterface.name = intf.name.toString()
    newInterface.mac = intf.mac.toString()
    newInterface.node = savedNode
    newInterface.ips = intf.ips.map(ip => ip.toString()).join(',')
    
    await ctx.store.save<Interfaces>(newInterface)
    savedNode.interfaces.push(newInterface)
  })
  await Promise.all(interfacesPromisses)
  await ctx.store.save<Node>(savedNode)
}

export async function nodeDeleted(ctx: EventHandlerContext) {
  const nodeID = new TfgridModuleNodeDeletedEvent(ctx).asV9

  const savedNode = await ctx.store.get(Node, { where: { nodeID: nodeID } })
  
  if (savedNode) {
    const resourcesTotal = await ctx.store.get(NodeResourcesTotal, { where: { node: savedNode } })
    if (resourcesTotal) {
      await ctx.store.remove(resourcesTotal)
    }
    const resourcesFree = await ctx.store.get(NodeResourcesFree, { where: { node: savedNode } })
    if (resourcesFree) {
      await ctx.store.remove(resourcesFree)
    }
    const resourcesUsed = await ctx.store.get(NodeResourcesUsed, { where: { node: savedNode } })
    if (resourcesUsed) {
      await ctx.store.remove(resourcesUsed)
    }
    const pubConfig = await ctx.store.get(PublicConfig, { where: { node: savedNode } })
    if (pubConfig) {
      await ctx.store.remove(pubConfig)
    }

    const intfs = await ctx.store.find(Interfaces, { where: { node: savedNode }})
    const promises = intfs.map(intf => {
      return ctx.store.remove(intf)
    })
    await Promise.all(promises)
    // console.log("-------------DELETING NODE-------------")
    // console.log(savedNode.interfaces)

    // if (savedNode.interfaces) {
    //   console.log(savedNode.interfaces)
    //   const promises = savedNode.interfaces.map(async int => {
    //     const intf = await ctx.store.get(Interfaces, { where: { id: int.id }})
    //     return ctx.store.remove(intf)
    //   })
    //   await Promise.all(promises)
    // }
    await ctx.store.remove(savedNode)
  }
}

export async function nodeUptimeReported(ctx: EventHandlerContext) {
  const [nodeID, now, uptime] = new TfgridModuleNodeUptimeReportedEvent(ctx).asV9

  const newUptimeEvent = new UptimeEvent()
  newUptimeEvent.id = ctx.event.id
  newUptimeEvent.nodeID = nodeID
  newUptimeEvent.timestamp = now
  newUptimeEvent.uptime = uptime
  await ctx.store.save<UptimeEvent>(newUptimeEvent)

  const savedNode = await ctx.store.get(Node, { where: { nodeID: nodeID } })

  if (savedNode) {
    savedNode.uptime = uptime
    await ctx.store.save<Node>(savedNode)
  }
}

export async function nodePublicConfigStored(ctx: EventHandlerContext) {
  const [nodeID, config] = new TfgridModuleNodePublicConfigStoredEvent(ctx).asV12

  const savedNode = await ctx.store.get(Node, { where: { nodeID: nodeID } })

  if (!savedNode) return
  let publicConfig = new PublicConfig()
  if (savedNode.publicConfig) {
    publicConfig = savedNode.publicConfig
  }

  console.log('saving pub config')
  publicConfig.id = ctx.event.id
  publicConfig.ipv4 = config.ipv4.toString()
  publicConfig.ipv6 = config.ipv6.toString()
  publicConfig.gw4 = config.gw4.toString()
  publicConfig.gw6 = config.gw6.toString()
  publicConfig.domain = config.domain.toString() || ''
  publicConfig.node = savedNode

  await ctx.store.save<PublicConfig>(publicConfig)

  await ctx.store.save<Node>(savedNode)
}