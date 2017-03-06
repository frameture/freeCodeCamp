const GRIDS = [
  [
    'ooooooooooooooooooooooo',
    'o p                  oo',
    'o                     o',
    'o          n          o',
    'o  ooooooo            o',
    'o       oo            o',
    'oooooooooo       oo ooo',
    'ooooooooooooooooooooooo'
  ],
  [
    'ooooooooooooooooooooooooooooooo',
    'oooo           ooooo         oo',
    'oooo    p      ooooo          o',
    'oooo           ooooo          o',
    'oooo       ooooo              o',
    'o          ooooooooo          o',
    'o oo                          o',
    'o oo       ooooooooo          o',
    'o  o       oo     oo          o',
    'o  o          ooo oo        n o',
    'o    ooooooooooo  oo       oooo',
    'ooooooooooooooooooooooooooooooo'
  ],
  [
    'ooooooooooooooooooooooooooooooooooooooooooooooooo',
    'oo         o         oooooooo   oo              o',
    'o          o      oo       oo   oo      o       o',
    'o          o     oo        oo   oo      o       o',
    'oo         ooooooo         oo   oo    p o       o',
    'oooooooo                   oo   ooooooooo       o',
    'oooooooooo   oo              oo                 o',
    'oooooooooo   oo                       oo        o',
    'oooo    oo   oo    oooooooo           oo        o',
    'ooo          oo                       oooooo    o',
    'oooooooooooooooo                      oo   o    o',
    'ooo            ooooooooooo            oo   o    o',
    'ooo             oo      ooo           oo ooooo oo',
    'ooo                     ooo               oo  n o',
    'ooooooooooooooooooooooooooooooooooooooooooooooooo',
  ],
  [
    'ooooooooooooooooooooooooooooooooooooooooooooooooo',
    'oo                  oooooooo   oo               o',
    'o          o      oo       oo   oo              o',
    'o          o     oo        oo   oo      o       o',
    'oo         ooooooo         oo   oo      ooooo   o',
    'oooooooo                   oo   ooooooooo       o',
    'oooooooooo                 oo                   o',
    'oooooooooo             oooooooooooooo           o',
    'oooo    oo             oo          oo           o',
    'ooo                    oo          oo           o',
    'ooo                    oo          oo           o',
    'ooo                    oo          oo           o',
    'oooo    oo                         oo           o',
    'ooo                   ooooooooooooo             o',
    'ooo                              oo             o',
    'oooooooooooooooooo               oo             o',
    'ooo                              oo             o',
    'oooooooooooooooooo               oo             o',
    'ooo                              oo             o',
    'ooo                              oo             o',
    'ooo ooooooo        oooooooo      oo             o',
    'ooooooooooo        oo    oo      oo             o',
    'ooo   oooooooooo   oo    oo      oo      ooooo oo',
    'ooo  p                                    oo    o',
    'ooooooooooooooooooooooooooooooooooooooooooooooooo',
  ],
];

export class Grid {

  public grid: string[];

  constructor(gridNumber: number) {
    this.grid = this.copyGrid(gridNumber);
  }

  private copyGrid(gridNumber: number): string[] {
    const grid = [];
    GRIDS[ gridNumber ].forEach(row => grid.push(row));
    return grid;
  }

}
