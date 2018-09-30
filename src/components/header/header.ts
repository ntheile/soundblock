import { Component } from '@angular/core';
import { BlockstackProvider } from '../../providers/blockstack/blockstack';

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

  constructor(
    private blockstackService: BlockstackProvider
  ) {
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
    this.getProfile();
  }

  async getProfile(){
    this.blockstackService.getProfile(); 
  }

  onSearch(){

  }

  onCancel(){
    
  }

}
