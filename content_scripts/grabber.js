(() => {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    console.log('running')

    // Get all html elements on page
    let allElements = document.body.getElementsByTagName("*");

    // Add listeners for mouse hovering over each element
    for (const element of allElements) {
        element.addEventListener('mouseover', highlightElement);
        element.addEventListener('mouseout', restoreElement);
    }

    document.addEventListener('click', (e) => {
        console.log('clicked on ' + e.target.textContent);
        for (const child of e.target.children) {
            // TODO: Parse and store text info from product
        }
    })
})();

// Matches element id's to their original style string
elementStyleDict = {}

// Generate id for elements without one already
nextId = 1234;
function generateId() {
    let output = nextId;
    nextId++;
    return output;
}

function highlightElement(event) {
    let element = event.currentTarget;
    if (!element.hasAttribute('id')) {
        element.setAttribute('id', generateId());
    }
    let id = element.getAttribute('id')

    // Save original style
    elementStyleDict[id] = element.getAttribute('style');

    // Append style for highlight
    event.target.setAttribute('style', elementStyleDict[id] + 'border:2px solid yellow; background:yellow;');
}

function restoreElement(event) {
    let element = event.currentTarget;
    element.setAttribute('style', elementStyleDict[element.getAttribute('id')])
}