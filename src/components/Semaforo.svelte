<script>
	export let lightState = 0;
</script>

<article>
	<div light={lightState == 3 ? 'on' : 'off'} style="background-color: red;" />
	<div
		light={lightState == 2 ? 'on' : lightState == 4 ? 'warn' : 'off'}
		style="background-color: yellow;"
	/>
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
		scale: 0.15;
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
		transition: all 0s ease;
	}
	div[light='off'] {
		filter: brightness(20%);
	}
	div[light='on'] {
		filter: brightness(100%);
		box-shadow: 0px 0px 20px white;
	}
	div[light='warn'] {
		animation: warningLight 1.1s infinite steps(1);
	}
	@keyframes warningLight {
		50% {
			filter: brightness(20%);
			box-shadow: 0px 0px 20px rgb(105, 105, 105);
		}
		0% {
			filter: brightness(100%);
			box-shadow: 0px 0px 20px white;
		}
		100% {
			filter: brightness(20%);
			box-shadow: 0px 0px 20px rgb(105, 105, 105);
		}
	}
</style>
