import { z, ZodType } from 'zod';
import {
	StandardConnect,
	type StandardConnectFeature,
	type StandardConnectInput,
	type StandardConnectOutput,
	type StandardConnectMethod
} from '@wallet-standard/features';
import { WalletAccountSchema } from '../../wallet';

const StandardConnectInputSchema: ZodType<StandardConnectInput> = z.object({
	silent: z.boolean().optional()
});
const StandardConnectOutputSchema: ZodType<StandardConnectOutput> = z.object({
	accounts: z.array(WalletAccountSchema)
});
const StandardConnectMethodSchema: ZodType<StandardConnectMethod> = z
	.function()
	.args(StandardConnectInputSchema.optional())
	.returns(z.promise(StandardConnectOutputSchema));

export const StandardConnectFeatureSchema: ZodType<StandardConnectFeature> = z.object({
	[StandardConnect]: z.object({
		version: z.enum(['1.0.0']),
		connect: StandardConnectMethodSchema
	})
});
