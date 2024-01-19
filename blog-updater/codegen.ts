import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../backend/schema/*.gql',
  documents: 'src/graphql/**/*.gql',
  generates: {
    'src/graphql/types/index.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        strictScalars: true,
        scalars: {
          Time: 'string',
          Uint: 'number',
        },
      },
      hooks: {
        afterOneFileWrite:
          'npx prettier --write src/graphql/types/index.ts && npx eslint . --fix',
      },
    },
  },
}
export default config
