import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>('./assets/food-list-data.json');
  }
}
