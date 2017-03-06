import { Health, Weapon } from './collectable';
import { Enemy } from './enemy';
import { Player } from './player';
import { Identifiable } from './identifiable';

export class Legend {

  public createIdentifiable(sign: string, level: number, gridNumber: number):
    Identifiable {
    switch (sign) {
      case 'o': return { className: 'block' };
      case ' ': return { className: 'space' };
      case 'n': return { className: 'next' };
      case 'h': return new Health(level);
      case 'w': return new Weapon(gridNumber);
      case 'p': return new Player(0, 0);
      case 'e': return new Enemy(level);
    }
  }

}
