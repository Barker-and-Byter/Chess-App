<script lang="ts">
	import { chessBoard } from '#lib/components/Board.svelte.ts';
	let squares = Array.from({ length: 64 });

	let dragIndex: number | null = $state(null);

	function handleDragStart(index: number) {
		dragIndex = index;
	}

	function handleDrop(targetIndex: number) {
		if (dragIndex !== null && dragIndex !== targetIndex) {
            chessBoard.enPassantIndex = undefined;
			let valid = chessBoard.checkMove(dragIndex, targetIndex);
			if (valid) {
				chessBoard.BoardPieces[targetIndex] = chessBoard.BoardPieces[dragIndex];
				delete chessBoard.BoardPieces[dragIndex];
				chessBoard.BoardPieces = { ...chessBoard.BoardPieces };
			}
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
				{index}
				{#if chessBoard.BoardPieces[index]}
					<img
						src={chessBoard.BoardPieces[index]}
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
