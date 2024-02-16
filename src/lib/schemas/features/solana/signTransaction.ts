import { z, ZodType } from 'zod';
import {
	SolanaSignTransaction,
	type SolanaSignTransactionFeature,
	type SolanaTransactionVersion,
	type SolanaSignTransactionMethod,
	type SolanaSignTransactionInput,
	type SolanaSignTransactionOutput,
	type SolanaSignTransactionOptions,
	type SolanaTransactionCommitment
} from '@solana/wallet-standard-features';
import { IdentifierStringSchema } from '../../identifier';
import { WalletAccountSchema } from '../../wallet';

// todo: see if there is a way to validate with zod enum or nativeEnum
export const SolanaTransactionVersionSchema: ZodType<SolanaTransactionVersion> = z.union([
	z.literal('legacy'),
	z.literal(0)
]);

export const SolanaTransactionCommitmentSchema: ZodType<SolanaTransactionCommitment> = z.enum([
	'processed',
	'confirmed',
	'finalized'
]);

export const SolanaSignTransactionOptionsSchema: ZodType<SolanaSignTransactionOptions> = z.object({
	preflightCommitment: SolanaTransactionCommitmentSchema.optional(),
	//! this can probably be refined, like positive integer. research slots
	minContextSlot: z.number().optional()
});

export const SolanaSignTransactionInputSchema: ZodType<SolanaSignTransactionInput> = z.object({
	account: WalletAccountSchema,
	transaction: z.instanceof(Uint8Array),
	chain: IdentifierStringSchema.optional(),
	options: SolanaSignTransactionOptionsSchema.optional()
});

const SolanaSignTransactionOutputSchema: ZodType<SolanaSignTransactionOutput> = z.object({
	signedTransaction: z.instanceof(Uint8Array)
});

const SolanaSignTransactionMethodSchema: ZodType<SolanaSignTransactionMethod> = z
	.function()
	.args()
	.returns(z.promise(z.array(SolanaSignTransactionOutputSchema)));

export const SolanaSignTransactionFeatureSchema: ZodType<SolanaSignTransactionFeature> = z.object({
	[SolanaSignTransaction]: z.object({
		version: z.enum(['1.0.0']),
		supportedTransactionVersions: z.array(SolanaTransactionVersionSchema),
		signTransaction: SolanaSignTransactionMethodSchema
	})
});
