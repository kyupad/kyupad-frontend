export const NFT_IDL = {
  address: process.env.NEXT_PUBLIC_NFT_PROGRAM_ID,
  metadata: {
    name: 'kyupad_smart_contract',
    version: '0.1.1',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'add_pool_config',
      discriminator: [70, 96, 94, 28, 117, 89, 79, 137],
      accounts: [
        {
          name: 'creator',
          writable: true,
          signer: true,
        },
        {
          name: 'admin_pda',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 100, 109, 105, 110],
              },
              {
                kind: 'account',
                path: 'creator',
              },
            ],
          },
        },
        {
          name: 'collection_mint',
        },
        {
          name: 'pools',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 111, 111, 108, 115],
              },
              {
                kind: 'account',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'destination',
        },
        {
          name: 'pool_minted',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 111, 111, 108, 95, 109, 105, 110, 116, 101, 100],
              },
              {
                kind: 'account',
                path: 'pools',
              },
              {
                kind: 'arg',
                path: 'pool_config_args.id',
              },
            ],
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'pool_config_args',
          type: {
            defined: {
              name: 'PoolConfigArgs',
            },
          },
        },
      ],
    },
    {
      name: 'create_collection',
      discriminator: [156, 251, 92, 54, 233, 2, 16, 82],
      accounts: [
        {
          name: 'creator',
          writable: true,
          signer: true,
        },
        {
          name: 'admin_pda',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 100, 109, 105, 110],
              },
              {
                kind: 'account',
                path: 'creator',
              },
            ],
          },
        },
        {
          name: 'metadata',
          writable: true,
        },
        {
          name: 'mint',
          writable: true,
          signer: true,
        },
        {
          name: 'collection_token_account',
          writable: true,
        },
        {
          name: 'master_edition',
          writable: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'update_authority',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  117, 112, 100, 97, 116, 101, 95, 97, 117, 116, 104, 111, 114,
                  105, 116, 121,
                ],
              },
            ],
          },
        },
        {
          name: 'token_metadata_program',
        },
        {
          name: 'token_program',
        },
        {
          name: 'associated_token_program',
        },
      ],
      args: [
        {
          name: 'data',
          type: 'bytes',
        },
      ],
    },
    {
      name: 'create_tree_config',
      discriminator: [170, 141, 85, 101, 116, 175, 115, 173],
      accounts: [
        {
          name: 'creator',
          writable: true,
          signer: true,
        },
        {
          name: 'admin_pda',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 100, 109, 105, 110],
              },
              {
                kind: 'account',
                path: 'creator',
              },
            ],
          },
        },
        {
          name: 'merkle_tree',
          writable: true,
        },
        {
          name: 'tree_config',
          writable: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'update_authority',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  117, 112, 100, 97, 116, 101, 95, 97, 117, 116, 104, 111, 114,
                  105, 116, 121,
                ],
              },
            ],
          },
        },
        {
          name: 'mpl_bubble_gum_program',
        },
        {
          name: 'compression_program',
        },
        {
          name: 'log_wrapper',
        },
      ],
      args: [
        {
          name: 'max_depth',
          type: 'u32',
        },
        {
          name: 'max_buffer_size',
          type: 'u32',
        },
        {
          name: 'public',
          type: {
            option: 'bool',
          },
        },
        {
          name: 'tree_space',
          type: 'u32',
        },
      ],
    },
    {
      name: 'init_admin',
      discriminator: [97, 65, 97, 27, 200, 206, 72, 219],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'admin_pda',
          docs: ['CHECK'],
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 100, 109, 105, 110],
              },
              {
                kind: 'arg',
                path: 'address',
              },
            ],
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'kyupad_program_data',
        },
      ],
      args: [
        {
          name: 'address',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'init_collection_config',
      discriminator: [100, 10, 6, 168, 147, 33, 83, 238],
      accounts: [
        {
          name: 'creator',
          writable: true,
          signer: true,
        },
        {
          name: 'admin_pda',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 100, 109, 105, 110],
              },
              {
                kind: 'account',
                path: 'creator',
              },
            ],
          },
        },
        {
          name: 'collection_mint',
        },
        {
          name: 'pools',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 111, 111, 108, 115],
              },
              {
                kind: 'account',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'init_collection_config_args',
          type: {
            defined: {
              name: 'InitCollectionConfigArgs',
            },
          },
        },
      ],
    },
    {
      name: 'mint_cnft',
      discriminator: [164, 126, 48, 95, 183, 239, 13, 209],
      accounts: [
        {
          name: 'minter',
          writable: true,
          signer: true,
        },
        {
          name: 'pools',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 111, 111, 108, 115],
              },
              {
                kind: 'account',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'mint_counter_collection',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  109, 105, 110, 116, 95, 99, 111, 117, 110, 116, 101, 114, 95,
                  99, 111, 108, 108, 101, 99, 116, 105, 111, 110,
                ],
              },
              {
                kind: 'account',
                path: 'minter',
              },
              {
                kind: 'account',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'destination',
          writable: true,
        },
        {
          name: 'pool_minted',
          writable: true,
        },
        {
          name: 'tree_authority',
          writable: true,
        },
        {
          name: 'merkle_tree',
          writable: true,
        },
        {
          name: 'collection_authority',
        },
        {
          name: 'collection_authority_record_pda',
          docs: [
            'If there is no collecton authority record PDA then',
            'this must be the Bubblegum program address.',
          ],
        },
        {
          name: 'collection_mint',
        },
        {
          name: 'collection_metadata',
          writable: true,
        },
        {
          name: 'edition_account',
        },
        {
          name: 'bubblegum_signer',
        },
        {
          name: 'log_wrapper',
        },
        {
          name: 'compression_program',
        },
        {
          name: 'token_metadata_program',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'merkle_proof',
          type: {
            vec: {
              array: ['u8', 32],
            },
          },
        },
        {
          name: 'pool_id',
          type: 'string',
        },
        {
          name: 'data',
          type: 'bytes',
        },
      ],
    },
    {
      name: 'update_pool_config',
      discriminator: [68, 236, 203, 122, 179, 62, 234, 252],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'admin_pda',
          docs: ['CHECK'],
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 100, 109, 105, 110],
              },
              {
                kind: 'account',
                path: 'signer',
              },
            ],
          },
        },
        {
          name: 'collection_mint',
        },
        {
          name: 'pools',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 111, 111, 108, 115],
              },
              {
                kind: 'account',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'args',
          type: {
            defined: {
              name: 'UpdatePoolConfigArgs',
            },
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'Admin',
      discriminator: [244, 158, 220, 65, 8, 73, 4, 65],
    },
    {
      name: 'MintCounterCollection',
      discriminator: [130, 72, 2, 215, 81, 114, 109, 217],
    },
    {
      name: 'PoolMinted',
      discriminator: [117, 238, 58, 81, 197, 163, 121, 145],
    },
    {
      name: 'Pools',
      discriminator: [107, 216, 188, 161, 30, 47, 151, 9],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidWallet',
      msg: "This wallet is't supported to mint",
    },
    {
      code: 6001,
      name: 'InvalidMekleRoot',
      msg: 'The merkle root is invalid',
    },
    {
      code: 6002,
      name: 'PoolSupplyRunOut',
      msg: "Pool's supply has run out",
    },
    {
      code: 6003,
      name: 'PublicKeyMismatch',
    },
    {
      code: 6004,
      name: 'IncorrectOwner',
    },
    {
      code: 6005,
      name: 'AllowedMintLimitReached',
    },
    {
      code: 6006,
      name: 'NotMintTime',
      msg: 'Mint time is too early or expired',
    },
    {
      code: 6007,
      name: 'CannotAddPoolConfig',
      msg: 'This pool config is already in pools',
    },
    {
      code: 6008,
      name: 'DestinationIsInvalid',
      msg: "This destination address doesn't not match with pools config",
    },
    {
      code: 6009,
      name: 'PoolIdInvalid',
      msg: "Your pool id doesn't in pools config",
    },
  ],
  types: [
    {
      name: 'Admin',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin_key',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'InitCollectionConfigArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'max_mint_of_wallet',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'MintCounterCollection',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'count',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'PoolConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'id',
            type: 'string',
          },
          {
            name: 'start_date',
            type: 'i64',
          },
          {
            name: 'end_date',
            type: 'i64',
          },
          {
            name: 'merkle_root',
            type: 'bytes',
          },
          {
            name: 'total_mint_per_wallet',
            type: 'u8',
          },
          {
            name: 'destination',
            type: 'pubkey',
          },
          {
            name: 'payment',
            type: 'f32',
          },
          {
            name: 'pool_supply',
            type: 'u16',
          },
          {
            name: 'exclusion_pools',
            type: {
              option: {
                vec: 'string',
              },
            },
          },
        ],
      },
    },
    {
      name: 'PoolConfigArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'id',
            type: 'string',
          },
          {
            name: 'start_date',
            type: 'i64',
          },
          {
            name: 'end_date',
            type: 'i64',
          },
          {
            name: 'merkle_root',
            type: 'bytes',
          },
          {
            name: 'total_mint_per_wallet',
            type: 'u8',
          },
          {
            name: 'payment',
            type: 'f32',
          },
          {
            name: 'pool_supply',
            type: 'u16',
          },
          {
            name: 'exclusion_pools',
            type: {
              option: {
                vec: 'string',
              },
            },
          },
        ],
      },
    },
    {
      name: 'PoolMinted',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'remaining_assets',
            type: 'u16',
          },
        ],
      },
    },
    {
      name: 'Pools',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collection_mint',
            type: 'pubkey',
          },
          {
            name: 'pools_config',
            type: {
              vec: {
                defined: {
                  name: 'PoolConfig',
                },
              },
            },
          },
          {
            name: 'max_mint_of_wallet',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'UpdatePoolConfigArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'pool_id',
            type: 'string',
          },
          {
            name: 'merkle_root',
            type: 'bytes',
          },
          {
            name: 'total_pool_supply',
            type: {
              option: 'u16',
            },
          },
        ],
      },
    },
  ],
};
