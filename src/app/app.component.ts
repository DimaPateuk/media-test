import { Component, AfterViewInit } from '@angular/core';


export const BREAKPOINTS: any = {
  screenKey: 500,
  screenKey2: 600,
};

const mqls: any = {
  screenKey: null,
  screenKey2: null,
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {


  ngAfterViewInit() {
    Object.keys(mqls).forEach((key) => {
      mqls[key] = window.matchMedia(`(max-width: ${BREAKPOINTS[key]}px)`);
    });
    this.createListeners();
  }

  listener = () => {
    for (const key in mqls) {
      if (mqls[key].matches) {
        console.log('emitted from method', key);
        break;
      }
    }
  }

  createListeners() {
    Object.keys(mqls).forEach((key) => {
      mqls[key].addListener(this.listener);
    });

    setTimeout(() => {
      this.remove();
    }, 5000);
  }

  remove() {
    Object.keys(mqls).forEach((key) => {
      console.log(mqls[key]);
      mqls[key].removeListener(this.listener);
    });

    console.log('removed all listeners');
  }

}
