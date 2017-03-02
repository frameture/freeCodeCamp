import { Recipe } from './recipe';

export class StorageService {
  private readonly DATA_KEY = 'recipes-app-local-storage';
  private data = this.getData();

  get recipes() {
    return this.data;
  }

  public deleteRecipe(id: number): Promise<void> {
    // TODO: change ids after removal
    const index = this.getIndexOf(id);

    if (index === undefined) {
      return Promise.reject('No such element');
    }
    this.data[index] = null;
    this.data = this.data
      .filter(r => {
        return r ? true : false;
      });
      this.saveData();
    return Promise.resolve();
  }

  public replaceEntry(recipe: Recipe): void {
    const index = this.getIndexOf(recipe.id);
    this.data[index] = Recipe.copyRecipe(recipe);
    this.saveData();
  }

  public addEntry(recipe: Recipe): void {
    this.data.push(recipe);
    this.saveData();
  }

  private getData(): Recipe[] {
    return <Recipe[]>JSON.parse(localStorage.getItem(this.DATA_KEY))
           || [];
  }

  private saveData(): void {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(this.data));
  }

  private getIndexOf(id: number): number {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        return i;
      }
    }
    return -1;
  }
}
