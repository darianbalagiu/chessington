import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import King from "./pieces/king";
import Pawn from "./pieces/pawn";
import player from "./player";
import Queen from "./pieces/queen";

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];
    public moveCount = 1;

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);

            // Pawn stuff
            if (movingPiece instanceof Pawn) {

                // Setup en passant flag
                if (fromSquare.row === 1 && toSquare.row === 3 || fromSquare.row === 6 && toSquare.row === 4)
                    movingPiece.timestamp = this.moveCount

                // Check if can capture en passant
                this.captureEnPassant(toSquare)

                if (movingPiece.canPromote(toSquare)) {
                    const queen = new Queen(movingPiece.player);
                    this.setPiece(toSquare, queen)
                }
            }

            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
        this.moveCount++
    }

    public captureEnPassant(toSquare: Square): void {
        // Capture en passant
        if (this.currentPlayer === player.WHITE) {
            // Select the potential pawn that can be captured en passant
            let piece = this.getPiece(Square.at(toSquare.row - 1, toSquare.col))
            if (piece instanceof Pawn && piece.player === player.BLACK && piece.timestamp === this.moveCount - 1) {
                let oppPawnSquare = this.findPiece(piece)
                this.setPiece(oppPawnSquare, undefined);
            }
        } else {
            // Playing BLACK
            let piece = this.getPiece(Square.at(toSquare.row + 1, toSquare.col))
            if (piece instanceof Pawn && piece.player === player.WHITE && piece.timestamp === this.moveCount - 1) {
                let oppPawnSquare = this.findPiece(piece)
                this.setPiece(oppPawnSquare, undefined);
            }
        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    public checkBounds(square: Square): Boolean {
        if (square.row < 0 || square.row > 7 || square.col < 0 || square.col > 7) {
            return false
        }
        return true
    }

    public canCapture(square: Square, player: Player): Boolean {
        let otherPiece = this.getPiece(square)
        if (otherPiece === undefined)
            return false
        return otherPiece.player != player && !(otherPiece instanceof King);

    }

    public printBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                console.log(i, j, this.getPiece(Square.at(i, j)))
            }
        }
    }
}
