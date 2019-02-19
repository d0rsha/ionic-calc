import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FlashbarService } from '../../services/flashbar.service';

@Component({
  selector: 'app-flashbar',
  templateUrl: './flashbar.component.html',
  styleUrls: ['./flashbar.component.scss'],
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
export class FlashbarComponent implements OnInit {

  active: boolean = false;
  message: string = '';

  constructor(private flashbar: FlashbarService) {
      this.flashbar.show = this.show.bind(this);
      this.flashbar.hide = this.hide.bind(this);
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


  ngOnInit() { }

}
