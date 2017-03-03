import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Recipe }        from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  moduleId: module.id,
  selector:    'app-add-recipe',
  templateUrl: './views/add-recipe.component.html',
  styleUrls: [ './styles/add-recipe.component.scss' ]
})
export class AddRecipeComponent implements OnInit {
  @Input()  isAddRecipe: boolean;
  @Output() isAddRecipeChange = new EventEmitter<boolean>();
  private recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  private onSubmit(): void {
    this.recipe.updateList();
    this.recipeService.addRecipe(this.recipe)
      .then(() => console.log('added'));
    this.isAddRecipe = false;
    this.isAddRecipeChange.emit(this.isAddRecipe);
    this.createModel();
  }

  private closeForm(): void {
    this.isAddRecipe = false;
    this.isAddRecipeChange.emit(this.isAddRecipe);
    this.createModel();
  }

   ngOnInit(): void {
    this.createModel();
  }

  private createModel(): void {
    const id = this.recipeService.getRecipes().length + 1;
    this.recipe = new Recipe(id, '', '');
  }
}
