import { z, type ZodType } from 'zod';

// type FruitAlphabet = {
// 	A: 'apple';
// 	B: 'banana';
// };

// const foo = z.object({
// 	A: z.literal('apple'),
// 	B: z.literal('banana')
// });

// function blend<Letter extends keyof FruitAlphabet>(letter: Letter, fruit: FruitAlphabet[Letter]) {
// 	console.log(letter, fruit);
// }

// // so this takes in a

// const bar: ZodType<typeof blend> = z.function().refine((fn) => {});

// bar.parse(blend);

// I want to return a UNION of key/value pairs represented as a tuple.
// I guess you could call it pairs or entries.
// This accepts an object

// how do I make K a particular key of O?
type Entry<O extends object> = { [K in keyof O]: [K, O[K]] }[keyof O];


// if data is unknown, I can't actually type this properly right?
function foo(a: string, b: string) {

}

//? Aren't there zod schemas which take multiple parameters?
// I guess the assumption is that you are calling this on ANY value.
// That's kind of annoying tho.

export const entry = z.custom<'hello'>(foo)

const bar = z.function().refine((fn) => {
	
})
