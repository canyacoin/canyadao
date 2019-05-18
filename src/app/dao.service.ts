import { Injectable } from '@angular/core';
import { Tier } from './dataTier';
import { Member } from './dataMember';

import { DATADAO, MEMBERDAO} from './dataDAO';

@Injectable({
  providedIn: 'root'
})
export class DaoService {

  public dataDAO = DATADAO;
  public memberDAO = MEMBERDAO;
  public inDAO: boolean = false;

  // DB Model
  public member: Member;

  constructor() { }

  loadDAO() {
    this.member.wallet = this.memberDAO.wallet;
    this.member.name = this.memberDAO.name;
    this.member.tier = this.memberDAO.tier;
    this.member.date = this.memberDAO.date;
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
    return this.memberDAO.wallet;
  }
  getMemberName(): string {
    return this.memberDAO.name;
  }

  getMemberTier(): number {
    return this.memberDAO.tier;
  }

  getMemberDate() {
    return new Date(this.memberDAO.date);
  }

  stake(id) {
    this.memberDAO.tier = id;
    this.memberDAO.name = this.getName(id);
    var today = new Date();
    this.memberDAO.date = today.toDateString();
    this.inDAO = true;
  }

  unStake(id) {
    this.memberDAO.tier = id;
    this.memberDAO.name = this.getName(id);
  }

  withdrawAll(){
    this.memberDAO.tier = 0;
    this.memberDAO.name = '';
    this.memberDAO.date = '';
    this.inDAO = false;
  }

}
