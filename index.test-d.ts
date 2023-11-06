/* eslint-disable @typescript-eslint/naming-convention */
import {expectType} from 'tsd';
import hashObject, {type Options} from './index.js';

const options: Options = {};

expectType<string>(hashObject({'🦄': '🌈'}));
expectType<string>(
	hashObject({'🦄': '🌈'}, {algorithm: 'sha1', encoding: 'base64'}),
);
expectType<Uint8Array>(hashObject({'🦄': '🌈'}, {encoding: 'buffer'}));
expectType<Uint8Array>(
	hashObject({'🦄': '🌈'}, {encoding: 'buffer', algorithm: 'sha1'}),
);
