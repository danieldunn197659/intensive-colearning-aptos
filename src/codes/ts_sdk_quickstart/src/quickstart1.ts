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

// Output:
[
  {
    bytecode:
      "0xa11ceb0b060000000c01000c020c1a03266d04930106059901900107a902910408ba064006fa064910c307c9020a8c0a160ca20a97040db90e0a000001010102010301040105000607000007080000080800040d0700021407010001022202000009000100000a020100000b030100000c040500000e060100000f070100001008090000110a0a000012020a00001302040000150a0b0000160a020000170a0c000018070100031e070200021f0f020005201112020202012113050100022316170002241819000225021e0108100a1112141d020608010300010503060c03030103010a0203060c03080301060c0305030302080301020503010b040108010101010800050305070801050708000206050a02020a02080303060a020900090101080301060900040800050708010507030307080208050c05080102060c0a0201080501060805010c0306080105060800020608010501060801010801010b0401090009746f646f5f6c69737403626373066f626a656374067369676e657206737472696e670c737472696e675f7574696c7304546f646f08546f646f4c6973741355736572546f646f4c697374436f756e7465721a6173736572745f757365725f6861735f676976656e5f746f646f196173736572745f757365725f6861735f746f646f5f6c6973740d636f6d706c6574655f746f646f1f636f6e7374727563745f746f646f5f6c6973745f6f626a6563745f7365656406537472696e670b6372656174655f746f646f106372656174655f746f646f5f6c697374086765745f746f646f0d6765745f746f646f5f6c697374236765745f746f646f5f6c6973745f62795f746f646f5f6c6973745f6f626a5f61646472156765745f746f646f5f6c6973745f636f756e746572064f626a656374116765745f746f646f5f6c6973745f6f626a166765745f746f646f5f6c6973745f6f626a5f616464720d6861735f746f646f5f6c6973740b696e69745f6d6f64756c6507636f6e74656e7409636f6d706c65746564056f776e657205746f646f7307636f756e7465720a616464726573735f6f66156372656174655f6f626a6563745f6164647265737307666f726d61743208746f5f62797465730e436f6e7374727563746f72526566136372656174655f6e616d65645f6f626a6563740f67656e65726174655f7369676e657211616464726573735f746f5f6f626a656374cb3303e6b96a1a666347bd06e27d24cc0cb09e204fedb6223a7bc9091dc4902200000000000000000000000000000000000000000000000000000000000000010308030000000000000003080200000000000000030801000000000000000a0206057b7d5f7b7d0520cb3303e6b96a1a666347bd06e27d24cc0cb09e204fedb6223a7bc9091dc49022126170746f733a3a6d657461646174615f7631b4020301000000000000001a455f544f444f5f4c4953545f444f53455f4e4f545f455849535418546f646f206c69737420646f6573206e6f74206578697374020000000000000015455f544f444f5f444f53455f4e4f545f455849535413546f646f20646f6573206e6f74206578697374030000000000000018455f544f444f5f414c52454144595f434f4d504c4554454419546f646f20697320616c726561647920636f6d706c657465640006086765745f746f646f0101000d6765745f746f646f5f6c6973740101000d6861735f746f646f5f6c697374010100156765745f746f646f5f6c6973745f636f756e746572010100166765745f746f646f5f6c6973745f6f626a5f61646472010100236765745f746f646f5f6c6973745f62795f746f646f5f6c6973745f6f626a5f616464720101000002021908031a010102021b051c0a08000202011d0300000000010a0b010b001000410d2304070509070127020100000001070b002901040405060702270202010401010e280b00110e0c040e040b011103110f0c060a0611010b062a010c050a050a020c032e0b0311000b050f000b02430d0c070a071001140921041f05230b0701070027080b070f01150203000000100a07030c010e0107040b0038000c020e02380102040104010114160b00110e0c040e040b011103110f0c060a0611010b062a010c050b020912000c030b050f000b03440d020501040102152f0a00110e0c060a062902040c0a062b021002140c0105120a0006000000000000000012022d020600000000000000000c010b010c020b000b02110311120c040e0411130c050a06400d000000000000000012010c070e050b072d010b062a020c030a03100214060100000000000000160b030f02150206010001011a200b000b01110b0c040a0411010b042b010c030a020a031000410d23041005140b03010701270b0310000b02420d0c050a051003140b051001140207010001011b100b000b01110b0c030a0311010b032b010c020a021004140b021000410d0208010001011c0a0b002b010c010a011004140b011000410d020901000102040d0a00290204090b002b021002140c01050b0600000000000000000c010b01020a00000001050b000b01110b3802020b01000001050e000b011103110f020c01000001050b000b01110b2901020d0000000101020101000102000000010000",
    abi: {
      address:
        "0xcb3303e6b96a1a666347bd06e27d24cc0cb09e204fedb6223a7bc9091dc49022",
      name: "todo_list",
      friends: [],
      exposed_functions: [
        {
          name: "complete_todo",
          visibility: "public",
          is_entry: true,
          is_view: false,
          generic_type_params: [],
          params: ["&signer", "u64", "u64"],
          return: [],
        },
        {
          name: "create_todo",
          visibility: "public",
          is_entry: true,
          is_view: false,
          generic_type_params: [],
          params: ["&signer", "u64", "0x1::string::String"],
          return: [],
        },
        {
          name: "create_todo_list",
          visibility: "public",
          is_entry: true,
          is_view: false,
          generic_type_params: [],
          params: ["&signer"],
          return: [],
        },
        {
          name: "get_todo",
          visibility: "public",
          is_entry: false,
          is_view: true,
          generic_type_params: [],
          params: ["address", "u64", "u64"],
          return: ["0x1::string::String", "bool"],
        },
        {
          name: "get_todo_list",
          visibility: "public",
          is_entry: false,
          is_view: true,
          generic_type_params: [],
          params: ["address", "u64"],
          return: ["address", "u64"],
        },
        {
          name: "get_todo_list_by_todo_list_obj_addr",
          visibility: "public",
          is_entry: false,
          is_view: true,
          generic_type_params: [],
          params: ["address"],
          return: ["address", "u64"],
        },
        {
          name: "get_todo_list_counter",
          visibility: "public",
          is_entry: false,
          is_view: true,
          generic_type_params: [],
          params: ["address"],
          return: ["u64"],
        },
        {
          name: "get_todo_list_obj_addr",
          visibility: "public",
          is_entry: false,
          is_view: true,
          generic_type_params: [],
          params: ["address", "u64"],
          return: ["address"],
        },
        {
          name: "has_todo_list",
          visibility: "public",
          is_entry: false,
          is_view: true,
          generic_type_params: [],
          params: ["address", "u64"],
          return: ["bool"],
        },
      ],
      structs: [
        {
          name: "Todo",
          is_native: false,
          abilities: ["copy", "drop", "store"],
          generic_type_params: [],
          fields: [
            {
              name: "content",
              type: "0x1::string::String",
            },
            {
              name: "completed",
              type: "bool",
            },
          ],
        },
        {
          name: "TodoList",
          is_native: false,
          abilities: ["key"],
          generic_type_params: [],
          fields: [
            {
              name: "owner",
              type: "address",
            },
            {
              name: "todos",
              type: "vector<0xcb3303e6b96a1a666347bd06e27d24cc0cb09e204fedb6223a7bc9091dc49022::todo_list::Todo>",
            },
          ],
        },
        {
          name: "UserTodoListCounter",
          is_native: false,
          abilities: ["key"],
          generic_type_params: [],
          fields: [
            {
              name: "counter",
              type: "u64",
            },
          ],
        },
      ],
    },
  },
];
