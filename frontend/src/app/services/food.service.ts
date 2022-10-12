import { sample_foods } from './../../data';
import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():Food[]{
     return sample_foods;
  }

  getAllFoodsBySearchTerm(serchTerm:string){
    return this.getAll().filter(food=>food.name.toLocaleLowerCase().includes(serchTerm.toLocaleLowerCase()));
  }
}
