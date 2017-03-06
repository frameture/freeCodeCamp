export interface Identifiable {
  identity: Identity;
}

export class Identity {
  public isNext?: boolean;
  public isBlock?: boolean;
  public isSpace?: boolean;
  public isHealth?: boolean;
  public isWeapon?: boolean;
  public isPlayer?: boolean;
  public isEnemy?: boolean;
  public isDark?: boolean;

  public static changeIsDark(id: Identity, option: boolean): void {
    id.isDark = option;
  }
}
