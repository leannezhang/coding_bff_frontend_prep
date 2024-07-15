// https://medium.com/swlh/implement-a-simple-promise-in-javascript-20c9705f197a

class SimplePromise {
    constructor(executor) {
        this.status = "pending";
        this.value = '';
        executor(this.#onSuccess.bind(this), this.#onRejected.bind(this));
    }

    #onSuccess(value) {
        if (this.status === 'pending') {
            this.value = value;
            this.status = "fulfilled";
        }
    }

    #onRejected() {
        if (this.status === 'pending') {
            this.value = value;
            this.status = "rejected";
        }
    }

    then(onSuccess, onRejected) {

    }
}

const p1 = new Promise((resolve, reject) => {
    resolve('resolved');
})

const p2= new Promise((resolve, reject) => {
    reject('rejected')
})

p1.then((res) => {
    console.log(res)
}, (err) => {
    console.log(err);
})