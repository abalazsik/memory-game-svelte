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

<button on:click={onClick} class="outer-box" style:grid-column={data.x} style:grid-row={data.y}>
	{#if data.visible}
		<div
			class="box"
			style:color={colorToRGB(data.color)}
			style:background-color={colorToRGB(data.backColor)}>
			<div class="inner-box">{colorToText(data.text)}</div>
		</div>
	{:else}
		<div class="inner-box unknown">?</div>
	{/if}
</button>

<style>
	.outer-box {
		width: 8em;
		height: 8em;
		text-align: center;
		font-weight: bold;
		cursor: pointer;
		margin: 0.1em;
		line-height: 8em;
		border: none;
		background: none;
		padding: 0px;
	}

	.box {
		border-radius: 1em;
	}

	.inner-box {
		width: 100%;
		font-size: 16px;
	}

	.unknown {
		color: white;
		background-color: lightgray;
		border-radius: 1em;
		height: 100%;
	}
</style>
