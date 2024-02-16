import { z, ZodType } from 'zod';

import type { IdentifierArray, IdentifierRecord, IdentifierString } from '@wallet-standard/base';


// a string with two parts separated by a colon
// todo: to match template string literal use z.custom (why don't i just use refine tho??)
export const IdentifierStringSchema: ZodType<IdentifierString> = z.string()

export const IdentifierArraySchema: ZodType<IdentifierArray> = z.array(IdentifierStringSchema);

export const IdentifierRecordSchema: ZodType<IdentifierRecord> = z.record(IdentifierStringSchema);