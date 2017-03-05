import { Location } from './location';

export abstract class Being {
  public health;
  public attack;
  public location: Location;

  public changeHealth(health: number): void {
    this.health += health;
  }
}
