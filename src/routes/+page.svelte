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
		<Semaforo lightState={$elapsedDerived} --rotate="900deg" --top="100px" --left="280px" />
		<!-- Norte -- Nuevo este -->
		<Semaforo lightState={$elapsedDerived} --top="175px" --left="175px" />
		<!-- Sur -- Nuevo Oeste -->

		<Semaforo lightState={$reverseDerived} --top="215px" --left="265px" --rotate="-90deg" />
		<!-- Este -- Nuevo Sur -->
		<Semaforo lightState={$reverseDerived} --top="60px" --left="190px" --rotate="90deg" />
		<!-- Oeste -- Nuevo Norte -->

		{#if $semaforo.elapsed <= 21}
			<article style={'color:' + showLightState($elapsedDerived).key}>{showTimeRemainHor($semaforo.elapsed)}</article>
		{:else}
			<article style={'color:' + showLightState($reverseDerived).key}>{showTimeRemainVer($semaforo.elapsed)}</article>
		{/if}
		<!-- CARROS -->
		<!-- <Carro --top="280px" --left="-50px" />	
		<Carro --top="280px" --left="-15px" /> -->
	</Street>
	<div>
		<button on:click={IniciarSemaforos} style="background-color: aquamarine;">Iniciar</button>
		<button on:click={ReiniciarSemaforo} style="background-color: aqua;">Reiniciar</button>
		<button on:click={IniciarPreventivas} style="background-color: bisque;">Preventivas</button>
<!-- 		<h1>Semaforos Norte/Sur: {showLightState($elapsedDerived).value}</h1>
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
		</h1>		-->
		<h1>{$semaforo.elapsed}</h1> 
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
	h1 span {
		font-size: 100px;
		color: var(--color, green);
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
		color : green;
	
		
	}
</style>
