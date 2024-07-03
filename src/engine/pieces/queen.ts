import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        let square = board.findPiece(this)

        // Rook stuff
        for (let i = 0; i <= 7; i++) {
            if (i != square.col) {
                moves.push(Square.at(square.row, i))
            }
            if (i != square.row) {
                moves.push(Square.at(i, square.col))
            }
        }

        // Bishop stuff
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
