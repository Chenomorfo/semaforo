<script>
	import { semaforo, trafficLightDuration } from '$lib/store';
	import Semaforo from '../components/Semaforo.svelte';
	import Street from '../components/Street.svelte';

	const IniciarSemaforos = () => {
		semaforo.pause();
		clearInterval(timeInt);
		time = 0;
	};
	const IniciarPreventivas = () => {
		semaforo.preventive();
		clearInterval(timeInt);
		time = 0;
	};

	const resetTimeInt = () => {
		time = 0;
		clearInterval(timeInt);
		timeInt = setInterval(() => (time += 1), 1000);
	};
	let clear;
	let timeInt;
	let time = 0;
	$: {
		clearInterval(clear);
		if ($semaforo.isPaused) null;
		else if ($semaforo.isPreventive) null;
		else if ($semaforo.isWaiting)
			clear = setInterval(semaforo.tickme, trafficLightDuration['wait']);
		else
			switch ($semaforo.timeAction) {
				case 1:
					clear = setInterval(semaforo.tickme, trafficLightDuration['greenTz']);
					resetTimeInt();
					break;
				case 2:
					clear = setInterval(semaforo.tickme, trafficLightDuration['yellow']);
					resetTimeInt();
					break;
				case 3:
					clear = setInterval(semaforo.tickme, trafficLightDuration['red']);
					resetTimeInt();
					break;

				default:
					clear = setInterval(semaforo.tickme, trafficLightDuration['green']);
					resetTimeInt();
					break;
			}
	}
	const ReiniciarSemaforo = () => semaforo.reset();
</script>

<section>
	<Street>
		<Semaforo
			lightState={!$semaforo.hasStarted
				? 10
				: $semaforo.isPreventive
					? 4
					: $semaforo.isVertical
						? 3
						: $semaforo.isWaiting
							? 10
							: $semaforo.timeAction}
			--rotate="900deg"
			--top="100px"
			--left="150px"
		/>
		<!-- Norte -- Nuevo este -->
		<Semaforo
			lightState={!$semaforo.hasStarted
				? 10
				: $semaforo.isPreventive
					? 4
					: $semaforo.isVertical
						? 3
						: $semaforo.isWaiting
							? 10
							: $semaforo.timeAction}
			--top="175px"
			--left="305px"
		/>
		<!-- Sur -- Nuevo Oeste -->

		<Semaforo
			lightState={!$semaforo.hasStarted
				? 10
				: $semaforo.isPreventive
					? 4
					: !$semaforo.isVertical
						? 3
						: $semaforo.isWaiting
							? 10
							: $semaforo.timeAction}
			--top="60px"
			--left="265px"
			--rotate="-90deg"
		/>
		<!-- Este -- Nuevo Sur -->
		<Semaforo
			lightState={!$semaforo.hasStarted
				? 10
				: $semaforo.isPreventive
					? 4
					: !$semaforo.isVertical
						? 3
						: $semaforo.isWaiting
							? 10
							: $semaforo.timeAction}
			--top="215px"
			--left="190px"
			--rotate="90deg"
		/>
		<!-- Oeste -- Nuevo Norte -->

		{#if $semaforo.isWaiting}
			<article />
		{:else if $semaforo.isPreventive}
			<article
				light="warn"
				style={'color:yellow; text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;'}
			>
				{0}
			</article>
		{:else if !$semaforo.hasStarted}
			<article />
		{:else if $semaforo.timeAction == 0}
			<article
				style={'color:green; text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;'}
			>
				{15 - time}
			</article>
		{:else if $semaforo.timeAction == 1}
			<article
				light="warn"
				style={'color:green; text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;'}
			>
				{time + 1}
			</article>
		{:else if $semaforo.timeAction == 2}
			<article
				style={'color:yellow; text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;'}
			>
				{time + 1}
			</article>
		{:else}
			<article
				style={'color:red; text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;'}
			>
				{time + 1}
			</article>
		{/if}
	</Street>
	<div>
		<button on:click={IniciarSemaforos} style="background-color: aquamarine;">
			{$semaforo.isPaused ? 'Iniciar' : 'Pausar'}
		</button>
		<button on:click={ReiniciarSemaforo} style="background-color: aqua;">Reiniciar</button>
		<button on:click={IniciarPreventivas} style="background-color: bisque;">Preventivas</button>

		<!-- 		<h1>{$semaforo.timeAction}</h1>
		<h1>{$semaforo.isVertical}</h1>
		<h1>{$semaforo.isWaiting}</h1>
		<h1>{time}</h1> -->
	</div>
</section>

<style>
	article[light='warn'] {
		animation: warningLight 1.1s infinite steps(1);
	}
	@keyframes warningLight {
		50% {
			color: transparent;
			text-shadow: none;
		}
		0% {
		}
		100% {
			color: transparent;
			text-shadow: none;
		}
	}

	@font-face {
		font-family: 'Clock';
		/*a name to be used later*/
		src: url('fonts/digital-7/digital-7.ttf');
		/*URL to font*/
	}
	section {
		display: flex;
		flex-direction: row;
		gap: 4px;
		font-family: 'Clock';
		height: 90vh;
		width: 95vw;
	}
	div {
		display: grid;
		gap: 4px;
		height: fit-content;
	}
	div button {
		font-size: 24px;
		border: 1px solid black;
		border-radius: 3px;
		margin: 5px;
		padding: 0;
		transition: all ease 0.2s;
		cursor: pointer;
	}
	div button:hover {
		margin: 0px;
		padding: 4px;
	}

	article {
		position: absolute;
		background-color: white;
		border: 3px solid black;
		border-radius: 50%;
		height: 50px;
		width: 50px;
		top: 40%;
		left: 40%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32px;
		color: green;
	}
</style>
