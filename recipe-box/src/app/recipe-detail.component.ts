import { Component, Input, Output } from '@angular/core';

import { Recipe }       from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  moduleId: module.id,
  selector: 'recipe-detail',
  templateUrl: './views/recipe-detail.component.html',
  styleUrls: [ './styles/recipe-detail.component.css' ]
})
export class RecipeDetailComponent {
  @Input() public recipe: Recipe;
  @Input() @Output() public isEditing = false;

  constructor(private recipeService: RecipeService) {}

  private delete(): void {
    
  }

  private edit(): void {
    this.isEditing = true;
  }

  // private unselectRecipe(): void {
  //   this.recipe = null;
  // }
}