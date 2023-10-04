import { readFileSync } from 'fs'
import { IFileLoader, IYamlLoader } from './_common'
import { load } from 'js-yaml'

export class FileLoader implements IFileLoader {
  load = (filename: string) => {
    try {
      return readFileSync(filename, 'utf8')
    } catch {
      return ''
    }
  }
}

export class YamlLoader implements IYamlLoader {
  #fileLoader: FileLoader

  constructor() {
    this.#fileLoader = new FileLoader()
  }

  load = <T = any>(filename: string): T => {
    const content = this.#fileLoader.load(filename)
    return load(content) as T
  }
}
