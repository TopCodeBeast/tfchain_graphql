import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v49 from './v49'
import * as v50 from './v50'
import * as v51 from './v51'
import * as v59 from './v59'
import * as v63 from './v63'
import * as v101 from './v101'

export class BalancesTransferEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Transfer')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get isV49(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get asV49(): [v49.AccountId, v49.AccountId, v49.Balance] {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV101(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV101(): {from: v101.AccountId32, to: v101.AccountId32, amount: bigint} {
    assert(this.isV101)
    return this._chain.decodeEvent(this.event)
  }
}

export class SmartContractModuleContractBilledEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SmartContractModule.ContractBilled')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractBilled') === '80f35d404149c70acbd173262c31ae49812dbb6c9f279954678dd758bb5aa239'
  }

  get asV49(): v49.ContractBill {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class SmartContractModuleContractCreatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SmartContractModule.ContractCreated')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractCreated') === '9236d6ceb4b18a4a48634488b1cde9b5b395eff965ccc88c9ce3c2425d27e50f'
  }

  get asV49(): v49.Contract {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  get isV50(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractCreated') === '824f21a7f4d646625468e03ff8a0c50449d6e0c5527edf82013d385754881c45'
  }

  get asV50(): v50.Contract {
    assert(this.isV50)
    return this._chain.decodeEvent(this.event)
  }

  get isV59(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractCreated') === '5446945d28da7c765303d310f9ca55fc9bb46e7b5f281ac184521f913c430ee0'
  }

  get asV59(): v59.Contract {
    assert(this.isV59)
    return this._chain.decodeEvent(this.event)
  }

  get isV101(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractCreated') === '1a46e93bb259ee0953495d2ee65d31503cd4736d74c87f1fabc89ea4773bc73c'
  }

  get asV101(): v101.Contract {
    assert(this.isV101)
    return this._chain.decodeEvent(this.event)
  }
}

export class SmartContractModuleContractGracePeriodEndedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SmartContractModule.ContractGracePeriodEnded')
    this._chain = ctx._chain
    this.event = event
  }

  get isV59(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractGracePeriodEnded') === 'da3d413ec5a77ddce8b8c12c9cdd58340716a71ab4effe398cbaf249a16d0542'
  }

  get asV59(): [bigint, number, number] {
    assert(this.isV59)
    return this._chain.decodeEvent(this.event)
  }
}

export class SmartContractModuleContractGracePeriodStartedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SmartContractModule.ContractGracePeriodStarted')
    this._chain = ctx._chain
    this.event = event
  }

  get isV59(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractGracePeriodStarted') === 'e6ffbb3cdd02a660fb04c1fb606cae70e4a388774028c58e59a98d56f3654371'
  }

  get asV59(): [bigint, number, number, bigint] {
    assert(this.isV59)
    return this._chain.decodeEvent(this.event)
  }
}

export class SmartContractModuleContractUpdatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SmartContractModule.ContractUpdated')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractUpdated') === '9236d6ceb4b18a4a48634488b1cde9b5b395eff965ccc88c9ce3c2425d27e50f'
  }

  get asV49(): v49.Contract {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  get isV50(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractUpdated') === '824f21a7f4d646625468e03ff8a0c50449d6e0c5527edf82013d385754881c45'
  }

  get asV50(): v50.Contract {
    assert(this.isV50)
    return this._chain.decodeEvent(this.event)
  }

  get isV59(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractUpdated') === '5446945d28da7c765303d310f9ca55fc9bb46e7b5f281ac184521f913c430ee0'
  }

  get asV59(): v59.Contract {
    assert(this.isV59)
    return this._chain.decodeEvent(this.event)
  }

  get isV101(): boolean {
    return this._chain.getEventHash('SmartContractModule.ContractUpdated') === '1a46e93bb259ee0953495d2ee65d31503cd4736d74c87f1fabc89ea4773bc73c'
  }

  get asV101(): v101.Contract {
    assert(this.isV101)
    return this._chain.decodeEvent(this.event)
  }
}

export class SmartContractModuleNameContractCanceledEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SmartContractModule.NameContractCanceled')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('SmartContractModule.NameContractCanceled') === '0e1caef0df80727d2768bc480792261a4e7615b57b3e8182c7f664f06c96a08e'
  }

  get asV49(): bigint {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class SmartContractModuleNodeContractCanceledEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SmartContractModule.NodeContractCanceled')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('SmartContractModule.NodeContractCanceled') === 'da3d413ec5a77ddce8b8c12c9cdd58340716a71ab4effe398cbaf249a16d0542'
  }

  get asV49(): [bigint, number, number] {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class SmartContractModuleNruConsumptionReportReceivedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SmartContractModule.NruConsumptionReportReceived')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('SmartContractModule.NruConsumptionReportReceived') === '8fb8781273a0957437746af773ed15577fcddcf30727d6027f1651e65345eaf8'
  }

  get asV49(): v49.NruConsumption {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class SmartContractModuleRentContractCanceledEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SmartContractModule.RentContractCanceled')
    this._chain = ctx._chain
    this.event = event
  }

  get isV50(): boolean {
    return this._chain.getEventHash('SmartContractModule.RentContractCanceled') === '0e1caef0df80727d2768bc480792261a4e7615b57b3e8182c7f664f06c96a08e'
  }

  get asV50(): bigint {
    assert(this.isV50)
    return this._chain.decodeEvent(this.event)
  }
}

export class SmartContractModuleUpdatedUsedResourcesEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'SmartContractModule.UpdatedUsedResources')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('SmartContractModule.UpdatedUsedResources') === 'a2596f7d808ddd9ac668241df18cffb93329f10e334b13b87782cc828372795a'
  }

  get asV49(): v49.ContractResources {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleEntityDeletedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.EntityDeleted')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.EntityDeleted') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  get asV49(): number {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleEntityStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.EntityStored')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.EntityStored') === '9d6387c93300e77d2fc96af3ccb27b7eddb14f3768bdf0cf045995fc0be93d47'
  }

  get asV49(): v49.Entity {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleEntityUpdatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.EntityUpdated')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.EntityUpdated') === '9d6387c93300e77d2fc96af3ccb27b7eddb14f3768bdf0cf045995fc0be93d47'
  }

  get asV49(): v49.Entity {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleFarmDeletedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.FarmDeleted')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmDeleted') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  get asV49(): number {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleFarmPayoutV2AddressRegisteredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.FarmPayoutV2AddressRegistered')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmPayoutV2AddressRegistered') === 'a0d19821e09bcebcf8e5acfe4b5eca3681c180d4c05c2f647fff4efbae5ffac9'
  }

  get asV49(): [number, Uint8Array] {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleFarmStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.FarmStored')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmStored') === '726b3750a3581693895b85199ef30539e39935122946406d4a41c5ceb64b5185'
  }

  get asV49(): v49.Farm {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  get isV50(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmStored') === 'ec24dee4036a557d103cfa67fbde8a7758d4f82f2dc82e80a56b839aecd93ebb'
  }

  get asV50(): v50.Farm {
    assert(this.isV50)
    return this._chain.decodeEvent(this.event)
  }

  get isV63(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmStored') === 'ca41d591947edffabc4e5a891ad112debc48b2e676350f6208a4cb6eb13f4627'
  }

  get asV63(): v63.Farm {
    assert(this.isV63)
    return this._chain.decodeEvent(this.event)
  }

  get isV101(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmStored') === '74b71e5fe3d2ea0881a33f99511ab05ec0233a16d23bc46f38fa69f638b7abe8'
  }

  get asV101(): v101.Farm {
    assert(this.isV101)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleFarmUpdatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.FarmUpdated')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmUpdated') === '726b3750a3581693895b85199ef30539e39935122946406d4a41c5ceb64b5185'
  }

  get asV49(): v49.Farm {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  get isV50(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmUpdated') === 'ec24dee4036a557d103cfa67fbde8a7758d4f82f2dc82e80a56b839aecd93ebb'
  }

  get asV50(): v50.Farm {
    assert(this.isV50)
    return this._chain.decodeEvent(this.event)
  }

  get isV63(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmUpdated') === 'ca41d591947edffabc4e5a891ad112debc48b2e676350f6208a4cb6eb13f4627'
  }

  get asV63(): v63.Farm {
    assert(this.isV63)
    return this._chain.decodeEvent(this.event)
  }

  get isV101(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmUpdated') === '74b71e5fe3d2ea0881a33f99511ab05ec0233a16d23bc46f38fa69f638b7abe8'
  }

  get asV101(): v101.Farm {
    assert(this.isV101)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleFarmingPolicyStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.FarmingPolicyStored')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmingPolicyStored') === '889678f6393313871185e40b56e531f314bc024974797c3b92b40e732e7bffa8'
  }

  get asV49(): v49.FarmingPolicy {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  get isV63(): boolean {
    return this._chain.getEventHash('TfgridModule.FarmingPolicyStored') === 'e45f1ccb50e73b0f9a65c63399730f27041aa3b5c8347272bbbe01c3b66f5712'
  }

  get asV63(): v63.FarmingPolicy {
    assert(this.isV63)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleNodeDeletedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.NodeDeleted')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.NodeDeleted') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  get asV49(): number {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleNodePublicConfigStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.NodePublicConfigStored')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.NodePublicConfigStored') === '20643e6e9f19e9332d7341fb57361ee76e2353fc64d1b582212be20ca40e2a9d'
  }

  get asV49(): [number, v49.PublicConfig] {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleNodeStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.NodeStored')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.NodeStored') === '62927e9ab82956f67cd8dc695c4306b7313ec903fd93bc8473e5944e59c16cdd'
  }

  get asV49(): v49.Node {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  get isV63(): boolean {
    return this._chain.getEventHash('TfgridModule.NodeStored') === 'e1f5e9dacc89d5440a8c0eca179818231f2f3c7795140ef18ed503dc0dad337c'
  }

  get asV63(): v63.Node {
    assert(this.isV63)
    return this._chain.decodeEvent(this.event)
  }

  get isV101(): boolean {
    return this._chain.getEventHash('TfgridModule.NodeStored') === '8c3fa509fc5a961d1224b0b04af3d8a581aa9f74c7430ec3aaabf187866587fa'
  }

  get asV101(): v101.Node {
    assert(this.isV101)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleNodeUpdatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.NodeUpdated')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.NodeUpdated') === '62927e9ab82956f67cd8dc695c4306b7313ec903fd93bc8473e5944e59c16cdd'
  }

  get asV49(): v49.Node {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  get isV63(): boolean {
    return this._chain.getEventHash('TfgridModule.NodeUpdated') === 'e1f5e9dacc89d5440a8c0eca179818231f2f3c7795140ef18ed503dc0dad337c'
  }

  get asV63(): v63.Node {
    assert(this.isV63)
    return this._chain.decodeEvent(this.event)
  }

  get isV101(): boolean {
    return this._chain.getEventHash('TfgridModule.NodeUpdated') === '8c3fa509fc5a961d1224b0b04af3d8a581aa9f74c7430ec3aaabf187866587fa'
  }

  get asV101(): v101.Node {
    assert(this.isV101)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleNodeUptimeReportedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.NodeUptimeReported')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.NodeUptimeReported') === '4a0c168b038c7fd8096026ff00cc3456827e0f2c507248ecfbcf2c4c07367288'
  }

  get asV49(): [number, bigint, bigint] {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModulePricingPolicyStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.PricingPolicyStored')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.PricingPolicyStored') === '51a9871b7eb0af7df112128d5a4ef3e2a744f5d88c627402bee9f91a7c25fab2'
  }

  get asV49(): v49.PricingPolicy {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  get isV51(): boolean {
    return this._chain.getEventHash('TfgridModule.PricingPolicyStored') === '0f67e7bfdb642a68114325df76a8dc56ea54b43ae993499e316274c95e8cf8af'
  }

  get asV51(): v51.PricingPolicy {
    assert(this.isV51)
    return this._chain.decodeEvent(this.event)
  }

  get isV101(): boolean {
    return this._chain.getEventHash('TfgridModule.PricingPolicyStored') === '088c108804351450f3ff89c4217a7450b4d211e3f833d8ab4746d27624010cc0'
  }

  get asV101(): v101.PricingPolicy {
    assert(this.isV101)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleTwinDeletedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.TwinDeleted')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.TwinDeleted') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  get asV49(): number {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleTwinEntityRemovedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.TwinEntityRemoved')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.TwinEntityRemoved') === 'a09602e40984745a7411a1855af06d133893a422fd68f7bdc4fb6a56bf1a3645'
  }

  get asV49(): [number, number] {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleTwinEntityStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.TwinEntityStored')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.TwinEntityStored') === 'f41c776f2baf981d5a0d5e9d89f98858c2cdd7ea515b3d32a99e45dcb2c7a185'
  }

  get asV49(): [number, number, Uint8Array] {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleTwinStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.TwinStored')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.TwinStored') === '227edfd1a5fd83edb4bfcd22ba5f7ebe5ef8464b8a7b2ddebfe56997c4982276'
  }

  get asV49(): v49.Twin {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  get isV101(): boolean {
    return this._chain.getEventHash('TfgridModule.TwinStored') === '5b6f435dfe1514ae00c046d4634f4246d82542de8da2b6937732aec521f3408a'
  }

  get asV101(): v101.Twin {
    assert(this.isV101)
    return this._chain.decodeEvent(this.event)
  }
}

export class TfgridModuleTwinUpdatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TfgridModule.TwinUpdated')
    this._chain = ctx._chain
    this.event = event
  }

  get isV49(): boolean {
    return this._chain.getEventHash('TfgridModule.TwinUpdated') === '227edfd1a5fd83edb4bfcd22ba5f7ebe5ef8464b8a7b2ddebfe56997c4982276'
  }

  get asV49(): v49.Twin {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  get isV101(): boolean {
    return this._chain.getEventHash('TfgridModule.TwinUpdated') === '5b6f435dfe1514ae00c046d4634f4246d82542de8da2b6937732aec521f3408a'
  }

  get asV101(): v101.Twin {
    assert(this.isV101)
    return this._chain.decodeEvent(this.event)
  }
}
