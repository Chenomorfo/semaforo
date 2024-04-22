<script>
	import Carro from '../components/Carro.svelte';
	import Semaforo from '../components/Semaforo.svelte';
	import Street from '../components/Street.svelte';
</script>

<Street>
	<Semaforo --top="80px" --left="190px" />
	<Semaforo --top="190px" --left="265px" />

	<Semaforo --top="100px" --left="255px" --rotate="-90deg" lightState={3} />
	<Semaforo --top="175px" --left="200px" --rotate="90deg" lightState={3} />

	<!-- CARROS -->
	<Carro --top="280px" --left="-50px" />
	<Carro --top="280px" --left="-15px" />
</Street>
