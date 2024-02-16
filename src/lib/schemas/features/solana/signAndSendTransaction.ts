import { z, ZodType } from 'zod';
import {
	SolanaSignAndSendTransaction,
	type SolanaSignAndSendTransactionFeature,
	type SolanaSignAndSendTransactionMethod,
	type SolanaSignAndSendTransactionInput,
	type SolanaSignAndSendTransactionOutput,
	type SolanaSignAndSendTransactionOptions
} from '@solana/wallet-standard-features';
import {
	SolanaSignTransactionInputSchema,
	SolanaSignTransactionOptionsSchema,
	SolanaTransactionCommitmentSchema,
	SolanaTransactionVersionSchema
} from './signTransaction';
import { IdentifierStringSchema } from '../../identifier';

//? It might be better to use extend or merge to return a ZodObject type instead of a ZodIntersection type
const SolanaSignAndSendTransactionOptionsSchema: ZodType<SolanaSignAndSendTransactionOptions> =
	SolanaSignTransactionOptionsSchema.and(
		z.object({
			mode: z.enum(['parallel', 'serial']).optional(),
			commitment: SolanaTransactionCommitmentSchema.optional(),
			skipPreflight: z.boolean().optional(),
			maxRetries: z.number().int().positive().optional()
		})
	);

const SolanaSignAndSendTransactionInputSchema: ZodType<SolanaSignAndSendTransactionInput> =
	SolanaSignTransactionInputSchema.extend({
		chain: IdentifierStringSchema,
		options: SolanaSignAndSendTransactionOptionsSchema.optional()
	});

const SolanaSignAndSendTransactionOutputSchema: ZodType<SolanaSignAndSendTransactionOutput> =
	z.object({ signature: z.instanceof(Uint8Array).readonly() });

const SolanaSignAndSendTransactionMethodSchema: ZodType<SolanaSignAndSendTransactionMethod> = z
	.function()
	.args()
	.returns(z.promise(z.array(SolanaSignAndSendTransactionOutputSchema)));

export const SolanaSignAndSendTransactionFeatureSchema: ZodType<SolanaSignAndSendTransactionFeature> =
	z.object({
		[SolanaSignAndSendTransaction]: z.object({
			version: z.enum(['1.0.0']),
			supportedTransactionVersions: z.array(SolanaTransactionVersionSchema),
			signAndSendTransaction: SolanaSignAndSendTransactionMethodSchema
		})
	});