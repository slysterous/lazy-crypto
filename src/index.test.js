var expect =require('chai').expect;
var LazyCrypto=require('./index.js');
var lazyCrypto=new LazyCrypto();
describe("lazy-crypto",function(){
    it('Dummy Test', function(){
        expect(lazyCrypto!=null||lazyCrypto!=undefined).to.be.true;
    });
   
});

var token=lazyCrypto.generateVerificationToken(4,10);
describe("Generate Verification Token Test",function(){
    it("Token contains an expiration date",function(){
        expect(token.expires instanceof Date).to.be.true;
    })
    it("Token contains token string",function(){
        expect(token.token!=undefined && token.token!=null);
    });
});

var salt=lazyCrypto.generateSalt(20);
describe("Generate Salt with length 20 Test",function(){
    it("Salt was generated",function(){
        expect(salt!=undefined&&salt!=null).to.be.true;
    })
    it("Salt length is valid",function(){
        expect(salt.length==20).to.be.true;
    })
});
var hash=lazyCrypto.generateSha512Hash('password',salt);
describe("Generate SHA512 Hash with Salt",function(){
    it("Hash was generated",function(){
        expect(hash!=undefined&&hash!=null).to.be.true;
    })
    it("Hash and Salt are present on the result",function(){
        expect(hash.passwordSalt!=undefined&&hash.passwordHash!=null);
    })
    it("Hash and salt are valid!",function(){
        expect(lazyCrypto.validateSha512HashAndSalt("password",salt,hash));
    })
})
describe('Validation of SHA512 Hash with Salt',function(){
   it("Hash and salt are valid!",function(){
        expect(lazyCrypto.validateSha512HashAndSalt("password",salt,hash));
    })
})
var res=lazyCrypto.generateSha512HashAndSalt('password',20);
describe("Generation of SHA 512 Hash along with a Unique Salt",function(){
    it('Hash and Salt Generated',function(){
        expect(res.passwordSalt!=undefined && res.passwordSalt!=null);
    })
    it('Salt generated has correct length',function(){
        expect(res.passwordSalt.length==20)
    })
    it("Hash and salt are valid!",function(){
        expect(lazyCrypto.validateSha512HashAndSalt("password",res.passwordSalt,res.passwordHash));
    })
})

//generateSha512HashAndSalt
  //passwordSalt:passwordData.salt,
    //    passwordHash:passwordData.passwordHash
