/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/kyupad_ido.json`.
 */
export type KyupadIdo = {
  address: 'DwFzHZexbYr1r3uKnh9rgAKwbyHcznXGXceE3dami4nk';
  metadata: {
    name: 'kyupadIdo';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'addAdmin';
      discriminator: [177, 236, 33, 205, 124, 152, 55, 186];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'masterPda';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [109, 97, 115, 116, 101, 114];
              },
            ];
          };
        },
        {
          name: 'adminPda';
          docs: ['CHECK'];
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: 'arg';
                path: 'address';
              },
            ];
          };
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
      ];
      args: [
        {
          name: 'address';
          type: 'pubkey';
        },
      ];
    },
    {
      name: 'deleteAdmin';
      discriminator: [185, 158, 127, 54, 59, 60, 205, 164];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'masterPda';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [109, 97, 115, 116, 101, 114];
              },
            ];
          };
        },
        {
          name: 'adminPda';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: 'arg';
                path: 'address';
              },
            ];
          };
        },
      ];
      args: [
        {
          name: 'address';
          type: 'pubkey';
        },
      ];
    },
    {
      name: 'initMaster';
      discriminator: [168, 49, 22, 248, 228, 56, 111, 24];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'masterPda';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [109, 97, 115, 116, 101, 114];
              },
            ];
          };
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'program';
          address: 'DwFzHZexbYr1r3uKnh9rgAKwbyHcznXGXceE3dami4nk';
        },
        {
          name: 'programData';
        },
      ];
      args: [
        {
          name: 'address';
          type: 'pubkey';
        },
      ];
    },
    {
      name: 'invest';
      discriminator: [13, 245, 180, 103, 254, 182, 121, 4];
      accounts: [
        {
          name: 'investor';
          writable: true;
          signer: true;
        },
        {
          name: 'project';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                ];
              },
              {
                kind: 'arg';
                path: 'invest_args.project_id';
              },
            ];
          };
        },
        {
          name: 'projectCounter';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116,
                  95,
                  99,
                  111,
                  117,
                  110,
                  116,
                  101,
                  114,
                ];
              },
              {
                kind: 'account';
                path: 'project';
              },
            ];
          };
        },
        {
          name: 'investorCounter';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  105,
                  110,
                  118,
                  101,
                  115,
                  116,
                  95,
                  99,
                  111,
                  117,
                  110,
                  116,
                  101,
                  114,
                ];
              },
              {
                kind: 'account';
                path: 'project';
              },
              {
                kind: 'account';
                path: 'investor';
              },
            ];
          };
        },
        {
          name: 'vaultAddress';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
      ];
      args: [
        {
          name: 'investArgs';
          type: {
            defined: {
              name: 'investArgs';
            };
          };
        },
      ];
    },
    {
      name: 'registerProject';
      discriminator: [130, 150, 121, 216, 183, 225, 243, 192];
      accounts: [
        {
          name: 'creator';
          writable: true;
          signer: true;
        },
        {
          name: 'adminPda';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: 'account';
                path: 'creator';
              },
            ];
          };
        },
        {
          name: 'project';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                ];
              },
              {
                kind: 'arg';
                path: 'project_config_args.id';
              },
            ];
          };
        },
        {
          name: 'projectCounter';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116,
                  95,
                  99,
                  111,
                  117,
                  110,
                  116,
                  101,
                  114,
                ];
              },
              {
                kind: 'account';
                path: 'project';
              },
            ];
          };
        },
        {
          name: 'vaultAddress';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
      ];
      args: [
        {
          name: 'projectConfigArgs';
          type: {
            defined: {
              name: 'projectConfigArgs';
            };
          };
        },
      ];
    },
    {
      name: 'transferMasterRights';
      discriminator: [230, 240, 167, 33, 38, 45, 180, 155];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'masterPda';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [109, 97, 115, 116, 101, 114];
              },
            ];
          };
        },
      ];
      args: [
        {
          name: 'newMasterAddress';
          type: 'pubkey';
        },
      ];
    },
    {
      name: 'updateVaultAddress';
      discriminator: [102, 66, 45, 146, 133, 96, 188, 92];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'masterPda';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [109, 97, 115, 116, 101, 114];
              },
            ];
          };
        },
        {
          name: 'project';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                ];
              },
              {
                kind: 'arg';
                path: 'projectId';
              },
            ];
          };
        },
        {
          name: 'vaultAddress';
        },
      ];
      args: [
        {
          name: 'projectId';
          type: 'string';
        },
      ];
    },
    {
      name: 'updateWhitelist';
      discriminator: [94, 198, 33, 20, 192, 97, 44, 59];
      accounts: [
        {
          name: 'creator';
          writable: true;
          signer: true;
        },
        {
          name: 'adminPda';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: 'account';
                path: 'creator';
              },
            ];
          };
        },
        {
          name: 'project';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  112,
                  114,
                  111,
                  106,
                  101,
                  99,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                ];
              },
              {
                kind: 'arg';
                path: 'update_config_project.project_id';
              },
            ];
          };
        },
      ];
      args: [
        {
          name: 'updateWhitelistArgs';
          type: {
            defined: {
              name: 'updateWhitelistArgs';
            };
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'admin';
      discriminator: [244, 158, 220, 65, 8, 73, 4, 65];
    },
    {
      name: 'investorCounter';
      discriminator: [251, 167, 25, 236, 170, 228, 32, 52];
    },
    {
      name: 'master';
      discriminator: [168, 213, 193, 12, 77, 162, 58, 235];
    },
    {
      name: 'projectConfig';
      discriminator: [187, 239, 0, 110, 5, 15, 245, 65];
    },
    {
      name: 'projectCounter';
      discriminator: [210, 217, 66, 75, 194, 9, 88, 148];
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'invalidWallet';
      msg: "This wallet is't supported to mint";
    },
    {
      code: 6001;
      name: 'publicKeyMismatch';
      msg: "The publicKey provide doesn't match with config publicKey";
    },
    {
      code: 6002;
      name: 'notInvestTime';
      msg: 'Invest time is too early or expired';
    },
    {
      code: 6003;
      name: 'projectOutOfTicket';
      msg: 'Projet is out of tickets to buy';
    },
    {
      code: 6004;
      name: 'invalidTotalInvestment';
      msg: 'Invest total is invalid';
    },
    {
      code: 6005;
      name: 'notEnoughTicket';
      msg: 'Not enough tickets';
    },
    {
      code: 6006;
      name: 'transferIsError';
      msg: 'Transfer instruction is error';
    },
  ];
  types: [
    {
      name: 'admin';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'adminKey';
            type: 'pubkey';
          },
        ];
      };
    },
    {
      name: 'investArgs';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'projectId';
            type: 'string';
          },
          {
            name: 'ticketAmount';
            type: 'u8';
          },
          {
            name: 'maxTicketAmount';
            type: 'u8';
          },
          {
            name: 'merkleProof';
            type: {
              vec: {
                array: ['u8', 32];
              };
            };
          },
        ];
      };
    },
    {
      name: 'investorCounter';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'projectId';
            type: 'string';
          },
          {
            name: 'wallet';
            type: 'pubkey';
          },
          {
            name: 'totalInvestedTicket';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'master';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'masterKey';
            type: 'pubkey';
          },
        ];
      };
    },
    {
      name: 'projectConfig';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'id';
            type: 'string';
          },
          {
            name: 'startDate';
            type: 'i64';
          },
          {
            name: 'endDate';
            type: 'i64';
          },
          {
            name: 'merkleRoot';
            type: 'bytes';
          },
          {
            name: 'vaultAddress';
            type: 'pubkey';
          },
          {
            name: 'tokenAddress';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'ticketSize';
            type: 'u64';
          },
          {
            name: 'tokenOffered';
            type: 'u32';
          },
          {
            name: 'totalTicket';
            type: 'u32';
          },
          {
            name: 'tokenProgram';
            type: {
              option: 'pubkey';
            };
          },
        ];
      };
    },
    {
      name: 'projectConfigArgs';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'id';
            type: 'string';
          },
          {
            name: 'startDate';
            type: 'i64';
          },
          {
            name: 'endDate';
            type: 'i64';
          },
          {
            name: 'merkleRoot';
            type: 'bytes';
          },
          {
            name: 'tokenAddress';
            type: {
              option: 'pubkey';
            };
          },
          {
            name: 'ticketSize';
            type: 'u64';
          },
          {
            name: 'tokenOffered';
            type: 'u32';
          },
          {
            name: 'totalTicket';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'projectCounter';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'remaining';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'updateWhitelistArgs';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'projectId';
            type: 'string';
          },
          {
            name: 'merkleRoot';
            type: 'bytes';
          },
        ];
      };
    },
  ];
};
