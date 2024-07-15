/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
function promiseAll(promises) {

    return new Promise((resolve, reject) => {
      let result = new Array(promises.length);
      
      if (promises.length === 0) {
        resolve(result);
      } 
      
      let resolvedCount = 0;
      
      for (let i=0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then((value) => {
          result[i] = value;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(result)
          }           
        }, (error) => {
          reject(error);
        })
      }
    });
}
  
  
  const p0 = Promise.resolve(3);
  const p1 = 42;
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 100);
  });
  
  
  promiseAll([p0, p1, p2]).then((result) => { console.log(result)}); // [3, 42, 'foo']
  
  
  // const p0 = Promise.resolve(30);
  // const p1 = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     reject('An error occurred!');
  //   }, 100);
  // });
  
  // promiseAll([p0, p1]).catch((err) => {  console.log(err);})