# TypeScript SDK Quickstart

## 学习材料

https://aptos.dev/en/build/sdks/ts-sdk/quickstart

## 工程初始化

```bash
$ mkdir ts_sdk_quickstart && cd ts_sdk_quickstart

$ pnpm init && \
    pnpm add -D typescript @types/node ts-node && \
    npx tsc --init && \
    mkdir src && \
    echo 'async function example() { console.log("Running example!")}; example()' > src/quickstart.ts
```

- **测试**

```bash
$ pnpx ts-node src/quickstart.ts
Running example!
```

## 安装 Aptos TS SDK

```bash
$ pnpm add @aptos-labs/ts-sdk

$ cat package.json
{
  "name": "ts_sdk_quickstart",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^22.5.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.4"
  },
  "dependencies": {
    "@aptos-labs/ts-sdk": "^1.27.1"
  }
}
```

## 获取用户创建模块信息

```js
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

async function example() {
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  const modules = await aptos.getAccountModules({
    accountAddress:
      "0xcb3303e6b96a1a666347bd06e27d24cc0cb09e204fedb6223a7bc9091dc49022",
  });

  console.log(JSON.stringify(modules, null, 2));
}

example();
```

## 创建账号并领水

```js
import {
  Account,
  Aptos,
  AptosConfig,
  Network,
  AccountAddress,
} from "@aptos-labs/ts-sdk";

const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;
const ALICE_INITIAL_BALANCE = 100_000_000;
const BOB_INITIAL_BALANCE = 100;

async function createAndFundAccount(aptos: Aptos, initialBalance: number) {
  const account: Account = Account.generate();

  await aptos.fundAccount({
    accountAddress: account.accountAddress,
    amount: initialBalance,
  });

  return account;
}

async function getAccountBalance(aptos: Aptos, accountAddress: AccountAddress) {
  const accountBalance = await aptos.getAccountResource({
    accountAddress: accountAddress,
    resourceType: COIN_STORE,
  });
  return Number(accountBalance.coin.value);
}

async function example() {
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  const alice = await createAndFundAccount(aptos, ALICE_INITIAL_BALANCE);
  const bob = await createAndFundAccount(aptos, BOB_INITIAL_BALANCE);
  console.log(`alice account: ${alice.accountAddress}`);
  console.log(`bob account: ${bob.accountAddress}`);

  console.log("\n=== Balances ===");
  const aliceBalance = await getAccountBalance(aptos, alice.accountAddress);
  console.log(`Alice's balance is: ${aliceBalance}`);

  const bobBalance = await getAccountBalance(aptos, bob.accountAddress);
  console.log(`Bob's balance is: ${bobBalance}`);
}

example();

// Output:
// alice account: 0x7c36a18406f432fc752df9542d95c08ae299d5a8175614381c7778eafe0954e6
// bob account: 0xc6705ad2cc5435103e59dc9144d5c1ea7b0d99d535d5a4a10bc1c0b32cf52337

// === Balances ===
// Alice's balance is: 100000000
// Bob's balance is: 100
```
