import { Component, OnInit } from '@angular/core';

import { Recipe }         from './recipe';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html',
  styleUrls:  ['./styles/app.component.css'],
  providers:  [ RecipesService ] 
})
export class AppComponent implements OnInit {
  private recipes: Recipe[];
  private newRecipe = false;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  private getRecipes(): void {
    this.recipesService.getRecipes()
      .then(recipes => this.recipes = recipes);
  }

  private addRecipe(): void {
    this.newRecipe = true;
  }

  private cancelRecipe(): void {
    this.newRecipe = false;
  }

}
