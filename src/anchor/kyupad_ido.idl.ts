export const IDO_IDL = {
  address: process.env.NEXT_PUBLIC_IDO_PROGRAM_ID,
  metadata: {
    name: 'kyupad_ido',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'add_admin',
      discriminator: [177, 236, 33, 205, 124, 152, 55, 186],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'master_pda',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 97, 115, 116, 101, 114],
              },
            ],
          },
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
      ],
      args: [
        {
          name: 'address',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'delete_admin',
      discriminator: [185, 158, 127, 54, 59, 60, 205, 164],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'master_pda',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 97, 115, 116, 101, 114],
              },
            ],
          },
        },
        {
          name: 'admin_pda',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 100, 109, 105, 110],
              },
              {
                kind: 'arg',
                path: '_address',
              },
            ],
          },
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
      name: 'init_master',
      discriminator: [168, 49, 22, 248, 228, 56, 111, 24],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'master_pda',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 97, 115, 116, 101, 114],
              },
            ],
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'program',
          address: process.env.NEXT_PUBLIC_IDO_PROGRAM_ID,
        },
        {
          name: 'program_data',
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
      name: 'invest',
      discriminator: [13, 245, 180, 103, 254, 182, 121, 4],
      accounts: [
        {
          name: 'investor',
          writable: true,
          signer: true,
        },
        {
          name: 'project',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  112, 114, 111, 106, 101, 99, 116, 95, 99, 111, 110, 102, 105,
                  103,
                ],
              },
              {
                kind: 'arg',
                path: 'invest_args.project_id',
              },
            ],
          },
        },
        {
          name: 'project_counter',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  112, 114, 111, 106, 101, 99, 116, 95, 99, 111, 117, 110, 116,
                  101, 114,
                ],
              },
              {
                kind: 'account',
                path: 'project',
              },
            ],
          },
        },
        {
          name: 'investor_counter',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  105, 110, 118, 101, 115, 116, 95, 99, 111, 117, 110, 116, 101,
                  114,
                ],
              },
              {
                kind: 'account',
                path: 'project',
              },
              {
                kind: 'account',
                path: 'investor',
              },
            ],
          },
        },
        {
          name: 'vault_address',
          writable: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'invest_args',
          type: {
            defined: {
              name: 'InvestArgs',
            },
          },
        },
      ],
    },
    {
      name: 'register_project',
      discriminator: [130, 150, 121, 216, 183, 225, 243, 192],
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
          name: 'project',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  112, 114, 111, 106, 101, 99, 116, 95, 99, 111, 110, 102, 105,
                  103,
                ],
              },
              {
                kind: 'arg',
                path: 'project_config_args.id',
              },
            ],
          },
        },
        {
          name: 'project_counter',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  112, 114, 111, 106, 101, 99, 116, 95, 99, 111, 117, 110, 116,
                  101, 114,
                ],
              },
              {
                kind: 'account',
                path: 'project',
              },
            ],
          },
        },
        {
          name: 'vault_address',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'project_config_args',
          type: {
            defined: {
              name: 'ProjectConfigArgs',
            },
          },
        },
      ],
    },
    {
      name: 'transfer_master_rights',
      discriminator: [230, 240, 167, 33, 38, 45, 180, 155],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'master_pda',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 97, 115, 116, 101, 114],
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'new_master_address',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'update_vault_address',
      discriminator: [102, 66, 45, 146, 133, 96, 188, 92],
      accounts: [
        {
          name: 'signer',
          writable: true,
          signer: true,
        },
        {
          name: 'master_pda',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 97, 115, 116, 101, 114],
              },
            ],
          },
        },
        {
          name: 'project',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  112, 114, 111, 106, 101, 99, 116, 95, 99, 111, 110, 102, 105,
                  103,
                ],
              },
              {
                kind: 'arg',
                path: '_project_id',
              },
            ],
          },
        },
        {
          name: 'vault_address',
        },
      ],
      args: [
        {
          name: 'project_id',
          type: 'string',
        },
      ],
    },
    {
      name: 'update_whitelist',
      discriminator: [94, 198, 33, 20, 192, 97, 44, 59],
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
          name: 'project',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  112, 114, 111, 106, 101, 99, 116, 95, 99, 111, 110, 102, 105,
                  103,
                ],
              },
              {
                kind: 'arg',
                path: 'update_config_project.project_id',
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'update_whitelist_args',
          type: {
            defined: {
              name: 'UpdateWhitelistArgs',
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
      name: 'InvestorCounter',
      discriminator: [251, 167, 25, 236, 170, 228, 32, 52],
    },
    {
      name: 'Master',
      discriminator: [168, 213, 193, 12, 77, 162, 58, 235],
    },
    {
      name: 'ProjectConfig',
      discriminator: [187, 239, 0, 110, 5, 15, 245, 65],
    },
    {
      name: 'ProjectCounter',
      discriminator: [210, 217, 66, 75, 194, 9, 88, 148],
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
      name: 'PublicKeyMismatch',
      msg: "The publicKey provide doesn't match with config publicKey",
    },
    {
      code: 6002,
      name: 'NotInvestTime',
      msg: 'Invest time is too early or expired',
    },
    {
      code: 6003,
      name: 'ProjectOutOfTicket',
      msg: 'Projet is out of tickets to buy',
    },
    {
      code: 6004,
      name: 'InvalidTotalInvestment',
      msg: 'Invest total is invalid',
    },
    {
      code: 6005,
      name: 'NotEnoughTicket',
      msg: 'Not enough tickets',
    },
    {
      code: 6006,
      name: 'TransferIsError',
      msg: 'Transfer instruction is error',
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
      name: 'InvestArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'project_id',
            type: 'string',
          },
          {
            name: 'ticket_amount',
            type: 'u8',
          },
          {
            name: 'max_ticket_amount',
            type: 'u8',
          },
          {
            name: 'merkle_proof',
            type: {
              vec: {
                array: ['u8', 32],
              },
            },
          },
        ],
      },
    },
    {
      name: 'InvestorCounter',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'project_id',
            type: 'string',
          },
          {
            name: 'wallet',
            type: 'pubkey',
          },
          {
            name: 'total_invested_ticket',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Master',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'master_key',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'ProjectConfig',
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
            name: 'vault_address',
            type: 'pubkey',
          },
          {
            name: 'token_address',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'ticket_size',
            type: 'u64',
          },
          {
            name: 'token_offered',
            type: 'u32',
          },
          {
            name: 'total_ticket',
            type: 'u32',
          },
          {
            name: 'token_program',
            type: {
              option: 'pubkey',
            },
          },
        ],
      },
    },
    {
      name: 'ProjectConfigArgs',
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
            name: 'token_address',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'ticket_size',
            type: 'u64',
          },
          {
            name: 'token_offered',
            type: 'u32',
          },
          {
            name: 'total_ticket',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'ProjectCounter',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'remaining',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'UpdateWhitelistArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'project_id',
            type: 'string',
          },
          {
            name: 'merkle_root',
            type: 'bytes',
          },
        ],
      },
    },
  ],
};
