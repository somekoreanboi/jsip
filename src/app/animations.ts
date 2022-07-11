import {trigger,style,animate,transition, query, group}from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-50%', opacity:'0' })
      ]),
      // query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('800ms ease-out', style({ left: '50%', opacity: '0' }))
        ]),
        query(':enter', [
          animate('800ms ease-out', style({ left: '0%', opacity: '1' }))
        ]),
        // query('*', animateChild())
      ]),
    ])
  ]);