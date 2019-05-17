import { Tier } from './dataTier';
import { Member } from './dataMember';

export const DATADAO: Tier[] = [
  {id: 0, name: 'Member', stake: 1000, period: 0, perks: ['Minimum entry to DAO', 'Voting on proposals', 'Small tasks to earn rewards', 'People-powered', 'Work any time, any where']},
  {id: 1, name: 'Admin', stake: 10000, period: 30, perks: ['Operational tier', 'Submit proposals', 'Tasks to earn rewards', 'Dispute resolution', 'Work any time, any where']},
  {id: 2, name: 'Core', stake: 50000, period: 90, perks: ['Governing tier', 'Decide and veto proposals', 'Credential access', 'Govern a large fund', 'Build the future']},
  {id: 3, name: 'Node', stake: 100000, period: 120,  perks: ['Infrastructure tier', 'Run core nodes', 'Maintain code', 'Provision liquidity', 'Control multi-signatures']}
];

export const MEMBERDAO: Member = {wallet: 'bnbtestwallet', stake: 50000, name: 'anon', tier: 'core'};
