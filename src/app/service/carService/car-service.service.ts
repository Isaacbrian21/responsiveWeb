import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cars } from 'src/app/core/models/cars.models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  private apiUrl = 'http://localhost:3000/cars'

  constructor(private http: HttpClient) { }

  public getAll():Observable<Cars[]> {
    return this.http.get<Cars[]>(this.apiUrl);
  }
}

