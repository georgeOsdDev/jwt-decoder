# Decode jwt at local

## Usage

```
// just decode
jwt-decoder <jwtString>

// verify signature with HS-256 secret
jwt-decoder <jwtString> -s <secret>

// verify signature with RS-256 public key
jwt-decoder <jwtString> -p <path/to/publicKey>
```
