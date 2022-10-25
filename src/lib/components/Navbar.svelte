<script lang="ts">
	import ConnectButton from '$lib/components/ConnectButton.svelte';
</script>

<nav class="flex justify-between items-center p-8">
	<div class="w-1/3" />
	<div class="w-1/3 flex justify-center">
		<img src="luckytoad-logo.svg" alt="logo-text" class="h-16" />
	</div>
	<div class="w-1/3 flex justify-end">
		<ConnectButton />
	</div>
</nav>
