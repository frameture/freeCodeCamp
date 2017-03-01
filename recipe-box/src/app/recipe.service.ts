import { Injectable } from '@angular/core'

import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
   private mockRecipes: Recipe[] = [
    new Recipe('Apple Pie', ['apples', 'flour', 'water', 'sugar']),
    new Recipe('Oats',      ['oats', 'water', 'honey', 'oil']),
    new Recipe('Pasta',     ['flour', 'water'])
  ];

  public getRecipes(): Promise<Recipe[]> {
    return Promise.resolve(this.mockRecipes);
  }
}

