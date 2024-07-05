import Piece, {PieceType} from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Rook from "./rook";
import Bishop from "./bishop";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
        this.pieceType = PieceType.QUEEN;
    }

    public clone(): Queen {
        return new Queen(this.player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let square = board.findPiece(this)

        // Replace queen with a rook
        let rookMoves: Square[] = Rook.getMovesRook(square, board, this.player)

        // Replace queen with a bishop
        let bishopMoves: Square[] = Bishop.getMovesBishop(square, board, this.player)

        // Concatenate the two behaviours
        let moves  = rookMoves.concat(bishopMoves)
        console.log("all", moves)

        return moves
    }
}
