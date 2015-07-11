# hash-obj [![Build Status](https://travis-ci.org/sindresorhus/hash-obj.svg?branch=master)](https://travis-ci.org/sindresorhus/hash-obj)

> Get the hash of an object


## Install

```
$ npm install --save hash-obj
```


## Usage

```js
var hashObj = require('hash-obj');

hashObj({unicorn: 'rainbow'}, {algorithm: 'sha1'});
//=> '7fec50beffde94d15bbb1989f8b31e4096d6a0ab'
```


## API

### hashObj(input, [options])

#### input

*Required*  
Type: `object`

#### options

##### encoding

Type: `string`  
Default: `hex`  
Values: `hex`, `base64`, `buffer`, `binary`

Encoding of the returned hash.

##### algorithm

Type: `string`  
Default: `sha512`  
Values: `md5`, `sha1`, `sha256`, `sha512`, etc *([platform dependent](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm))*

*Don't use `md5` or `sha1` for anything sensitive. [They're insecure.](http://googleonlinesecurity.blogspot.no/2014/09/gradually-sunsetting-sha-1.html)*


## Related

- [hasha](https://github.com/sindresorhus/hasha) - Hashing made simple. Get the hash of a buffer/string/stream/file.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
