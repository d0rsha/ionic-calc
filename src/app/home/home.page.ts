import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { AppComponent } from '../app.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AngularDelegate, NavController } from '@ionic/angular';

import 'web-animations-js/web-animations.min';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '../app.module';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { FlashbarService } from '../services/flashbar.service';

platformBrowserDynamic().bootstrapModule(AppModule);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('messageState', [
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-out')
      ]),
      transition('* => void', [
        animate('200ms ease-in', style({ opacity: '0' }))
      ])
    ])
  ]
})
export class HomePage implements OnInit {

  result = '';
  display = ['', '', ''];
  loadScreen = false;
  lastClick = 'C';

  active: boolean = false;
  message: string = '';

  constructor(public navCtrl: NavController, private flashProvider: FlashbarService) { }

  ngOnInit() {
    let megaSpeed = document.getElementById('super-speed');
    megaSpeed['value'] = 99;
  }

  onClick(button) {
    if (button === 'C') {
      this.result = '';
      this.lastClick = 'C';
    } else if (button === '=') {
      const megaSpeed = document.getElementById('super-speed');
      // console.log(megaSpeed['value']);
      this.loadScreen = true;

      let time: number = megaSpeed['value'];
      timer((99 - time) * 18).subscribe(() => this.loadScreen = false);
      const lastIndex = this.result[this.result.length - 1];
      if (this.result.length > 0 && !isNaN(Number(lastIndex))) {

        this.result = eval(this.result);
        this.result = this.result.toString();

        let next = this.result;
        for (let i = 0; i < this.display.length; i++) {
          let tmp = this.display[i];
          this.display[i] = next;
          this.display[i] = next;
          console.log(this.display);
          next = tmp;
        }
        this.lastClick = '=';
      } else {
        this.lastClick = 'operator';
        this.result = 'err';
      }

    } else {
      const currlastIndex = this.result[this.result.length - 1];

      console.log('Last in string: ', currlastIndex);
      console.log('Button clicked: ', button);

      if (isNaN(Number(button))) {
        if (isNaN(Number(currlastIndex))) {
          const tmp = this.result;
          this.result = 'err';
          timer(500).subscribe(() => this.result = tmp);
          this.show('Err', 2000);
          button = '';
        }
      }

      // Reset if last click was = && starting new calc
      if (this.lastClick === '=' && !isNaN(Number(button))) {
        this.result = '';
      }

      this.result += button;

      // Set last click to operator or num
      const lastIndex = this.result[this.result.length - 1];
      if (isNaN(Number(lastIndex))) {
        this.lastClick = 'operator';
        console.log('OPERATOR');
      } else {
        this.lastClick = button;
        console.log('NUBMER');
      }
    }
  }

  erase() {
    if (this.result.length > 0) {
      this.result = this.result.substring(0, this.result.length - 1);
    }
  }



  

  show(message, duration) {

    this.message = message;
    this.active = true;

    setTimeout(() => {
        this.active = false;
    }, duration);

  }

  hide() {
      this.active = false;
  }
}
