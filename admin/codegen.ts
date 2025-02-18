import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../backend/schema/*.gql',
  documents: 'src/graphql/**/*.gql',
  generates: {
    'src/graphql/types/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        strictScalars: true,
        scalars: {
          Time: 'string',
          Int64: 'number',
          Uint: 'number',
          Upload: 'File',
        },
        withHooks: true,
      },
    },
  },
}
export default config
