const STATE = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
    PENDING: 'pending',
}


class MyPromise {

    constructor(cb) {
      this.promiseChain = [];
      this.rejectedChain = []
      this.state= STATE.PENDING;
      this.value=null;
      try {
        cb(this._onResolve, this._onReject)
      } catch (e) {
        this._onReject(e);
      }
    }

    // private method
    _onResolve(value) {
        if (this.state !== STATE.PENDING) {
            return  // already called
        }
        this.value = value;
        this.state = STATE.FULFILLED
        for(let p of this.promiseChain) {
            p(this.value)
        }
        this.promiseChain = []
    }

    // private method
    _onReject(error) {
        if (this.state !== STATE.PENDING) {
            return ;
        }
        this.value = error;
        this.state = STATE.REJECTED;
        for (let p of this.rejectedChain) {
            p(this.value);
        }
        this.rejectedChain = [];
    }
 
    then(cb) {
        this.promiseChain.push(cb)
    }


    catch() {

    }

    finally() {

    }

}

module.exports = MyPromise


const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("3");
    }, 1000)
    reject("error")
})
// p.then((value) => {
//     console.log('value', value)
//     return value * 2
// }).then((value) => {
//     console.log(value)
//     return value * 3
// }).then((value) => {
//     console.log(value)
//     return value;
// })