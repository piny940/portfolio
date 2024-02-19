import { readFileSync } from 'fs'
import { load } from 'js-yaml'

export class FileLoader {
  load = (filename: string) => {
    try {
      return readFileSync(filename, 'utf8')
    } catch {
      return undefined
    }
  }
}

export class YamlLoader {
  #fileLoader: FileLoader

  constructor() {
    this.#fileLoader = new FileLoader()
  }

  load = <T = any>(filename: string): T => {
    const content = this.#fileLoader.load(filename) || ''
    return load(content) as T
  }
}
