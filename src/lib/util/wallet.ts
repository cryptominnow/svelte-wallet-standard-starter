import type { Wallet, WalletAccount, WalletWithFeatures } from '@wallet-standard/base';
import type { IdentifierString, IdentifierArray, IdentifierRecord } from '@wallet-standard/base';
import { z } from 'zod';

// predicate which returns true if the wallet has the specified features.
// actually, this is a bit primitive. the predicate should also forward the features which already exist on the given wallet!

// feature is an identity record
// predicate includes features which already exist on the given wallet. Does typescript handle that automatically without me having to specify a generic type?
// todo: determine how features are versioned and included on wallet
// i should probably be using something like zod for this.

// insted of hasFeatures, i should use hasIdentifiers. I guess I could make hasFeatures a more specific util?

// beyond features, this should also be capable of verifying chains, accounts and tokens.

// Since I can't actually tell the shape of the function I just have to assume that if the wallet claims to have the feature then it matches the type.

/**
 * A wallet has the following properties which are identifiers:
 *
 * - readonly features: IdentifierRecord<unknown>
 * - readonly chains: IdentifierArray
 *
 * A WalletAccount may also specify features and chains. They are a subset of the wallet.
 */

// how do I make a wallet with given chains?

// now I need to construct my predicate...
// The chains property on the wallet is can evaluated to contain all of the chains in the given identifier array

type WalletWithChains<W extends Wallet | WalletAccount, Chains extends Wallet['chains']> = W & {
	chains: Chains;
};

export function hasChains<W extends Wallet | WalletAccount, C extends Wallet['chains']>(
	wallet: W,
	chains: C
): wallet is WalletWithChains<W, C> {
	const walletChains = new Set(wallet.chains);
	return chains.every((chain) => chain in walletChains);
}

const exWallet: Wallet = {
	accounts: [],
	chains: ['solana:devnet', 'ethereum:devnet'],
	features: {},
	name: 'example',
	version: '1.0.0',
	icon: 'data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyODAuMTczIDI4MC4xNzMiIHZpZXdCb3g9IjAgMCAyODAuMTczIDI4MC4xNzMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTEzMy45NjEuMTQ1Yy03MC44ODIgMy41LTEyNS4xMzcgNjMuODgxLTEyNS4xMzcgMTM0Ljc2M3Y2Ni41MDYgNjUuNjMxYzAgNi4xMjYgNi4xMjYgOS42MjYgMTEuMzc2IDYuMTI2bDIwLjEyNy0xMi4yNTFjNy44NzYtNC4zNzUgMTcuNTAyLTQuMzc1IDI1LjM3NyAwbDE4LjM3NyAxMC41MDFjNy44NzYgNC4zNzUgMTcuNTAyIDQuMzc1IDI1LjM3NyAwbDE4LjM3Ny0xMC41MDFjNy44NzYtNC4zNzUgMTcuNTAyLTQuMzc1IDI1LjM3NyAwbDE4LjM3NyAxMC41MDFjNy44NzYgNC4zNzUgMTcuNTAyIDQuMzc1IDI1LjM3NyAwbDE4LjM3Ny0xMC41MDFjNy44NzYtNC4zNzUgMTcuNTAyLTQuMzc1IDI1LjM3NyAwbDE5LjI1MiAxMS4zNzZjNS4yNTEgMi42MjUgMTEuMzc2LS44NzUgMTEuMzc2LTYuMTI2IDAtMTguMzc3IDAtNTAuNzU1IDAtNjUuNjMxdi03MC4wMDdjLjAwMS03My41MDctNjIuMTMtMTMzLjg4Ny0xMzcuMzg3LTEzMC4zODd6IiBmaWxsPSIjZTI1NzRjIi8+PHBhdGggZD0ibTI2LjMyNSAxMzEuNDA4YzAtNjkuMTMyIDU0LjI1NS0xMjYuMDEyIDEyMi41MTItMTMxLjI2My0yLjYyNSAwLTYuMTI2IDAtOC43NTEgMC03Mi42MzIgMC0xMzEuMjYyIDU4LjYzMS0xMzEuMjYyIDEzMS4yNjN2MTQ4Ljc2NWM3Ljg3NiAwIDEzLjEyNi0zLjUgMTcuNTAyLTcuODc2LS4wMDEtMTUuNzUyLS4wMDEtMTQwLjg4OS0uMDAxLTE0MC44ODl6IiBmaWxsPSIjZDI1MTQ3Ii8+PHBhdGggZD0ibTE4OC4yMTYgMTEzLjkwNmMtMTYuNjI3IDAtMzAuNjI4IDE0LjAwMS0zMC42MjggMzAuNjI4czE0LjAwMSAzMC42MjggMzAuNjI4IDMwLjYyOCAzMC42MjgtMTQuMDAxIDMwLjYyOC0zMC42MjgtMTQuMDAxLTMwLjYyOC0zMC42MjgtMzAuNjI4em0tOTYuMjU5IDBjLTE2LjYyNyAwLTMwLjYyOCAxNC4wMDEtMzAuNjI4IDMwLjYyOHMxNC4wMDEgMzAuNjI4IDMwLjYyOCAzMC42MjggMzAuNjI4LTE0LjAwMSAzMC42MjgtMzAuNjI4LTE0LjAwMi0zMC42MjgtMzAuNjI4LTMwLjYyOHoiIGZpbGw9IiNlNGU3ZTciLz48cGF0aCBkPSJtMTg4LjIxNiAxMzEuNDA4Yy03LjAwMSAwLTEzLjEyNiA2LjEyNi0xMy4xMjYgMTMuMTI2IDAgNy4wMDEgNi4xMjYgMTMuMTI2IDEzLjEyNiAxMy4xMjZzMTMuMTI2LTYuMTI2IDEzLjEyNi0xMy4xMjZjMC03LjAwMS02LjEyNS0xMy4xMjYtMTMuMTI2LTEzLjEyNnptLTk2LjI1OSAwYy03LjAwMSAwLTEzLjEyNiA2LjEyNi0xMy4xMjYgMTMuMTI2IDAgNy4wMDEgNi4xMjYgMTMuMTI2IDEzLjEyNiAxMy4xMjYgNy4wMDEgMCAxMy4xMjYtNi4xMjYgMTMuMTI2LTEzLjEyNiAwLTcuMDAxLTYuMTI2LTEzLjEyNi0xMy4xMjYtMTMuMTI2eiIgZmlsbD0iIzMyNGQ1YiIvPjwvc3ZnPg=='
};

{
	exWallet.chains;
	if (hasChains(exWallet, ['solana:devnet', 'ethereum:devnet'])) {
		// this isn't really perfect either, because we assert that other chains which are not included in our filter DNE!
		exWallet.chains;
		//? why don't libraries ever use sets or maps? this is clearly a job for sets. It would be a much better type experience.
	}
}

const exAccount: WalletAccount = {
	address: '0x1234',
	chains: exWallet.chains,
	features: Object.keys(exWallet.features) as IdentifierArray,
	publicKey: new Uint8Array(32)
};

// I guess hasFeatures should be Wallet only. I can just use regular old manual typeguards for features on the wallet account.
// So we're back to square one... I need to do hasFeatures on just the wallet! hasChains doesn't matter!
// So a feature is a string identifier key with a value matching any type. A schema library makes the most sense for checking for features.
// I could also look to the solana wallet adapter's implementation for adapting standard wallets, but it may be hardcoded. Let's see!
// Yep, appears hardcoded to me!

// I guess you are just supposed to assume that if the feature name exists on the wallet then it matches the type? I don't really like making that assumption.
// What if someone were to make a bogus wallet with a feature that doesn't match? 

// todo: figure out how to render WalletIcon

// A feature may have any type. 

// So what I'm going to do is check the features against a zod schema.

const 