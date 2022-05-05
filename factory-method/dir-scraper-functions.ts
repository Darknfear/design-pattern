import * as fs from "fs";

interface IFileReader {
  isJSONFile(file: string): boolean;
  readText(file: string): string;
  readJson(file: string): unknown;
}

const createDirectoryScraper = (fileReader: IFileReader) => {
  return (dirPath: string) =>
    fs
      .readdirSync(dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string) => {
          if (fileReader.isJSONFile(file)) {
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
  isJSONFile: (file: string): boolean => {
    return file.endsWith(".json");
  },
  readText: (file: string): string => {
    return fs.readFileSync(file, "utf8");
  },
  readJson: (file: string): unknown => {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  },
};


const dirScraper = createDirectoryScraper(fileReader);
const output = dirScraper('./data');
console.log(output);
