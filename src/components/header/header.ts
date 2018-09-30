import { Component } from '@angular/core';
import { BlockstackProvider } from '../../providers/blockstack/blockstack';
import { FactomProvider } from '../../providers/factom/factom';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  text: string;
  name;
  searchResults;

  constructor(
    private blockstackService: BlockstackProvider,
    private factom: FactomProvider,
    private toastCtrl: ToastController,
  ) {
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
    this.getProfile();
  }

  async getProfile() {
    this.blockstackService.getProfile();
  }

  async onSearch() {
    this.searchResults = await this.factom.getEntry('a9db1b6c1c193aff15c5bcbef488e142ffddc75f5a6fb4a674ec7ab6de4889eb');
  }

  

  onCancel() {

  }

}
