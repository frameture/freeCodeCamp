import { Being } from './being';
import { Enemy } from './enemy';

export class Player extends Being {

  public static readonly WEAPONS = {
    'stick': 5,
    'knife': 15,
    'sword': 30,
    'axe': 50
  };

  public weapon;
  public nextLevelXp;
  public level;
  public xp;

  constructor(x: number, y: number) {
    super();
    this.location.setLocation(x, y);
    this.health = 100;
    this.attack = Player.WEAPONS[ 'stick' ];
    this.weapon = 'stick';
    this.nextLevelXp = 60;
    this.level = 0;
    this.xp = 0;
  }

  public setWeapon(weapon: string): void {
    this.weapon = weapon;
    this.attack = Player.WEAPONS[ weapon ];
  }

  public fight(enemy: Enemy): void {
    enemy.changeHealth(- enemy.attack);
    enemy.changeHealth(- this.attack);

    if (enemy.health === 0) {
      this.addXp(enemy.attack * this.level);
    }
  }

  public addXp(xp: number): void {
    this.xp += xp;
    if (this.xp >= this.nextLevelXp) {
      this.xp -= this.nextLevelXp;
      this.nextLevelXp *= 1.62;
      this.attack *= this.level;
      this.level++;
    }
  }

}
