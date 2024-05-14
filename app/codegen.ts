import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '../backend/schema/*.gql',
  documents: 'src/**/*.gql',
  generates: {
    'src/server/_types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        strictScalars: true,
        scalars: {
          Time: 'string',
          Int64: 'number',
          Uint: 'number',
        },
        withHooks: true,
      },
    },
  },
}

export default config
