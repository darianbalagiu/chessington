import Player from '../player';
import Board from '../board';
import Square from '../square';
import Pawn from "./pawn";
import Rook from "./rook";
import Knight from "./knight";
import Bishop from "./bishop";
import Queen from "./queen";
import King from "./king";

export enum PieceType {
    UNDEFINED = 0,
    PAWN = 1,
    ROOK = 2,
    KNIGHT = 3,
    BISHOP = 4,
    QUEEN = 5,
    KING = 6
}

export default class Piece {
    public player: Player;
    public pieceType: PieceType = PieceType.UNDEFINED;

    public constructor(player: Player, type: PieceType = PieceType.UNDEFINED) {
        this.player = player;
        this.pieceType = type;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    public clone(): Piece {
        throw new Error('This method must be implemented by subclasses');
    }

    public isPawn(): this is Pawn {
        return this.pieceType === PieceType.PAWN;
    }

    public isRook(): this is Rook {
        return this.pieceType === PieceType.ROOK;
    }

    public isKnight(): this is Knight {
        return this.pieceType === PieceType.KNIGHT;
    }

    public isBishop(): this is Bishop {
        return this.pieceType === PieceType.BISHOP;
    }

    public isQueen(): this is Queen {
        return this.pieceType === PieceType.QUEEN;
    }

    public isKing(): this is King {
        return this.pieceType === PieceType.KING;
    }
}
