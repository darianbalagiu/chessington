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

        // Horizontal Right
        let delta = 1
        while (delta < 7) {
            let newSquare = Square.at(square.row, square.col + delta)

            // Stop if out of bounds
            if (!board.checkBounds(newSquare))
                break

            // Stop if we meet an existing piece
            if (board.getPiece(newSquare) !== undefined) {
                if (board.canCapture(newSquare, this.player))
                    moves.push(newSquare)
                break
            }

            moves.push(newSquare)
            delta++
        }

        // Horizontal Left
        delta = 1
        while (delta < 7) {
            let newSquare = Square.at(square.row, square.col - delta)

            // Stop if out of bounds
            if (!board.checkBounds(newSquare))
                break

            // Stop if we meet an existing piece
            if (board.getPiece(newSquare) !== undefined) {
                if (board.canCapture(newSquare, this.player))
                    moves.push(newSquare)
                break
            }

            moves.push(newSquare)
            delta++
        }

        // Vertical Down
        delta = 1
        while (delta < 7) {
            let newSquare = Square.at(square.row + delta, square.col)

            // Stop if out of bounds
            if (!board.checkBounds(newSquare))
                break

            // Stop if we meet an existing piece
            if (board.getPiece(newSquare) !== undefined) {
                if (board.canCapture(newSquare, this.player))
                    moves.push(newSquare)
                break
            }

            moves.push(newSquare)
            delta++
        }

        // Vertical Down
        delta = 1
        while (delta < 7) {
            let newSquare = Square.at(square.row - delta, square.col)

            // Stop if out of bounds
            if (!board.checkBounds(newSquare))
                break

            // Stop if we meet an existing piece
            if (board.getPiece(newSquare) !== undefined) {
                if (board.canCapture(newSquare, this.player))
                    moves.push(newSquare)
                break
            }

            moves.push(newSquare)
            delta++
        }

        return moves;
    }
}
