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
                if (piece === undefined)
                    continue
                if (piece.player === this.player) {
                    if (piece instanceof Pawn) {
                        if (this.player === Player.WHITE) {
                            moves.push(Square.at(row + 1, col))
                        } else {
                            moves.push(Square.at(row - 1, col))
                        }
                    }
                }

            }
        }
        return moves
    }
}
