interface TileMeta {
  x: number;
  y: number;
  score: number;
  id?: number;
}

interface ModelOptions {
  size?: number;
  score?: number;
  times?: number;
  tiles?: TileMeta[];
}

type TileCell = TileMeta | null;
type Direction = 'up' | 'down' | 'left' | 'right';

let id = 0;

export class G2048Model {
  gg = false;
  size = 4;
  score = 0;
  times = 0;
  tiles: TileMeta[] = [];
  cells: TileCell[][] = [];
  prevState?: { score: number; tiles: string };
  currTiles?: string;

  init(options: ModelOptions = {}) {
    this.gg = false;
    this.prevState = undefined;
    this.size = options?.size ?? 4;
    this.score = options?.score ?? 0;
    this.times = options?.times ?? 0;
    this.tiles = options?.tiles ?? [];
    this.updateCells();
    if (!this.tiles.length) {
      this.popup(2);
    } else {
      this.tiles.forEach(tile => (tile.id = id++));
    }
  }

  move(direction: Direction) {
    if (this.gg) {
      return;
    }
    const prevScore = this.score;
    const prevTiles = this.currTiles ?? JSON.stringify(this.tiles);
    this.doMoveTiles(direction);
    if (
      this.score > prevScore ||
      (this.currTiles = JSON.stringify(this.tiles)) !== prevTiles
    ) {
      this.updateCells();
      this.popup(1);
      this.times++;
      this.prevState = {
        score: prevScore,
        tiles: prevTiles,
      };
      this.gg = this.isGameOver();
    }
  }

  // revert
  back() {
    if (!this.prevState) {
      return;
    }
    this.score = this.prevState.score;
    this.tiles = JSON.parse(this.prevState.tiles);
    this.prevState = undefined;
    this.gg = false;
    this.times--;
    this.updateCells();
  }

  popup(count = 1) {
    const candidates = this.getEmptyCells();
    if (candidates.length < count) {
      return;
    }
    shuffle(candidates, count).forEach(cellIndex => {
      const tile: TileMeta = {
        x: cellIndex % this.size,
        y: Math.floor(cellIndex / this.size),
        score: Math.random() > 0.9 ? 4 : 2,
        id: id++,
      };
      this.tiles.push(tile);
      this.cells[tile.y][tile.x] = tile;
    });
    if (candidates.length === count) {
      this.gg = this.isGameOver();
    }
  }

  private isGameOver() {
    for (let y = this.size - 1; y > 0; y--) {
      for (let x = this.size - 1; x > 0; x--) {
        const cell = this.cells[y][x];
        const cellX = this.cells[y][x - 1];
        if (!cell || !cellX || cell.score === cellX.score) {
          return false;
        }
        const cellY = this.cells[y - 1][x];
        if (!cellY || cell.score === cellY.score) {
          return false;
        }
      }
    }
    return true;
  }

  private updateCells() {
    const cells: TileCell[][] = Array.from({ length: this.size }, () =>
      Array(this.size).fill(null),
    );
    this.tiles.forEach(tile => (cells[tile.y][tile.x] = tile));
    this.cells = cells;
  }

  private getEmptyCells() {
    const result: number[] = [];
    this.cells.flat().forEach((cell, i) => !cell && result.push(i));
    return result;
  }

  private doMoveTiles(direction: Direction) {
    const isReverse = direction === 'up' || direction === 'left';
    let prop: 'x' | 'y';
    let getCellsOnLine: (i: number) => TileCell[];
    if (direction === 'up' || direction === 'down') {
      prop = 'y';
      getCellsOnLine = (x: number) => this.cells.map(row => row[x]);
    } else {
      prop = 'x';
      getCellsOnLine = (y: number) => this.cells[y];
    }
    for (let i = 0; i < this.size; i++) {
      let cells = getCellsOnLine(i);
      let tiles = cells.filter(Boolean) as TileMeta[];
      let offset: number;
      if (isReverse) {
        tiles = tiles.reverse();
        tiles = this.getMergedTilesOnLine(tiles);
        tiles = tiles.reverse();
        offset = 0;
      } else {
        tiles = this.getMergedTilesOnLine(tiles);
        offset = this.size - tiles.length;
      }
      tiles.forEach((tile, i) => (tile[prop] = i + offset));
    }
    this.tiles = this.tiles.filter(tile => tile.score);
  }

  private getMergedTilesOnLine(tiles: TileMeta[]) {
    let i = tiles.length - 1;
    while (i > 0) {
      const to = tiles[i];
      const from = tiles[i - 1];
      if (to.score === from.score) {
        this.doMergeTiles(from, to);
        i -= 2;
      } else {
        i -= 1;
      }
    }
    return tiles.filter(tile => tile.score);
  }

  private doMergeTiles(from: TileMeta, to: TileMeta) {
    from.score *= 2;
    to.score = 0;
    this.score += from.score;
  }
}

function shuffle<T>(arr: T[], count: number) {
  count = Math.min(count, arr.length);
  for (let i = 0; i < count; i++) {
    const j = Math.floor(Math.random() * (arr.length - i)) + i;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}
