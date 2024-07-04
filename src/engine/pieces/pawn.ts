import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import player from "../player";

export default class Pawn extends Piece {

    // Use this value to know whether the pawn can be captured en passant
    // It will be set when the pawn moves two steps forward
    public timestamp = -1;

    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];

        let square = board.findPiece(this)
        let row = square.row
        let col = square.col

        // Player: [moves up/down, starting row,en passant row]
        let configs: [number, number, number][] = [
            [1, 1, 4],
            [-1, 6, 3]
        ]

        let config = configs[this.player]
        const [movingDir, startingRow, enPassantRow] = config


        let newSquare= Square.at(row + movingDir, col)
        if (board.checkBounds(newSquare)) {

            if (board.getPiece(newSquare) === undefined) {
                moves.push(newSquare)
                if (row === startingRow) {
                    // Move two steps forward
                    let newSquare = Square.at(row + 2 * movingDir, col)
                    if (board.getPiece(newSquare) === undefined) {
                        moves.push(newSquare)
                    }
                }
            }
            // Capture left or right
            for (let captureDir of [-1, 1]) {
                newSquare = Square.at(row + movingDir, col + captureDir)
                if (board.canCapture(newSquare, this.player))
                    moves.push(newSquare)
            }
        }

        // Check en passant
        if (square.row === enPassantRow) {
            // En passant left and right
            for (let captureDir of [-1, 1]) {
                let potentialEnemyPawnSquare = Square.at(enPassantRow, square.col + captureDir)
                newSquare = Square.at(enPassantRow + movingDir, square.col + captureDir)
                let piece = board.getPiece(potentialEnemyPawnSquare)
                if (piece !== undefined && piece instanceof Pawn && piece.timestamp === board.moveCount - 1) {
                    moves.push(newSquare)
                }
            }
        }
        return moves
    }

    public canPromote(toSqaure: Square) {
        if (this.player === Player.WHITE && toSqaure.row === 7)
            return true
        return this.player === Player.BLACK && toSqaure.row === 0;

    }
}
