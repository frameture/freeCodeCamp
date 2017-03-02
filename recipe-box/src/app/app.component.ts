import { Component, Input } from '@angular/core';

import { Recipe }                from './recipe';
import { RecipeService }         from './recipe.service';
import { SelectedRecipeService } from './selected-recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html',
  styleUrls:  ['./styles/app.component.css']
})
export class AppComponent {
  @Input() isAddRecipe = false;

  constructor(
    private recipeService: RecipeService,
    private selectedRecipeService: SelectedRecipeService
  ) { }

  get recipes(): Recipe[] {
    return this.recipeService.mockRecipes;
  }

  get recipe(): Recipe {
    return this.selectedRecipeService.selectedRecipe;
  }

  set recipe(recipe: Recipe) {
    const selected = this.selectedRecipeService.selectedRecipe;
    if (selected && selected.name === recipe.name) {
      this.selectedRecipeService.selectedRecipe = null; // Unselect
    } else {
      this.selectedRecipeService.selectedRecipe = recipe;
    }
  }

  private selectRecipe(recipe): void {
    this.recipe = recipe;
  }

  private addRecipe(): void {
    this.isAddRecipe = true;
    // TODO:
  }

  // TODO: remove
  get diagnostic() {
    return JSON.stringify(this.recipes);
  }
}
