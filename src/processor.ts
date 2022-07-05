import { balancesTransfer } from './mappings/balances'
import { twinStored, twinDeleted, twinEntityStored, twinEntityRemoved, twinUpdated } from './mappings/twins'
import { nodeStored, nodeUpdated, nodeDeleted, nodeUptimeReported, nodePublicConfigStored, nodeCertificationSet } from './mappings/nodes'
import { farmingPolicyStored, pricingPolicyStored, farmingPolicyUpdated } from './mappings/policies';
import { farmDeleted, farmPayoutV2AddressRegistered, farmStored, farmUpdated, farmCertificationSet } from './mappings/farms';
import { entityDeleted, entityStored, entityUpdated } from './mappings/entity';
import { contractBilled, contractCreated, contractUpdated, contractUpdateUsedResources, nameContractCanceled, nodeContractCanceled, nruConsumptionReportReceived, rentContractCanceled, contractGracePeriodStarted, contractGracePeriodEnded } from './mappings/contracts';
import { burnProcessed, mintCompleted, refundProcessed } from './mappings/bridge';
import { TypeormDatabase } from '@subsquid/typeorm-store'

import {
  SubstrateProcessor,
} from "@subsquid/substrate-processor";

const db = new TypeormDatabase()
const processor = new SubstrateProcessor(db);

processor.setTypesBundle("typegen/typesBundle.json");
processor.setBatchSize(500);
processor.setPrometheusPort(44233)

processor.setDataSource({
  archive: process.env.INDEXER_ENDPOINT_URL || 'http://localhost:8888/graphql',
  chain: process.env.WS_URL || 'ws://localhost:9944'
});

processor.addEventHandler('Balances.Transfer', ctx => balancesTransfer(ctx));

processor.addEventHandler('TfgridModule.TwinStored', ctx => twinStored(ctx));
processor.addEventHandler('TfgridModule.TwinUpdated', ctx => twinUpdated(ctx));
processor.addEventHandler('TfgridModule.TwinDeleted', ctx => twinDeleted(ctx));
processor.addEventHandler('TfgridModule.TwinEntityStored', ctx => twinEntityStored(ctx));
processor.addEventHandler('TfgridModule.TwinEntityDeleted', ctx => twinEntityRemoved(ctx));

processor.addEventHandler('TfgridModule.NodeStored', ctx => nodeStored(ctx));
processor.addEventHandler('TfgridModule.NodeUptimeReported', ctx => nodeUptimeReported(ctx));
processor.addEventHandler('TfgridModule.NodeDeleted', ctx => nodeDeleted(ctx));
processor.addEventHandler('TfgridModule.NodePublicConfigStored', ctx => nodePublicConfigStored(ctx));
processor.addEventHandler('TfgridModule.NodeUpdated', ctx => nodeUpdated(ctx));
processor.addEventHandler('TfgridModule.NodeCertificationSet', ctx => nodeCertificationSet(ctx));

processor.addEventHandler('TfgridModule.PricingPolicyStored', ctx => pricingPolicyStored(ctx));
processor.addEventHandler('TfgridModule.FarmingPolicyStored', ctx => farmingPolicyStored(ctx));
processor.addEventHandler('TfgridModule.FarmingPolicyUpdated', ctx => farmingPolicyUpdated(ctx));

processor.addEventHandler('TfgridModule.FarmStored', ctx => farmStored(ctx));
processor.addEventHandler('TfgridModule.FarmUpdated', ctx => farmUpdated(ctx));
processor.addEventHandler('TfgridModule.FarmDeleted', ctx => farmDeleted(ctx));
processor.addEventHandler('TfgridModule.FarmPayoutV2AddressRegistered', ctx => farmPayoutV2AddressRegistered(ctx));
processor.addEventHandler('TfgridModule.FarmCertificationSet', ctx => farmCertificationSet(ctx));

processor.addEventHandler('TfgridModule.EntityStored', ctx => entityStored(ctx));
processor.addEventHandler('TfgridModule.EntityUpdated', ctx => entityUpdated(ctx));
processor.addEventHandler('TfgridModule.EntityDeleted', ctx => entityDeleted(ctx));

processor.addEventHandler('SmartContractModule.ContractCreated', ctx => contractCreated(ctx));
processor.addEventHandler('SmartContractModule.ContractUpdated', ctx => contractUpdated(ctx));
processor.addEventHandler('SmartContractModule.NodeContractCanceled', ctx => nodeContractCanceled(ctx));
processor.addEventHandler('SmartContractModule.NameContractCanceled', ctx => nameContractCanceled(ctx));
processor.addEventHandler('SmartContractModule.RentContractCanceled', ctx => rentContractCanceled(ctx));
processor.addEventHandler('SmartContractModule.ContractBilled', ctx => contractBilled(ctx));
processor.addEventHandler('SmartContractModule.UpdatedUsedResources', ctx => contractUpdateUsedResources(ctx));
processor.addEventHandler('SmartContractModule.NruConsumptionReportReceived', ctx => nruConsumptionReportReceived(ctx))
processor.addEventHandler('SmartContractModule.ContractGracePeriodStarted', ctx => contractGracePeriodStarted(ctx))
processor.addEventHandler('SmartContractModule.ContractGracePeriodEnded', ctx => contractGracePeriodEnded(ctx))
// processor.addEventHandler('smartContractModule.NodeMarkedAsDedicated', ctx => nodeMarkedAsDedicated(ctx));

processor.addEventHandler('TftBridgeModule.MintCompleted', ctx => mintCompleted(ctx));
processor.addEventHandler('TfgridModule.BurnTransactionProcessed', ctx => burnProcessed(ctx));
processor.addEventHandler('TfgridModule.RefundTransactionProcessed', ctx => refundProcessed(ctx));

processor.run();
