import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppareilsPage } from '../appareils/appareils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appareilsPage = AppareilsPage;

  constructor(public navCtrl: NavController) {

  }

  // onGoToAppareils(){
  //   this.navCtrl.push(AppareilsPage);
  // }

}
