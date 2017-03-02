import { Injectable } from '@angular/core';

import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
   public mockRecipes: Recipe[] = [
    new Recipe(1, 'Apple Pie', 'apples, flour, water, sugar'),
    new Recipe(2, 'Oats', 'oats, water, honey, oil'),
    new Recipe(3, 'Pasta', 'flour, water')
  ];

  public getRecipes(): Promise<Recipe[]> {
    return Promise.resolve(this.mockRecipes);
  }

  public replace(recipe: Recipe): Promise<void> {
    const index = this.getIndexOf(recipe.id);
    this.mockRecipes[index] = Recipe.copyRecipe(recipe);
    return Promise.resolve();
  }

  public deleteRecipe(id: number): Promise<void> {
    const index = this.getIndexOf(id);
    console.log('r-Service.delete, index:', index, 'id: ', id);

    if (index === undefined) {
      console.log('rejecting');
      return Promise.reject('No such element');
    }
    this.mockRecipes[index] = null;
    this.mockRecipes = this.mockRecipes
      .filter(r => {
        return r ? true : false;
      });
    return Promise.resolve();
  }

  private getIndexOf(id: number): number {
    for (let i = 0; i < this.mockRecipes.length; i++) {
      if (this.mockRecipes[i].id === id) {
        return i;
      }
    }
    return -1;
  }
}

