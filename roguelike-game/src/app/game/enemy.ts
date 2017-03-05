import { Being } from './being';
import { Identifiable } from './identifiable';

export class Enemy extends Being implements Identifiable {

  public className: string;

  constructor(level: number) {
    super();
    this.className = 'enemy';
    this.setHealth(level);
    this.setAttack(level);
  }

  private setHealth(level: number): void {
    this.health = Math.ceil(Math.random() * 50) * level;
  }

  private setAttack(level: number): void {
    this.attack = Math.ceil(Math.random() * 25) * level;
  }

}
