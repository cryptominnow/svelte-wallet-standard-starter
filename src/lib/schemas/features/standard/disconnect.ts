import { z, ZodType } from 'zod';
import {
	StandardDisconnect,
	type StandardDisconnectFeature,
	type StandardDisconnectMethod
} from '@wallet-standard/features';

const StandardDisconnectMethodSchema: ZodType<StandardDisconnectMethod> = z
	.function()
	.returns(z.promise(z.void()));

export const StandardDisconnectFeatureSchema: ZodType<StandardDisconnectFeature> = z.object({
	[StandardDisconnect]: z.object({
		version: z.enum(['1.0.0']),
		disconnect: StandardDisconnectMethodSchema
	})
});