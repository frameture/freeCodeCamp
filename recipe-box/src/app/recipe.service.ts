import { Injectable } from '@angular/core';

import { Recipe } from './recipe';

import { StorageService } from './storage.service';

@Injectable()
export class RecipeService {

  constructor(private storageService: StorageService) { }

  public getRecipes(): Recipe[] {
    return this.storageService.recipes;
  }

  public addRecipe(recipe: Recipe): Promise<void> {
    if (recipe) {
      return Promise.resolve(this.storageService.addEntry(recipe));
    } else {
      return Promise.reject(`Empty object #{recipe.toString()}`);
    }
  }

  public replace(recipe: Recipe): Promise<void> {
    return Promise.resolve(this.storageService.replaceEntry(recipe));
  }

  public deleteRecipe(id: number): Promise<void> {
    return this.storageService.deleteRecipe(id);
  }
}

