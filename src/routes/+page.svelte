<script>
	import Carro from '../components/Carro.svelte';
	import Semaforo from '../components/Semaforo.svelte';
	import Street from '../components/Street.svelte';
</script>

<Street>
	<Semaforo --top="80px" --left="170px" />
	<Semaforo --top="80px" --left="280px" />
	<Semaforo --top="190px" --left="170px" />
	<Semaforo --top="190px" --left="280px" />

	<!-- CARROS -->
	<Carro --top="250px" --left="-50px" />
</Street>
