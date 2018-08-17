import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { OptionsPage } from '../pages/options/options';
import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any = TabsPage;
  optionsPage: any = OptionsPage;
  authPage: any = AuthPage;
  isAuth: boolean;
  @ViewChild('content') content: NavController;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      let config = {
        apiKey: "AIzaSyBXGGN64RjPvQhghR9Y1mP3qBL7Gw8j7GM",
        authDomain: "angularbooks-79eaf.firebaseapp.com",
        databaseURL: "https://angularbooks-79eaf.firebaseio.com/",
        projectId: "angularbooks-79eaf",
        storageBucket: "angularbooks-79eaf.appspot.com",
        messagingSenderId: "121353569465"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(TabsPage);
          } else {
            this.isAuth = false;
            this.content.setRoot(AuthPage, { mode: 'connect' });
          }
        }
      );
    });
  }

  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}
