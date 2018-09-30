import { Injectable } from '@angular/core';
import * as blockstack from 'blockstack'
declare let window: any;
import { DID3Tag } from '../../models/id3';

/*
  Generated class for the BlockstackProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BlockstackProvider {


  name;
  isLoggedIn;
  avatar;
  dID3tag: DID3Tag;

  constructor() {
    console.log('Hello BlockstackProvider Provider');
  }

  getProfile(){
    if (blockstack.isUserSignedIn()) {
      let profile = blockstack.loadUserData();
      this.name = profile.username;
      this.isLoggedIn = true;
      try {
        this.avatar = profile.profile.image[0].contentUrl;
      } catch (e) { console.log('no profile pic') }
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(function (userData) {
        window.location = window.location.origin
        this.documentsGetList();
        this.loading.dismiss();
      });
    }
  }

  login() {
    let origin = window.location.origin;
    let manifest = origin;
    blockstack.redirectToSignIn(origin, manifest + '/manifest.json', ['store_write', 'publish_data', 'email'])
  }

  uploadSong(){

    
    this.dID3tag = {
      song: 'Super Mario',
      album: 'self title',
      artist: 'Nick Theile',
      artistDigitalSignature: '',
      artistPublicKey: '',
      artUrl: 'https://supermariorun.com/assets/img/hero/hero_chara_mario_update_pc.png',
      genre: 'alternative',
      license: 'free',
      lyricsUrl: 'http://url-to-lyrics.html',
      rawMusicFileHash: '',
      year: '2018',
    };
    

    blockstack.putFile('supermario.mp3', '' , {} );
    blockstack.putFile('supermario.did3.json', '', '');
  }


}
