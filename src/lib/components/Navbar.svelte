<script lang="ts">
	import ConnectButton from '$lib/components/ConnectButton.svelte';
	import { started } from '$lib/stores/started';
</script>

<nav class="flex justify-between items-center p-8">
	{#if $started}
		<div class="w-1/3" />
	{/if}
	<div class="{$started ? 'w-1/3' : 'w-full'} flex justify-center">
		<img src="luckytoad-logo.svg" alt="logo-text" class="h-16" />
	</div>

	{#if $started}
		<div class="w-1/3 flex justify-end">
			<ConnectButton />
		</div>
	{/if}
</nav>
