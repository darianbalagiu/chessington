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
        for (let row = 0; row <= 7; row++) {
            for (let col = 0; col <= 7; col++) {
                let square = Square.at(row, col)
                let piece = board.getPiece(square)

                // Ignore empty sqaures
                if (piece === undefined)
                    continue

                // Only care about our pieces
                if (piece.player === this.player) {

                    // PAWNS
                    if (piece instanceof Pawn) {
                        if (this.player === Player.WHITE) {
                            moves.push(Square.at(row + 1, col))
                            if (row === 1) {
                                moves.push(Square.at(3, col))
                            }
                        } else {
                            moves.push(Square.at(row - 1, col))
                            if (row === 6) {
                                moves.push(Square.at(4, col))
                            }
                        }
                    }
                }

            }
        }
        return moves
    }
}
