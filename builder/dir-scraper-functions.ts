import * as fs from "fs";
interface IFileReader {
  isJsonFile(file: string): boolean;
  readText(file: string): string;
  readJson(file: string): unknown;
}

const directoryScraper = (dirPath: string, fileReader: IFileReader) => {
  return fs
    .readdirSync(dirPath)
    .reduce<Record<string, unknown>>(
      (acc: Record<string, unknown>, file: string) => {
        if (fileReader.isJsonFile(file)) {
          acc[file] = fileReader.readJson(`${dirPath}/${file}`);
        } else {
          acc[file] = fileReader.readText(`${dirPath}/${file}`);
        }

        return acc;
      },
      {}
    );
};

const fileReader: IFileReader = {
  isJsonFile: (file: string): boolean => {
    return file.endsWith(".json");
  },
  readText: (file: string): string => {
    return fs.readFileSync(file, "utf8");
  },
  readJson: (file: string): unknown => {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  }
}

const output = directoryScraper("./data", fileReader);
console.log(output);

// class FileReader implements IFileReader {
//   isJsonFile(file: string): boolean {
//     return file.endsWith(".json");
//   }

//   readText(file: string): string {
//     return fs.readFileSync(file, "utf8");
//   }

//   readJson(file: string): unknown {
//     return JSON.parse(fs.readFileSync(file, "utf8"));
//   }
// }

// const fileReader = new FileReader();
// const dirScraper = new DirectoryScraper("./data", new FileReader());
// const output = dirScraper.scanFiles();
// console.log(output);
