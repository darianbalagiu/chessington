import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        let square = board.findPiece(this)


        let bigMoves = [-2, 2]
        let smallMoves = [-1, 1]


        for (let s of smallMoves) {
            for (let b of bigMoves) {

                // Row makes big move
                let newRow = square.row + b
                let newCol = square.col + s
                let newSquare = Square.at(newRow, newCol)
                if (board.checkBounds(newSquare)) {
                    if (board.getPiece(newSquare) === undefined) {
                        moves.push(newSquare)
                    } else {
                        if (board.canCapture(newSquare, this.player)) {
                            moves.push(newSquare)
                        }
                    }
                }

                // Col makes big move
                newRow = square.row + s
                newCol = square.col + b
                newSquare = Square.at(newRow, newCol)
                if (board.checkBounds(newSquare)) {
                    if (board.getPiece(newSquare) === undefined) {
                        moves.push(newSquare)
                    } else {
                        if (board.canCapture(newSquare, this.player)) {
                            moves.push(newSquare)
                        }
                    }
                }
            }
        }

        return moves;
    }
}
