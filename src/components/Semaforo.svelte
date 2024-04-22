<script>
	import { onDestroy, onMount } from 'svelte';

	export let lightState = 0;
	export let warningTime = 3 * 1000;
	export let timeInt = 13 * 1000;
	let interval = null;
	const handleLightInterval = () => {
		lightState += 1;
		if (lightState > 3) lightState = 0;
	};

	$: {
		clearInterval(interval);
		interval = setInterval(
			handleLightInterval,
			lightState == 1 || lightState == 2
				? warningTime
				: lightState == 3
					? warningTime * 2 + timeInt
					: timeInt
		);
	}
</script>

<article>
	<div light={lightState == 3 ? 'on' : 'off'} style="background-color: red;" />
	<div light={lightState == 2 ? 'on' : 'off'} style="background-color: yellow;" />
	<div
		light={lightState == 0 ? 'on' : lightState == 1 ? 'warn' : 'off'}
		style="background-color: green;"
	/>
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
		scale: 0.2;
		position: absolute;
		top: var(--top, 0);
		left: var(--left, 0);
		rotate: var(--rotate, 0);
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
	div[light='warn'] {
		animation: warningLight 1s infinite;
	}
	@keyframes warningLight {
		0% {
			filter: brightness(50%);
			box-shadow: 0px 0px 20px rgb(105, 105, 105);
		}
		100% {
			filter: brightness(100%);
			box-shadow: 0px 0px 20px white;
		}
	}
</style>
