import { Being } from './being';
import { Identifiable, Identity } from './identifiable';
import { Collectable } from './collectable';
import { Player } from './player';

export class Enemy extends Being implements Identifiable, Collectable {

  public identity: Identity;

  constructor(level: number, isBoss?: boolean) {
    super();
    if (isBoss) {
      this.identity = { isBoss: true };
      this.setHealth(level * 3);
      this.setAttack(level * 3);
    } else {
      this.identity = { isEnemy: true };
      this.setHealth(level);
      this.setAttack(level);
    }
  }

  public action(player: Player): boolean {
    return player.fight(this);
  }

  private setHealth(level: number): void {
    this.health = Math.ceil(Math.random() * 25) * level;
  }

  private setAttack(level: number): void {
    this.attack = Math.ceil(Math.random() * 15) * level;
  }

}
