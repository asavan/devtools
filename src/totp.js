import * as OTPAuth from "otpauth";

import { TOTP } from "totp-generator";

{
let totp = new OTPAuth.TOTP({
  // Provider or service the account is associated with.
  issuer: "GitHub",
  // Account identifier.
  label: "GitHub:asavan",
  // Algorithm used for the HMAC function.
  algorithm: "SHA1",
  // Length of the generated tokens.
  digits: 6,
  // Interval of time for which a token is valid, in seconds.
  period: 30,
  // Arbitrary key encoded in base32 or OTPAuth.Secret instance
  // (if omitted, a cryptographically secure random secret is generated).
  secret: process.env.USER_KEY, // or `OTPAuth.Secret.fromBase32("NB2W45DFOIZA")` or `new OTPAuth.Secret()`
});

let token = totp.generate();


console.log(token);
}

{
    const { otp, expires } = TOTP.generate(process.env.USER_KEY);
    console.log(otp);    
}
