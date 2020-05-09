/**
 * Toolmethod to generate a HTML element based on the parameters given.
 * @param {*} elementType
 * @param {*} parentDiv
 * @param {*} [innerHTML=null]
 * @param {*} [className=null]
 * @param {*} [id=null]
 * @param {*} [srcUrl=null]
 * @returns {HTMLHtmlElement}
 */
function generateElement(elementType, parentDiv, innerHTML = null, className = null, id = null, srcUrl = null, ) {
    let element = document.createElement(elementType);
    parentDiv.appendChild(element);
    if (className !== null) {
        element.className = className;
    }
    if (id !== null) {
        element.id = id;
    }
    if (srcUrl !== null) {
        element.setAttribute("src", srcUrl);
    }
    if (innerHTML !== null) {
        element.innerHTML = innerHTML;
    }
    return element;
}

function generatePopUpMessage(message) {
    let container = generateElement("div", document.body);
    generateElement("h3", container, message)
    container.addEventListener("click", () => {
        container.remove();
    });

    container.className = "centerStickyDiv centerAlign";

    setInterval(() => {
        container.remove();
    }, 1000);
}

function generateCloseButton(parentDiv) {
    let closeButton = generateElement("button", parentDiv, 'X');

    closeButton.addEventListener("click", () => {
        parentDiv.remove();
    });

    return closeButton;
}


function generateDivGrid(columnCount, parentDiv) {
    let row = document.createElement("div");
    parentDiv.appendChild(row);
    row.className = "row";

    let columns = [];
    for (let i = 0; i < columnCount; i++) {
        let column = document.createElement("div");
        row.appendChild(column);
        column.className = "column";
        columns.push(column);
    }

    return columns;
}


export{generateElement,generatePopUpMessage,generateCloseButton,generateDivGrid}