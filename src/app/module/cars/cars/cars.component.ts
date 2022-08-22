import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cars } from 'src/app/core/models/cars.models';
import { CarouselServiceService } from 'src/app/service/carousel-service.service';
import { CarServiceService } from 'src/app/service/carService/car-service.service';

export const fadeIn=animation([
  style({opacity:0}),
  animate('2s', style({opacity:1}))
])

export const scaleIn=animation([
  style({opacity:0, transform:"scale(0.5)"}),
  animate('2s', style({opacity:1, transform:"scale(1)"}))
])

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  animations: [
    trigger('carouselAnimation',[
      transition('void=>*', [
        useAnimation(scaleIn)
      ])
    ])
  ]
})
export class CarsComponent implements OnInit {
cars: Cars[] = [];
currentIndex: number=0;
counterValue!:string
time=5;
interval!: Subscription

  constructor(private carService: CarServiceService, private carouselService: CarouselServiceService) {
    this.getCars()
   }

  ngOnInit(): void {
    this.initInterval()
  }
initInterval(){

  this.interval = this.carouselService.initInterval(this.time*10).subscribe((d)=>{
    this.counterValue=d.counterValue + "%";
    if(d.counterValue===100){
      this.next()
    }
  })
}

  getCars(): void{
   this.carService.getAll().subscribe((cars) =>{
    this.cars = cars
    console.log(cars);
   })

  }

  next(){
    if(this.currentIndex<this.cars.length-1){
      this.currentIndex++
    }else{
      this.currentIndex=0;
    }
    this.initInterval()
  }

  prev(){
    if(this.currentIndex>0){
      this.currentIndex--;
    }else{
      this.currentIndex=this.cars.length-1;
    }
    this.initInterval()

  }

  @HostListener("mouseenter")
  onMouseEnter(){
    this.carouselService.pauseCounter()
  }
  
  @HostListener("mouseleave")
  onMouseLeave(){
    this.carouselService.resumeCounter()
  }

}

