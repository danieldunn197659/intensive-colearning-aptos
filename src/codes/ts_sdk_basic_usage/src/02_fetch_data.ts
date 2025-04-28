import {
  Account,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  Network,
  SigningSchemeInput,
} from "@aptos-labs/ts-sdk";

async function fetch_data() {
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);

  const account = Account.generate();
  console.log(`>>> create account: ${account.accountAddress.toString()}`);

  const transaction = await aptos.fundAccount({
    accountAddress: account.accountAddress,
    amount: 100,
  });
  console.log(`\n>>> transaction: ${JSON.stringify(transaction)}`);

  const fund = await aptos.getAccountInfo({
    accountAddress: account.accountAddress,
  });
  console.log(`\n>>>fund: ${JSON.stringify(fund)}`);

  const modules = await aptos.getAccountModules({
    accountAddress: account.accountAddress,
  });
  console.log(`\n>>> modules: ${JSON.stringify(modules)}`);

  const tokens = await aptos.getAccountOwnedTokens({
    accountAddress: account.accountAddress,
  });
  console.log(`\n>>> tokens: ${JSON.stringify(tokens)}`);

  type Coin = { coin: { value: string } };

  const resource = await aptos.getAccountResource<Coin>({
    accountAddress: account.accountAddress,
    resourceType: "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
  });
  console.log(`\n>>> resource: ${JSON.stringify(resource)}`);

  const value = resource.coin.value;
  console.log(`\n>>> coin value: ${value}`);
}

async function main() {
  fetch_data();
}

main();

// >>> create account: 0x06a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d

// >>> transaction: {"version":"5974082853","hash":"0x3308cd348384fa5623986b2c6aa82cb93a4df3fb4d8d11fa21e7e18c07dc369c","state_change_hash":"0x9df9233fe8a13c6e790cf588b2c7160587d5ce0f33cd87e0b92434361dbe34eb","event_root_hash":"0x5efdc1806cd0bc1968a417db06bf204d175291443a0f20535b45ead9fb1f168a","state_checkpoint_hash":null,"gas_used":"1001","success":true,"vm_status":"Executed successfully","accumulator_root_hash":"0xedb82d4e1287e47350edc723dc470ccd41794b831d24ae35e409df205820c967","changes":[{"address":"0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d","state_key_hash":"0x8ff336347df3a198a09afdaaad8c8434ded97110b4c398aa4ffcfb0d60c65e35","data":{"type":"0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>","data":{"coin":{"value":"100"},"deposit_events":{"counter":"1","guid":{"id":{"addr":"0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d","creation_num":"2"}}},"frozen":false,"withdraw_events":{"counter":"0","guid":{"id":{"addr":"0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d","creation_num":"3"}}}}},"type":"write_resource"},{"address":"0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d","state_key_hash":"0x3f92d599ad51f3a459fb7dbc993208a7ac55aa8ff7b529ee318eb71d683d4b8f","data":{"type":"0x1::account::Account","data":{"authentication_key":"0x06a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d","coin_register_events":{"counter":"1","guid":{"id":{"addr":"0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d","creation_num":"0"}}},"guid_creation_num":"4","key_rotation_events":{"counter":"0","guid":{"id":{"addr":"0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d","creation_num":"1"}}},"rotation_capability_offer":{"for":{"vec":[]}},"sequence_number":"0","signer_capability_offer":{"for":{"vec":[]}}}},"type":"write_resource"},{"address":"0x19e2c9d62d5d5cc16f0de87e7e05f5161f9e820932341e82740cdeed1ba63d12","state_key_hash":"0xc1b87f42046e685dfc675966f239376b4dad0bddb08c5d4710d87d631381be1d","data":{"type":"0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>","data":{"coin":{"value":"328418492900"},"deposit_events":{"counter":"2381638","guid":{"id":{"addr":"0x19e2c9d62d5d5cc16f0de87e7e05f5161f9e820932341e82740cdeed1ba63d12","creation_num":"2"}}},"frozen":false,"withdraw_events":{"counter":"2381630","guid":{"id":{"addr":"0x19e2c9d62d5d5cc16f0de87e7e05f5161f9e820932341e82740cdeed1ba63d12","creation_num":"3"}}}}},"type":"write_resource"},{"address":"0x19e2c9d62d5d5cc16f0de87e7e05f5161f9e820932341e82740cdeed1ba63d12","state_key_hash":"0xa64c3e06541e5b27ab82cec64706a40eb629a67a9218f13cd7459f5baa9978ff","data":{"type":"0x1::account::Account","data":{"authentication_key":"0x19e2c9d62d5d5cc16f0de87e7e05f5161f9e820932341e82740cdeed1ba63d12","coin_register_events":{"counter":"1","guid":{"id":{"addr":"0x19e2c9d62d5d5cc16f0de87e7e05f5161f9e820932341e82740cdeed1ba63d12","creation_num":"0"}}},"guid_creation_num":"4","key_rotation_events":{"counter":"0","guid":{"id":{"addr":"0x19e2c9d62d5d5cc16f0de87e7e05f5161f9e820932341e82740cdeed1ba63d12","creation_num":"1"}}},"rotation_capability_offer":{"for":{"vec":[]}},"sequence_number":"2381638","signer_capability_offer":{"for":{"vec":[]}}}},"type":"write_resource"},{"state_key_hash":"0x6e4b28d40f98a106a65163530924c0dcb40c1349d3aa915d108b4d6cfc1ddb19","handle":"0x1b854694ae746cdbd8d44186ca4929b2b337df21d1c74633be19b2710552fdca","key":"0x0619dc29a0aac8fa146714058e8dd6d2d0f3bdf5f6331907bf91f3acd81e6935","value":"0x4d784ea77b0cbd940100000000000000","data":null,"type":"write_table_item"}],"sender":"0x19e2c9d62d5d5cc16f0de87e7e05f5161f9e820932341e82740cdeed1ba63d12","sequence_number":"2381637","max_gas_amount":"500000","gas_unit_price":"100","expiration_timestamp_secs":"1726153296","payload":{"code":{"bytecode":"0xa11ceb0b0500000008010008020804030c150421020523100733500883012006a30114000000010002000301050800030403010002060105010001070002000008000200010403060c050301050001060c01080001030d6170746f735f6163636f756e740a6170746f735f636f696e04636f696e067369676e65720a616464726573735f6f66094170746f73436f696e0762616c616e6365046d696e74087472616e7366657200000000000000000000000000000000000000000000000000000000000000010308a0860100000000000308ffffffffffffffff000001170a0011000c030a03380007010a02170700172304120a000b030a0207001611020b000b010b02110302","abi":{"name":"main","visibility":"public","is_entry":true,"is_view":false,"generic_type_params":[],"params":["&signer","address","u64"],"return":[]}},"type_arguments":[],"arguments":["0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d","100"],"type":"script_payload"},"signature":{"public_key":"0x7a58e569925baaba11db29b72e2f4975a0262ec6f9502d50e3b1a5da1d85ae04","signature":"0xf9fe2ff5efe90ee8ec1f1b0117c58bc7b4e5202b385b1d044d60c3395625a16902a763298433ea4c66babf1c6bc618af0f06d6fb9ad977ecef12d25478905f0a","type":"ed25519_signature"},"events":[{"guid":{"creation_number":"2","account_address":"0x19e2c9d62d5d5cc16f0de87e7e05f5161f9e820932341e82740cdeed1ba63d12"},"sequence_number":"2381637","type":"0x1::coin::DepositEvent","data":{"amount":"100100"}},{"guid":{"creation_number":"0","account_address":"0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d"},"sequence_number":"0","type":"0x1::account::CoinRegisterEvent","data":{"type_info":{"account_address":"0x1","module_name":"0x6170746f735f636f696e","struct_name":"0x4170746f73436f696e"}}},{"guid":{"creation_number":"3","account_address":"0x19e2c9d62d5d5cc16f0de87e7e05f5161f9e820932341e82740cdeed1ba63d12"},"sequence_number":"2381629","type":"0x1::coin::WithdrawEvent","data":{"amount":"100"}},{"guid":{"creation_number":"2","account_address":"0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d"},"sequence_number":"0","type":"0x1::coin::DepositEvent","data":{"amount":"100"}},{"guid":{"creation_number":"0","account_address":"0x0"},"sequence_number":"0","type":"0x1::transaction_fee::FeeStatement","data":{"execution_gas_units":"6","io_gas_units":"7","storage_fee_octas":"98800","storage_fee_refund_octas":"0","total_charge_gas_units":"1001"}}],"timestamp":"1726153281890208","type":"user_transaction"}

// >>>fund: {"sequence_number":"0","authentication_key":"0x06a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d"}

// >>> modules: []

// >>> tokens: []

// >>> resource: {"coin":{"value":"100"},"deposit_events":{"counter":"1","guid":{"id":{"addr":"0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d","creation_num":"2"}}},"frozen":false,"withdraw_events":{"counter":"0","guid":{"id":{"addr":"0x6a90df7117beb151d0483002ee0138b84c88c9b691610bdfc3edfe52bcfb85d","creation_num":"3"}}}}

// >>> coin value: 100
