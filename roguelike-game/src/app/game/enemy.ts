import { Being } from './being';
import { Identifiable } from './identifiable';
import { Collectable } from './collectable';
import { Player } from './player';

export class Enemy extends Being implements Identifiable, Collectable {

  public className: string;

  constructor(level: number) {
    super();
    this.className = 'enemy';
    this.setHealth(level);
    this.setAttack(level);
  }

  public action(player: Player): boolean {
    return player.fight(this);
  }

  private setHealth(level: number): void {
    this.health = Math.ceil(Math.random() * 50) * level;
  }

  private setAttack(level: number): void {
    this.attack = Math.ceil(Math.random() * 25) * level;
  }

}
