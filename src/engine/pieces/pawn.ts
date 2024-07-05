import Piece, {PieceType} from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

interface Config {
    movingDir: number;
    startingRow: number;
    enPassantRow: number;
}

export default class Pawn extends Piece {

    // Use this value to know whether the pawn can be captured en passant
    // It will be set when the pawn moves two steps forward
    public timestamp = -1;

    public constructor(player: Player) {
        super(player);
        this.pieceType = PieceType.PAWN;
    }

    public clone(): Pawn {
        return new Pawn(this.player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];

        let square = board.findPiece(this)
        let row = square.row
        let col = square.col

        // Player: [moves up/down, starting row,en passant row]
        const configs: Config[] = [
            { movingDir: 1, startingRow: 1, enPassantRow: 4 },
            { movingDir: -1, startingRow: 6, enPassantRow: 3 }
        ];

        const config = configs[this.player]


        let newSquare= Square.at(row + config.movingDir, col)
        if (board.checkBounds(newSquare)) {

            if (board.getPiece(newSquare) === undefined) {
                moves.push(newSquare)
                if (row === config.startingRow) {
                    // Move two steps forward
                    let newSquare = Square.at(row + 2 * config.movingDir, col)
                    if (board.getPiece(newSquare) === undefined) {
                        moves.push(newSquare)
                    }
                }
            }
            // Capture left or right
            for (let captureDir of [-1, 1]) {
                newSquare = Square.at(row + config.movingDir, col + captureDir)
                if (board.canCapture(newSquare, this.player))
                    moves.push(newSquare)
            }
        }

        // Check en passant
        if (square.row === config.enPassantRow) {
            // En passant left and right
            for (let captureDir of [-1, 1]) {
                let potentialEnemyPawnSquare = Square.at(config.enPassantRow, square.col + captureDir)
                newSquare = Square.at(config.enPassantRow + config.movingDir, square.col + captureDir)
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
