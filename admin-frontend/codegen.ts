import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../admin-backend/schema/*.gql',
  documents: 'src/graphql/**/*.gql',
  generates: {
    'src/graphql/types/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        strictScalars: true,
        scalars: {
          Time: 'string',
          Uint: 'number',
        },
        withHooks: true,
      },
      hooks: {
        afterOneFileWrite:
          'npx prettier --write src/graphql/types/index.ts && npx eslint . --fix',
      },
    },
  },
}
export default config
