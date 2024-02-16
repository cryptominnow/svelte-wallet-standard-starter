import { z, ZodType } from 'zod';
import {
	StandardEvents,
	type StandardEventsFeature,
	type StandardEventsOnMethod,
	type StandardEventsListeners,
	type StandardEventsNames,
	type StandardEventsChangeProperties
} from '@wallet-standard/features';
import { WalletSchema } from '../../wallet';

const StandardEventsPropertiesSchema: ZodType<StandardEventsChangeProperties> = z.object({
	chains: WalletSchema.shape.chains.optional(),
	features: WalletSchema.shape.features.optional(),
	accounts: WalletSchema.shape.accounts.optional()
});

// const StandardEventsNamesSchema: ZodType<StandardEventsNames> = z.enum(['change']);

// should this depend on a StandardEventsNamesSchema? It would be a bit awkward but match the source better, and maybe have better inferences
const StandardEventListenersSchema: ZodType<StandardEventsListeners> = z.object({
	change: z.function().args(StandardEventsPropertiesSchema).returns(z.void())
});

// the function takes two arguments in pairs. The first argument is the event name, and the second argument is the corresponding listener.

/**
 * so key/value pairs as function arguments...
 * 
 * arg0: event name
 * arg1: corresponding event listener
 * 
 * i could do keyof StandardEventListenersSchema, or 
 */
const StandardEventsOnMethodSchema: ZodType<StandardEventsOnMethod> = z
	.function()
	.args()
	.returns(z.function());

export const StandardEventsFeatureSchema: ZodType<StandardEventsFeature> = z.object({
	[StandardEvents]: z.object({
		version: z.enum(['1.0.0']),
		on: StandardEventsOnMethodSchema
	})
});