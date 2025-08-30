import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';

import { Observable, interval, map } from 'rxjs'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);

  customeInterval$ = new Observable( (subscriber) =>{
    let count = 0;
    const interval = setInterval(() => {
      if(count === 5){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      count = count + 1;
    subscriber.next(count);
    }, 2000)
    subscriber.closed;
  });

  constructor(){
    // effect(() => {
    //   console.log(`clicked button ${this.clickCount()} times`)
    // });
  }

  ngOnInit(): void {
    //  const subscription = interval(1000).pipe(
    //   map( val => val * 2)
    //  ).subscribe({
    //   next: (val) => {console.log(val)},
    //   error: () => {}
    //  });
    //  this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    //  });
    this.customeInterval$.subscribe((data) => {
      console.log("from inside the ngOnInIt: " + data)
    });
  }

  onClick(){
    this.clickCount.update(old => old + 1);
  }

}
