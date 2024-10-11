export const blogKindLabel = {
  0: 'Qiita',
  1: 'External',
} as const
export type BlogKind = keyof typeof blogKindLabel
export const allBlogKinds = [0, 1] as const
