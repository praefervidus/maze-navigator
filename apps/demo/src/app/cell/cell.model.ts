export enum Cell
{
  START   = 'S',
  END     = 'E',
  PATH    = 'O',
  WALL    = 'X',
  PLAYER  = '@'
}

export const isTraversable = (cell: string): boolean =>
{
  return cell !== Cell.WALL;
}