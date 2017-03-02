import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Recipe }                from './recipe';
import { RecipeService }         from './recipe.service';
import { SelectedRecipeService } from './selected-recipe.service';

@Component({
  moduleId: module.id,
  selector: 'app-edit-recipe',
  templateUrl: './views/edit-recipe-form.component.html',
  styleUrls: [ './styles/edit-recipe-form.component.css' ]
})

export class EditRecipeFormComponent {
  @Input()  isEdit: boolean;
  @Output() isEditChange = new EventEmitter<boolean>();

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

  onSubmit(name: string, ingredients: string): void {
    const editedRecipe = new Recipe(this.recipe.id, name, ingredients);
    this.recipe = editedRecipe;
    this.recipeService.replace(editedRecipe)
    .catch(this.handleError);
    this.closeForm();
  }

  closeForm(): void {
    this.isEdit = false;
    this.isEditChange.emit(this.isEdit);
  }

  private handleError(error): void {
    console.log(error);
  }
}
