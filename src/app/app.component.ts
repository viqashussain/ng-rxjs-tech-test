import { Component } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { FoodService } from './shared/food.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  allFoodItems$: Observable<FoodItem[]>;
  totalPriceOfAllItems$: Observable<string>;
  displayTicksForEvenSeconds$: Observable<number>;
  boxClicked$: Subject<string> = new Subject();

  redBoxClicks: number = 0;
  greenBoxClicks: number = 0;
  totalBoxClicks: number = 0;
  loadingFinished: boolean = false;

  constructor(private foodService: FoodService) {
    this.allFoodItems$ = this.foodService.getFoodItems();

    this.totalPriceOfAllItems$ = this.allFoodItems$.pipe(
      map(x => x
        .map(x => x.price)
        .reduce((a, b) => a + b).toFixed(2)
      ));

    this.boxClicked$.pipe(tap(color => {
      if (color === 'red') {
        this.redBoxClicks++;
      }
      else {
        this.greenBoxClicks++;
      }
      this.totalBoxClicks++;
    })).subscribe();

    this.displayTicksForEvenSeconds$ = interval(1000).pipe(filter(num => num % 2 === 0));

    this.allFoodItems$.pipe(
      tap(x => this.loadingFinished = true)
    ).subscribe();
  }

  boxClicked(boxColour: string = 'red' || 'green') {
    this.boxClicked$.next(boxColour);
  }
}

export interface FoodItem {
  name: string,
  isVegetarian: boolean,
  isVegan: boolean,
  price: number
}
