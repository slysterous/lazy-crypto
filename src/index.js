/**
 * @module lazy-crypto
 */
'use strict'
//load crypto
const crypto =require('crypto');
/**
* Represents a lazyCrypto istance
* @constructor
*/
 function LazyCrypto(){

 }
/**
* Generates a new salt 
* @memberof LazyCrypto
* @param {number} length - defines the length of the salt that will be generated
* @return {string} - returns the generated salt 
*/
LazyCrypto.prototype.generateSalt=generateSalt;
function generateSalt(length)
{
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
 }

/**
* Generates a SHA512 Hash by using a provided password and a salt, also returns the salt
* @memberof LazyCrypto
* @param {string} password - Password to hash
* @param {strng} salt - Required salt to use on hash creation
* @return {object} - Returns an object containing salt and passwordhash
*/
LazyCrypto.prototype.generateSha512Hash=generateSha512Hash
function generateSha512Hash(password,salt){
var hash=crypto.createHmac('sha512',salt); /** Hashing algorithm sha512 **/
     hash.update(password);
     var value= hash.digest('hex');
     return{
         salt:salt,
         passwordHash:value
     };
}

/**
 * Generates a SHA512 Hash and a salt for the provided password. Returns a hash and a salt
 * @memberof LazyCrypto
 * @param {string} password - Password to hash
 * @param {number} saltlength -defines the to be generated salt length
 * @return {object} containing passwordSalt and passwordHash
 */
LazyCrypto.prototype.generateSha512HashAndSalt=function(password,saltlength){
    var salt=generateSalt(saltlength);
    var passwordData=generateSha512Hash(password,salt);
    return{
        passwordSalt:passwordData.salt,
        passwordHash:passwordData.passwordHash
    }
}

/**
 * Validates if a password is valid
 * @param {string} password - the password to be validated
 * @param {string} salt - the salt used
 * @param {string} passwordHash - the password hash to be checked with the password and the salt
 * @return {boolean} -true or false depending the validation results
 */
LazyCrypto.prototype.validateSha512HashAndSalt=function(password,salt,passwordHash){
     var hash=crypto.createHmac('sha512',salt); /** Hashing algorithm sha512 **/
     hash.update(password);
     var value= hash.digest('hex');
     if(value==passwordHash){
         return true;
     }else{
         return false;
     }
};

/**
 * Generates an email verifiation token that has an expiration date
 * @param {number} hours - defines tha ammount of hours the specific token will be available for
 * @param {length} length - devi
 */
LazyCrypto.prototype.generateVerificationToken=function(hours,length){
    //create random character token
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var token = '';
        for (var i = length; i > 0; --i) {
            token += chars[Math.round(Math.random() * (chars.length - 1))];
        } 
    // create expiration date
    var expires = new Date();
    expires.setHours(expires.getHours() + hours);
    return{
        token: token,
        expires: expires
    }
}


module.exports=LazyCrypto;