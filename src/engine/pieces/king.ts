import Piece, {PieceType} from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

interface Config {
    player: number;
    kingRow: number;
}

export default class King extends Piece {


    public static configs: Config[] = [
        { player : 0, kingRow : 0},
        { player : 1, kingRow : 7}
    ];
    public canCastleKingSide: Boolean = true;
    public canCastleQueenSide: Boolean = true;
    public config: Config;

    public constructor(player: Player) {
        super(player);
        this.pieceType = PieceType.KING;
        this.config = King.configs[player];
    }

    public clone(): King {
        return new King(this.player);
    }

    public getAvailableMoves(board: Board): Square[] {
        const moves: Square[] = [];
        const square = board.findPiece(this)

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {

                if (i == 0 && j == 0) {
                    continue
                }

                const newRow = square.row + i
                const newCol = square.col + j
                const newSquare = Square.at(newRow, newCol)

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

        if (this.checkCastleKingSide(board)) {
            moves.push(Square.at(this.config.kingRow, 6));
        }

        if (this.checkCastleQueenSide(board)) {
            moves.push(Square.at(this.config.kingRow, 2));
        }

        return moves;
    }

    public checkCastleKingSide(board: Board) {

        if (!this.canCastleKingSide) {
            return false;
        }

        let dangerousSquares: Square[] = [];
        for (let col of [5,6]) {
            const square = Square.at(this.config.kingRow, col);

            // There must be no pieces in between the rook and the king
            if (board.getPiece(square) !== undefined) {
                return false;
            }
            dangerousSquares.push(square);
        }

        // Also add the king to the dangerous squares
        dangerousSquares.push(Square.at(this.config.kingRow, 4));


        const oppAttackingSquares = board.getAllPossibleMoves(board.getOpp(this.player));

        const isAnyDangerousSquareAttacked = dangerousSquares.some(dSquare =>
            oppAttackingSquares.some(oSquare => dSquare.equals(oSquare))
        );

        return !isAnyDangerousSquareAttacked;

    }

    public checkCastleQueenSide(board: Board) {

        if (!this.canCastleQueenSide) {
            return false;
        }

        let dangerousSquares: Square[] = [];
        for (let col of [2,3]) {
            const square = Square.at(this.config.kingRow, col);

            // There must be no pieces in between the rook and the king
            if (board.getPiece(square) !== undefined) {
                return false;
            }
            dangerousSquares.push(square);
        }

        if (board.getPiece(Square.at(this.config.kingRow, 1)) !== undefined) {
            return false;
        }

        // Also add the king to the dangerous squares
        dangerousSquares.push(Square.at(this.config.kingRow, 4));

        const oppAttackingSquares = board.getAllPossibleMoves(board.getOpp(this.player));

        const isAnyDangerousSquareAttacked = dangerousSquares.some(dSquare =>
            oppAttackingSquares.some(oSquare => dSquare.equals(oSquare))
        );

        return !isAnyDangerousSquareAttacked;
    }

}
