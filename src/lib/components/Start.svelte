<script>
	import { connect } from '$lib/web3';
	import { started } from '$lib/stores/started';

	const handleConnect = async () => {
		await connect();
		$started = true;
	};
</script>

<div class="w-full flex flex-col justify-center items-center gap-5 font-Inter">
	<h1 class="header">stake your $toad <br /><span class="text-brand-green-light">boost your odds</span></h1>

	<button on:click={handleConnect} class="btn">Get Started</button>
</div>
