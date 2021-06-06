import {
  animate,
  animateChild,
  group,
  keyframes,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const alertLeft = trigger('translateLeft', [
  transition(
    ':enter',
    animate(
      '0.4s ease-in-out',
      keyframes([
        style({ transform: 'translateX(-400px)' }),
        style({ transform: 'translateX(100px)' }),
        style({ transform: 'translateX(0)' }),
      ])
    )
  ),
  transition(
    ':leave',
    animate(
      '0.4s ease-in-out',
      keyframes([
        style({ transform: 'translateX(0)' }),
        style({ transform: 'translateX(100px)' }),
        style({ transform: 'translateX(-400px)' }),
      ])
    )
  ),
]);

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: '-50%',
          right: '-50%',
          width: '100vw',
          transform: 'translate(-50%,-50%)',
          transition: 'all 0.2s ease-in-out',
        }),
      ],
      { optional: true }
    ),
    query(':enter', animateChild(), { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [
          animate(
            '200ms',
            keyframes([style({ opacity: 1 }), style({ opacity: 0 })])
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '200ms',
            keyframes([style({ opacity: 0 }), style({ opacity: 1 })])
          ),
        ],
        { optional: true }
      ),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),
]);

export const popAnim = trigger('popIn', [
  transition(
    ':enter',
    animate(
      '0.2s',
      keyframes([
        style({ transform: 'scale(0)', opacity: 0 }),
        style({ transform: 'scale(1.2)' }),
        style({ transform: 'scale(1)', opacity: 1 }),
      ])
    )
  ),
  transition(
    ':leave',
    animate(
      '0.2s',
      keyframes([
        style({ transform: 'scale(1)', opacity: 1 }),
        style({ transform: 'scale(1.2)' }),
        style({ transform: 'scale(0)', opacity: 0 }),
      ])
    )
  ),
]);

export const menuPop = trigger('menuPop', [
  transition(
    ':enter',
    animate(
      '0.2s',
      keyframes([
        style({ transform: ' translate(-50% , -200px)', opacity: 0 }),
        style({ transform: ' translate(-50% ,50px)', opacity: 0.5 }),
        style({ transform: ' translate(-50%,0)', opacity: 1 }),
      ])
    )
  ),
  transition(
    ':leave',
    animate(
      '0.2s',
      keyframes([
        style({ transform: ' translate(-50%)', opacity: 1 }),
        style({ transform: ' translate(-50%)', opacity: 0 }),
      ])
    )
  ),
]);

export const routeMain = trigger('routeMain', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%)',
          width:'100%',
          transition: 'all 0.2s ease-in-out',
        }),
      ],
      { optional: true }
    ),
    query(':enter', animateChild(), { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [
          animate(
            '200ms',
            keyframes([style({ opacity: 1 }), style({ opacity: 0 })])
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          animate(
            '200ms',
            keyframes([style({ opacity: 0 }), style({ opacity: 1 })])
          ),
        ],
        { optional: true }
      ),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),
]);

export const opacityAnim = trigger('opacityAnim', [
  transition(
    ':enter',
    animate(
      '0.5s ease-in-out',
      keyframes([style({ opacity: 0 }), style({ opacity: 1 })])
    )
  ),
  transition(
    ':leave',
    animate(
      '0.5s ease-in-out',
      keyframes([style({ opacity: 1 }), style({ opacity: 0 })])
    )
  ),
]);
