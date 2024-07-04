import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Rook from "./rook";
import Bishop from "./bishop";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        let square = board.findPiece(this)

        // Replace queen with a rook
        const rook = new Rook(this.player);
        board.setPiece(square, rook)
        let rookMoves: Square[] = rook.getAvailableMoves(board)

        // Replace queen with a bishop
        const bishop = new Bishop(this.player);
        board.setPiece(square, bishop)
        let bishopMoves: Square[] = bishop.getAvailableMoves(board)


        // Put the queen back to its place
        const queen = new Queen(this.player);
        board.setPiece(square, queen)

        // Concatenate the two behaviours
        let moves  = rookMoves.concat(bishopMoves)

        return moves
    }
}
