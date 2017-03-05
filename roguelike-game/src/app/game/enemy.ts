import { Being } from './being';

export class Enemy extends Being {

  constructor(health: number, attack: number, x: number, y: number) {
    super();
    this.location.setLocation(x, y);
    this.health = health;
    this.attack = attack;
  }

}
