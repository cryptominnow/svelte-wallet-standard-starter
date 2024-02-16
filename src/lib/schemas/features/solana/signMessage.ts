import { z, ZodType } from 'zod';
import {
	SolanaSignMessage,
	type SolanaSignMessageFeature,
	type SolanaSignMessageMethod,
	type SolanaSignMessageInput,
	type SolanaSignMessageOutput
} from '@solana/wallet-standard-features';
import { WalletAccountSchema } from '../../wallet';

const SolanaSignMessageInputSchema: ZodType<SolanaSignMessageInput> = z.object({
	account: WalletAccountSchema,
	message: z.instanceof(Uint8Array)
});

const SolanaSignMessageOutputSchema: ZodType<SolanaSignMessageOutput> = z.object({
	signedMessage: z.instanceof(Uint8Array),
	signature: z.instanceof(Uint8Array),
	signatureType: z.enum(['ed25519']).optional()
});

const SolanaSignMessageMethodSchema: ZodType<SolanaSignMessageMethod> = z
	.function()
	.args()
	.returns(z.promise(z.array(SolanaSignMessageOutputSchema)));

export const SolanaSignMessageFeatureSchema: ZodType<SolanaSignMessageFeature> = z.object({
	[SolanaSignMessage]: z.object({
		//? How does versioning work?? Do they just never expect to change the i/o or something??
		version: z.enum(['1.1.0', '1.0.0']),
		signMessage: SolanaSignMessageMethodSchema
	})
});