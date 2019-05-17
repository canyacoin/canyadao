import { Injectable } from '@angular/core';
import { Tier } from './dataTier';
import { Member } from './dataMember';

import { DATADAO, MEMBERDAO} from './dataDAO';

@Injectable({
  providedIn: 'root'
})
export class DaoService {

  dataDAO = DATADAO;
  memberDAO = MEMBERDAO;

  constructor() { }

  getDataDAO(): Tier[] {
    return this.dataDAO;
  }

  getMemberDAO(): Member {
    return this.memberDAO;
  }

  getStake(id): number {
    const tier = this.dataDAO.find(tier => tier.id === id);
    return tier.stake;
  }

  getName(id): string {
    const tier = this.dataDAO.find(tier => tier.id === id);
    return tier.name;
  }

  getPeriod(id): number {
    const tier = this.dataDAO.find(tier => tier.id === id);
    return tier.period;
  }

  getPerks(id): string[] {
    const tier = this.dataDAO.find(tier => tier.id === id);
    return tier.perks;
  }

  getMemberWallet(): string {
    const wallet = this.memberDAO.wallet;
    return wallet;
  }
  getMemberName(): string {
    const name = this.memberDAO.name;
    return name;
  }
  getMemberStake(): number {
    const stake = this.memberDAO.stake;
    return stake;
  }
  getMemberTier(): string {
    return this.memberDAO.tier;
  }


}
