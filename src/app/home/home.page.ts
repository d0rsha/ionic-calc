import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { AppComponent } from '../app.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  display = '';
  loadScreen = false;

  constructor() { }

  ngOnInit() {
    let megaSpeed = document.getElementById('super-speed');
    megaSpeed['value'] = 9;
  }

  onClick(button) {

    if (button === 'C') {
      this.display = '';
    } else if (button === '=') {


      const megaSpeed = document.getElementById('super-speed');
      console.log(megaSpeed['value']);
      this.loadScreen = true;
      
      let time: number = megaSpeed['value'];
      timer((99 - time) * 18 ).subscribe(() => this.loadScreen = false);
      if (this.display.length > 0) {
        this.display = eval(this.display);
        this.display = this.display.toString();
      }
    } else {
      this.display += button;
    }
  }

  erase() {
    if (this.display.length > 0) {
      this.display = this.display.substring(0, this.display.length - 1);
    }
  }
}
