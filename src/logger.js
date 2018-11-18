export function createLogger(scope) {
    return (...params) => {
        console.log(`${scope}:`, ...params)
    };
}