<script>
	import { semaforo, elapsedDerived, reverseDerived } from '$lib/store';
	import { onMount } from 'svelte';
	import Carro from '../components/Carro.svelte';
	import Semaforo from '../components/Semaforo.svelte';
	import Street from '../components/Street.svelte';
	import { showLightState, showTimeRemainHor, showTimeRemainVer } from '$lib';

	let interval = null;
	const handleLightInterval = () => semaforo.increment();

	const IniciarSemaforos = () => {
		semaforo.pause();
		if ($semaforo.isPaused) clearInterval(interval);
		else interval = setInterval(handleLightInterval, 1 * 1000);
	};
	const IniciarPreventivas = () => {
		semaforo.preventive();
		if ($semaforo.isPreventive) clearInterval(interval);
		else interval = setInterval(handleLightInterval, 1000);
	};
	const ReiniciarSemaforo = () => semaforo.reset();

	interval = setInterval(handleLightInterval, 1 * 1000);
</script>

<section>
	<Street>
		<Semaforo lightState={$elapsedDerived} --rotate="900deg" --top="80px" --left="190px" />
		<Semaforo lightState={$elapsedDerived} --top="190px" --left="265px" />

		<Semaforo lightState={$reverseDerived} --top="100px" --left="255px" --rotate="-90deg" />
		<Semaforo lightState={$reverseDerived} --top="175px" --left="200px" --rotate="90deg" />

		<!-- CARROS -->
		<!-- <Carro --top="280px" --left="-50px" />
		<Carro --top="280px" --left="-15px" /> -->
	</Street>
	<div>
		<button on:click={IniciarSemaforos} style="background-color: aquamarine;">Iniciar</button>
		<button on:click={ReiniciarSemaforo} style="background-color: aqua;">Reiniciar</button>
		<button on:click={IniciarPreventivas} style="background-color: bisque;">Preventivas</button>
		<h1>Semaforos Norte/Sur: {showLightState($elapsedDerived).value}</h1>
		<h1>
			Semaforos Norte/Sur: <span style={'color:' + showLightState($elapsedDerived).key}>
				{showTimeRemainHor($semaforo.elapsed)}</span
			>
		</h1>
		<h1>Semaforos Este/Oeste: {showLightState($reverseDerived).value}</h1>
		<h1>
			Semaforos Este/Oeste: <span style={'color:' + showLightState($reverseDerived).key}
				>{showTimeRemainVer($semaforo.elapsed)}</span
			>
		</h1>
	</div>
</section>

<style>
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
	h1 span {
		font-size: 100px;
		color: var(--color, green);
	}
</style>
