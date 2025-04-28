import {
  Account,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  Network,
  SigningSchemeInput,
} from "@aptos-labs/ts-sdk";

async function transaction() {
  console.log(
    "This example will create two accounts (Alice and Bob) and send a transaction transfering APT to Bob's account."
  );

  // 0. Setup the client and test accounts
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  let alice = Account.generate();
  let bob = Account.generate();

  console.log("=== Addresses ===\n");
  console.log(`Alice's address is: ${alice.accountAddress}`);
  console.log(`Bob's address is: ${bob.accountAddress}`);

  console.log("\n=== Funding accounts ===\n");
  await aptos.fundAccount({
    accountAddress: alice.accountAddress,
    amount: 100_000_000,
  });
  await aptos.fundAccount({
    accountAddress: bob.accountAddress,
    amount: 100,
  });
  console.log("Funded Alice and Bob's accounts!");

  // 1. Build
  console.log("\n=== 1. Building the transaction ===\n");
  const transaction = await aptos.transaction.build.simple({
    sender: alice.accountAddress,
    data: {
      // All transactions on Aptos are implemented via smart contracts.
      function: "0x1::aptos_account::transfer",
      functionArguments: [bob.accountAddress, 100],
    },
  });
  console.log("Built the transaction!");

  // 2. Simulate (Optional)
  console.log("\n === 2. Simulating Response (Optional) === \n");
  const [userTransactionResponse] = await aptos.transaction.simulate.simple({
    signerPublicKey: alice.publicKey,
    transaction,
  });
  console.log(userTransactionResponse);

  // 3. Sign
  console.log("\n=== 3. Signing transaction ===\n");
  const senderAuthenticator = aptos.transaction.sign({
    signer: alice,
    transaction,
  });
  console.log("Signed the transaction!");

  // 4. Submit
  console.log("\n=== 4. Submitting transaction ===\n");
  const submittedTransaction = await aptos.transaction.submit.simple({
    transaction,
    senderAuthenticator,
  });

  console.log(`Submitted transaction hash: ${submittedTransaction.hash}`);

  // 5. Wait for results
  console.log("\n=== 5. Waiting for result of transaction ===\n");
  const executedTransaction = await aptos.waitForTransaction({
    transactionHash: submittedTransaction.hash,
  });
  console.log(executedTransaction);
}

async function main() {
  transaction();
}

main();

// $ ts-node src/03_transaction.ts
// This example will create two accounts (Alice and Bob) and send a transaction transfering APT to Bob's account.
// === Addresses ===

// Alice's address is: 0x001e858caee9d67b50a97f441b1590c170419905f2fb8d2140803c7e8e22c852
// Bob's address is: 0xa52522c9a1d0d6695e09be57b9605168056173e50a56e2f355385270ab7070e1

// === Funding accounts ===

// Funded Alice and Bob's accounts!

// === 1. Building the transaction ===

// Built the transaction!

//  === 2. Simulating Response (Optional) ===

// {
//   version: '5979042043',
//   hash: '0xa3e7b041ce44d6d4aba88fa76a23ead97ecd064d327608bef3a585b5c5c1de22',
//   state_change_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
//   event_root_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
//   state_checkpoint_hash: null,
//   gas_used: '9',
//   success: true,
//   vm_status: 'Executed successfully',
//   accumulator_root_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
//   changes: [
//     {
//       address: '0x1e858caee9d67b50a97f441b1590c170419905f2fb8d2140803c7e8e22c852',
//       state_key_hash: '0x7f4ad20eb420245733b8128041b91e3723ac16a4105a7d42584484207aa31186',
//       data: [Object],
//       type: 'write_resource'
//     },
//     {
//       address: '0x1e858caee9d67b50a97f441b1590c170419905f2fb8d2140803c7e8e22c852',
//       state_key_hash: '0x940f9bd6c4a7c61733c53d99c83007bbaea16ccb3a9a638f573d1ab7d3647d85',
//       data: [Object],
//       type: 'write_resource'
//     },
//     {
//       address: '0xa52522c9a1d0d6695e09be57b9605168056173e50a56e2f355385270ab7070e1',
//       state_key_hash: '0x820cf5d86aa00653ace8db87a11885e143a73dd04688fa8dcc23556ba3bd23da',
//       data: [Object],
//       type: 'write_resource'
//     },
//     {
//       state_key_hash: '0x6e4b28d40f98a106a65163530924c0dcb40c1349d3aa915d108b4d6cfc1ddb19',
//       handle: '0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca',
//       key: '0x0619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935',
//       value: '0x65b3a042e529be940100000000000000',
//       data: null,
//       type: 'write_table_item'
//     }
//   ],
//   sender: '0x1e858caee9d67b50a97f441b1590c170419905f2fb8d2140803c7e8e22c852',
//   sequence_number: '0',
//   max_gas_amount: '200000',
//   gas_unit_price: '100',
//   expiration_timestamp_secs: '1726236062',
//   payload: {
//     function: '0x1::aptos_account::transfer',
//     type_arguments: [],
//     arguments: [
//       '0xa52522c9a1d0d6695e09be57b9605168056173e50a56e2f355385270ab7070e1',
//       '100'
//     ],
//     type: 'entry_function_payload'
//   },
//   signature: {
//     public_key: '0x0da1e7c9f856094993233fa9b9d0ce434aa192964c2d2a7f9ac0e98db7bef244',
//     signature: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//     type: 'ed25519_signature'
//   },
//   events: [
//     {
//       guid: [Object],
//       sequence_number: '0',
//       type: '0x1::coin::WithdrawEvent',
//       data: [Object]
//     },
//     {
//       guid: [Object],
//       sequence_number: '1',
//       type: '0x1::coin::DepositEvent',
//       data: [Object]
//     },
//     {
//       guid: [Object],
//       sequence_number: '0',
//       type: '0x1::transaction_fee::FeeStatement',
//       data: [Object]
//     }
//   ],
//   timestamp: '1726236042647926'
// }

// === 3. Signing transaction ===

// Signed the transaction!

// === 4. Submitting transaction ===

// Submitted transaction hash: 0xab2aee974223a22ea6a1c24754a939c26a02bc417ac2e595aff8df6bb4e38f58

// === 5. Waiting for result of transaction ===

// {
//   version: '5979042103',
//   hash: '0xab2aee974223a22ea6a1c24754a939c26a02bc417ac2e595aff8df6bb4e38f58',
//   state_change_hash: '0xb983e92f607a266695468412bbbecbb52922aecd8d7b7f2681d0b4e977b1a6a6',
//   event_root_hash: '0xc6c4ffa097c7cf46570289b33ac3f2cd77fa41c72f767781f8122abe0014b583',
//   state_checkpoint_hash: null,
//   gas_used: '9',
//   success: true,
//   vm_status: 'Executed successfully',
//   accumulator_root_hash: '0xb9ddc32e3353a440762f727a57929a9722e87b27398924a3aff6ebc322ff00e5',
//   changes: [
//     {
//       address: '0x1e858caee9d67b50a97f441b1590c170419905f2fb8d2140803c7e8e22c852',
//       state_key_hash: '0x7f4ad20eb420245733b8128041b91e3723ac16a4105a7d42584484207aa31186',
//       data: [Object],
//       type: 'write_resource'
//     },
//     {
//       address: '0x1e858caee9d67b50a97f441b1590c170419905f2fb8d2140803c7e8e22c852',
//       state_key_hash: '0x940f9bd6c4a7c61733c53d99c83007bbaea16ccb3a9a638f573d1ab7d3647d85',
//       data: [Object],
//       type: 'write_resource'
//     },
//     {
//       address: '0xa52522c9a1d0d6695e09be57b9605168056173e50a56e2f355385270ab7070e1',
//       state_key_hash: '0x820cf5d86aa00653ace8db87a11885e143a73dd04688fa8dcc23556ba3bd23da',
//       data: [Object],
//       type: 'write_resource'
//     },
//     {
//       state_key_hash: '0x6e4b28d40f98a106a65163530924c0dcb40c1349d3aa915d108b4d6cfc1ddb19',
//       handle: '0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca',
//       key: '0x0619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935',
//       value: '0x93d3fb1fe629be940100000000000000',
//       data: null,
//       type: 'write_table_item'
//     }
//   ],
//   sender: '0x1e858caee9d67b50a97f441b1590c170419905f2fb8d2140803c7e8e22c852',
//   sequence_number: '0',
//   max_gas_amount: '200000',
//   gas_unit_price: '100',
//   expiration_timestamp_secs: '1726236062',
//   payload: {
//     function: '0x1::aptos_account::transfer',
//     type_arguments: [],
//     arguments: [
//       '0xa52522c9a1d0d6695e09be57b9605168056173e50a56e2f355385270ab7070e1',
//       '100'
//     ],
//     type: 'entry_function_payload'
//   },
//   signature: {
//     public_key: '0x0da1e7c9f856094993233fa9b9d0ce434aa192964c2d2a7f9ac0e98db7bef244',
//     signature: '0x7cc94bc08806e4c1f71d1a2098b29d950dbc7ff29239bc6c1a628f036059ff7a4702b3a2ec4be64c2777be2e3ca61d5c1d058ae9d56e3d74e9340ac9c5e47802',
//     type: 'ed25519_signature'
//   },
//   events: [
//     {
//       guid: [Object],
//       sequence_number: '0',
//       type: '0x1::coin::WithdrawEvent',
//       data: [Object]
//     },
//     {
//       guid: [Object],
//       sequence_number: '1',
//       type: '0x1::coin::DepositEvent',
//       data: [Object]
//     },
//     {
//       guid: [Object],
//       sequence_number: '0',
//       type: '0x1::transaction_fee::FeeStatement',
//       data: [Object]
//     }
//   ],
//   timestamp: '1726236043771659',
//   type: 'user_transaction'
// }
