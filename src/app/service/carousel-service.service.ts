import { Injectable } from '@angular/core';
import { interval, NEVER, Observable, Subject } from 'rxjs';
import { map, scan, startWith, switchMap } from 'rxjs/operators';

export interface ICounter {
  pause?: boolean;
  counterValue:number;
}


@Injectable({
  providedIn: 'root'
})
export class CarouselServiceService {
  private counterSubject:Subject<ICounter>=new Subject();
 
  constructor() { }

  initInterval(duration:number):Observable<ICounter>{
    return this.counterSubject.pipe(
      startWith({pause:false, counterValue:0}),
      scan((acc,val)=>({...acc,...val})),
      switchMap((state)=>state.pause  ? NEVER : interval(duration).pipe(map(()=>{
        state.counterValue+=1;
        return state;
      })))
    )
  }

  pauseCounter(){
    this.counterSubject.next({
      pause: true,
      counterValue: 1
    })
  }
  resumeCounter(){
    this.counterSubject.next({
      pause: false,
      counterValue: 1
    })
  }

}

