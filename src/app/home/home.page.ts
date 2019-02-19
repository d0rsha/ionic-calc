import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { AppComponent } from '../app.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AngularDelegate } from '@ionic/angular';

import 'web-animations-js/web-animations.min';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '../app.module';

import { trigger, state, style, animate, transition } from '@angular/animations';

platformBrowserDynamic().bootstrapModule(AppModule);

const BOXES = 4;

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
  display = [];
  loadScreen = false;
  lastClick = 'C';

  active: boolean = false;
  message: string = '';

  constructor() { }

  ngOnInit() {
    let megaSpeed = document.getElementById('super-speed');
    megaSpeed['value'] = 99;
  }


  onClick(button) {
    if (button === 'C') {
      this.result = '';
      this.lastClick = 'C';
    } else if (button === '=') {
      this.evaluate();
    } else if (button === 'Esc') {
      this.show('Why you Click Esc?', 200);
    } else {
      this.addClick(button);
    }
  }

  erase() {
    if (this.result.length > 0) {
      this.result = this.result.substring(0, this.result.length - 1);
    }
  }
  private calculate() {
    this.loadScreen = true;

    const megaSpeed = document.getElementById('super-speed');
    let time: number = megaSpeed['value'];
    timer((99 - time) * 18).subscribe(() => {
      this.loadScreen = false;
      const lastIndex = this.result[this.result.length - 1];
      if (this.result.length > 0 && !isNaN(Number(lastIndex))) {

        this.result = eval(this.result);
        let next = this.result;

        if (this.display.length < BOXES) {
          this.display.unshift(next);
        } else {
          for (let i = 0; i < this.display.length; i++) {
            const tmp = this.display[i];
            this.display[i] = next;
            this.display[i] = next;
            next = tmp;
          }
        }
      }
    });
  }


  private evaluate() {

    this.calculate();

    const lastIndex = this.result[this.result.length - 1];
    if (this.result.length > 0 && !isNaN(Number(lastIndex))) {
      this.lastClick = '=';
    } else if (this.lastClick === '=') {
      this.show('Ok. Sure. ', 200);
    } else {
      this.lastClick = 'operator';
      this.show('Why you do dhis', 200);
    }
  }

  private addClick(button) {
    const currlastIndex = this.result[this.result.length - 1];
    console.log('Last in string: ', currlastIndex);
    console.log('Button clicked: ', button);

    if (isNaN(Number(button))) {
      if (isNaN(Number(currlastIndex))) {
        this.show('You are wrong', 200);
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
    } else {
      this.lastClick = button;
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

  get(prevResult) {
    this.result += prevResult;
  }
}
