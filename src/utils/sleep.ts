export const sleep = (seconds: number = 0) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000)
    })
}