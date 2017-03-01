import { Component, OnInit } from '@angular/core';

import { Recipe }        from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html',
  styleUrls:  ['./styles/app.component.css'],
  providers:  [ RecipeService ] 
})
export class AppComponent implements OnInit {
  private recipes: Recipe[];
  private selectedRecipe: Recipe;
  private newRecipe = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  private getRecipes(): void {
    this.recipeService.getRecipes()
      .then(recipes => this.recipes = recipes);
  }

  private selectRecipe(recipe: Recipe) {
    if (this.selectedRecipe && this.selectedRecipe.name === recipe.name)
      this.selectedRecipe = null;
    else 
      this.selectedRecipe = recipe;
  }

  private addRecipe(): void {
    this.newRecipe = true;
  }

  private cancelRecipe(): void {
    this.newRecipe = false;
  }

}
