import { Identifiable } from './identifiable';
import { Player } from './player';


export interface Collectable {

  /**
   * @param {Player} player - Player on which the action will be performed.
   * @returns {boolean} Returns true when the Collectable was collected or
   * killed --- Flag to convert the Collectable into empty space.
   * @memberOf Collectable
   */
  action(player: Player): boolean;
}

export class Health implements Identifiable, Collectable {

  public health: number;
  public className: string;

  constructor(level: number) {
    this.setHealth(level);
    this.className = 'health';
  }

  public action(player: Player): boolean {
    player.changeHealth(this.health);
    return true;
  }

  private setHealth(level: number): void {
    this.health = Math.ceil(Math.random() * 50) * level;
  }

}

export class Weapon implements Identifiable, Collectable {

  public weapon: string;
  public className: string;

  public static getRandomWeapon(): string {
    const weapons = Object.keys(Player.WEAPONS);
    const weapon = Math.floor(Math.random() * weapons.length);
    return weapons[ weapon ];
  };

  constructor(weapon: string) {
    this.weapon = weapon;
    this.className = 'weapon';
  }

  public action(player: Player): boolean {
    player.setWeapon(this.weapon);
    return true;
  }

}
