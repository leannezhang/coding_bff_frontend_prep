const container = document.querySelector('.container');


const createImagesDOM = (data) => {
    const image = document.createElement('img');
    image.src = data.message;
    image.alt = "dog photo"
    // Step 7: Optimize image loading.
    image.loading = 'lazy'
    container.appendChild(image);
}

// Step 5: adding loading states
const loadingSpinner = () => {
    const loadingDiv = document.createElement("img");
    loadingDiv.className = "loading";
    loadingDiv.src = 'https://i.gifer.com/7plQ.gif';
    container.append(loadingDiv);
}

// Step 2: Load Images 
async function loadImages(numImages = 9) {
    for (let i=0; i < numImages; i++) {
        try {
            loadingSpinner();
            const response = await fetch('https://dog.ceo/api/breeds/image/random')
            const data = await response.json();
            document.querySelector('.loading').remove();
            createImagesDOM(data);
        } catch (error) {
            console.log(error);
        }
    }
}


// Step 3: Add handle scroll
const handleScroll = () => {
    console.log('innerHeight', window.innerHeight);
    console.log('scrollY', window.scrollY);
    console.log('container.scrollHeight', container.scrollHeight);
    
    if (window.innerHeight + window.scrollY  >= container.scrollHeight) {
        console.log('Loading more images');
        loadImages();
    }
}

// Step 6: add throttle
// only execute the callback once WITHIN 2s
// limit how often can be executed in response to an event such as window resizing or scrolling
const throttle = (callback, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
        const args = arguments;
        if (!lastRan) {
            callback(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    callback(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}


loadImages();
// Step 3: add event listening to listen on scroll
const DELAY = 2000;
window.addEventListener('scroll', throttle(handleScroll, DELAY));