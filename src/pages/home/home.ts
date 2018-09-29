import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FactomProvider } from '../../providers/factom/factom';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chainInfo;

  constructor(
    public navCtrl: NavController,
    public factom: FactomProvider,
   ) {
    this.getChainInfo();
  }

  async createChain(){
    //this.factom.createChain('first chain');
  }

  async getChainInfo(){
    this.chainInfo = await this.factom.getTransactionInfo('15948519a42dacda9c0e583ee61271231fc1c46335e77be38375915a751c76ee');
  }

}
