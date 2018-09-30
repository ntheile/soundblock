import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as blockstack from 'blockstack'
import { TabsPage } from '../pages/tabs/tabs';
declare let window: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  name;
  isLoggedIn;
  avatar;
  loginState;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.showProfile();
    });
  }

  login() {
    let origin = window.location.origin;
    let manifest = origin;
    blockstack.redirectToSignIn(origin, manifest + '/manifest.json', ['store_write', 'publish_data', 'email'])
  }

  async showProfile() {
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

}
