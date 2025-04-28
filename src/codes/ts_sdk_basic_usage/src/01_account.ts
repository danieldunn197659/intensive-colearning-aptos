import {
  Account,
  Ed25519PrivateKey,
  SigningSchemeInput,
} from "@aptos-labs/ts-sdk";

function createAccount() {
  const account1 = Account.generate(); // defaults to Legacy Ed25519
  console.log(`account1: ${account1.accountAddress.toString()}`);

  account1.privateKey.toString;

  const account2 = Account.generate({
    scheme: SigningSchemeInput.Secp256k1Ecdsa,
  }); // Single Sender Secp256k1
  console.log(`account2: ${account2.accountAddress.toString()}`);

  const account3 = Account.generate({
    scheme: SigningSchemeInput.Ed25519,
    legacy: false,
  }); // Single Sender Ed25519
  console.log(`account3: ${account3.accountAddress.toString()}`);

  return account1;
}

function createAccountFromPrivateKey(privateKeyBytes: string) {
  const privateKey = new Ed25519PrivateKey(privateKeyBytes);
  const account = Account.fromPrivateKey({ privateKey });
  console.log(
    `account1 from private key: ${account.accountAddress.toString()}`
  );
}

async function main() {
  const account = createAccount();
  createAccountFromPrivateKey(account.privateKey.toString());
}

main();

// OUTPUT:
// account1: 0x2d7b14974554446317f614737f1f3df32a285c48b44ee3f520d2885ad9ade31a
// account2: 0xd49f49ee44ade9a30dcded76f2b805d683ad9117613ccd95e38b30d586351dbf
// account3: 0xc04102d0a5fdb19ea0ba31c8d7215625a76b1b778167bf58297cdbec1b0cd8e6
// account1 from private key: 0x2d7b14974554446317f614737f1f3df32a285c48b44ee3f520d2885ad9ade31a
