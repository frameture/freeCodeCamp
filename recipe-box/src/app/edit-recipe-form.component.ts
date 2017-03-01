import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Recipe }    from './recipe';

@Component({
  moduleId: module.id,
  selector: 'edit-recipe',
  templateUrl: './views/edit-recipe-form.component.html',
  styleUrls: [ './styles/edit-recipe-form.component.css' ]
})

export class EditRecipeFormComponent implements OnInit {
  @Input() public isEdit: boolean;
  @Output() public isEditChange = new EventEmitter<boolean>();
  @Input() public parentRecipe: Recipe;
  public editedRecipe: Recipe;



  private closeForm(form): void {
    this.isEdit = false;
    this.isEditChange.emit(this.isEdit);
    console.log(this.isEdit, form);    
  }

  private copyRecipe(): void {
    this.editedRecipe = new Recipe(
      this.parentRecipe.name, 
      this.parentRecipe.ingredients
    );
  }

   ngOnInit(): void {
    this.copyRecipe();
  }
}