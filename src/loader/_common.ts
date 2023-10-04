export interface IYamlLoader {
  load: <T>(filename: string) => T
}

export interface IFileLoader {
  load: (filename: string) => string
}
