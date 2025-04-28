# 示例学习：keyless.ts

## 示例说明

本示例用于展示 Aptos 无密钥帐户的创建和转账。

Aptos Keyless 允许用户使用他们现有 OpenID Connect (OIDC) 帐户（即他们在 Google、GitHub 或 Apple 等 OIDC 提供商的 Web2 帐户）进行保护，而不是使用传统的密钥或助记词。

## 示例来源

https://github.com/aptos-labs/aptos-ts-sdk/blob/main/examples/typescript/keyless.ts

## 运行效果

```bash
$ ts-node examples/typescript/keyless.ts

=== Keyless Account Example ===

https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=openid&access_type=offline&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow&nonce=17467935072969263488480768409145005791958785027130051114412344202040832217364

1. Open the link above
2. Log in with your Google account
3. Click 'Exchange authorization code for tokens
4. Copy the 'id_token' - (toggling 'Wrap lines' option at the bottom makes this easier)

Paste the JWT (id_token) token here and press enter: eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYzOTI3OTA2ODg4MDcyMjE5ODkiLCJhdF9oYXNoIjoieFVZN3JDVWxuRm8wTDl6dF9aN3dmdyIsIm5vbmNlIjoiMTc0Njc5MzUwNzI5NjkyNjM0ODg0ODA3Njg0MDkxNDUwMDU3OTE5NTg3ODUwMjcxMzAwNTExMTQ0MTIzNDQyMDIwNDA4MzIyMTczNjQiLCJpYXQiOjE3MjczNDc0OTAsImV4cCI6MTcyNzM1MTA5MH0.eAhUw2upTky71FkPwdM1AM3ZUbVvZB4ZI491QSF1DSNk7IcVTLiqzpApW786LA1b9_iFgVK0CCec-n6qWmt1iHUK2nC9ljP7w9A77gQXlhCUBig3lVBx-OE74AUTcGkZ-6tkTOKXEHo7O2jtlCCEX_X8Cm-h_z7WyM5119KWIup1roX8r9ASnX9XEeVB93fCkRIxFTrDOmoHEkyknG_0zlfUP-OILPuqdudP5lTyoGIN48epSdYrx1bPVDiy-qfiv0TEQ1i7fdV51vzgzDXKjGvHLx4K8qWucPHsD1WgVxasFbRcjXbWEjACn-c_-L5ec3XlHffjJu9IKDTTTZHGuA
=== Addresses ===

Alice's keyless account address is: 0x6312a314941e675c71b491ffb8b8bd1a799bb57ee276b8f58f2213f5ae6a298c
Alice's nonce is: 17467935072969263488480768409145005791958785027130051114412344202040832217364
Alice's ephem pubkey is: 0x0020208f671cecff3f94fd01f0d492eadac3ed660e344e0cd6e0844019e0c4779c1b
Bob's address is: 0x563ab13d7709797e67cd2c07442d1ebfa7ed8eb457fcbc85102d6d52aa5d8b70

=== Funding accounts ===


=== Balances ===

Alice's balance is: 199985900
Bob's balance is: 100
Committed transaction: 0x87e430811df0537e25327fd296cfe8efc596dc31ebc6758587a3571287c4b7bb

=== Balances after transfer ===

Alice's balance is: 199971800
Bob's balance is: 10100
```

## SDK 学习

### (1) 初始化客户端

```tsx
import {
  Account,
  AccountAddress,
  Aptos,
  AptosConfig,
  EphemeralKeyPair,
  Network,
} from "@aptos-labs/ts-sdk";
import * as readlineSync from "readline-sync";

const COIN_STORE = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";
const ALICE_INITIAL_BALANCE = 100_000_000;
const BOB_INITIAL_BALANCE = 100;
const TRANSFER_AMOUNT = 10_000;

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);
```

### (2) 创建 Alice 临时密钥

```tsx
// Generate the ephemeral (temporary) key pair that will be used to sign transactions.
const aliceEphem = EphemeralKeyPair.generate();
```

### (3) 登陆 Alice 谷歌账户获取 JWT

```tsx
const link = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=openid&access_type=offline&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow&nonce=${aliceEphem.nonce}`;
console.log(`${link}\n`);

console.log("1. Open the link above");
console.log("2. Log in with your Google account");
console.log("3. Click 'Exchange authorization code for tokens");
console.log(
  "4. Copy the 'id_token' - (toggling 'Wrap lines' option at the bottom makes this easier)\n"
);

function inputJwt(): string {
  const jwt: string = readlineSync.question(
    "Paste the JWT (id_token) token here and press enter: ",
    {
      hideEchoBack: false,
    }
  );
  return jwt;
}

const jwt = inputJwt();
```

### (4) 使用 JWT 及 Alice 临时密钥创建 Keyless 账户密钥对

```tsx
// Derive the Keyless Account from the JWT and ephemeral key pair.
const alice = await aptos.deriveKeylessAccount({
  jwt,
  ephemeralKeyPair: aliceEphem,
});

console.log("=== Addresses ===\n");
console.log(`Alice's keyless account address is: ${alice.accountAddress}`);
console.log(`Alice's nonce is: ${aliceEphem.nonce}`);
console.log(`Alice's ephem pubkey is: ${aliceEphem.getPublicKey().toString()}`);
```

### (5) 创建传统 Bob 账号并分别领水

```tsx
const bob = Account.generate();
console.log(`Bob's address is: ${bob.accountAddress}`);

// Fund the accounts
console.log("\n=== Funding accounts ===\n");

await aptos.fundAccount({
  accountAddress: alice.accountAddress,
  amount: ALICE_INITIAL_BALANCE,
});

await aptos.fundAccount({
  accountAddress: bob.accountAddress,
  amount: BOB_INITIAL_BALANCE,
  options: { waitForIndexer: false },
});

console.log("\n=== Balances ===\n");
const aliceBalance = await balance(aptos, "Alice", alice.accountAddress);
const bobBalance = await balance(aptos, "Bob", bob.accountAddress);
```

### (6) Alice 给 Bob 进行转账

```tsx
// Transfer between users
const transaction = await aptos.transferCoinTransaction({
  sender: alice.accountAddress,
  recipient: bob.accountAddress,
  amount: TRANSFER_AMOUNT,
});

const committedTxn = await aptos.signAndSubmitTransaction({
  signer: alice,
  transaction,
});

await aptos.waitForTransaction({ transactionHash: committedTxn.hash });
console.log(`Committed transaction: ${committedTxn.hash}`);
```

### (7) 查看转账后余额

```tsx
console.log("\n=== Balances after transfer ===\n");
const newAliceBalance = await balance(aptos, "Alice", alice.accountAddress);
const newBobBalance = await balance(aptos, "Bob", bob.accountAddress);

// Bob should have the transfer amount
if (TRANSFER_AMOUNT !== newBobBalance - bobBalance)
  throw new Error("Bob's balance after transfer is incorrect");

// Alice should have the remainder minus gas
if (TRANSFER_AMOUNT >= aliceBalance - newAliceBalance)
  throw new Error("Alice's balance after transfer is incorrect");
```
