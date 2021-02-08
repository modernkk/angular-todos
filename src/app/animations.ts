import { animate, animateChild, animation, group, keyframes, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';

const slideAnimationEnter = animation([
  style({
    opacity: 0,
    transform: "translateY(40px)"
  }),
  animate(250)
])

const slideAnimationLeave = animation([
  animate(
    "{{ duration }} {{ delay }} {{ easing }}",
    keyframes([
      style({offset: .3, transform: 'translateX(-80px)'}),
      style({offset: 1, transform: 'translateX(100%)'})
    ])
  )
], {
  params: {
    duration: '1s',
    delay: '0s',
    easing: 'ease-out'
  }
})

export const slideAnimation = trigger('slide', [
  transition('void => *', useAnimation(slideAnimationEnter)),
  transition('* => void', useAnimation(slideAnimationLeave, {
    params: {
      duration: '600ms'
    }
  })),
])

export const todoAnimations = trigger('todoAnimations', [
  transition(':enter', [
    group([
      query('h3', [
        style({ transform: 'translateY(-30px)', opacity: 0}),
        animate(250)
      ]),
      query('@slide', stagger(200, animateChild()), { optional: true })
    ])
  ])
])