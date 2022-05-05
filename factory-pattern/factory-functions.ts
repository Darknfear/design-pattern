interface ILogger {
  info(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
  error(message: string): void;
}

const productionLogger = (): ILogger => ({
  info: (message: string): void => {},
  debug: (message: string): void => {},
  error: (message: string): void => {
    console.error(message);
  },

  warn: (message: string): void => {
    console.warn(message);
  },
});

const developmentLogger = (): ILogger => ({
  info: (message): void => {console.info(message)},
  debug: (message: string) => {console.debug(message)},
  error: (message: string) => {console.error(message)},
  warn: (message: string) => {console.warn(message)}
});


export const createLogger = (): ILogger => {
    if (process.env.NODE_ENV === 'production') {
        return productionLogger();
    }
    return developmentLogger();
}
