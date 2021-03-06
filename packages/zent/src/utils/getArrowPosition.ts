import capitalize from './capitalize';
import Popover, { IPositionFunction } from '../popover';
import { PopPositions } from '../pop';

const { Position } = Popover;

const { Arrow } = Position;

export default function getPosition(
  position: PopPositions | IPositionFunction,
  centerArrow: boolean
) {
  if (typeof position === 'function') {
    return position;
  }

  let positionName = position
    .split('-')
    .map(s => capitalize(s))
    .join('');
  let pos = Position[positionName];

  // Choose a fallback in case position is invalid
  if (!pos) {
    pos = Position.TopCenter;
    positionName = 'TopCenter';
  }

  // *-center postions are not affected by centerArrow parameter
  if (!centerArrow || /^.+Center$/.test(positionName)) {
    return pos;
  }

  positionName = 'Arrow' + positionName + 'Position';

  return Arrow[positionName];
}
