# 示例学习：transfer_coin.ts

## 示例说明

本示例会创建两个账号（Alice 和 Bob），并向 Alice 账号领水，然后 Alice 向 Bob 进行转账。

## 示例来源

https://github.com/aptos-labs/aptos-ts-sdk/blob/main/examples/typescript/transfer_coin.ts

## 运行效果

```bash
$ npm run transfer_coin

> ts-test@1.0.0 transfer_coin
> ts-node transfer_coin.ts

This example will create two accounts (Alice and Bob), fund Alice, and transfer between them using transferCoinTransaction.
=== Addresses ===

Alice's address is: 0x740b7c81913e7ebff0ae610d468b6db46ba04267685234cc792c3c335b64f64c
Bob's address is: 0xc7ac915a9ebd1f0a1bda1b682b2127c549036de015f07044641095bb23f544ea

=== Funding accounts ===


=== Initial Balances ===

Alice's balance is: 100000000
Bob's balance is: 0

=== Transfer 1000000 from Alice to Bob ===

Committed transaction: 0x19c20fa1364ef1f7fe0b95644ec24984054196f286496fa3d71e7bacca54873b

=== Balances after transfer ===

Alice's balance is: 98900100
Bob's balance is: 1000000
```

## SDK 学习

### (1) 初始化客户端

```tsx
import {
  Account,
  AccountAddress,
  Aptos,
  AptosConfig,
  Network,
  NetworkToNetworkName,
} from "@aptos-labs/ts-sdk";

const ALICE_INITIAL_BALANCE = 100_000_000;
const BOB_INITIAL_BALANCE = 0;
const TRANSFER_AMOUNT = 1_000_000;

// Setup the client
const APTOS_NETWORK: Network =
  NetworkToNetworkName[process.env.APTOS_NETWORK ?? Network.TESTNET];
const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);
```

### (2) 创建测试账号

```tsx
// Create two accounts
const alice = Account.generate();
const bob = Account.generate();

console.log("=== Addresses ===\n");
console.log(`Alice's address is: ${alice.accountAddress}`);
console.log(`Bob's address is: ${bob.accountAddress}`);
```

### (3) Alice 账号领水

```tsx
// Fund the accounts
console.log("\n=== Funding accounts ===\n");

// Fund alice account
await aptos.fundAccount({
  accountAddress: alice.accountAddress,
  amount: ALICE_INITIAL_BALANCE,
});

// Show the balances
console.log("\n=== Initial Balances ===\n");
const aliceBalance = await balance("Alice", alice.accountAddress);
const bobBalance = await balance("Bob", bob.accountAddress);

if (aliceBalance !== ALICE_INITIAL_BALANCE)
  throw new Error("Alice's balance is incorrect");
if (bobBalance !== BOB_INITIAL_BALANCE)
  throw new Error("Bob's balance is incorrect");
```

### (4) Alice 向 Bob 转账

```tsx
// Transfer between users
console.log(`\n=== Transfer ${TRANSFER_AMOUNT} from Alice to Bob ===\n`);
const transaction = await aptos.transferCoinTransaction({
  sender: alice.accountAddress,
  recipient: bob.accountAddress,
  amount: TRANSFER_AMOUNT,
});

const pendingTxn = await aptos.signAndSubmitTransaction({
  signer: alice,
  transaction,
});
const response = await aptos.waitForTransaction({
  transactionHash: pendingTxn.hash,
});
console.log(`Committed transaction: ${response.hash}`);
```

### (5) 验证转账结果

```tsx
console.log("\n=== Balances after transfer ===\n");
const newAliceBalance = await balance(
  "Alice",
  alice.accountAddress,
  BigInt(response.version)
);
const newBobBalance = await balance("Bob", bob.accountAddress);

// Bob should have the transfer amount
if (newBobBalance !== TRANSFER_AMOUNT + BOB_INITIAL_BALANCE)
  throw new Error("Bob's balance after transfer is incorrect");

// Alice should have the remainder minus gas
if (newAliceBalance >= ALICE_INITIAL_BALANCE - TRANSFER_AMOUNT)
  throw new Error("Alice's balance after transfer is incorrect");
```

### (6) 查询账户余额方法封装

```tsx
const balance = async (aptos: Aptos, name: string, address: AccountAddress) => {
  type Coin = { coin: { value: string } };
  const resource = await aptos.getAccountResource<Coin>({
    accountAddress: address,
    resourceType: COIN_STORE,
  });
  const amount = Number(resource.coin.value);

  console.log(`${name}'s balance is: ${amount}`);
  return amount;
};
```
