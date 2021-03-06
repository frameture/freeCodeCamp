import { Being } from './being';
import { Enemy } from './enemy';
import { Location } from './location';

import { Identifiable, Identity } from './identifiable';

export class Player extends Being implements Identifiable {

  public static readonly WEAPONS = {
    'stick': 5,
    'knife': 15,
    'sword': 30,
    'axe': 50
  };

  public static readonly DIRECTIONS = {
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40,
  };

  public identity: Identity;
  public weapon: string;
  public nextLevelXp: number;
  public level: number;
  public xp: number;
  public location: Location;
  public won: boolean;

  constructor(x: number, y: number) {
    super();
    this.identity = { isPlayer: true };
    this.location = new Location(x, y);
    this.health = 100;
    this.attack = 2;
    this.weapon = 'bare fists';
    this.nextLevelXp = 60;
    this.level = 1;
    this.xp = 0;
    this.won = false;
  }

  public setWeapon(weapon: string): void {
    this.weapon = weapon;
    this.attack = Player.WEAPONS[ weapon ];
  }

  /**
   * @param enemy Enemy to fight with
   * @return true when enemy was killed
   */
  public fight(enemy: Enemy): boolean {
    this.changeHealth(- enemy.attack);
    enemy.changeHealth(- this.attack);

    if (enemy.health <= 0) {
      if (enemy.identity.isBoss) {
        this.gameWon();
      }
      this.addXp(enemy.attack * this.level);
      return true;
    }
    return false;
  }

  private gameWon(): void {
    this.won = true;
  }

  private addXp(xp: number): void {
    this.xp += xp;
    if (this.xp >= this.nextLevelXp) {
      this.xp -= this.nextLevelXp;
      this.nextLevelXp = this.factor(this.nextLevelXp);
      this.attack = this.factor(this.attack);
      this.level++;
    }
  }

  private factor(toApply: number): number {
    return Math.round(toApply *= 1.62);
  }

}
