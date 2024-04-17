<script>
	import { onDestroy, onMount } from 'svelte';

	export let lightState = 2;
	export let timeInt = 8;
	let interval = null;

	onMount(() => {
		interval = setInterval(() => {
			lightState += 1;
			if (lightState > 2) lightState = 0;
		}, timeInt * 1000);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<article>
	<div light={lightState == 2 ? 'on' : 'off'} style="background-color: red;" />
	<div light={lightState == 1 ? 'on' : 'off'} style="background-color: yellow;" />
	<div light={lightState == 0 ? 'on' : 'off'} style="background-color: green;" />
</article>

<style>
	article {
		background-color: #242424;
		border-radius: 20px;
		width: 156px;
		height: 256px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 40px 0;
		scale: .2;
		position: absolute;
		top: var(--top,0);
		left: var(--left,0);
	}
	div {
		width: 75px;
		height: 75px;
		border: 3px solid white;
		border-radius: 50%;
		position: relative;
		transition: all 0.5s ease;
	}
	div[light='off'] {
		filter: brightness(50%);
	}
	div[light='on'] {
		filter: brightness(100%);
		box-shadow: 0px 0px 20px white;
	}
</style>
