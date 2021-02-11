export function createHtmlElement(htmlTagName, htmlClassNames, htmlID) {
    const newElement = document.createElement(htmlTagName);

    if (htmlClassNames) newElement.classList.add(...htmlClassNames);
    if (htmlID) newElement.id = htmlID;

    return newElement;
}

export function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Get a random integer number between 0 and less than range
export function getRandomNumber(range) {
    return Math.floor(Math.random() * range);
}
