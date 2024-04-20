export type KyupadSmartContract = {
  version: '0.1.0';
  name: 'kyupad_smart_contract';
  instructions: [
    {
      name: 'mintCnft';
      accounts: [
        {
          name: 'minter';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'pools';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'poolMinted';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treeAuthority';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'merkleTree';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'collectionAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'collectionAuthorityRecordPda';
          isMut: false;
          isSigner: false;
          docs: [
            'If there is no collecton authority record PDA then',
            'this must be the Bubblegum program address.',
          ];
        },
        {
          name: 'collectionMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'collectionMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'editionAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'bubblegumSigner';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'logWrapper';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'compressionProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
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
      name: 'initCollectionConfig';
      accounts: [
        {
          name: 'creator';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'collectionMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'pools';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'createCollection';
      accounts: [
        {
          name: 'creator';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'metadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'mint';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'collectionTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'masterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'updateAuthority';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
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
      accounts: [
        {
          name: 'creator';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'merkleTree';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treeConfig';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'updateAuthority';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'mplBubbleGumProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'compressionProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'logWrapper';
          isMut: false;
          isSigner: false;
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
      name: 'addPoolConfig';
      accounts: [
        {
          name: 'creator';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'collectionMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'pools';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'poolMinted';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'poolConfigArgs';
          type: {
            defined: 'PoolConfigArgs';
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'pools';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collectionMint';
            type: 'publicKey';
          },
          {
            name: 'author';
            type: {
              vec: 'publicKey';
            };
          },
          {
            name: 'poolsConfig';
            type: {
              vec: {
                defined: 'PoolConfig';
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
      name: 'mintCounter';
      docs: ['PDA to track the number of mints for an individual address.'];
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
  ];
  types: [
    {
      name: 'PoolConfigArgs';
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
      name: 'PoolConfig';
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
            type: 'publicKey';
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
  ];
  errors: [
    {
      code: 6000;
      name: 'InvalidAccountSize';
      msg: 'Could not save guard to account';
    },
    {
      code: 6001;
      name: 'InvalidWallet';
      msg: "This wallet is't supported to mint";
    },
    {
      code: 6002;
      name: 'InvalidMekleRoot';
      msg: 'The merkle root input not in the groups config';
    },
    {
      code: 6003;
      name: 'PoolSupplyRunOut';
      msg: "Pool's supply has run out";
    },
    {
      code: 6004;
      name: 'NotEnoughSOL';
      msg: 'Not enough sol to mint';
    },
    {
      code: 6005;
      name: 'PublicKeyMismatch';
    },
    {
      code: 6006;
      name: 'IncorrectOwner';
    },
    {
      code: 6007;
      name: 'AllowedMintLimitReached';
    },
    {
      code: 6008;
      name: 'NotMintTime';
      msg: 'Mint time is too early or expired';
    },
    {
      code: 6009;
      name: 'CannotAddPoolConfig';
      msg: 'This pool config is already in pools';
    },
  ];
};

export const IDL: KyupadSmartContract = {
  version: '0.1.0',
  name: 'kyupad_smart_contract',
  instructions: [
    {
      name: 'mintCnft',
      accounts: [
        {
          name: 'minter',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'pools',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'poolMinted',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treeAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'merkleTree',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collectionAuthorityRecordPda',
          isMut: false,
          isSigner: false,
          docs: [
            'If there is no collecton authority record PDA then',
            'this must be the Bubblegum program address.',
          ],
        },
        {
          name: 'collectionMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collectionMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'editionAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'bubblegumSigner',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'logWrapper',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'compressionProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'merkleProof',
          type: {
            vec: {
              array: ['u8', 32],
            },
          },
        },
        {
          name: 'poolId',
          type: 'string',
        },
        {
          name: 'data',
          type: 'bytes',
        },
      ],
    },
    {
      name: 'initCollectionConfig',
      accounts: [
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'collectionMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'pools',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createCollection',
      accounts: [
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'collectionTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'masterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'updateAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
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
      name: 'createTreeConfig',
      accounts: [
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'merkleTree',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treeConfig',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'updateAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mplBubbleGumProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'compressionProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'logWrapper',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'maxDepth',
          type: 'u32',
        },
        {
          name: 'maxBufferSize',
          type: 'u32',
        },
        {
          name: 'public',
          type: {
            option: 'bool',
          },
        },
        {
          name: 'treeSpace',
          type: 'u32',
        },
      ],
    },
    {
      name: 'addPoolConfig',
      accounts: [
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'collectionMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'pools',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'poolMinted',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'poolConfigArgs',
          type: {
            defined: 'PoolConfigArgs',
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'pools',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collectionMint',
            type: 'publicKey',
          },
          {
            name: 'author',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'poolsConfig',
            type: {
              vec: {
                defined: 'PoolConfig',
              },
            },
          },
        ],
      },
    },
    {
      name: 'poolMinted',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'remainingAssets',
            type: 'u16',
          },
        ],
      },
    },
    {
      name: 'mintCounter',
      docs: ['PDA to track the number of mints for an individual address.'],
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
  ],
  types: [
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
            name: 'startDate',
            type: 'i64',
          },
          {
            name: 'endDate',
            type: 'i64',
          },
          {
            name: 'merkleRoot',
            type: 'bytes',
          },
          {
            name: 'totalMintPerWallet',
            type: 'u8',
          },
          {
            name: 'payment',
            type: 'f32',
          },
          {
            name: 'poolSupply',
            type: 'u16',
          },
          {
            name: 'exclusionPools',
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
      name: 'PoolConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'id',
            type: 'string',
          },
          {
            name: 'startDate',
            type: 'i64',
          },
          {
            name: 'endDate',
            type: 'i64',
          },
          {
            name: 'merkleRoot',
            type: 'bytes',
          },
          {
            name: 'totalMintPerWallet',
            type: 'u8',
          },
          {
            name: 'destination',
            type: 'publicKey',
          },
          {
            name: 'payment',
            type: 'f32',
          },
          {
            name: 'poolSupply',
            type: 'u16',
          },
          {
            name: 'exclusionPools',
            type: {
              option: {
                vec: 'string',
              },
            },
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidAccountSize',
      msg: 'Could not save guard to account',
    },
    {
      code: 6001,
      name: 'InvalidWallet',
      msg: "This wallet is't supported to mint",
    },
    {
      code: 6002,
      name: 'InvalidMekleRoot',
      msg: 'The merkle root input not in the groups config',
    },
    {
      code: 6003,
      name: 'PoolSupplyRunOut',
      msg: "Pool's supply has run out",
    },
    {
      code: 6004,
      name: 'NotEnoughSOL',
      msg: 'Not enough sol to mint',
    },
    {
      code: 6005,
      name: 'PublicKeyMismatch',
    },
    {
      code: 6006,
      name: 'IncorrectOwner',
    },
    {
      code: 6007,
      name: 'AllowedMintLimitReached',
    },
    {
      code: 6008,
      name: 'NotMintTime',
      msg: 'Mint time is too early or expired',
    },
    {
      code: 6009,
      name: 'CannotAddPoolConfig',
      msg: 'This pool config is already in pools',
    },
  ],
};
