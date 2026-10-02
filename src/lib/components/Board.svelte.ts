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
	enPassantIndex: number | undefined;
	turn: string;

	constructor() {
		this.newBoard();
		this.enPassantIndex = undefined;
		this.turn = 'white';
	}

	newBoard(): void {
		this.BoardPieces = {
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

	private getPieceColor(piece: string): 'white' | 'black' | null {
		if (!piece) return null;
		return piece === blackPawn || piece === blackRook || piece === blackKnight ||
		piece === blackBishop || piece === blackQueen || piece === blackKing? 'black' : 'white';
	}

	//checks spaces if they are free or not 
	checkFree(targetindex: number): boolean{
		if (this.BoardPieces[targetindex] === undefined ){
			return true;
		}
		return false;
	}

	checkMove(startindex: number, targetindex: number): boolean{
		console.log(this.enPassantIndex);
		let free: boolean = this.checkFree(targetindex);
		let color: string | null = this.getPieceColor(this.BoardPieces[startindex]);
		let movingPiece = this.BoardPieces[startindex];
		let targetPiece = this.BoardPieces[targetindex];

		//you should not be able to target your own piece
		if (movingPiece && this.getPieceColor(movingPiece) === this.getPieceColor(targetPiece) && targetPiece){
			return false
		}

		//Pawn piece logic
		if (movingPiece === whitePawn || movingPiece === blackPawn ){
			const isWhite = movingPiece === whitePawn;
			const direction = isWhite ? -1 : 1;
			const startRow = Math.floor(startindex / 8);
			const targetRow = Math.floor(targetindex / 8);
			const startCol = startindex % 8;
			const targetCol = targetindex % 8;
			const forwardOne = startindex + (direction * 8);
			const forwardTwo = startindex + (direction * 16);
			const startingRow = isWhite ? 6 : 1;
			//single square move
			if (targetindex === forwardOne && this.checkFree(targetindex)){
				return true;
			}

			//double square move
			if (startRow === startingRow && targetindex === forwardTwo){
				this.enPassantIndex = forwardOne;
				return this.checkFree(forwardOne) && this.checkFree(forwardTwo);
			}

			//capture logic
			if (Math.abs(startCol - targetCol) === 1 && targetRow === startRow + direction ){
				if (this.enPassantIndex === targetindex){
					return true;
				}
				return !this.checkFree(targetindex);
			}


		}
		//rook logic
		if (movingPiece === whiteRook || movingPiece === blackRook){
			const startRow = Math.floor(startindex / 8);
			const targetRow = Math.floor(targetindex / 8);
			const startCol = startindex % 8
			const targetCol = targetindex % 8;
			let checkBetween = true;
			if (startRow === targetRow){
				if (startindex < targetindex) {
					for(let i = startindex + 1; i < targetindex; i++){
						if (!this.checkFree(i)) checkBetween = false
					}
				} if (startindex > targetindex){
					for (let i = startindex - 1; i > targetindex; i--){
						if (!this.checkFree(i)) checkBetween = false
					}
				}

			} else if (startCol === targetCol){
				if (startindex < targetindex) {
					for(let i = startindex + 8; i < targetindex; i += 8){
						if (!this.checkFree(i)) checkBetween = false
					}
				} if (startindex > targetindex){
					for (let i = startindex - 8; i > targetindex; i -= 8){
						if (!this.checkFree(i)) checkBetween = false
					}
				}

			} else {
				return false
			}
			if (checkBetween){
				return true
			}
		}

		return false;

	}
}

export const chessBoard = new Board();
