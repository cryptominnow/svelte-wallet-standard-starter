import { z, type ZodType } from 'zod';
import type { Wallet, WalletAccount } from '@wallet-standard/base';
import {} from '@wallet-standard/features';
import { IdentifierArraySchema, IdentifierRecordSchema } from './identifier';

export const WalletIconSchema: ZodType<Wallet['icon']> = z.string();
export const WalletChainsSchema: ZodType<Wallet['chains']> = IdentifierArraySchema;
export const WalletFeaturesSchema: ZodType<Wallet['features']> = IdentifierRecordSchema;

export const WalletAccountSchema: ZodType<WalletAccount> = z.object({
	address: z.string(),
	publicKey: z.instanceof(Uint8Array),
	chains: WalletChainsSchema,
	features: IdentifierArraySchema,
	label: z.string().optional(),
	icon: WalletIconSchema.optional()
});

//! While using satisfies keeps specificity, it also completely fucks my pretty type hints.
// todo: find a way to preserve the specific zodtype inference while defining the output type
export const WalletSchema: ZodType<Wallet> = z.object({
	version: z.literal('1.0.0'),
	name: z.string(),
	icon: WalletIconSchema,
	chains: WalletChainsSchema,
	features: WalletFeaturesSchema,
	accounts: z.array(WalletAccountSchema)
});
