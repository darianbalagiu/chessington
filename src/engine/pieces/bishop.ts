import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import player from "../player";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        let square = board.findPiece(this)
        moves = Bishop.getMovesBishop(square, board, this.player)

        return moves;
    }

    public movesOnDirection(,verticalOffset: number, horrizontalOffset: number) {

        let moves : Square[] = []

        for (let i of [-1, 1]) {
            for (let j of f [-1, 1]) {

            }
        }

        let row = square.row + 1
        let col = square.col + 1

        while (row <= 7 && col <= 7) {
            let newSquare = Square.at(row, col)

            // Met with another piece
            if (board.getPiece(newSquare) !== undefined) {
                if (board.canCapture(newSquare, player))
                    moves.push(newSquare)
                break
            }
            moves.push(newSquare)
            row++
            col++
        }
    }

    public static getMovesBishop(square: Square, board: Board, player: number) {

        let moves : Square[] = []

        // bottom right
        let row = square.row + 1
        let col = square.col + 1

        while (row <= 7 && col <= 7) {
            let newSquare = Square.at(row, col)

            // Met with another piece
            if (board.getPiece(newSquare) !== undefined) {
                if (board.canCapture(newSquare, player))
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
                if (board.canCapture(newSquare, player))
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
                if (board.canCapture(newSquare, player))
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
                if (board.canCapture(newSquare, player))
                    moves.push(newSquare)
                break
            }
            moves.push(newSquare)
            row++
            col--
        }
        return moves
    }
}
