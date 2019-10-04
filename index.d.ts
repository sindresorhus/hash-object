/// <reference types="node"/>
import {HexBase64Latin1Encoding} from 'crypto';
import {LiteralUnion} from 'type-fest';

declare namespace hashObject {
	type AlgorithmName = LiteralUnion<
		'md5' | 'sha1' | 'sha256' | 'sha512',
		string
	>;

	interface Options {
		/**
		Encoding of the returned hash.

		@default 'hex'
		*/
		readonly encoding?: HexBase64Latin1Encoding | 'buffer';

		/**
		_Don't use `'md5'` or `'sha1'` for anything sensitive. [They're insecure.](http://googleonlinesecurity.blogspot.no/2014/09/gradually-sunsetting-sha-1.html)_

		@default 'sha512'
		*/
		readonly algorithm?: AlgorithmName;
	}

	interface BufferOptions extends Options {
		readonly encoding: 'buffer';
	}
}

/**
Get the hash of an object.

@example
```
import hashObject = require('hash-obj');

hashObject({'🦄': '🌈'}, {algorithm: 'sha1'});
//=> '3de3bc784035b559784fc276f47493d60555fba3'
```
*/
declare function hashObject(
	object: {[key: string]: any},
	options: hashObject.BufferOptions
): Buffer;
declare function hashObject(
	object: {[key: string]: any},
	options?: hashObject.Options
): string;

export = hashObject;
