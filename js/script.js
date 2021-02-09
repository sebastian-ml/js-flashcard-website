function createHtmlElement(htmlTagName, htmlClassNames, htmlID) {
    const newElement = document.createElement(htmlTagName);

    if (htmlClassNames) newElement.classList.add(...htmlClassNames);
    if (htmlID) newElement.id = htmlID;

    return newElement;
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
