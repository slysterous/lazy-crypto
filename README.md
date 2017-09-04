# lazy-crypto
[![Version npm](https://img.shields.io/npm/v/lazy-crypto.svg?style=flat-square)](https://www.npmjs.com/package/lazy-crypto)[![npm Downloads](https://img.shields.io/npm/dm/lazy-crypto.svg?style=flat-square)](https://www.npmjs.com/package/lazy-crypto)[![Build Status](https://img.shields.io/travis/slysterous/lazy-crypto/master.svg?style=flat-square)](https://travis-ci.org/slysterous/lazy-crypto)[![Dependencies](https://img.shields.io/david/slysterous/lazy-crypto.svg?style=flat-square)](https://david-dm.org/slysterous/lazy-crypto)
[![Known Vulnerabilities](https://snyk.io/test/github/slysterous/lazy-crypto/badge.svg)](https://snyk.io/test/github/slysterous/lazy-crypto)
[![NPM](https://nodei.co/npm/lazy-crypto.png?downloads=true&downloadRank=true)](https://nodei.co/npm/lazy-crypto/)

Crypto utilities for safe password and token handling.

## Installation

```bashp
npm install lazy-crypto
```
## Usage

The LazyCrypto contructor takes no arguements.

``` js
var LazyCrypto= new require('lazy-crypto');
var lc= new LazyCrypto();

/*generates a token that contains random characters in the range of
0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ and an expiration date.
Can be used for various verification purposes such as email verification*/
var token=lc.generateVerificationToken(4,10);
//token.expires is the expiration date
//token.token is the verification token string

// generates an X length unique salt
var salt=lazyCrypto.generateSalt(20);
//generates a SHA512 hash with the salt provided
var hash=lazyCrypto.generateSha512Hash('password',salt);
//generates both of the above at the same time
var res=lazyCrypto.generateSha512HashAndSalt('password',20);
//boolean result of SHA512 Hash and Salt validation
var valid=lazyCrypto.validateSha512HashAndSalt("password",res.passwordSalt,res.passwordHash));
