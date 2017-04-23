import { Vote } from './vote';

export class Poll {
  _id?: string;
  votes?: Vote[];

  constructor(
    public name: string,
    public options: string[]
  ) { }
}
