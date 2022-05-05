import * as fs from "fs";
interface IFileReader {
  isJsonFile(file: string): boolean;
  readText(file: string): string;
  readJson(file: string): unknown;
}

class DirectoryScraper {
  constructor(public dirPath: string, public fileReader: IFileReader) {}

  scanFiles() {
    return fs.readdirSync(this.dirPath).reduce<Record<string, unknown>>((acc: Record<string, unknown>, file: string) => {
      if (this.fileReader.isJsonFile(file)) {
        acc[file] = this.fileReader.readJson(`${this.dirPath}/${file}`);
      } else {
        acc[file] = this.fileReader.readText(`${this.dirPath}/${file}`);
      }

      return acc;
    }, {});
  }
}

class FileReader implements IFileReader {
  isJsonFile(file: string): boolean {
    return file.endsWith(".json");
  }

  readText(file: string): string {
    return fs.readFileSync(file, "utf8");
  }

  readJson(file: string): unknown {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  }
}

const fileReader = new FileReader();
const dirScraper = new DirectoryScraper('./data', new FileReader());
const output = dirScraper.scanFiles();
console.log(output);
