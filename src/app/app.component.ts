import { Component, VERSION as ngv } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'app';
  angularVersion: string = ngv.full;


  constructor(private contexts: ChildrenOutletContexts) {

  }
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];}

}
