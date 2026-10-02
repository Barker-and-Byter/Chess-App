
import whiteBishop from '#lib/assets/bishop.png';
import blackBishop from '#lib/assets/bishop1.png';
import whiteRook from '#lib/assets/rook.png';
import blackRook from '#lib/assets/rook1.png';
import whiteKnight from '#lib/assets/knight.png';
import blackKnight from '#lib/assets/knight1.png';
import whiteQueen from '#lib/assets/queen.png';
import blackQueen from '#lib/assets/queen1.png';
import whiteKing from '#lib/assets/king.png';
import blackKing from '#lib/assets/king1.png';
import whitePawn from '#lib/assets/pawn.png';
import blackPawn from '#lib/assets/pawn1.png';


export class Board {
    BoardPieces: Record<number, string> = $state({});

    constructor(){
        this.newBoard();
    }


    newBoard(): void {
        this.BoardPieces ={
		0: blackRook,
		1: blackKnight,
		2: blackBishop,
		3: blackQueen,
		4: blackKing,
		5: blackBishop,
		6: blackKnight,
		7: blackRook,
		8: blackPawn,
		9: blackPawn,
		10: blackPawn,
		11: blackPawn,
		12: blackPawn,
		13: blackPawn,
		14: blackPawn,
		15: blackPawn,
		48: whitePawn,
		49: whitePawn,
		50: whitePawn,
		51: whitePawn,
		52: whitePawn,
		53: whitePawn,
		54: whitePawn,
		55: whitePawn,
		56: whiteRook,
		57: whiteKnight,
		58: whiteBishop,
		59: whiteQueen,
		60: whiteKing,
		61: whiteBishop,
		62: whiteKnight,
		63: whiteRook
	};
    }

}

export const chessBoard = new Board();
