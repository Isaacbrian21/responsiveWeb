import { Component } from '@angular/core';
import { Cars } from './core/models/cars.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'Angular e meus testes';
  public slides!: Cars[];

  
}


