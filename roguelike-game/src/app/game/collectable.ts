import { Identifiable } from './identifiable';
import { Player } from './player';

export class Health implements Identifiable {

  public health: number;
  public className: string;

  constructor(level: number) {
    this.setHealth(level);
    this.className = 'health';
  }

  private setHealth(level: number): void {
    this.health = Math.ceil(Math.random() * 50) * level;
  }

}

export class Weapon implements Identifiable {

  public attack: number;
  public weapon: string;
  public className: string;

  public static getRandomWeapon(): string {
    const weapons = Object.keys(Player.WEAPONS);
    const weapon = Math.floor(Math.random() * weapons.length);
    return weapons[ weapon ];
  };

  constructor(weapon: string) {
    this.weapon = weapon;
    this.attack = Player.WEAPONS[ weapon ];
    this.className = 'weapon';
  }
}
