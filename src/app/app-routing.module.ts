import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home', loadChildren: () => import('../app/module/home/home.module').then(home => home.HomeModule)},

  {path: 'cars', loadChildren: () => import('./module/cars/cars.module').then(employee => employee.CarsModule)},

  {path: 'about', loadChildren: () => import('../app/module/about/about.module').then(about => about.AboutModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
