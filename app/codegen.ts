import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '../backend/schema/*.gql',
  documents: 'src/**/*.gql',
  generates: {
    'src/server/_types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        strictScalars: true,
        scalars: {
          Time: 'string',
          Uint: 'number',
        },
        withHooks: true,
      },
    },
  },
}

export default config
