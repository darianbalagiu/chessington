import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];

        let square = board.findPiece(this)
        let row = square.row
        let col = square.col

        if (this.player === Player.WHITE) {
            let newSquare= Square.at(row + 1, col)
            if (board.checkBounds(newSquare)) {

                if (board.getPiece(newSquare) === undefined) {
                    moves.push(newSquare)
                    if (row === 1) {
                        let newSquare = Square.at(row + 2, col)
                        if (board.getPiece(newSquare) === undefined) {
                            moves.push(newSquare)
                        }
                    }
                }
            }
        } else {
            let newSquare = Square.at(row - 1, col)
            if (board.checkBounds(newSquare)) {

                if (board.getPiece(newSquare) === undefined) {
                    moves.push(newSquare)

                    if (row === 6) {
                        let newSquare = Square.at(row - 2, col)
                        if (board.getPiece(newSquare) === undefined) {
                            moves.push(newSquare)
                        }
                    }
                }
            }
        }
        return moves
    }
}
