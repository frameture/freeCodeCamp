import { Location } from './location';

export abstract class Being {
  public health: number;
  public attack: number;

  public changeHealth(health: number): void {
    this.health += health;
    if (this.health < 0) {
      this.health = 0;
    }
  }
}
