const data = {
    "HTML": { description: `The HyperText Markup Language or HTML is the
            standard markup language for documents designed to
            be displayed in a web browser.`},
    "CSS": { description: `Cascading Style Sheets is a style sheet language
            used for describing the presentation of a document
            written in a markup language such as HTML or XML.`},
    "JavaScript": { description: `JavaScript, often abbreviated as JS, is a
            programming language that is one of the core
            technologies of the World Wide Web, alongside HTML
            and CSS.`}
}

const menuContainer = document.getElementsByClassName("menu")[0];

{/* Create button that looks like this
    <button class="item" onclick="showDescription('HTML')">HTML</button> */}
function createMenus() {
    for (let label in data) {
        const buttonElement = document.createElement("button");
        buttonElement.classList = "item";
        buttonElement.innerText = label;
        menuContainer.appendChild(buttonElement);
    }
}


createMenus();

function showDescription(key) {
    let descriptionText = "";
    if (data[key]) {
        descriptionText = data[key].description;
    }
    // return first element it sees based on class name
    let descriptionElement =  document.querySelector(".description");
    descriptionElement.textContent = descriptionText;
}

menuContainer.addEventListener('click', (event) => {
    const label = event.target.innerText; // select button innerText for me (HTML, CSS, JavaScript)
    showDescription(label);
})

