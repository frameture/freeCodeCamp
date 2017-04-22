export class Poll {
  _id?: string;

  constructor(
    public name: string,
    public options: string[]
  ) { }
}
