<script lang="ts">
	import { CardDataWithPosition, colorToRGB, colorToText } from './cards';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let data: CardDataWithPosition;
	export let clickable: boolean;

	function onClick() {
		if (clickable && !data.visible) {
			data.visible = !data.visible;
			if (data.visible) {
				dispatch('select', {
					idx: data.idx
				});
			}
		}
	}
</script>

<div on:click={onClick} class="outer-box" style="grid-column: {data.x}; grid-row: {data.y}">
	{#if data.visible}
		<div
			class="box"
			style="color: {colorToRGB(data.color)}; background-color: {colorToRGB(
				data.backColor
			)}">
			<div class="inner-box">{colorToText(data.text)}</div>
		</div>
	{:else}
		<div class="inner-box unknown">?</div>
	{/if}
</div>

<style>
	.outer-box {
		width: 7em;
		height: 7em;
		text-align: center;
		font-weight: bold;
		cursor: pointer;
		margin: 0.1em;
		line-height: 7em;
	}

	.box {
		border-radius: 1em;
	}

	.inner-box {
		width: 100%;
	}

	.unknown {
		color: white;
		background-color: lightgray;
		border-radius: 1em;
		height: 100%;
	}
</style>
