<script lang="ts">
	import { onMount } from 'svelte';

	import { registerWalletAdapter } from '@solana/wallet-standard-wallet-adapter-base';
	import type { Adapter } from '@solana/wallet-adapter-base';
	import { getWallets } from '@wallet-standard/app';
	import { PhantomWalletAdapter, WalletConnectWalletAdapter } from '@solana/wallet-adapter-wallets';
	import type { Wallet } from '@wallet-standard/base';

	/**
	 * 1. Get a list of wallet adapters
	 * 2. Check if user is on mobile. If so, get mobile wallet adapter
	 * 3. Register wallet adapters as standard wallets
	 * 4. Interact with wallets through the wallet standard API
	 */

	const chain = 'solana:devnet';

	// todo: include solana mobile wallet adapter, if present
	const adapters: Adapter[] = [new PhantomWalletAdapter()];

	//? maybe this should be a set? yes...
	let wallets: readonly Wallet[] = [];

	onMount(() => {
		// todo: only register wallets with the required features (or display them as unusable?)
		// I think it's better to show which features they lack which the app may require.
		// I should also not assume that a given feature exists when I am trying to use it for that exact reason.
		adapters.forEach((adapter) => registerWalletAdapter(adapter, chain));

		const { get, on } = getWallets();

		wallets = get();

		on('register', () => {
			console.log('register');
			wallets = get();
		});

		on('unregister', () => {
			console.log('unregister');
			wallets = get();
		});
	});

	const getCircularReplacer = () => {
		const seen = new WeakSet();
		return (key, value) => {
			if (typeof value === 'object' && value !== null) {
				if (seen.has(value)) {
					return;
				}
				seen.add(value);
			}
			return value;
		};
	};
</script>

Wallets
{#each wallets as wallet}
	<ul class="wallet-list">
		<li>
			<!-- <button on:click={() => {}}>
				{wallet.name}
				<ul>
					{#each Object.entries(wallet.features) as feature}
						<li>
							{feature[0]} - {JSON.stringify(feature[1], getCircularReplacer(), 2)}
						</li>
					{/each}
				</ul>
			</button> -->
			{JSON.stringify(wallet, getCircularReplacer(), 2)}
		</li>
	</ul>
{/each}

<style>
	.wallet-list {
		list-style: none;
		display: flex;
		flex-direction: column;
	}
</style>
