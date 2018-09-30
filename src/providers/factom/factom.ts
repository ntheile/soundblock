import { Injectable } from '@angular/core';
import { FactomCli, Entry, Chain } from 'factom';
declare let window: any;
import 'rxjs/add/operator/toPromise';
import * as sodium from 'sodium-signatures';
import { Buffer } from 'buffer';
import { box, hash, sign, BoxKeyPair, SignKeyPair } from 'tweetnacl'
import * as blockstack from 'blockstack';
import { ToastController } from 'ionic-angular';


@Injectable()
export class FactomProvider {

  cli;
  chainId = "c9cd45cc1c3099f96cbaa1dc5b96934f880ed5f2038f3bbddab6d98822c5099e"; // Nick Theile Artist
  entryId = "e72cfa6e727ed76f960a14940e0235ebfb63685b531c858cd26f0888b53bd594"; // Super Mario Song

  constructor(
    private toastCtrl: ToastController,
  ) {
    this.cli = new FactomCli({
      host: 'localhost',
      port: 8088,
      path: '/v2',
      debugPath: '/debug',
      protocol: 'http',
      rejectUnauthorized: true,
      retry: {
        retries: 4,
        factor: 2,
        minTimeout: 500,
        maxTimeout: 2000
      }
    });
    window.factom = this.cli;
    window.Entry = Entry;
    window.Chain = Chain;
    this.createKeyPair();
  }

  async getTransactionInfo(txId) {
    const resp = await this.cli.getTransaction(txId);
    console.log(resp);
    return resp;
  }

  async createChain(chainName, artistMetaData) {
    const firstEntry = Entry.builder()
      .extId('6d79206578742069642031') // If no encoding parameter is passed as 2nd argument, 'hex' is used
      .extId(chainName, 'utf8') // Explicit the encoding. Or you can pass directly a Buffer
      .content('My Artist MetaData', 'utf8')
      .build();

    const chain = new Chain(firstEntry);
    this.cli.add(chain, window.appsettings.entryPrivKey);

    this.presentToastDismiss('Created chain on Factom - ' + chainName);
  }

  async sendTransaction(musicData) {
    const myEntry = Entry.builder()
      .chainId(this.chainId)
      .extId('6d79206578742069642031') // If no encoding parameter is passed as 2nd argument, 'hex' is used
      .extId('Digital Signature', 'utf8')
      .content(musicData, 'utf8')
      .build();
    this.cli.add(myEntry, window.appsettings.entryPrivKey);
    this.presentToast('Created entry on Factom - ' + musicData);
  }

  async getEntry(entryId){
    let resp = await this.cli.getEntry(this.entryId);
    this.presentToast(resp.content.toString());
    return resp;
  }

  // https://github.com/mafintosh/sodium-signatures
  async createKeyPair(){
     
     window.sodium = sodium;
     var keys = sodium.keyPair();
     var message = new Buffer('a message');
     var signature = sodium.sign(message, keys.secretKey);
     var verified = sodium.verify(message, signature, keys.publicKey);
     console.log('message was verified', verified);

    // window.sign = sign;
    // box.keyPair.fromSecretKey(blockstack.loadUserData().appPrivateKey);
  }

  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      position: 'top',
      //showCloseButton: true,
      duration: 5000
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentToastDismiss(data) {
    let toast = this.toastCtrl.create({
      message: data,
      position: 'middle',
      duration: 3000
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
