
function createCardObject(id, title, shortTitle, toppings1, toppings2_3, toppings4plus) {
    return {
        id: id,
        title: title,
        shortTitle: shortTitle,
        grid: {
            size: ["Size", '10"', '12"', '14"', '16"'],
            toppings1: ['1 Topping', ...toppings1],
            toppings2_3: ['2-3 Toppings', ...toppings2_3],
            toppings4plus: ['4+ Toppings', ...toppings4plus],
        }
    };
}

// Card object template
function getCardCollection() {
    const cards = [];

    const pepperoniHamCard = createCardObject(
        'pep',
        'Pepperoni & Ham',
        'Pep&Ham',
        ['20', '30', '40', '54'],
        ['16', '24', '32', '46'],
        ['12', '18', '24', '38']
    );
    cards.push(pepperoniHamCard);

    // Onion– Green Pepper– Banana Pepper -Jalapeno– Olives– Green Chiles card
    const onionGreenPepperCard = createCardObject(
        'veg',
        'ONION–GREEN PEPPER–BANANA PEPPER-JALAPENO–OLIVES–GREEN CHILES',
        'Veg',
        ['1.5', '2.0', '3.0', '4.0'],
        ['1.0', '1.5', '2.0', '2.5'],
        ['0.5', '1.0', '1.5', '2.0']
    );
    cards.push(onionGreenPepperCard);

    const suasageBeefChikCard = createCardObject(
        'meats',
        'Sausage-Beef-Chicken-Mushroom-Pineapple-Tomato',
        'Meats',
        ['2.5', '3.5', '5.0', '6.5'],
        ['1.5', '2.5', '3.5', '4.5'],
        ['1.0', '1.5', '2.0', '2.5']
    )

    cards.push(suasageBeefChikCard);

    // Spinach card
    const spinachCard = createCardObject(
        'spin',
        'Spinach',
        'Spinach',
        ['1.5', '1.5', '2.0', '2.5'],
        ['1.0', '1.0', '1.5', '2.0'],
        ['', '', '', '', '']
    );
    cards.push(spinachCard);

    // Philly card
    const phillyCard = createCardObject(
        'phil',
        'Philly Steak & Bacon',
        'Philly/Bacon',
        ['2.0', '2.5', '3.5', '5.0'],
        ['1.5', '2.0', '2.5', '3.5'],
        ['1.0', '1.5', '2.0', '2.5']
    );
    cards.push(phillyCard);

    return cards;
}


function createTabs(card) {
    $('.container #tabs').append('<li><a href="#cardContainer' + card.id + '">' + card.shortTitle + '</li>')

    fillTab(card);

}

function fillTab(currentCard) {
    $('.container').append(`
    <div class="cardContainer" id="cardContainer` + currentCard.id + `">
        <div class="card" id="parentCard">
            <div class="cardGrid" id="cardContent_` + currentCard.id + `"></div>
        </div>
        <div id="showHideButton" class="show-hide-button" onclick="toggleMainCard()">
            <i id="icon" class="material-icons">visibility_off</i><i style="font-size: 14px;transform: translateY(4px);">click this icon to hide/show the answer board</i>
        </div>
        <div class='buttons'>
            <button onclick="addNewBlankBoard('`+ currentCard.id + `')" class="btn" type="button">Blank Board</button>
            <button onclick="addNewRandomBoard('`+ currentCard.id + `')" class="btn" type="button">Random Board</button>
        </div>
    </div>`);

    addCard(currentCard);


}

function toggleMainCard() {
    const contentToToggle = document.getElementById('parentCard');
    const icon = document.getElementById('icon');

    // Toggle visibility
    if (contentToToggle.style.display === 'none') {
        contentToToggle.style.display = 'block';
        icon.textContent = 'visibility_off'; // Change to 'visibility_off' when content is visible
    } else {
        contentToToggle.style.display = 'none';
        icon.textContent = 'visibility'; // Change to 'visibility' when content is hidden
    }
}

function addCard(currentCard) {
    const titleRow = $("<div class='row title-row'></div>");
    const cardContent = $("#cardContent_" + currentCard.id);

    titleRow.append(`<div class='cell title-cell' colspan='${currentCard.grid.size.length + 1}'>${currentCard.title}</div>`);
    $('#cardContainer' + currentCard.id + ' > .card').prepend(titleRow);

    // Transpose rows and columns in the card grid
    for (let col = 0; col < currentCard.grid.size.length; col++) {
        const column = $("<div class='column'></div>");

        // Each column has rows
        Object.keys(currentCard.grid).forEach((key, index) => {
            const row = index + 1; // Increase data-row for every key, starting from 1
            const cellContent = currentCard.grid[key][col];
            const isLabel = row === 1 || col === 0; // Check if it's a label cell
            const cellClass = isLabel ? 'label-cell' : 'input-cell';
            const cell = `<div class='cell ${cellClass}' contenteditable='${!isLabel}' data-row='${row}' data-col='${col + 1 !== 0 ? col + 1 : ''}'>${cellContent}</div>`;
            column.append(cell);
        });
        cardContent.append(column);
    }

    // Add input validation for decimal values
    $(".input-cell").on("input", function () {
        const inputValue = $(this).text();
        const isValidDecimal = /^\d*\.?\d*$/.test(inputValue);
        if (!isValidDecimal) {
            // Clear the input if it's not a valid decimal
            $(this).text('');
        }
    });
}
function addCardHtml(currentCard, empty, random) {
    let cardHtml = `<div class='card ` + (empty ? 'empty' : '') + (random ? 'random' : '') + `' data-id=` + currentCard.id + `>`;
    let titleRow = "<div class='row title-row'>";
    const cardContent = $("#cardContent_" + currentCard.id);

    titleRow = titleRow += `<div class='cell title-cell' colspan='${currentCard.grid.size.length + 1}'>${currentCard.title}
        <span id="removeBoard" class="remove-button" onclick="removeCard('`+ currentCard.id + `','` + (empty ? 'empty' : 'random') + `')">
            <i id="icon" class="material-icons">clear</i>
        </span>
        </div>
        </div>`;
    //$('#cardContainer' + currentCard.id).prepend(titleRow);
    cardHtml += titleRow;

    let cc = "<div class='cardGrid' id='cardContent_" + currentCard.id + "new'>";
    // Transpose rows and columns in the card grid
    for (let col = 0; col < currentCard.grid.size.length; col++) {
        let column = "<div class='column'>";

        // Each column has rows
        Object.keys(currentCard.grid).forEach((key, index) => {
            const row = index + 1; // Increase data-row for every key, starting from 1
            const isLabel = row === 1 || col === 0; // Check if it's a label cell
            const cellContent = (random & !isLabel) ? (shouldShowRandomContent(row) ? currentCard.grid[key][col] : '') : currentCard.grid[key][col];
            const cellClass = isLabel ? 'label-cell' : 'input-cell';
            const cell = `<div class='cell ${cellClass}' contenteditable='${!isLabel}' data-row='${row}' data-col='${col + 1 !== 0 ? col + 1 : ''}'>${isLabel ? cellContent : empty ? '' : random ? cellContent : ''}</div>`;
            column += cell;
        });
        cc += column + '</div>';
        //cardContent.append(column);
    }
    cc += "</div>";

    // Add input validation for decimal values
    $(".input-cell").on("input", function () {
        const inputValue = $(this).text();
        const isValidDecimal = /^\d*\.?\d*$/.test(inputValue);
        if (!isValidDecimal) {
            // Clear the input if it's not a valid decimal
            $(this).text('');
        }
    });
    return cardHtml + cc + "</div>";
}

function verifyInput(card, row, col, enteredValue) {
    // Check if the provided row and column are within the valid range
    if (row < 1 || row > card.grid.size.length || col < 1 || col > card.grid.size.length) {
        console.error('Invalid row or column provided.');
        return false;
    }

    // Get the correct value for the specified row and column from the card object
    const correctValue = card.grid[Object.keys(card.grid)[row - 1]][col - 1];

    // Convert the entered value to a float for accurate comparison
    const enteredFloat = parseFloat(enteredValue);

    // Check if the entered value matches the correct value
    if (enteredFloat === parseFloat(correctValue)) {
        console.log('Correct value entered!');
        return true;
    } else {
        console.log('Incorrect value entered. Please try again.');
        return false;
    }
}

function shouldShowRandomContent(row) {
    // Use Math.random() to decide randomly (adjust the threshold as needed)
    let random = Math.random() > 0.5;
    let r = Math.floor(Math.random() * 3) + 1;
    return random ?? r   // Adjust the threshold as needed
}

function addNewBlankBoard(id) {
    let card = $.grep(cardCollection, (c) => { return c.id === id })[0];
    if (document.getElementsByClassName("empty")) {
        $('#cardContainer' + card.id).children('.empty').remove();
    }
    setTimeout(() => {
        $('#cardContainer' + card.id).append(addCardHtml(card, true, false));
    }, 200);

}
function addNewRandomBoard(id) {
    let card = $.grep(cardCollection, (c) => { return c.id === id })[0];
    if (document.getElementsByClassName("random")) {
        $('#cardContainer' + card.id).children('.random').remove();
    }
    setTimeout(() => {
        $('#cardContainer' + card.id).append(addCardHtml(card, false, true));
    }, 200);

}

function removeCard(card, board) {
    $('#cardContainer' + card + ' > .' + board).remove();
}

var cardCollection = [];
$(document).ready(function () {
    cardCollection = getCardCollection();
    // Initial card display
    cardCollection.forEach((card) => {

        createTabs(card);
    });
    //createTabs(cardCollection[0])

    $('.container').tabs();
    $(".container").tabs("option", "active", 0);

    $(document).on('input', '.input-cell', function () {
        const row = parseInt($(this).data('row'));
        const col = parseInt($(this).data('col'));
        const enteredValue = $(this).text();

        // Get the card object based on your implementation
        const card = $.grep(cardCollection, (c) => {
            return c.id === $(this).closest('.card').data('id');
        })[0]; // You need to implement a method to get the current card object

        // Call verifyInput method
        $(this).removeClass('bad').removeClass('good').addClass(verifyInput(card, row, col, enteredValue) ? "good" : "bad");
    });

    // Event listener for the "Next Card" button
    // $("#nextButton").on("click", function () {
    //     currentCardIndex = (currentCardIndex + 1) % cards.length;

    //     showCard();
    // });
});
