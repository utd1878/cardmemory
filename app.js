
function createCardObject(id, title, toppings1, toppings2_3, toppings4plus) {
    return {
        id: id,
        title: title,
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
        1,
        'Pepperoni & Ham',
        ['20', '30', '40', '54'],
        ['16', '24', '32', '46'],
        ['12', '18', '24', '38']
    );
    cards.push(pepperoniHamCard);

    // Onion– Green Pepper– Banana Pepper -Jalapeno– Olives– Green Chiles card
    const onionGreenPepperCard = createCardObject(
        2,
        'ONION–GREEN PEPPER–BANANA PEPPER-JALAPENO–OLIVES–GREEN CHILES',
        ['1.5', '2.0', '3.0', '4.0'],
        ['1.0', '1.5', '2.0', '2.5'],
        ['0.5', '1.0', '1.5', '2.0']
    );
    cards.push(onionGreenPepperCard);

    const suasageBeefChikCard = createCardObject(
        3,
        'Sausage-Beef-Chicken-Mushroom-Pineapple-Tomato',
        ['2.5', '3.5', '5.0', '6.5'],
        ['1.5', '2.5', '3.5', '4.5'],
        ['1.0', '1.5', '2.0', '2.5']
    )

    cards.push(suasageBeefChikCard);

    // Spinach card
    const spinachCard = createCardObject(
        4,
        'Spinach',
        ['1.5', '1.5', '2.0', '2.5'],
        ['1.0', '1.0', '1.5', '2.0'],
        ['', '', '', '', '']
    );
    cards.push(spinachCard);

    // Philly card
    const phillyCard = createCardObject(
        5,
        'Philly Steak & Bacon',
        ['2.0', '2.5', '3.5', '5.0'],
        ['1.5', '2.0', '2.5', '3.5'],
        ['1.0', '1.5', '2.0', '2.5']
    );
    cards.push(phillyCard);

    return cards;
}

// Array to hold the card objects
// const cards = getCardCollection();

// let currentCardIndex = 0;

function showCard(card) {
    const currentCard = card;//cards[currentCardIndex];
    $('.container').append('<div class="cardContainer" id="cardContainer' + card.id + '"> <div class="card" id="cardContent_' + card.id + '"></div></div>');
    const cardContainer = $("#cardContent_" + card.id);
    //cardContainer.empty(); // Clear previous card content
    //$('.container .title-row').remove();
    // Display title row
    const titleRow = $("<div class='row title-row'></div>");
    titleRow.append(`<div class='cell title-cell' colspan='${currentCard.grid.size.length + 1}'>${currentCard.title}</div>`);
    $('#cardContainer' + card.id).prepend(titleRow);

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

        cardContainer.append(column);
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

$(document).ready(function () {
    const cardCollection = getCardCollection();
    // Initial card display
    cardCollection.forEach((card) => {
        showCard(card);
    });

    // Event listener for the "Next Card" button
    // $("#nextButton").on("click", function () {
    //     currentCardIndex = (currentCardIndex + 1) % cards.length;

    //     showCard();
    // });
});
