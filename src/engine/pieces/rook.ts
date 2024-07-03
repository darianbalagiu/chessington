import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        let square = board.findPiece(this)

        for (let i = 0; i <= 7; i++) {
            if (i != square.col) {
                moves.push(Square.at(square.row, i))
            }
            if (i != square.row) {
                moves.push(Square.at(i, square.col))
            }
        }

        return moves;
    }
}
