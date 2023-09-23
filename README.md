# aezeed-bip86

Generate Taproot (BIP86) HD addresses using a BIP32 root key.

## introduction

There was a well known procedure to recover onchain funds of a LND wallet. Because LND uses aezeed mnemonics, this was not straight forward and required two tools:

- [guggero.github.io/cryptography-toolkit](https://guggero.github.io/cryptography-toolkit/#!/)
- [github.com/iancoleman/bip39](https://github.com/iancoleman/bip39)

The method is described here:
[Restore LND onchain funds in Electrum](https://www.lightningnode.info/technicals/restorelndonchainfundsinelectrum)

In short, the toolkit is used to translate the aezeed mnemonics to a `HD node root key base58` for `BTC (Bitcoin legacy, BIP32/44)`. Then, in the `bip39` tool, paste this into the `BIP32 Root Key` field, open the tab `BIP84` and copy the generated `Account Extended Private Key` which can be used to open the wallet in Electrum.
In the meantime LND went from Nested SegWit, to Native SegWit, to Taproot and at this moment in time, the BIP39 tool and Electrum are lagging behind. I wrote this fiddle to get grip on my current onchain balance in LND.
The previous method is not abandoned and maybe the developers of the BIP39 tool and Electrum find time to get Taproot implemented and making this fiddle obsolete:

- Convert the aezeed mnemonic to a HD node root key following the previous instructions.
- Edit the script `index.js` or use an environment variable `BIP32ROOTKEY` to set `bip32RootKey`
- Run the script (see below)
- Use the `account private key` or `account public key` in a wallet with Taproot import capabilities i.e. Sparrow

> [!WARNING]
> Don't use these tools online but copy them to your local drive. If you care about your security, disconnect the internet, or even use an air-gapped computer.

## requirements

- git
- nodejs
- faith and a good mood

## installation

```bash
git clone https://github.com/beinardus/aezeed-bip86.git
cd aezeed-bip86
npm i
node src/index.js
```

## output

The account keys, the first 5 primary addresses, the first 5 change addresses. All acompanied with their private keys.

```bash
account private key:
xprv9xgqHN7yz9MwCkxsBPN5qetuNdQSUttZNKw1dcYTV4mkaAFiBVGQziHs3NRSWMkCzvgjEe3n9xV8oYywvM8at9yRqyaZVz6TYYhX98VjsUk

account public key:
xpub6BgBgsespWvERF3LHQu6CnqdvfEvtMcQjYrcRzx53QJjSxarj2afYWcLteoGVky7D3UKDP9QyrLprQ3VCECoY49yfdDEHGCtMMj92pReUsQ

primary addresses:
bc1p5cyxnuxmeuwuvkwfem96lqzszd02n6xdcjrs20cac6yqjjwudpxqkedrcr | KyRv5iFPHG7iB5E4CqvMzH3WFJVhbfYK4VY7XAedd9Ys69mEsPLQ
bc1p4qhjn9zdvkux4e44uhx8tc55attvtyu358kutcqkudyccelu0was9fqzwh | L1jhNnZZAAAppoSYQuaAQEj935VpmishMomuWXgJ3Qy5HNqkhhus
bc1p0d0rhyynq0awa9m8cqrcr8f5nxqx3aw29w4ru5u9my3h0sfygnzs9khxz8 | L4d5yZaEd1ZtwDEake2wCzAxgNKX2edBEu1V8gfoersJX27HxsvH
bc1py0vryk8aqusz65yzuudypggvswzkcpwtau8q0sjm0stctwup0xlqkkxler | Kx4enuNR3WE9bmFtoKAh1RwV17V1CUj2Pke9Jgbcjn8tS2diPTKi
bc1pjpp8nwqvhkx6kdna6vpujdqglvz2304twfd308ve5ppyxpmcjufs7k6xyr | L44NjkdBgdLNYPZKw92Dzx67Y7Ri4tfxossuWXABWyCFPoYjAYzd

change addresses:
bc1p3qkhfews2uk44qtvauqyr2ttdsw7svhkl9nkm9s9c3x4ax5h60wqwruhk7 | KzsCLFtWKpeNKMHFyHKT8vGRuGQxEY8CQjgLcEj14C8xK2PyEFeN
bc1ptdg60grjk9t3qqcqczp4tlyy3z47yrx9nhlrjsmw36q5a72lhdrs9f00nj | L3x6w9Mw2cYJoHgTvPHq9mEtrDpQRV3sV9t2qQJ8GVf3sMaLWSCY
bc1pgcwgsu8naxp7xlp5p7ufzs7emtfza2las7r2e7krzjhe5qj5xz2q88kmk5 | L4FCQYVvRRNDqUe8D4tDGAAK9jvhJKyyQDXDBk7wnCEXzf6VMB8U
bc1pmfz8mvmmqhlw58hmfa6h6au0ulglhjhzzj2628kn95eqtc20rp6s28077a | KxMq6nJtG372rsLVjfgysbkMZ99KAZhE2ywb2cZ7iifsf5SAXsgc
bc1p7j0q2qrex3pm4hat5lwyjez8tf3jwq0rxdexxted37ddzhck492qas3wav | KxB2tZ5fF9LfPaTE61QHmsBwbUguEdht1bbbHBh9ULc3pU2iLkqN
```

## use in Sparrow

- In `settings` choose `Script type`:`Taproot (P2TR)`
- Click `xPub / Watch only wallet`
- Change `Derivation` to `m/86'/0'/0'/0`
- Paste the account key into `xpub`

## use in Sparrow (full wallet import)

This fiddle is already obsolete if you want to use the full wallet functionality.

- Create a new Taproot wallet by selecting `Script Type` `Taproot (P2TR)`
- Use the option `New or Imported Software Wallet`.
- Choose the option `Master Private Key (BIP32)`
- Paste the `HD node root key base58` obtained with the Cryptography Toolkit
- Select derivation path `m/86'/0'/0'`

## checking addresses in LND

Show all the onchain addresses used in LND grouped by address type.

```
lncli wallet addresses list
```

## credits

- Oliver Gugger (Cryptography Toolkit)
- Ian Coleman (BIP39 toolkit)
- Anderson-Juhasc (unit tests for BIP86)
