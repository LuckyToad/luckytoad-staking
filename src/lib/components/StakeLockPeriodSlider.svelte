<script>
	import Slider from '@bulatdashiev/svelte-slider';
	import { lockPeriod } from '$lib/stores/StakeLockPeriod';
</script>

<div class="px-6">
	<Slider bind:value={$lockPeriod} min={1} max={26}>
		<span slot="left" class="flex justify-center items-center h-8 w-12">
			<img src="logo-toad-no-text-transparent-bg.png" alt="toad" class="h-full" />
		</span>
	</Slider>
</div>

<style>
	div {
		--thumb-bg: transparent;
		--progress-bg: #dad0a3;
		--track-bg: #dad0a3;
	}
</style>
