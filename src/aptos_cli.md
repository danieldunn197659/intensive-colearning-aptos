# Aptos CLI

## 命令总览

```bash
$ aptos -h
Command Line Interface (CLI) for developing and interacting with the Aptos blockchain

Usage: aptos <COMMAND>

Commands:
  account     Tool for interacting with accounts
  config      Tool for interacting with configuration of the Aptos CLI tool
  genesis     Tool for setting up an Aptos chain Genesis transaction
  governance  Tool for on-chain governance
  info        Show build information about the CLI
  init        Tool to initialize current directory for the aptos tool
  key         Tool for generating, inspecting, and interacting with keys
  move        Tool for Move smart contract related operations
  multisig    Tool for interacting with multisig accounts
  node        Tool for operations related to nodes
  stake       Tool for manipulating stake and stake pools
  update      Update the CLI or other tools it depends on
  help        Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version
```

## info - 查看客户端信息

```bash
$ aptos info
{
  "Result": {
    "build_branch": "main",
    "build_cargo_version": "cargo 1.78.0 (54d8815d0 2024-03-26)",
    "build_clean_checkout": "true",
    "build_commit_hash": "4a202570804db6d27ba1ca6cb374228052be5bcb",
    "build_is_release_build": "true",
    "build_os": "linux-x86_64",
    "build_pkg_version": "4.1.0",
    "build_profile_name": "release",
    "build_rust_channel": "1.78.0-x86_64-unknown-linux-gnu",
    "build_rust_version": "rustc 1.78.0 (9b00956e5 2024-04-29)",
    "build_tag": "",
    "build_time": "2024-09-06 12:07:47 +00:00",
    "build_using_tokio_unstable": "true"
  }
}
```

## config - 配置相关

### 命令总览

```bash
$ aptos config -h
Tool for interacting with configuration of the Aptos CLI tool

Usage: aptos config <COMMAND>

Commands:
  delete-profile              Delete the specified profile
  generate-shell-completions  Generate shell completion files
  rename-profile              Rename the specified profile
  set-global-config           Set global configuration settings
  show-global-config          Shows the properties in the global config
  show-private-key            Show the private key for the given profile
  show-profiles               Shows the current profiles available
```

### show-private-key - 查看私钥

```bash
$ aptos config show-private-key --profile default
{
  "Result": "0x2a88.....................80020b45"
}

> 读取的是这个文件中的私钥
$ cat .aptos/config.yaml
---
profiles:
  default:
    network: Testnet
    private_key: "0x2a88.....................80020b45"
    public_key: "0xd6a31c9c8c707d9f2e0b936a05b9427527c879bcebcbdcab1339b7daea327ea6"
    account: cb3303e6b96a1a666347bd06e27d24cc0cb09e204fedb6223a7bc9091dc49022
    rest_url: "https://fullnode.testnet.aptoslabs.com"
    faucet_url: "https://faucet.testnet.aptoslabs.com"
```

## init - 初始化本地配置并创建账户

- **创建默认 profile**

```bash
$ aptos init
Configuring for profile default
Choose network from [devnet, testnet, mainnet, local, custom | defaults to devnet]
testnet
Enter your private key as a hex literal (0x...) [Current: None | No input: Generate new key (or keep one if present)]

No key given, generating key...
Account 0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97 doesn't exist, creating it and funding it with 100000000 Octas
Account 0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97 funded successfully

---
Aptos CLI is now set up for account 0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97 as profile default!
 See the account here: https://explorer.aptoslabs.com/account/0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97?network=testnet
 Run `aptos --help` for more information about commands
{
  "Result": "Success"
}
```

- **创建指定名称 profile**

```bash
$ aptos init --profile jason
Configuring for profile jason
Choose network from [devnet, testnet, mainnet, local, custom | defaults to devnet]
mainnet
Enter your private key as a hex literal (0x...) [Current: None | No input: Generate new key (or keep one if present)]

No key given, generating key...
Account 0x7ac59d3368d1eb46c599ed1fb57d6f51d2b926f2d12b4573f6954fcde602c334 does not exist, you will need to create and fund the account by transferring funds from another account

---
Aptos CLI is now set up for account 0x7ac59d3368d1eb46c599ed1fb57d6f51d2b926f2d12b4573f6954fcde602c334 as profile jason!
 See the account here: https://explorer.aptoslabs.com/account/0x7ac59d3368d1eb46c599ed1fb57d6f51d2b926f2d12b4573f6954fcde602c334?network=mainnet
 Run `aptos --help` for more information about commands
{
  "Result": "Success"
}
```

- **命令执行后，生成内容将会写到文件：`.aptos/config.yaml`中**

```bash
 cat .aptos/config.yaml
---
profiles:
  default:
    network: Testnet
    private_key: "0x9e974b31cabc31b19ed0e1debe97efb0a1f7db88cc6735cc1b326a7d1460e8f1"
    public_key: "0x71bbee6b99ef2805d3f900a0b9ca1faa2a2c863076aa1d6d4d0ec0e13e71126b"
    account: 47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97
    rest_url: "https://fullnode.testnet.aptoslabs.com"
    faucet_url: "https://faucet.testnet.aptoslabs.com"
  jason:
    network: Mainnet
    private_key: "0x065700c413f3bf6d9632ace4dc841d422a846bac4949b4c1eb2483fdc855ced8"
    public_key: "0xc31ae7a8fb5b794a22f902e47fb7b956c3448a2ecfcb3e3303c637e872e118fb"
    account: 7ac59d3368d1eb46c599ed1fb57d6f51d2b926f2d12b4573f6954fcde602c334
    rest_url: "https://fullnode.mainnet.aptoslabs.com"
```

## account - 账户相关

### 命令总览

```bash
$ aptos account -h
Tool for interacting with accounts

Usage: aptos account <COMMAND>

Commands:
  create                           Create a new account on-chain
  create-resource-account          Create a resource account on-chain
  derive-resource-account-address  Derive the address for a resource account
  fund-with-faucet                 Fund an account with tokens from a faucet
  balance                          Show the account's balance of different coins
  list                             List resources, modules, or balance owned by an address
  lookup-address                   Lookup the account address through the on-chain lookup table
  rotate-key                       Rotate an account's authentication key
  transfer                         Transfer APT between accounts
```

### create - 创建链上账户

```bash
$ aptos account create --account jason
Do you want to submit a transaction for a range of [99700 - 149500] Octas at a gas unit price of 100 Octas? [yes/no] >
yes
Transaction submitted: https://explorer.aptoslabs.com/txn/0x2492804e7610ac92601496e9bc549e506f4aa59dad482d041f853fadb00b987e?network=testnet
{
  "Result": {
    "transaction_hash": "0x2492804e7610ac92601496e9bc549e506f4aa59dad482d041f853fadb00b987e",
    "gas_used": 997,
    "gas_unit_price": 100,
    "sender": "47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
    "sequence_number": 0,
    "success": true,
    "timestamp_us": 1726410280917653,
    "version": 5989303061,
    "vm_status": "Executed successfully"
  }
}
```

### list

```bash
List resources, modules, or balance owned by an address

Usage: aptos account list [OPTIONS]

Options:
      --account <ACCOUNT>
          Address of the account you want to list resources/modules/balance for
      --query <QUERY>
          Type of items to list: [balance, resources, modules] [default: resources] [possible values: balance, modules,
          resources]
      --url <URL>
          URL to a fullnode on the network
      --connection-timeout-secs <CONNECTION_TIMEOUT_SECS>
          Connection timeout in seconds, used for the REST endpoint of the fullnode [default: 30]
      --node-api-key <NODE_API_KEY>
          Key to use for ratelimiting purposes with the node API. This value will be used as `Authorization: Bearer
          <key>`. You may also set this with the NODE_API_KEY environment variable [env: NODE_API_KEY=]
      --profile <PROFILE>
          Profile to use from the CLI config
```

#### 领水

```bash
$ aptos account fund-with-faucet --account default
{
  "Result": "Added 100000000 Octas to account 0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97"
}
```

#### 查看账户的余额和转账事件

```bash
$ aptos account list --query balance --account default
{
  "Result": [
    {
      "coin": {
        "value": "99900300"
      },
      "deposit_events": {
        "counter": "1",
        "guid": {
          "id": {
            "addr": "0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
            "creation_num": "2"
          }
        }
      },
      "frozen": false,
      "withdraw_events": {
        "counter": "0",
        "guid": {
          "id": {
            "addr": "0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
            "creation_num": "3"
          }
        }
      }
    }
  ]
}
```

#### 列出帐户中的资源

```bash
$  aptos account list --query resources --account default
{
  "Result": [
    {
      "0x1::account::Account": {
        "authentication_key": "0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
        "coin_register_events": {
          "counter": "1",
          "guid": {
            "id": {
              "addr": "0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
              "creation_num": "0"
            }
          }
        },
        "guid_creation_num": "4",
        "key_rotation_events": {
          "counter": "0",
          "guid": {
            "id": {
              "addr": "0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
              "creation_num": "1"
            }
          }
        },
        "rotation_capability_offer": {
          "for": {
            "vec": []
          }
        },
        "sequence_number": "1",
        "signer_capability_offer": {
          "for": {
            "vec": []
          }
        }
      }
    },
    {
      "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>": {
        "coin": {
          "value": "99900300"
        },
        "deposit_events": {
          "counter": "1",
          "guid": {
            "id": {
              "addr": "0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
              "creation_num": "2"
            }
          }
        },
        "frozen": false,
        "withdraw_events": {
          "counter": "0",
          "guid": {
            "id": {
              "addr": "0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
              "creation_num": "3"
            }
          }
        }
      }
    }
  ]
}
```

#### 列出账户模块

```bash
$ aptos account list --query modules
{
  "Result": [
    {
      "bytecode": "0xa11ceb0b060000000c01000c020c1a03266d04930106059901900107a902910408ba064006fa064910c307c9020a8c0a160ca20a97040db90e0a000001010102010301040105000607000007080000080800040d0700021407010001022202000009000100000a020100000b030100000c040500000e060100000f070100001008090000110a0a000012020a00001302040000150a0b0000160a020000170a0c000018070100031e070200021f0f020005201112020202012113050100022316170002241819000225021e0108100a1112141d020608010300010503060c03030103010a0203060c03080301060c0305030302080301020503010b040108010101010800050305070801050708000206050a02020a02080303060a020900090101080301060900040800050708010507030307080208050c05080102060c0a0201080501060805010c0306080105060800020608010501060801010801010b0401090009746f646f5f6c69737403626373066f626a656374067369676e657206737472696e670c737472696e675f7574696c7304546f646f08546f646f4c6973741355736572546f646f4c697374436f756e7465721a6173736572745f757365725f6861735f676976656e5f746f646f196173736572745f757365725f6861735f746f646f5f6c6973740d636f6d706c6574655f746f646f1f636f6e7374727563745f746f646f5f6c6973745f6f626a6563745f7365656406537472696e670b6372656174655f746f646f106372656174655f746f646f5f6c697374086765745f746f646f0d6765745f746f646f5f6c697374236765745f746f646f5f6c6973745f62795f746f646f5f6c6973745f6f626a5f61646472156765745f746f646f5f6c6973745f636f756e746572064f626a656374116765745f746f646f5f6c6973745f6f626a166765745f746f646f5f6c6973745f6f626a5f616464720d6861735f746f646f5f6c6973740b696e69745f6d6f64756c6507636f6e74656e7409636f6d706c65746564056f776e657205746f646f7307636f756e7465720a616464726573735f6f66156372656174655f6f626a6563745f6164647265737307666f726d61743208746f5f62797465730e436f6e7374727563746f72526566136372656174655f6e616d65645f6f626a6563740f67656e65726174655f7369676e657211616464726573735f746f5f6f626a656374cb3303e6b96a1a666347bd06e27d24cc0cb09e204fedb6223a7bc9091dc4902200000000000000000000000000000000000000000000000000000000000000010308030000000000000003080200000000000000030801000000000000000a0206057b7d5f7b7d0520cb3303e6b96a1a666347bd06e27d24cc0cb09e204fedb6223a7bc9091dc49022126170746f733a3a6d657461646174615f7631b4020301000000000000001a455f544f444f5f4c4953545f444f53455f4e4f545f455849535418546f646f206c69737420646f6573206e6f74206578697374020000000000000015455f544f444f5f444f53455f4e4f545f455849535413546f646f20646f6573206e6f74206578697374030000000000000018455f544f444f5f414c52454144595f434f4d504c4554454419546f646f20697320616c726561647920636f6d706c657465640006086765745f746f646f0101000d6765745f746f646f5f6c6973740101000d6861735f746f646f5f6c697374010100156765745f746f646f5f6c6973745f636f756e746572010100166765745f746f646f5f6c6973745f6f626a5f61646472010100236765745f746f646f5f6c6973745f62795f746f646f5f6c6973745f6f626a5f616464720101000002021908031a010102021b051c0a08000202011d0300000000010a0b010b001000410d2304070509070127020100000001070b002901040405060702270202010401010e280b00110e0c040e040b011103110f0c060a0611010b062a010c050a050a020c032e0b0311000b050f000b02430d0c070a071001140921041f05230b0701070027080b070f01150203000000100a07030c010e0107040b0038000c020e02380102040104010114160b00110e0c040e040b011103110f0c060a0611010b062a010c050b020912000c030b050f000b03440d020501040102152f0a00110e0c060a062902040c0a062b021002140c0105120a0006000000000000000012022d020600000000000000000c010b010c020b000b02110311120c040e0411130c050a06400d000000000000000012010c070e050b072d010b062a020c030a03100214060100000000000000160b030f02150206010001011a200b000b01110b0c040a0411010b042b010c030a020a031000410d23041005140b03010701270b0310000b02420d0c050a051003140b051001140207010001011b100b000b01110b0c030a0311010b032b010c020a021004140b021000410d0208010001011c0a0b002b010c010a011004140b011000410d020901000102040d0a00290204090b002b021002140c01050b0600000000000000000c010b01020a00000001050b000b01110b3802020b01000001050e000b011103110f020c01000001050b000b01110b2901020d0000000101020101000102000000010000",
      "abi": {
        "address": "0xcb3303e6b96a1a666347bd06e27d24cc0cb09e204fedb6223a7bc9091dc49022",
        "name": "todo_list",
        "friends": [],
        "exposed_functions": [
          {
            "name": "complete_todo",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
              "&signer",
              "u64",
              "u64"
            ],
            "return": []
          },
          {
            "name": "create_todo",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
              "&signer",
              "u64",
              "0x1::string::String"
            ],
            "return": []
          },
          {
            "name": "create_todo_list",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
              "&signer"
            ],
            "return": []
          },
          {
            "name": "get_todo",
            "visibility": "public",
            "is_entry": false,
            "is_view": true,
            "generic_type_params": [],
            "params": [
              "address",
              "u64",
              "u64"
            ],
            "return": [
              "0x1::string::String",
              "bool"
            ]
          },
          {
            "name": "get_todo_list",
            "visibility": "public",
            "is_entry": false,
            "is_view": true,
            "generic_type_params": [],
            "params": [
              "address",
              "u64"
            ],
            "return": [
              "address",
              "u64"
            ]
          },
          {
            "name": "get_todo_list_by_todo_list_obj_addr",
            "visibility": "public",
            "is_entry": false,
            "is_view": true,
            "generic_type_params": [],
            "params": [
              "address"
            ],
            "return": [
              "address",
              "u64"
            ]
          },
          {
            "name": "get_todo_list_counter",
            "visibility": "public",
            "is_entry": false,
            "is_view": true,
            "generic_type_params": [],
            "params": [
              "address"
            ],
            "return": [
              "u64"
            ]
          },
          {
            "name": "get_todo_list_obj_addr",
            "visibility": "public",
            "is_entry": false,
            "is_view": true,
            "generic_type_params": [],
            "params": [
              "address",
              "u64"
            ],
            "return": [
              "address"
            ]
          },
          {
            "name": "has_todo_list",
            "visibility": "public",
            "is_entry": false,
            "is_view": true,
            "generic_type_params": [],
            "params": [
              "address",
              "u64"
            ],
            "return": [
              "bool"
            ]
          }
        ],
        "structs": [
          {
            "name": "Todo",
            "is_native": false,
            "is_event": false,
            "abilities": [
              "copy",
              "drop",
              "store"
            ],
            "generic_type_params": [],
            "fields": [
              {
                "name": "content",
                "type": "0x1::string::String"
              },
              {
                "name": "completed",
                "type": "bool"
              }
            ]
          },
          {
            "name": "TodoList",
            "is_native": false,
            "is_event": false,
            "abilities": [
              "key"
            ],
            "generic_type_params": [],
            "fields": [
              {
                "name": "owner",
                "type": "address"
              },
              {
                "name": "todos",
                "type": "vector<0xcb3303e6b96a1a666347bd06e27d24cc0cb09e204fedb6223a7bc9091dc49022::todo_list::Todo>"
              }
            ]
          },
          {
            "name": "UserTodoListCounter",
            "is_native": false,
            "is_event": false,
            "abilities": [
              "key"
            ],
            "generic_type_params": [],
            "fields": [
              {
                "name": "counter",
                "type": "u64"
              }
            ]
          }
        ]
      }
    }
  ]
}
```

#### 转账

```bash
$ aptos account balance --account default
{
  "Result": [
    {
      "asset_type": "coin",
      "coin_type": "0x1::aptos_coin::AptosCoin",
      "balance": 199900300
    }
  ]
}

$ aptos account balance --account jason
{
  "Result": [
    {
      "asset_type": "coin",
      "coin_type": "0x1::aptos_coin::AptosCoin",
      "balance": 0
    }
  ]
}

$ aptos account transfer --account jason --amount 10000
Do you want to submit a transaction for a range of [900 - 1300] Octas at a gas unit price of 100 Octas? [yes/no] >
yes
Transaction submitted: https://explorer.aptoslabs.com/txn/0x2f24a1685e47cc6abca41e28696dd1a75f87c92c97142d6a67cf96042e15e682?network=testnet
{
  "Result": {
    "gas_unit_price": 100,
    "gas_used": 9,
    "balance_changes": {
      "47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97": {
        "coin": {
          "value": "199889400"
        },
        "deposit_events": {
          "counter": "2",
          "guid": {
            "id": {
              "addr": "0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
              "creation_num": "2"
            }
          }
        },
        "frozen": false,
        "withdraw_events": {
          "counter": "1",
          "guid": {
            "id": {
              "addr": "0x47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
              "creation_num": "3"
            }
          }
        }
      },
      "7ac59d3368d1eb46c599ed1fb57d6f51d2b926f2d12b4573f6954fcde602c334": {
        "coin": {
          "value": "10000"
        },
        "deposit_events": {
          "counter": "1",
          "guid": {
            "id": {
              "addr": "0x7ac59d3368d1eb46c599ed1fb57d6f51d2b926f2d12b4573f6954fcde602c334",
              "creation_num": "2"
            }
          }
        },
        "frozen": false,
        "withdraw_events": {
          "counter": "0",
          "guid": {
            "id": {
              "addr": "0x7ac59d3368d1eb46c599ed1fb57d6f51d2b926f2d12b4573f6954fcde602c334",
              "creation_num": "3"
            }
          }
        }
      }
    },
    "sender": "47946eb78dcc85eda351217d42288e6d4669159113c7efbe7ec87bf6c07f5e97",
    "success": true,
    "version": 5989333990,
    "vm_status": "Executed successfully",
    "transaction_hash": "0x2f24a1685e47cc6abca41e28696dd1a75f87c92c97142d6a67cf96042e15e682"
  }
}

$ aptos account balance --account jason
{
  "Result": [
    {
      "asset_type": "coin",
      "coin_type": "0x1::aptos_coin::AptosCoin",
      "balance": 10000
    }
  ]
}
```

# 参考资料

https://gushi10546.gitbook.io/aptos-kai-fa-zhe-wen-dang/aptos-cli/shi-yong-aptos-cli

```

```
