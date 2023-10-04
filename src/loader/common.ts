import { readFileSync } from 'fs'
import { IFileLoader, IYamlLoader } from './_common'
import { load } from 'js-yaml'

export class FileLoader implements IFileLoader {
  load = (filename: string) => readFileSync(filename, 'utf8')
}

export class YamlLoader implements IYamlLoader {
  #fileLoader: FileLoader

  constructor() {
    this.#fileLoader = new FileLoader()
  }

  load = <T>(filename: string) => {
    return load(this.#fileLoader.load(filename)) as T
  }
}
