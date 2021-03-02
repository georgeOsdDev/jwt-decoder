# Decode [jwt](https://jwt.io/) at local

## Usage

```
// just decode
jwt-decoder <jwtString>

// verify signature with HS-256 secret
jwt-decoder <jwtString> -s <secret>

// verify signature with RS-256 public key
jwt-decoder <jwtString> -p <path/to/publicKey>
```

## Example

```
$ npx github:georgeOsdDev/jwt-decoder eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA
npx: installed 87 in 7.003s
=== Header ===
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9
{
  "alg": "RS256",
  "typ": "JWT"
}
=== Payload ===
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
Warn Not verified, secret or publicKey is nessessary to verify signature
```
