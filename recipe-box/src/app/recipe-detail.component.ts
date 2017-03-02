import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Recipe }                from './recipe';
import { RecipeService }         from './recipe.service';
import { SelectedRecipeService } from './selected-recipe.service';

@Component({
  moduleId: module.id,
  selector: 'app-recipe-detail',
  templateUrl: './views/recipe-detail.component.html',
  styleUrls: [ './styles/recipe-detail.component.css' ]
})
export class RecipeDetailComponent {
  @Input()  private isEditing = false;
  @Output() private recipeChange = new EventEmitter<Recipe>();

  constructor(
    private recipeService: RecipeService,
    private selectedRecipeService: SelectedRecipeService
  ) { }

  get recipe(): Recipe {
    return this.selectedRecipeService.selectedRecipe;
  }

  set recipe(recipe: Recipe) {
    this.selectedRecipeService.selectedRecipe = recipe;
  }

  private delete(): void {
    const id = this.recipe.id;
    this.recipeService.deleteRecipe(id)
      .then(() => { this.recipe = null; })
      .catch(this.handleError);
  }

  private edit(): void {
    this.isEditing = true;
  }

  private handleError(error): void {
    console.log('error in app-detail', error);
  }
}
