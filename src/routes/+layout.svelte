<script>
	import '../app.postcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="min-h-screen bg-brand-lemon-light font-Inter">
	<div class="min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1 w-full max-w-7xl mx-auto">
		<Navbar />
		<slot />
		<Footer />
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

	:root {
		/* CUSTOMIZE THE COLOR  PALLETTE */
		--onboard-white: white;
		/* --onboard-black: black; */
		/* --onboard-primary-1: #2f80ed; */
		/* --onboard-primary-100: #eff1fc; */
		/* --onboard-primary-200: #d0d4f7; */
		/* --onboard-primary-300: #b1b8f2; */
		/* --onboard-primary-400: #929bed; */
		/* --onboard-primary-500: #6370e5; */
		/* --onboard-primary-600: #454ea0; */
		/* --onboard-primary-700: #323873; */
		/* --onboard-gray-100: #ebebed; */
		/* --onboard-gray-200: #c2c4c9; */
		/* --onboard-gray-300: #999ca5; */
		/* --onboard-gray-400: #707481; */
		/* --onboard-gray-500: #33394b; */
		/* --onboard-gray-600: #242835; */
		/* --onboard-gray-700: #1a1d26; */
		/* --onboard-success-100: #d1fae3; */
		/* --onboard-success-200: #baf7d5; */
		/* --onboard-success-300: #a4f4c6; */
		/* --onboard-success-400: #8df2b8; */
		/* --onboard-success-500: #5aec99; */
		/* --onboard-success-600: #18ce66; */
		/* --onboard-success-700: #129b4d; */
		/* --onboard-danger-100: #ffe5e6; */
		/* --onboard-danger-200: #ffcccc; */
		/* --onboard-danger-300: #ffb3b3; */
		/* --onboard-danger-400: #ff8080; */
		/* --onboard-danger-500: #ff4f4f; */
		/* --onboard-danger-600: #cc0000; */
		/* --onboard-danger-700: #660000; */
		/* --onboard-warning-100: #ffefcc; */
		/* --onboard-warning-200: #ffe7b3; */
		/* --onboard-warning-300: #ffd780; */
		/* --onboard-warning-400: #ffc74c; */
		/* --onboard-warning-500: #ffaf00; */
		/* --onboard-warning-600: #cc8c00; */
		/* --onboard-warning-700: #664600; */

		/* CUSTOMIZE ACCOUNT CENTER STACK POSITIONING */
		/* --account-center-z-index */

		/* CUSTOMIZE SECTIONS OF THE CONNECT MODAL */
		/* --onboard-connect-content-width */
		/* --onboard-connect-content-height */
		/* --onboard-wallet-columns */
		/* --onboard-connect-sidebar-background */
		/* --onboard-connect-sidebar-color */
		/* --onboard-connect-sidebar-progress-background */
		/* --onboard-connect-sidebar-progress-color */
		/* --onboard-connect-header-background */
		--onboard-connect-header-color: #4a4a4a;
		/* --onboard-link-color */
		--onboard-close-button-background: none;
		--onboard-close-button-color: #4a4a4a;
		/* --onboard-checkbox-background */
		/* --onboard-checkbox-color */
		--onboard-wallet-button-background: white;
		--onboard-wallet-button-background-hover: white;
		--onboard-wallet-button-box-shadow-hover: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
		--onboard-wallet-button-color: #4a4a4a;
		--onboard-wallet-button-border-color: none;
		--onboard-wallet-app-icon-border-color: none;

		/*-----------------------------*/
		/* CUSTOMIZE THE CONNECT MODAL */
		/*-----------------------------*/
		/* --onboard-modal-backdrop */
		--onboard-modal-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);

		/*-------------------------------------*/
		/* CUSTOMIZE THE ACTION REQUIRED MODAL */
		/*-------------------------------------*/
		/* --onboard-action-required-modal-background */
		/*
		/* FONTS */
		/* --onboard-font-family-normal: Sofia Pro;*/
		/* --onboard-font-family-semibold: Sofia Pro Semibold;*/
		/* --onboard-font-family-light: Sofia Pro Light; */
		/* --onboard-font-size-1: 3rem; */
		/* --onboard-font-size-2: 2.25rem; */
		/* --onboard-font-size-3: 1.5rem; */
		/* --onboard-font-size-4: 1.25rem; */
		/* --onboard-font-size-5: 1rem; */
		/* --onboard-font-size-6: 0.875rem; */
		/* --onboard-font-size-7: 0.75rem; */
		/*		
		/* SPACING */
		/* --onboard-spacing-1: 3rem;*/
		/* --onboard-spacing-2: 2rem;*/
		/* --onboard-spacing-3: 1.5rem;*/
		/* --onboard-spacing-4: 1rem; */
		/* --onboard-spacing-5: 0.5rem; */
		/*
		/* BORDER RADIUS */
		/* --onboard-border-radius-1: 24px; */
		/* --onboard-border-radius-2: 20px; */
		/* --onboard-border-radius-3: 16px; */
		/*
		/* SHADOWS */
		/* --onboard-shadow-0: none;*/
		/* --onboard-shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1); */
		/* --onboard-shadow-2: inset 0px -1px 0px rgba(0, 0, 0, 0.1); */
		/*
		/* MAIN MODAL POSITIONING */
		--onboard-modal-z-index: 999;
		/* --onboard-modal-top */
		/* --onboard-modal-bottom */
		/* --onboard-modal-right */
		/* --onboard-modal-left */
		/*
		/* HD WALLET ACCOUNT SELECT MODAL POSITIONING */
		/* --onboard-account-select-modal-z-index */
		/* --onboard-account-select-modal-top */
		/* --onboard-account-select-modal-bottom */
		/* --onboard-account-select-modal-right */
		/* --onboard-account-select-modal-left */
		/*
		/* MAGIC WALLET MODAL POSITIONING */
		/* --onboard-login-modal-z-index */
		/* --onboard-login-modal-top */
		/* --onboard-login-modal-bottom */
		/* --onboard-login-modal-right */
		/* --onboard-login-modal-left */
		/*
		/* MAGIC WALLET MODAL POSITIONING */
		/* --onboard-login-modal-z-index */
		/* --onboard-login-modal-top */
		/* --onboard-login-modal-bottom */
		/* --onboard-login-modal-right */
		/* --onboard-login-modal-left */

		/*-------------------------*/
		/* HARDWARE WALLET STYLES  */
		/*-------------------------*/
		/* *if not set will fallback to variables with `--onboard` prefix shown above */
		/*
		/* COLORS */
		/* --account-select-modal-white: white;
		/* --account-select-modal-black: black;*/
		/* --account-select-modal-primary-100: #eff1fc; */
		/* --account-select-modal-primary-200: #d0d4f7; */
		/* --account-select-modal-primary-300: #b1b8f2; */
		/* --account-select-modal-primary-500: #6370e5; */
		/* --account-select-modal-primary-600: #454ea0; */
		/* --account-select-modal-gray-100: #ebebed; */
		/* --account-select-modal-gray-200: #c2c4c9; */
		/* --account-select-modal-gray-300: #999ca5; */
		/* --account-select-modal-gray-500: #33394b; */
		/* --account-select-modal-gray-700: #1a1d26; */
		/* --account-select-modal-danger-500: #ff4f4f; */
		/*
		/* FONTS */
		/* --account-select-modal-font-family-normal: Sofia Pro;*/
		/* --account-select-modal-font-family-light: Sofia Pro Light;*/
		/* --account-select-modal-font-size-5: 1rem;*/
		/* --account-select-modal-font-size-7: .75rem;*/
		/* --account-select-modal-font-line-height-1: 24px; */
		/*
		/* SPACING */
		/* --account-select-modal-margin-4: 1rem;*/
		/* --account-select-modal-margin-5: 0.5rem; */
	}
</style>
