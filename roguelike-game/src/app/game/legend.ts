import { Health, Weapon } from './collectable';
import { Enemy } from './enemy';
import { Player } from './player';
import { Identifiable, Identity } from './identifiable';

export class Legend {

  public createIdentifiable(sign: string, level: number, gridNumber: number):
    Identifiable {
    switch (sign) {
      case 'o': return { identity: { isBlock: true } };
      case ' ': return { identity: { isSpace: true } };
      case 'n': return { identity: { isNext: true } };
      case 'h': return new Health(level);
      case 'w': return new Weapon(gridNumber);
      case 'p': return new Player(0, 0);
      case 'e': return new Enemy(level);
      case 'b': return new Enemy(level, true);
    }
  }

}
