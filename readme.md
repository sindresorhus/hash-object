# hash-obj [![Build Status](https://travis-ci.org/sindresorhus/hash-obj.svg?branch=master)](https://travis-ci.org/sindresorhus/hash-obj)

> Get the hash of an object


## Install

```
$ npm install hash-obj
```


## Usage

```js
const hashObject = require('hash-obj');

hashObject({'🦄': '🌈'}, {algorithm: 'sha1'});
//=> '3de3bc784035b559784fc276f47493d60555fba3'
```


## API

### hashObject(object, options?)

#### object

Type: `object`

#### options

Type: `object`

##### encoding

Type: `'hex' | 'base64' | 'buffer' | 'latin1'`<br>
Default: `'hex'`

Encoding of the returned hash.

##### algorithm

Type: `string`<br>
Default: `'sha512'`<br>
Values: `'md5'` `'sha1'` `'sha256'` `'sha512'` etc *([Platform dependent](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm))*

*Don't use `'md5'` or `'sha1'` for anything sensitive. [They're insecure.](http://googleonlinesecurity.blogspot.no/2014/09/gradually-sunsetting-sha-1.html)*


## Related

- [hasha](https://github.com/sindresorhus/hasha) - Hashing made simple. Get the hash of a buffer/string/stream/file.
