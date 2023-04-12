(() => {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    console.log('running')

    // Get all html elements on page
    let allElements = document.body.getElementsByTagName("*");

    // Prevents clicks for elements with href
    document.addEventListener('click', function(event) {
        event.preventDefault()
    });


    let links = []
    for (let link of document.links) {
        links.push(`[href="${link.href}"]`);
    }
    // let hrefElements = document.querySelectorAll(links);

    // for (let link of links) {
    //     $(link).click(function(event){
    //         event.preventDefault();
    //     });
    // }


    // Add listeners for mouse hovering over each element
    for (const element of allElements) {
        element.addEventListener('mouseover', highlightElement);
        element.addEventListener('mouseout', restoreElement);
    }

    document.addEventListener('click', (e) => {
        //console.log('clicked on ' + e.target.textContent);
        for (const child of e.target.children) {
            // TODO: Parse and store text info from product
            tryGrabPrice(child.innerHTML)
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

function tryGrabPrice(text) {
    let dollarSignIndex = text.indexOf('$');
    if (dollarSignIndex === -1) {
        return '';  // Did not find a price
    }

    const decimalRegEx = new RegExp("\d+");
    const outputText = text.match(decimalRegEx);
    let endIndex = dollarSignIndex + 1;
    let char = outputText.input.charAt(endIndex)
    const input = outputText.input;
    while (char !== undefined) {
        // Check if this is this part of a number
        if (isNumeric(char) || char === '.' || char === ',') {
            endIndex++;
            char = input.charAt(endIndex);
            continue;
        }
        break;
    }
    let output = input.substring(dollarSignIndex, endIndex)
    console.log(output);
}

function isNumeric(str) {
    // isNaN tells is a value cannot be converted into a number
    return !isNaN(str - parseFloat(str));
}