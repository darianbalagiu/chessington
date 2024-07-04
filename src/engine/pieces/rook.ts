import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        let square = board.findPiece(this)

       moves = Rook.getMovesRook(square, board, this.player)

        return moves;
    }

    public static getMovesRook(square: Square, board: Board, player: number) {

        let moves: Square[] = [];

        for (let i of [-1, 1]) {
            let delta = i
            while (true) {
                let newSquare = Square.at(square.row, square.col + delta)

                // Stop if out of bounds
                if (!board.checkBounds(newSquare))
                    break

                // Stop if we meet an existing piece
                if (board.getPiece(newSquare) !== undefined) {
                    if (board.canCapture(newSquare, player))
                        moves.push(newSquare)
                    break
                }

                moves.push(newSquare)
                delta += i
            }

            delta = i

            while (true) {
                let newSquare = Square.at(square.row + delta, square.col)

                // Stop if out of bounds
                if (!board.checkBounds(newSquare))
                    break

                // Stop if we meet an existing piece
                if (board.getPiece(newSquare) !== undefined) {
                    if (board.canCapture(newSquare, player))
                        moves.push(newSquare)
                    break
                }

                moves.push(newSquare)
                delta += i
            }
        }
        return moves
    }

}
