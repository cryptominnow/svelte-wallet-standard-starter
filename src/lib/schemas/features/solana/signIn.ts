import { z, ZodType } from 'zod';

import {
	SolanaSignIn,
	type SolanaSignInFeature,
	type SolanaSignInInput,
	type SolanaSignInOutput,
	type SolanaSignInMethod
} from '@solana/wallet-standard-features';
import { WalletAccountSchema } from '../../wallet';

export const SignInInputSchema: ZodType<SolanaSignInInput> = z.object({
	// All params must match EIP-4361
	domain: z.string().optional(),
	address: z.string().optional(),
	statement: z.string().optional(),
	uri: z.string().optional(),
	version: z.string().optional(),
	chainId: z.string().optional(),
	nonce: z.string().optional(),
	issuedAt: z.string().optional(),
	expirationTime: z.string().optional(),
	notBefore: z.string().optional(),
	requestId: z.string().optional(),
	resources: z.array(z.string()).optional()
});

export const SolanaSignInOutputSchema: ZodType<SolanaSignInOutput> = z.object({
	account: WalletAccountSchema,
	signedMessage: z.instanceof(Uint8Array),
	signature: z.instanceof(Uint8Array),
	signatureType: z.enum(['ed25519']).optional()
});

export const SolanaSignInMethodSchema: ZodType<SolanaSignInMethod> = z
	.function()
	.args()
	.returns(z.promise(z.array(SolanaSignInOutputSchema)));

export const SolanaSignInFeatureSchema: ZodType<SolanaSignInFeature> = z.object({
	[SolanaSignIn]: z.object({
		version: z.enum(['1.0.0']),
		signIn: SolanaSignInMethodSchema
	})
});