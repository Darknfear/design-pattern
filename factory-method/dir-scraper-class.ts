import * as fs from "fs";

abstract class DirectoryScraper {
  constructor(public dirPath: string) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string) => {
          if (this.isJSONFile(file)) {
            acc[file] = this.readJSONFile(`${this.dirPath}/${file}`);
          } else {
            acc[file] = this.readTextFile(`${this.dirPath}/${file}`);
          }

          return acc;
        },
        {}
      );
  }

  abstract isJSONFile(filePath: string): boolean;
  abstract readTextFile(filePath: string): string;
  abstract readJSONFile(filePath: string): unknown;
}

class FileReader extends DirectoryScraper {
  isJSONFile(file: string): boolean {
    return file.endsWith(".json");
  }

  readTextFile(file: string): string {
    return fs.readFileSync(file, "utf8");
  }

  readJSONFile(file: string): unknown {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  }
}

const fileReader = new FileReader('./data');
const output = fileReader.scanFiles();
console.log(output);
