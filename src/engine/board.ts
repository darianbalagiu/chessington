import Player from './player';
import player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece, {PieceType} from './pieces/piece';
import King from "./pieces/king";
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";

export default class Board {
    public currentPlayer: Player;
    private board: (Piece | undefined)[][];
    public moveCount = 1;

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setBoard(board: (Piece | undefined)[][]) {
        this.board = board;
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

    // Deep copy method
    public deepCopy(): Board {
        const newBoard: (Piece | undefined)[][] = this.board.map(row =>
            row.map(piece => piece ? piece.clone() : undefined)
        );

        const newBoardInstance = new Board(this.currentPlayer);
        newBoardInstance.board = newBoard;
        newBoardInstance.moveCount = this.moveCount;

        return newBoardInstance;
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);
        let potentiallyCapturedPiece = this.getPiece(toSquare);
        if (potentiallyCapturedPiece !== undefined && potentiallyCapturedPiece?.pieceType === PieceType.KING) {
            return;
        }
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.printBoard();
            let simulateBoard : Board | undefined = this.deepCopy();
            if (!simulateBoard.simulateMove(fromSquare, toSquare, movingPiece)) {
                return;
            }

            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);

            // Pawn stuff
            if (movingPiece instanceof Pawn) {
                this.movePawn(fromSquare, toSquare, movingPiece);
            }
            this.moveCount++;
            this.currentPlayer = this.currentPlayer === Player.BLACK ? Player.WHITE : Player.BLACK;
        }
    }

    // Returns false if our king is checked upon this move
    public simulateMove(fromSquare: Square, toSquare: Square, movingPiece: Piece): Boolean {
        this.setPiece(toSquare, movingPiece);
        this.setPiece(fromSquare, undefined);

        // Pawn stuff
        if (movingPiece instanceof Pawn) {
            this.movePawn(fromSquare, toSquare, movingPiece);
        }
        this.moveCount++;

        return !this.kingInCheck(this.currentPlayer);
    }


    // Sets en passant flags and does promotion. Updates the board if necessary
    public movePawn(fromSquare: Square, toSquare: Square, movingPiece: Pawn) {
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

    // Make tha pawn captured en passant disappear (if it exists)
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
        return !(square.row < 0 || square.row > 7 || square.col < 0 || square.col > 7);

    }

    public canCapture(square: Square, player: Player): Boolean {
        let otherPiece = this.getPiece(square)
        if (otherPiece === undefined)
            return false
        return otherPiece.player != player;

    }

    public getAllPossibleMoves(player: number) {
        let attackedSquares: Square[] = [];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let square = Square.at(row, col);
                let piece = this.getPiece(square);
                if (piece === undefined) {
                    continue;
                }
                if (piece.player !== player) {
                    continue;
                }
                console.log(piece.pieceType);
                if (piece.isPawn()) {
                    let moves: Square[] = piece.getAvailableMoves(this);
                    attackedSquares = attackedSquares.concat(moves);
                } else if (piece.isRook()) {
                    let moves: Square[] = piece.getAvailableMoves(this);
                    attackedSquares = attackedSquares.concat(moves);
                } else if (piece.isBishop()) {
                    let moves: Square[] = piece.getAvailableMoves(this);
                    attackedSquares = attackedSquares.concat(moves);
                } else if (piece.isKnight()) {
                    let moves: Square[] = piece.getAvailableMoves(this);
                    attackedSquares = attackedSquares.concat(moves);
                } else if (piece.isQueen()) {
                    let moves: Square[] = piece.getAvailableMoves(this);
                    attackedSquares = attackedSquares.concat(moves);
                } else if (piece.isKing()) {
                    let moves: Square[] = piece.getAvailableMoves(this);
                    attackedSquares = attackedSquares.concat(moves);
                }
            }
        }
        return attackedSquares;
    }

    // Returns the square of the player's king
    public getKing(player: number): Square | undefined {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let square = Square.at(row, col);
                let piece = this.getPiece(square);
                if (piece instanceof King && piece.player === player) {
                    return square
                }
            }
        }
        return undefined
    }

    public kingInCheck(player: number) {
        this.printBoard();
        const oppPlayer = player === Player.WHITE ? Player.BLACK : Player.WHITE;
        this.currentPlayer = oppPlayer;
        const attackedSquares = this.getAllPossibleMoves(oppPlayer);

        this.currentPlayer = player;
        const ownKingSquare = this.getKing(this.currentPlayer);

        return ownKingSquare !== undefined && attackedSquares.some(square => square.equals(ownKingSquare));
    }

    public printBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                console.log(i, j, this.getPiece(Square.at(i, j)))
            }
        }
    }
}
