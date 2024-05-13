/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/kyupad_smart_contract.json`.
 */
export type KyupadSmartContract = {
  address: 'GJZghSMo1HGLmQGhUUU7a7RSL1VbabwmBiYBbqiJ86sP';
  metadata: {
    name: 'kyupadSmartContract';
    version: '0.1.1';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'addPoolConfig';
      discriminator: [70, 96, 94, 28, 117, 89, 79, 137];
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
          name: 'collectionMint';
        },
        {
          name: 'pools';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [112, 111, 111, 108, 115];
              },
              {
                kind: 'account';
                path: 'collectionMint';
              },
            ];
          };
        },
        {
          name: 'destination';
        },
        {
          name: 'poolMinted';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [112, 111, 111, 108, 95, 109, 105, 110, 116, 101, 100];
              },
              {
                kind: 'account';
                path: 'pools';
              },
              {
                kind: 'arg';
                path: 'pool_config_args.id';
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
          name: 'poolConfigArgs';
          type: {
            defined: {
              name: 'poolConfigArgs';
            };
          };
        },
      ];
    },
    {
      name: 'createCollection';
      discriminator: [156, 251, 92, 54, 233, 2, 16, 82];
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
          name: 'metadata';
          writable: true;
        },
        {
          name: 'mint';
          writable: true;
          signer: true;
        },
        {
          name: 'collectionTokenAccount';
          writable: true;
        },
        {
          name: 'masterEdition';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'updateAuthority';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  117,
                  112,
                  100,
                  97,
                  116,
                  101,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121,
                ];
              },
            ];
          };
        },
        {
          name: 'tokenMetadataProgram';
        },
        {
          name: 'tokenProgram';
        },
        {
          name: 'associatedTokenProgram';
        },
      ];
      args: [
        {
          name: 'data';
          type: 'bytes';
        },
      ];
    },
    {
      name: 'createTreeConfig';
      discriminator: [170, 141, 85, 101, 116, 175, 115, 173];
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
          name: 'merkleTree';
          writable: true;
        },
        {
          name: 'treeConfig';
          writable: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
        {
          name: 'updateAuthority';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  117,
                  112,
                  100,
                  97,
                  116,
                  101,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121,
                ];
              },
            ];
          };
        },
        {
          name: 'mplBubbleGumProgram';
        },
        {
          name: 'compressionProgram';
        },
        {
          name: 'logWrapper';
        },
      ];
      args: [
        {
          name: 'maxDepth';
          type: 'u32';
        },
        {
          name: 'maxBufferSize';
          type: 'u32';
        },
        {
          name: 'public';
          type: {
            option: 'bool';
          };
        },
        {
          name: 'treeSpace';
          type: 'u32';
        },
      ];
    },
    {
      name: 'initAdmin';
      discriminator: [97, 65, 97, 27, 200, 206, 72, 219];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
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
        {
          name: 'kyupadProgramData';
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
      name: 'initCollectionConfig';
      discriminator: [100, 10, 6, 168, 147, 33, 83, 238];
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
          name: 'collectionMint';
        },
        {
          name: 'pools';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [112, 111, 111, 108, 115];
              },
              {
                kind: 'account';
                path: 'collectionMint';
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
          name: 'initCollectionConfigArgs';
          type: {
            defined: {
              name: 'initCollectionConfigArgs';
            };
          };
        },
      ];
    },
    {
      name: 'mintCnft';
      discriminator: [164, 126, 48, 95, 183, 239, 13, 209];
      accounts: [
        {
          name: 'minter';
          writable: true;
          signer: true;
        },
        {
          name: 'pools';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [112, 111, 111, 108, 115];
              },
              {
                kind: 'account';
                path: 'collectionMint';
              },
            ];
          };
        },
        {
          name: 'mintCounterCollection';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  109,
                  105,
                  110,
                  116,
                  95,
                  99,
                  111,
                  117,
                  110,
                  116,
                  101,
                  114,
                  95,
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110,
                ];
              },
              {
                kind: 'account';
                path: 'minter';
              },
              {
                kind: 'account';
                path: 'collectionMint';
              },
            ];
          };
        },
        {
          name: 'destination';
          writable: true;
        },
        {
          name: 'poolMinted';
          writable: true;
        },
        {
          name: 'treeAuthority';
          writable: true;
        },
        {
          name: 'merkleTree';
          writable: true;
        },
        {
          name: 'collectionAuthority';
        },
        {
          name: 'collectionAuthorityRecordPda';
          docs: [
            'If there is no collecton authority record PDA then',
            'this must be the Bubblegum program address.',
          ];
        },
        {
          name: 'collectionMint';
        },
        {
          name: 'collectionMetadata';
          writable: true;
        },
        {
          name: 'editionAccount';
        },
        {
          name: 'bubblegumSigner';
        },
        {
          name: 'logWrapper';
        },
        {
          name: 'compressionProgram';
        },
        {
          name: 'tokenMetadataProgram';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
      ];
      args: [
        {
          name: 'merkleProof';
          type: {
            vec: {
              array: ['u8', 32];
            };
          };
        },
        {
          name: 'poolId';
          type: 'string';
        },
        {
          name: 'data';
          type: 'bytes';
        },
      ];
    },
    {
      name: 'updatePoolConfig';
      discriminator: [68, 236, 203, 122, 179, 62, 234, 252];
      accounts: [
        {
          name: 'signer';
          writable: true;
          signer: true;
        },
        {
          name: 'adminPda';
          docs: ['CHECK'];
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: 'account';
                path: 'signer';
              },
            ];
          };
        },
        {
          name: 'collectionMint';
        },
        {
          name: 'pools';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [112, 111, 111, 108, 115];
              },
              {
                kind: 'account';
                path: 'collectionMint';
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
          name: 'args';
          type: {
            defined: {
              name: 'updatePoolConfigArgs';
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
      name: 'mintCounterCollection';
      discriminator: [130, 72, 2, 215, 81, 114, 109, 217];
    },
    {
      name: 'poolMinted';
      discriminator: [117, 238, 58, 81, 197, 163, 121, 145];
    },
    {
      name: 'pools';
      discriminator: [107, 216, 188, 161, 30, 47, 151, 9];
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
      name: 'invalidMekleRoot';
      msg: 'The merkle root is invalid';
    },
    {
      code: 6002;
      name: 'poolSupplyRunOut';
      msg: "Pool's supply has run out";
    },
    {
      code: 6003;
      name: 'publicKeyMismatch';
    },
    {
      code: 6004;
      name: 'incorrectOwner';
    },
    {
      code: 6005;
      name: 'allowedMintLimitReached';
    },
    {
      code: 6006;
      name: 'notMintTime';
      msg: 'Mint time is too early or expired';
    },
    {
      code: 6007;
      name: 'cannotAddPoolConfig';
      msg: 'This pool config is already in pools';
    },
    {
      code: 6008;
      name: 'destinationIsInvalid';
      msg: "This destination address doesn't not match with pools config";
    },
    {
      code: 6009;
      name: 'poolIdInvalid';
      msg: "Your pool id doesn't in pools config";
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
      name: 'initCollectionConfigArgs';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'maxMintOfWallet';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'mintCounterCollection';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'count';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'poolConfig';
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
            name: 'totalMintPerWallet';
            type: 'u8';
          },
          {
            name: 'destination';
            type: 'pubkey';
          },
          {
            name: 'payment';
            type: 'f32';
          },
          {
            name: 'poolSupply';
            type: 'u16';
          },
          {
            name: 'exclusionPools';
            type: {
              option: {
                vec: 'string';
              };
            };
          },
        ];
      };
    },
    {
      name: 'poolConfigArgs';
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
            name: 'totalMintPerWallet';
            type: 'u8';
          },
          {
            name: 'payment';
            type: 'f32';
          },
          {
            name: 'poolSupply';
            type: 'u16';
          },
          {
            name: 'exclusionPools';
            type: {
              option: {
                vec: 'string';
              };
            };
          },
        ];
      };
    },
    {
      name: 'poolMinted';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'remainingAssets';
            type: 'u16';
          },
        ];
      };
    },
    {
      name: 'pools';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collectionMint';
            type: 'pubkey';
          },
          {
            name: 'poolsConfig';
            type: {
              vec: {
                defined: {
                  name: 'poolConfig';
                };
              };
            };
          },
          {
            name: 'maxMintOfWallet';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'updatePoolConfigArgs';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'poolId';
            type: 'string';
          },
          {
            name: 'merkleRoot';
            type: 'bytes';
          },
          {
            name: 'totalPoolSupply';
            type: {
              option: 'u16';
            };
          },
        ];
      };
    },
  ];
};
