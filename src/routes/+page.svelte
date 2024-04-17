<script>
	import Semaforo from '../components/Semaforo.svelte';
	import Street from '../components/Street.svelte';
</script>

<Street>
	<Semaforo --top=90px --left=180px/>
	<Semaforo --top=90px --left=290px/>
	<Semaforo --top=200px --left=180px/>
	<Semaforo --top=200px --left=290px/>
</Street>
