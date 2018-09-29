import { Injectable } from '@angular/core';
import { FactomCli, Entry, Chain } from 'factom';
declare let window: any;
import 'rxjs/add/operator/toPromise';
import * as sodium from 'sodium-signatures';
import { Buffer } from 'buffer';


@Injectable()
export class FactomProvider {

  cli;

  constructor() {

    window.sodium = sodium;
    var keys = sodium.keyPair();
    var message = new Buffer('a message');
    var signature = sodium.sign(message, keys.secretKey);
    var verified = sodium.verify(message, signature, keys.publicKey);
    console.log('message was verified', verified);

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
  }

  async getTransactionInfo(txId) {
    const resp = await this.cli.getTransaction(txId);
    console.log(resp);
    return resp;
  }

  async createChain(chainName) {
    const firstEntry = Entry.builder()
      .extId('6d79206578742069642031') // If no encoding parameter is passed as 2nd argument, 'hex' is used
      .extId('my ext id 1', 'utf8') // Explicit the encoding. Or you can pass directly a Buffer
      .content('Initial content', 'utf8')
      .build();

    const chain = new Chain(firstEntry);
    this.cli.add(chain, window.appsettings.entryPrivKey);
  }

  async sendTransaction() {
    const myEntry = Entry.builder()
      .chainId('c9cd45cc1c3099f96cbaa1dc5b96934f880ed5f2038f3bbddab6d98822c5099e')
      .extId('6d79206578742069642031') // If no encoding parameter is passed as 2nd argument, 'hex' is used
      .extId('some external ID', 'utf8')
      .content('My new content', 'utf8')
      .build();
    this.cli.add(myEntry, window.appsettings.entryPrivKey);
  }

}
