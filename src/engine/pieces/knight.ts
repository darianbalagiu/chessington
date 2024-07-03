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

        let row = square.row + 1
        let col = square.col + 1

        let bigMoves = [-2, 2]
        let smallMoves = [-1, 1]


        for (let s of smallMoves) {
            for (let b of bigMoves) {

                // Row makes big move
                let newRow = square.row + b
                let newCol = square.col + s
                if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
                    continue
                }
                moves.push(Square.at(newRow, newCol))

                // Col makes big move
                newRow = square.row + s
                newCol = square.col + b
                if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
                    continue
                }
                moves.push(Square.at(newRow, newCol))
            }
        }

        return moves;
    }
}
