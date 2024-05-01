const container = document.querySelector('.container');

const loadingSpinner = () => {
    const loadingDiv = document.createElement("img");
    loadingDiv.className = "loading";
    loadingDiv.src = 'https://i.gifer.com/7plQ.gif';
    container.append(loadingDiv);
}

const createImageEle = (data) => {
    const image = document.createElement('img');
    image.src = data.message;
    image.alt = "photo"
    // Step 6: Optimize image loading..
    image.loading = 'lazy'
    container.appendChild(image);
}

// Step 2: Load Images 
async function loadImages(numImages = 9) {
    for (let i=0; i < numImages; i++) {
        try {
            // Step 3: adding loading states
            loadingSpinner();
            const response = await fetch('https://dog.ceo/api/breeds/image/random')
            const data = await response.json();
            document.querySelector('.loading').remove();
            createImageEle(data);
        } catch (error) {
            console.log(error);
        }
    }
}



const handleScroll = () => {
    console.log('innerHeight', window.innerHeight);
    console.log('scrollY', window.scrollY);
    console.log('container.scrollHeight', container.scrollHeight);
    
    const PRELOAD_HEIGHT = 200;
    if (window.innerHeight + window.scrollY  >= container.scrollHeight) {
        console.log('Loading more images');
        loadImages();
    }
}

// Step 6: add throttle
// within 2s only execute once
// limit how often can be executed in response to an event such as window resizing or scrolling
const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
// Step 6: wait till 2s than exectuate
const debounce = (callback, delay) => {
    let timer;
    return function(...arguments) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...arguments);
        }, delay);
    }
}

loadImages();
// Step 4: add event listening to listen on scroll
window.addEventListener('scroll', throttle(handleScroll, 2000));






