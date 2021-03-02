#!/usr/bin/env node
const fs = require('fs')
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const meow = require('meow');

const run = () => {
  const cli = meow(`
    Usage
        $ jwt-decorder jwtString -s secret
    Options
      --secret, -s Secret string for HS256 argorism
      --publicKey, p Public key file path for RS256 argorism
`, {
    flags: {
      secret: {
        type: 'string',
        alias: 's'
      },
      publicKey: {
        type: 'string',
        alias: 'p'
      }
    }
  });
  const jwtString = cli.input[0];
  if (!jwtString) {
    console.error(chalk.bold.red('Error'), 'secret or publicKey is needed');
    cli.showHelp();
    return
  }

  const [header, payload, signature] = jwtString.split('.');
  console.log(chalk.bold.green('=== Header ==='))
  console.log(chalk.gray(header))
  console.log(chalk.bold.gray(JSON.stringify(JSON.parse(Buffer.from(header, 'base64').toString('ascii')), null, 2)));
  console.log(chalk.bold.green('=== Payload ==='))
  console.log(chalk.gray(payload))
  console.log(chalk.bold.gray(JSON.stringify(JSON.parse(Buffer.from(payload, 'base64').toString('ascii')), null, 2)));

  const {
    secret,
    publicKey
  } = cli.flags;
  let verifyProcess;
  if (secret) {
    verifyProcess = new Promise((resolve, reject) => {
      jwt.verify(jwtString, secret, function(err, decoded) {
        if (err) {
          reject(err)
        } else {
          resolve(decoded)
        }
      });
    })
  } else if (publicKey) {
    verifyProcess = new Promise((resolve, reject) => {
      fs.readFile(publicKey, (err1, cert) => {
        if (err1) {
          return reject(err1);
        }
        jwt.verify(jwtString, cert, function(err2, decoded) {
          if (err2) {
            reject(err2)
          } else {
            resolve(decoded)
          }
        });
      });
    })
  } else {
    console.warn(chalk.bold.red('Warn'), 'Not verified, secret or publicKey is nessessary to verify signature');
    return
  }
  verifyProcess
  .then((decoded) => {
    console.log(chalk.bold.green('Signature is verified'));
  })
  .catch((e) => {
    console.error(chalk.bold.red('Failed to verify signature'));
    console.log(e)
  })
}

module.exports = {run}
