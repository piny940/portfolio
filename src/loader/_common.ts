import { readFileSync } from 'fs'
import { load } from 'js-yaml'

export interface IYamlLoader {
  load: <T>(filename: string) => T
}

export class YamlLoader implements IYamlLoader {
  load = <T>(filename: string) => {
    return load(readFileSync(filename, 'utf8')) as T
  }
}

export interface IFileLoader {
  load: (filename: string) => string
}

export class FileLoader implements IFileLoader {
  load = (filename: string) => readFileSync(filename, 'utf8')
}
