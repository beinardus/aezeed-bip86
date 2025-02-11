const { BIP32Factory } = require("bip32");
const ecc = require("tiny-secp256k1");
const BIP86 = require("bip86");
const argv = require("minimist")(process.argv.slice(2));

const bip32 = BIP32Factory(ecc);

// use Cryptography Toolkit to convert LND aezeed to HD node root key (BIP32/44)
// Note this root key is from the BIP86 tests: https://github.com/bitcoin/bips/blob/master/bip-0086.mediawiki
// Your code goes here:
const bip32RootKey =
  process.env.BIP32ROOTKEY ||
  argv._[0] ||
  "xprv9s21ZrQH143K3GJpoapnV8SFfukcVBSfeCficPSGfubmSFDxo1kuHnLisriDvSnRRuL2Qrg5ggqHKNVpxR86QEC8w35uxmGoggxtQTPvfUu";

const rootKey = bip32.fromBase58(bip32RootKey);

// First derived Account Extended Private Key with
// https://github.com/iancoleman/bip39 by tweaking the BIP44 calculation
// Now using calcBip32ExtendedKey (a stripped version of this library)
function calcBip32ExtendedKey() {
  // m/86'/0'/0'
  pathBits = [86, 0, 0];

  // all parts hardened (else use derive())
  return pathBits.reduce((a, index) => a.deriveHardened(index), rootKey);
}

const accountExtendedKey = calcBip32ExtendedKey();
const accountXprv = accountExtendedKey.toBase58();

const account0 = new BIP86.fromXPrv(accountXprv);

// Account wallets can be imported in Sparrow wallet using derivation path m/86'/0'/0'/0
console.log("BIP32 root key:");
console.log(bip32RootKey);
console.log("account private key:");
console.log(account0.getAccountPrivateKey());
console.log("\naccount public key:");
console.log(account0.getAccountPublicKey());

// Note: 2 parm is "is_internal == change address"
console.log("\nprimary addresses:");
for (let i = 0; i < 25; i++)
  console.log(
    `${account0.getAddress(i, false)} | ${account0.getPrivateKey(i, false)}`
  );

console.log("\nchange addresses:");
for (let i = 0; i < 25; i++)
  console.log(
    `${account0.getAddress(i, true)} | ${account0.getPrivateKey(i, true)}`
  );
