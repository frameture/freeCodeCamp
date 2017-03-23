export class Country {
  constructor(
    public country: string,
    public code: string
  ) { }
}

export class Link {
  constructor(
    public target: number,
    public source: number
  ) { }
}
