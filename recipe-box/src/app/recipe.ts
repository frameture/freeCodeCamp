export class Recipe {
  public ingredientsList: string[];

  public static copyRecipe(toCopy: Recipe): Recipe {
    const recipe = new Recipe(
      toCopy.id,
      toCopy.name,
      toCopy.ingredients
    );
    recipe.updateList();
    return recipe;
  }

  constructor(
    public id: number,
    public name: string,
    public ingredients: string,
  ) {
    this.updateList();
  }

  public updateList(): void {
    this.ingredientsList = this.ingredients.split(',');
  }

}
