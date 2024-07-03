import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        let square = board.findPiece(this)

        let row = square.row + 1
        let col = square.col + 1

        while (row <= 7 && col <= 7) {
            moves.push(Square.at(row, col))
            row++
            col++
        }

        row = square.row - 1
        col = square.col - 1

        while (row >= 0 && col >= 0) {
            moves.push(Square.at(row, col))
            row--
            col--
        }

        row = square.row - 1
        col = square.col + 1

        while (row >= 0 && col <= 7) {
            moves.push(Square.at(row, col))
            row--
            col++
        }

        row = square.row + 1
        col = square.col - 1

        while (row <= 7 && col >= 0) {
            moves.push(Square.at(row, col))
            row++
            col--
        }

        return moves;
    }
}
