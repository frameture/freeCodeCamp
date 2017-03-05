export class Location {

  constructor(
    public x: number,
    public y: number
  ) { }

  public copy(): Location {
    return new Location(this.x, this.y);
  }

  public setLocation(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public moveUp(): void {
    this.x--;
  }

  public moveDown(): void {
    this.x++;
  }

  public moveLeft(): void {
    this.y--;
  }

  public moveRight(): void {
    this.y++;
  }
}
