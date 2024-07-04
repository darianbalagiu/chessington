import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let moves: Square[] = [];
        let square = board.findPiece(this)

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {

                if (i == 0 && j == 0) {
                    continue
                }

                let newRow = square.row + i
                let newCol = square.col + j
                let newSquare = Square.at(newRow, newCol)

                if (!board.checkBounds(newSquare)) {
                    continue
                }

                if (board.getPiece(newSquare) === undefined)
                    moves.push(newSquare)
                else {
                    if (board.canCapture(newSquare, this.player)) {
                        moves.push(newSquare)
                    }
                }

            }
        }

        return moves;
    }
}
