// Airbnb Question

class Pledge {
    constructor(executor) {
        this.resolvedPromiseChain = [];
        this.cached = null;
        executor(this.resolve.bind(this));
    }

    resolve(value) {
        this.cached = value;
        this.resolvedPromiseChain.forEach(callback => callback(value));
        this.resolvedPromiseChain = [];
    }

    then(resolvecb) {
        if (this.cached !== null) {
            resolvecb(this.cached);
        } else {
            this.resolvedPromiseChain.push(resolvecb);
        }
    }
}


const newPledge = new Pledge((resolve) => {
    setTimeout(() => {
        resolve('Success')
    }, 500);
})


newPledge.then(console.log);
newPledge.then((response) => {
    console.log(`Another ${response}`);
})


// Constructor:
// •	Initializes callbacks to an empty array.
// •	Calls the provided executor function with this.resolve.bind(this) to ensure proper context for the resolve method.
// •	resolve Method:
// •	Caches the resolved value.
// •	Executes all registered callbacks with the resolved value.
// •	Clears the callbacks array after execution.
// •	then Method:
// •	Checks if the value is already cached; if so, it immediately calls the provided callback with the cached value.
// •	If not cached, it adds the callback to the callbacks array to be executed once resolved.

// https://skilled.dev/course/build-a-javascript-promise
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#description