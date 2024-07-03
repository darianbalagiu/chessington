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


        // bottom right
        let row = square.row + 1
        let col = square.col + 1

        while (row <= 7 && col <= 7) {
            let newSquare = Square.at(row, col)

            // Met with another piece
            if (board.getPiece(newSquare) !== undefined) {
                if (board.canCapture(newSquare, this.player))
                    moves.push(newSquare)
                break
            }
            moves.push(newSquare)
            row++
            col++
        }


        // top left
        row = square.row - 1
        col = square.col - 1

        while (row >= 0 && col >= 0) {
            let newSquare = Square.at(row, col)

            // Met with another piece
            if (board.getPiece(newSquare) !== undefined) {
                if (board.canCapture(newSquare, this.player))
                    moves.push(newSquare)
                break
            }
            moves.push(newSquare)
            row--
            col--
        }


        // top right
        row = square.row - 1
        col = square.col + 1

        while (row >= 0 && col <= 7) {
            let newSquare = Square.at(row, col)

            // Met with another piece
            if (board.getPiece(newSquare) !== undefined) {
                if (board.canCapture(newSquare, this.player))
                    moves.push(newSquare)
                break
            }
            moves.push(newSquare)
            row--
            col++
        }


        // bottom left
        row = square.row + 1
        col = square.col - 1

        while (row <= 7 && col >= 0) {
            let newSquare = Square.at(row, col)

            // Met with another piece
            if (board.getPiece(newSquare) !== undefined) {
                if (board.canCapture(newSquare, this.player))
                    moves.push(newSquare)
                break
            }
            moves.push(newSquare)
            row++
            col--
        }

        return moves;
    }
}
