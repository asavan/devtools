import * as OTPAuth from "otpauth";

import { TOTP } from "totp-generator";

const secret_word = process.env.USER_KEY;

{
    const totp = new OTPAuth.TOTP({
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
        secret: secret_word, // or `OTPAuth.Secret.fromBase32("NB2W45DFOIZA")` or `new OTPAuth.Secret()`
    });

    const token = totp.generate();


    console.log(token);
}

{
    const { otp, expires } = TOTP.generate(secret_word);
    console.log(otp, new Date(expires));
}
