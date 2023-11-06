import {type Encoding as CryptoEncoding} from 'node:crypto';
import {type LiteralUnion} from 'type-fest';

export type Encoding = CryptoEncoding | 'buffer';
export type Algorithm = LiteralUnion<'md5' | 'sha1' | 'sha256' | 'sha512', string>;

export type Options = {
	/**
	The encoding of the returned hash.

	@default 'hex'
	*/
	readonly encoding?: Encoding;

	/**
	_Don't use `'md5'` or `'sha1'` for anything sensitive. [They're insecure.](http://googleonlinesecurity.blogspot.no/2014/09/gradually-sunsetting-sha-1.html)_

	@default 'sha512'
	*/
	readonly algorithm?: Algorithm;
};

export type BufferOptions = {
	readonly encoding: 'buffer';
} & Options;

/**
Get the hash of an object.

The output is deterministic for repeated runs on the same Node.js / browser version. It should also be fairly deterministic across JavaScript engines. However, because the stability of grapheme clusters across Unicode versions is not guaranteed, determinism cannot be guaranteed across JavaScript engines and versions. There are also other factors that can make it nondeterministic, like values with floating point numbers and dates.

@example
```
import hashObject from 'hash-object';

hashObject({'🦄': '🌈'}, {algorithm: 'sha1'});
//=> '3de3bc784035b559784fc276f47493d60555fba3'
```
*/
export default function hashObject(
	object: Record<string, any>,
	options: BufferOptions
): Uint8Array;
export default function hashObject(
	object: Record<string, any>,
	options?: Options
): string;
