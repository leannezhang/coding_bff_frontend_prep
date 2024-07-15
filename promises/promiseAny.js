function promiseAny(promises) {
    
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            reject(new AggregateError([])) 
        }
        for (let i=0; i < promises.length; i++) {
            let p = promises[i];
            Promise.resolve(p).then((value) => {
                resolve(value)
            }, (error) => {
                reject(new AggregateError(error));
            })
        }
    });
}

promiseAny([p0]).catch((err) => {
    console.log(err);
})