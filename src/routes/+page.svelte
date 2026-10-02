<script lang="ts">
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
	let squares = Array.from({ length: 64 });

	let boardPieces: Record<number, string> = $state({
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
	});

	let dragIndex: number | null = $state(null);

	function handleDragStart(index: number) {
		dragIndex = index;
	}

	function handleDrop(targetIndex: number){
        if (dragIndex !== null && dragIndex !== targetIndex){
            boardPieces[targetIndex] = boardPieces[dragIndex];
            delete boardPieces[dragIndex];
            boardPieces = {...boardPieces};
        }
        dragIndex = null;
    }
</script>

<main class="flex min-h-screen w-full flex-col items-center justify-center bg-[#2c2b29]">
	<h1 class="mb-14 text-8xl font-black text-white">Chess ting</h1>
	<div id="board" role="grid" class="mx-auto grid max-w-2xl grid-cols-8 gap-1 bg-[#4b4847] p-2">
		{#each squares as _, index}
			<div
				role="gridcell"
				tabindex="0"
				class="flex aspect-square w-20 items-center justify-center rounded font-bold
    {(Math.floor(index / 8) + index) % 2 === 0 ? 'bg-[#eeeed2]' : 'bg-[#769656]'}"
				ondragover={(event) => event.preventDefault()}
                ondrop={() => handleDrop(index)}
			>
				<!-- {index} -->
				{#if boardPieces[index]}
					<img
						src={boardPieces[index]}
						alt="Chess Piece"
						draggable="true"
						ondragstart={() => handleDragStart(index)}
						class="h-5/6 w-5/6 object-contain"
					/>
				{/if}
			</div>
		{/each}
	</div>
</main>
