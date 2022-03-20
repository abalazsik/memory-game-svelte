<script lang="ts">
	import Card from './Card.svelte';
	import { stateMachine } from './stateMachine';
	import { onMount } from 'svelte';

	onMount(async () => {});

	function onSelect(event) {
		stateMachine.transition(event.detail);
	}

	function restart() {
		stateMachine.reset();
	}
</script>

<main style="display: flex;">
	<div style="margin: 0px auto;">
		<button on:click={restart} id="restart-button">Restart</button>
		<span id="steps-label">steps: {$stateMachine.steps}</span>
		{#if !$stateMachine.isEnded}
			<div class="box-container">
				{#each $stateMachine.cardData as card}
					<Card on:select={onSelect} data={card} clickable={$stateMachine.isClickable} />
				{/each}
			</div>
		{:else}
			<h2>Congrats! Here is your prize sir</h2>
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/YZLryYlaWBs"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			/>
		{/if}
	</div>
</main>

<style>
	.box-container {
		display: grid;
		grid-template-columns: 7.5em 7.5em 7.5em 7.5em 7.5em 7.5em;
		grid-template-rows: 7.5em 7.5em 7.5em 7.5em 7.5em 7.5em;
		padding: 0.5em;
		width: 43em;
		height: 43em;
	}

	#restart-button {
		margin-left: 0.6em;
		background-color: #0000ff;
		color: #00ff00;
		font-weight: bold;
		border: none;
		border-radius: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	#steps-label {
		font-weight: bold;
		float: right;
		padding-top: 3px;
	}
</style>
