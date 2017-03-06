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
    this.health = Math.round(Math.random() * 50 * (level * .5));
  }

}

export class Weapon implements Identifiable, Collectable {

  public weapon: string;
  public className: string;
  private readonly WEAPONS: string[];

  constructor(gridNumber: number) {
    this.WEAPONS = Object.keys(Player.WEAPONS);
    this.weapon = this.WEAPONS[ gridNumber ];
    this.className = 'weapon';
  }

  public action(player: Player): boolean {
    player.setWeapon(this.weapon);
    return true;
  }

}
