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
  }

  onClick(button) {

    if (button === 'C') {
      this.display = '';
    } else if (button === '=') {


      const megaSpeed = document.getElementById('super-speed');
      console.log(megaSpeed['checked']);
      if (!megaSpeed['checked']) {
        this.loadScreen = true;
        timer(800).subscribe(() => this.loadScreen = false);
      }
      this.display = eval(this.display);
    } else {
      this.display += button;
    }
  }
}
