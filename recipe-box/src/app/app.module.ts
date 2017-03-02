import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }              from './app.component';
import { AddRecipeComponent }        from './add-recipe.component';
import { RecipeDetailComponent }     from './recipe-detail.component';
import { EditRecipeFormComponent }   from './edit-recipe-form.component';

import { RecipeService }         from './recipe.service';
import { SelectedRecipeService } from './selected-recipe.service';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    RecipeDetailComponent,
    EditRecipeFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    RecipeService,
    SelectedRecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
