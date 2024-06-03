function createCardObject(
  id,
  title,
  shortTitle,
  toppings1,
  toppings2_3,
  toppings4plus,
  top1_label = '1 Topping',
  top2_label = '2-3 Topping',
  top3_label = '4+ Toppings'
) {
  toppings4plus = toppings4plus || [];
  toppings2_3 = toppings2_3 || [];
  toppings1 = toppings1 || [];
  return {
    id: id,
    title: title,
    shortTitle: shortTitle,
    grid: {
      size: ['Size', '10"', '12"', '14"', '16"'],
      toppings1: [top1_label, ...toppings1],
      toppings2_3: [top2_label, ...toppings2_3],
      toppings4plus: [top3_label, ...toppings4plus],
    },
  };
}

function createCardObjectV2(id, title, shortTitle, gridTitle, ...args) {
  const rows = [];

  // Loop through remaining arguments (except size)
  for (const arg of args) {
    // Check if arg is an object with required properties
    if (typeof arg === 'object' && 'label' in arg && 'order' in arg) {
      const row = {
        label: arg.label,
        cells: arg.values ? arg.values.slice() : [], // Copy values if present
        style: arg.style || null,
        order: arg.order,
      };
      rows.push(row);
    }
  }

  // Sort rows based on 'order' property (ascending)
  rows.sort((a, b) => a.order - b.order);

  let header = [gridTitle, '10"', '12"', '14"', '16"'];
  if (typeof gridTitle === 'object') {
    header = [gridTitle.label].concat(gridTitle.headers);
  }
  return {
    id,
    title,
    shortTitle,
    grid: {
      header: header,
      rows,
    },
  };
}

function getSpecialtyCardCollection() {
  const cards = [];
  const buffaloChicken = createCardObjectV2(
    'buffaloChicken',
    'Buffalo Chicken',
    'Buffalo Chicken',
    'Ingredients',
    { label: 'AMERICAN CHEESE', values: ['4', '6', '7', '9'], order: 1 },
    { label: 'CHICKEN', values: ['2.0', '3.0', '4.0', '5.0'], order: 2 },
    { label: 'ONION', values: ['1.0', '1.5', '2.0', '2.5'], order: 3 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 4 },
    { label: 'CHEDDAR BLEND', values: ['1.0', '2.0', '2.5', '3.5'], order: 5 },
    { label: 'POST BAKE', style: 'merge', order: 6 },
    { label: 'HOT BUFFALO', values: ['1.0', '2.0', '2.5', '3.5'], order: 7 }
  );
  cards.push(buffaloChicken);

  const caliChickenBaconRanch = createCardObjectV2(
    'caliChickenBaconRanch',
    'Cali Chicken Bacon Ranch',
    'Cali Chicken Bacon Ranch',
    'Ingredients',
    { label: 'RANCH', values: ['1.5', '3.0', '4.0', '5.0'], order: 1 },
    { label: 'PIZZA CHEESE', values: ['1.5', '2.5', '3.5', '4.5'], order: 2 },
    { label: 'CHICKEN', values: ['2.0', '3.0', '4.0', '5.0'], order: 3 },
    { label: 'BACON', values: ['1.5', '2.0', '2.5', '3.5'], order: 4 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 5 },
    { label: 'TOMATO', values: ['1.5', '2.5', '3.5', '4.5'], order: 6 }
  );

  cards.push(caliChickenBaconRanch);

  const deluxe = createCardObjectV2(
    'deluxe',
    'Deluxe',
    'Deluxe',
    'Ingredients',
    { label: 'PIZZA SAUCE', values: ['3.0', '4.2', '6.0', '8.0'], order: 1 },
    { label: 'PIZZA CHEESE', values: ['1.5', '2.5', '3.5', '4.5'], order: 2 },
    { label: 'PEPPERONI', values: ['12', '18', '24', '38'], order: 3 },
    { label: 'ONION', values: ['0.5', '1.0', '1.5', '2.0'], order: 4 },
    { label: 'GREEN PEPPER', values: ['0.5', '1.0', '1.5', '2.0'], order: 5 },
    { label: 'MUSHROOM', values: ['1.0', '1.5', '2.0', '2.5'], order: 6 },
    { label: 'SAUSAGE', values: ['1.0', '1.5', '2.0', '2.5'], order: 7 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 8 }
  );

  cards.push(deluxe);

  const extravaganza = createCardObjectV2(
    'extravaganza',
    'Extravaganza',
    'Extravaganza',
    'Ingredients',
    { label: 'PIZZA SAUCE', values: ['3.0', '4.2', '6.0', '8.0'], order: 1 },
    { label: 'PIZZA CHEESE', values: ['1.5', '2.5', '3.5', '4.5'], order: 2 },
    { label: 'PEPPERONI', values: ['12', '18', '24', '38'], order: 3 },
    { label: 'HAM', values: ['12', '18', '24', '38'], order: 4 },
    { label: 'ONION', values: ['0.5', '1.0', '1.5', '2.0'], order: 5 },
    { label: 'GREEN PEPPER', values: ['0.5', '1.0', '1.5', '2.0'], order: 6 },
    { label: 'MUSHROOM', values: ['1.0', '1.5', '2.0', '2.5'], order: 7 },
    { label: 'BLACK OLIVE', values: ['0.5', '1.0', '1.5', '2.0'], order: 8 },
    { label: 'SAUSAGE', values: ['1.0', '1.5', '2.0', '2.5'], order: 9 },
    { label: 'BEEF', values: ['1.0', '1.5', '2.0', '2.5'], order: 10 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 11 }
  );

  cards.push(extravaganza);
  const honoluluHawaiian = createCardObjectV2(
    'honoluluHawaiian',
    'Honolulu Hawaiian',
    'Honolulu Hawaiian',
    'Ingredients',
    { label: 'PIZZA SAUCE', values: ['3.0', '4.2', '6.0', '8.0'], order: 1 },
    { label: 'PIZZA CHEESE', values: ['1.5', '2.5', '3.5', '4.5'], order: 2 },
    { label: 'HAM', values: ['12', '18', '24', '38'], order: 3 },
    { label: 'BACON', values: ['1.0', '1.5', '2.0', '2.5'], order: 4 },
    { label: 'PINEAPPLE', values: ['1.0', '1.5', '2.0', '2.5'], order: 5 },
    { label: 'GREEN PEPPER', values: ['0.5', '1.0', '1.5', '2.0'], order: 6 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 7 }
  );

  cards.push(honoluluHawaiian);

  const meatzza = createCardObjectV2(
    'meatzza',
    'Meatzza',
    'Meatzza',
    'Ingredients',
    { label: 'PIZZA SAUCE', values: ['3.0', '4.2', '6.0', '8.0'], order: 1 },
    { label: 'PIZZA CHEESE', values: ['1.5', '2.5', '3.5', '4.5'], order: 2 },
    { label: 'PEPPERONI', values: ['12', '18', '24', '38'], order: 3 },
    { label: 'HAM', values: ['12', '18', '24', '38'], order: 4 },
    { label: 'SAUSAGE', values: ['1.0', '1.5', '2.0', '2.5'], order: 5 },
    { label: 'BEEF', values: ['1.0', '1.5', '2.0', '2.5'], order: 6 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 7 }
  );
  cards.push(meatzza);

  const memphisBBQChicken = createCardObjectV2(
    'memphisBBQChicken',
    'Memphis BBQ Chicken',
    'Memphis BBQ Chicken',
    'Ingredients',
    { label: 'HONEY BBQ SAUCE', values: ['1.5', '2.5', '3.5', '4.5'], order: 1 },
    { label: 'PIZZA CHEESE', values: ['1.5', '2.5', '3.5', '4.5'], order: 2 },
    { label: 'CHICKEN', values: ['2.0', '3.0', '4.0', '5.0'], order: 3 },
    { label: 'ONION', values: ['1.0', '1.5', '2.0', '2.5'], order: 4 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 5 },
    { label: 'CHEDDAR BLEND', values: ['1.0', '2.0', '2.5', '3.5'], order: 6 }
  );

  cards.push(memphisBBQChicken);

  const pacificVeggie = createCardObjectV2(
    'pacificVeggie',
    'Pacific Veggie',
    'Pacific Veggie',
    'Ingredients',
    { label: 'PIZZA SAUCE', values: ['1.5', '3.0', '4.0', '4.5'], order: 1 },
    { label: 'PIZZA CHEESE', values: ['1.5', '2.5', '3.5', '4.5'], order: 2 },
    { label: 'SPINACH', values: ['1.0', '1.0', '1.5', '2.0'], order: 3 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 4 },
    { label: 'FETA', values: ['1.0', '1.5', '2.0', '2.5'], order: 5 },
    { label: 'ONION', values: ['0.5', '1.0', '1.5', '2.0'], order: 6 },
    { label: 'MUSHROOM', values: ['1.0', '1.5', '2.0', '2.5'], order: 7 },
    { label: 'BLACK OLIVE', values: ['0.2', '0.5', '0.7', '1.0'], order: 8 },
    { label: 'TOMATO', values: ['0.5', '1.0', '1.5', '2.0'], order: 9 },
    { label: 'GARLIC HERB SHAKE', values: ['.02', '.03', '.04', '.05'], order: 10 }
  );
  cards.push(pacificVeggie);

  const phillyCheeseSteak = createCardObjectV2(
    'phillyCheeseSteak',
    'Philly Cheese Steak',
    'Philly Cheese Steak',
    'Ingredients',
    { label: 'AMERICAN CHEESE', values: ['4', '6', '7', '9'], order: 1 },
    { label: 'PHILLY STEAK', values: ['2.0', '3.0', '4.0', '5.0'], order: 2 },
    { label: 'ONION', values: ['0.5', '1.0', '1.5', '2.0'], order: 3 },
    { label: 'GREEN PEPPER', values: ['0.5', '1.0', '1.5', '2.0'], order: 4 },
    { label: 'MUSHROOM', values: ['1.0', '1.5', '2.0', '2.5'], order: 5 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 6 }
  );

  cards.push(phillyCheeseSteak);

  const spinachFeta = createCardObjectV2(
    'spinachFeta',
    'Spinach Feta',
    'Spinach Feta',
    'Ingredients',
    { label: 'PIZZA CHEESE', values: ['1.5', '2.5', '3.5', '4.5'], order: 1 },
    { label: 'SPINACH', values: ['1.0', '1.0', '1.5', '2.0'], order: 2 },
    { label: 'FETA', values: ['1.0', '1.5', '2.0', '2.5'], order: 3 },
    { label: 'ONION', values: ['0.5', '1.0', '1.5', '2.0'], order: 4 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 5 },
    { label: 'PARM/ASIAGO', values: ['0.5', '0.7', '1.0', '1.2'], order: 6 },
    { label: 'ALFREDO SAUCE', values: ['0.7', '1.5', '2.0', '2.5'], order: 7 }
  );

  cards.push(spinachFeta);

  const ultimatePepporoni = createCardObjectV2(
    'ultimatePepporoni',
    'Ultimate Pepporoni',
    'Ultimate Pepporoni',
    'Ingredients',
    { label: 'PIZZA SAUCE', values: ['3.0', '4.2', '6.0', '8.0'], order: 1 },
    { label: 'PIZZA CHEESE', values: ['1.5', '2.5', '3.5', '4.5'], order: 2 },
    { label: 'PEPPERONI', values: ['16', '24', '32', '46'], order: 3 },
    { label: 'PROVOLONE', values: ['2.5', '3.5', '4.7', '6.0'], order: 4 },
    { label: 'PEPPERONI', values: ['16', '24', '32', '46'], order: 5 },
    { label: 'PARM/ASIAGO', values: ['0.5', '0.7', '1.0', '1.2'], order: 6 },
    { label: 'OREGANO', values: ['.01', '.02', '.03', '.04'], order: 7 }
  );
  cards.push(ultimatePepporoni);

  const wisconsin6Cheese = createCardObjectV2(
    'wisconsin6Cheese',
    'Wisconsin 6 Cheese',
    'Wisconsin 6 Cheese',
    'Ingredients',
    { label: 'PIZZA SAUCE', values: ['3.0', '4.2', '6.0', '8.0'], order: 1 },
    { label: 'PIZZA CHEESE', values: ['1.5', '2.5', '3.5', '4.5'], order: 2 },
    { label: 'FETA', values: ['1.0', '1.5', '2.0', '2.5'], order: 3 },
    { label: 'PROVOLONE', values: ['1.0', '2.0', '2.5', '3.5'], order: 4 },
    { label: 'CHEDDAR BLEND', values: ['1.0', '2.0', '2.5', '3.5'], order: 5 },
    { label: 'PARM/ASIAGO', values: ['1.0', '1.5', '2.0', '2.5'], order: 6 },
    { label: 'OREGANO', values: ['.01', '.02', '.03', '.04'], order: 7 }
  );
  cards.push(wisconsin6Cheese);

  return cards;
}
// Card object template
function getCardCollection() {
  const cards = [];

  const pizzacheeses = createCardObjectV2(
    'cheese',
    'Cheese',
    'Pizza Cheese',
    'Size',
    { label: 'Regular', values: ['3.5', '5.0', '7.0', '9.0'], order: 1 },
    { label: 'Add Top + Bottom when doing extra', style: 'merge', order: 2 },
    { label: 'Extra', values: ['1.5', '2.5', '3.5', '4.5'], order: 3 }
  );
  cards.push(pizzacheeses);

  const nycheeses = createCardObjectV2(
    'nycheese',
    'NY Cheese',
    'NY Style Cheese',
    { label: 'Size', headers: ['12"', '14"', '16"'] },
    { label: 'Pizza Cheese', values: ['2.5', '3.5', '4.5'], order: 1 },
    { label: 'Provolone', values: ['3.0', '4.0', '5.5'], order: 2 },
    { label: 'BOTH cheeses get topped!', style: 'merge', order: 3 }
  );
  cards.push(nycheeses);

  const pepperoniHamCard = createCardObjectV2(
    'pep',
    'Pepperoni & Ham',
    'Pep&Ham',
    'Size',
    { label: '1 Topping', values: ['20', '30', '40', '54'], order: 1 },
    { label: '2-3 Topping', values: ['16', '24', '32', '46'], order: 2 },
    { label: '4+ Topping', values: ['12', '18', '24', '38'], order: 3 }
  );
  cards.push(pepperoniHamCard);

  // Onion– Green Pepper– Banana Pepper -Jalapeno– Olives– Green Chiles card
  const onionGreenPepperCard = createCardObjectV2(
    'veg',
    'ONION–GREEN PEPPER–BANANA PEPPER-JALAPENO–OLIVES–GREEN CHILES',
    'Veg',
    'Size',
    { label: '1 Topping', values: ['1.5', '2.0', '3.0', '4.0'], order: 1 },
    { label: '2-3 Toppings', values: ['1.0', '1.5', '2.0', '2.5'], order: 2 },
    { label: '4+ Toppings', values: ['0.5', '1.0', '1.5', '2.0'], order: 3 }
  );
  cards.push(onionGreenPepperCard);

  const suasageBeefChikCard = createCardObjectV2(
    'meats',
    'Sausage-Beef-Chicken-Mushroom-Pineapple-Tomato',
    'Meats',
    'Size',
    { label: '1 Topping', values: ['2.5', '3.5', '5.0', '6.5'], order: 1 },
    { label: '2-3 Toppings', values: ['1.5', '2.5', '3.5', '4.5'], order: 2 },
    { label: '4+ Toppings', values: ['1.0', '1.5', '2.0', '2.5'], order: 3 }
  );

  cards.push(suasageBeefChikCard);

  // Spinach card
  const spinachCard = createCardObjectV2(
    'spin',
    'Spinach',
    'Spinach',
    'Size',
    { label: '1 Topping', values: ['1.5', '1.5', '2.0', '2.5'], order: 1 },
    { label: '2-3 Toppings', values: ['1.0', '1.0', '1.5', '2.0'], order: 2 },
    { label: '', style: 'merge', order: 3 }
  );
  cards.push(spinachCard);

  // Philly card
  const phillyCard = createCardObjectV2(
    'phil',
    'Philly Steak & Bacon',
    'Philly/Bacon',
    'Size',
    { label: '1 Topping', values: ['2.0', '2.5', '3.5', '5.0'], order: 1 },
    { label: '2-3 Toppings', values: ['1.5', '2.0', '2.5', '3.5'], order: 2 },
    { label: '4+ Toppings', values: ['1.0', '1.5', '2.0', '2.5'], order: 3 }
  );
  cards.push(phillyCard);

  return cards;
}

function createTabs(card) {
  $('.topping-tab-container #tabs').append('<li><a href="#cardContainer' + card.id + '">' + card.shortTitle + '</li>');

  fillTab(card, 'topping-tab-container');
}

function createSpecialtyTabs(card) {
  $('.specialty-tab-container #tabs').append('<li><a href="#cardContainer' + card.id + '">' + card.shortTitle + '</li>');

  fillTab(card, 'specialty-tab-container');
}

function fillTab(currentCard, container) {
  $('.' + container).append(
    `
    <div class="cardContainer" id="cardContainer` +
      currentCard.id +
      `">
        <div class="card" id="parentCard">
            <div class="cardGrid" id="cardContent_` +
      currentCard.id +
      `"></div>
        </div>
        <div id="showHideButton" class="show-hide-button" onclick="toggleMainCard('` +
      currentCard.id +
      `')">
            <i id="icon" class="material-icons">visibility_off</i><i style="font-size: 14px;transform: translateY(4px);">click this icon to hide/show the answer board</i>
        </div>
        <div class='buttons'>
            <button onclick="addNewBlankBoard('` +
      currentCard.id +
      `', '` +
      container +
      `')" class="btn" type="button">Blank Board</button>
            <button onclick="addNewRandomBoard('` +
      currentCard.id +
      `', '` +
      container +
      `')" class="btn" type="button">Random Board</button>
        </div>
    </div>`
  );

  //addCard(currentCard);
  $('#cardContent_' + currentCard.id).append(addCardHtmlTable(currentCard, false, false, true, container));
}

function toggleMainCard(id) {
  const contentToToggle = $('#cardContainer' + id + ' > #parentCard')[0]; // document.getElementById('cardContainer' + id + ' > parentCard');
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

/**
 * Adds a new card to the card container based on the current card data.
 *
 * @param {Object} currentCard - The data of the current card to be added.
 */
function addCard(currentCard) {
  const titleRow = $("<div class='row title-row'></div>");
  const cardContent = $('#cardContent_' + currentCard.id);

  titleRow.append(`<div class='cell title-cell' colspan='${currentCard.grid.size.length + 1}'>${currentCard.title}</div>`);
  $('#cardContainer' + currentCard.id + ' > .card').prepend(titleRow);

  // Transpose rows and columns in the card grid
  for (let col = 0; col < currentCard.grid.size.length; col++) {
    const column = $("<div class='column'></div>");

    // Each column has rows
    Object.keys(currentCard.grid).forEach((key, index) => {
      const row = index + 1; // Increase data-row for every key, starting from 1
      const cellContent = currentCard.grid[key][col] || '<span>&nbsp;</span>';
      const isLabel = row === 1 || col === 0 || !currentCard.grid[key][col]; // Check if it's a label cell
      const cellClass = isLabel ? 'label-cell' : 'input-cell';
      let colSpan = null;
      if (cellContent && cellContent.style && cellContent.style.includes('merge')) {
        colSpan = `colspan='${currentCard.grid.size.length}'`; // Set colspan to number of columns
      }
      const cell = `<div class='cell ${cellClass}  ${
        cellContent?.style || ''
      }' ${colSpan} contenteditable='${!isLabel}' data-row='${row}' data-col='${col + 1 !== 0 ? col + 1 : ''}'>${
        cellContent.label ?? cellContent
      }</div>`;

      column.append(cell);
    });
    cardContent.append(column);
  }

  // Add input validation for decimal values
  $('.input-cell').on('input', function () {
    const inputValue = $(this).text();
    const isValidDecimal = /^\d*\.?\d*$/.test(inputValue);
    if (!isValidDecimal) {
      // Clear the input if it's not a valid decimal
      $(this).text('');
    }
  });
}

// function addCardHtmlTableV1(currentCard, empty, random, isParent = false) {
//   let cardHtml = `<div class='card ` + (empty ? 'empty' : '') + (random ? 'random' : '') + `' data-id=` + currentCard.id + `>`;
//   if (!isParent) {
//     cardHtml =
//       cardHtml +
//       `<div class="buttonRow">
//             <span id="checkValues" class="check-values btn blue" onclick="validateInputCells('` +
//       currentCard.id +
//       `','` +
//       (empty ? 'empty' : 'random') +
//       `')">
//                 <i id="icon" class="material-icons">check</i>Check All
//             </span>
//             <span id="removeBoard" class="remove-button" onclick="removeCard('` +
//       currentCard.id +
//       `','` +
//       (empty ? 'empty' : 'random') +
//       `')">
//                 <i id="icon" class="material-icons">clear</i>
//             </span>
//         </div>`;
//   }

//   const table = $('<table></table>');

//   // Create the table header row
//   const titleRow = $('<tr></tr>').addClass('row title-row');
//   const colspan = currentCard.grid.size.length; // Title cell spans all columns + 1
//   titleRow.append($(`<td class='cell title-cell' colspan='${colspan}'>${currentCard.title}</td>`));
//   table.append(titleRow);

//   // Generate data rows and cells based on grid size
//   for (let row = 1; row <= Object.keys(currentCard.grid).length; row++) {
//     const tableRow = $('<tr></tr>');
//     const firstCell = $(currentCard.grid[Object.keys(currentCard.grid)[row - 1]])[0]; // Get first cell DOM element

//     const hasMergeClass = firstCell && firstCell['style'] === 'merge';

//     // Create data cells for each column
//     for (let col = 0; col < currentCard.grid.size.length; col++) {
//       if (!hasMergeClass || col === 0) {
//         // Skip cells if first cell has 'merge' and it's not the first column
//         const cellVal = currentCard.grid[Object.keys(currentCard.grid)[row - 1]][col]; // Access cell value
//         const isLabel = row === 1 || col === 0 || !cellVal || isParent; // Check if it's a label cell
//         let cellContent = '';
//         if (cellVal) {
//           cellContent =
//             random & !isLabel
//               ? shouldShowRandomContent()
//                 ? currentCard.grid[Object.keys(currentCard.grid)[row - 1]][col]
//                 : ''
//               : currentCard.grid[Object.keys(currentCard.grid)[row - 1]][col];
//         } else {
//           cellContent = '<span>&nbsp;</span>';
//         }
//         const cellClass = isLabel ? 'label-cell' : 'input-cell';
//         let colSpan = null;
//         if (cellContent && cellContent.style && cellContent.style.includes('merge')) {
//           colSpan = `colspan='${currentCard.grid.size.length}'`; // Set colspan to number of columns
//         }

//         const cell = $(
//           `<td class='cell ${cellClass}  ${cellContent?.style || ''}' ${colSpan || ''} contenteditable='${!isLabel}' data-row='${row}' data-col='${
//             col + 1 !== 0 ? col + 1 : ''
//           }' inputmode='decimal' pattern='[0-9]*' type='text'>${
//             isLabel ? cellContent.label ?? cellContent : empty ? '' : random ? cellContent.label ?? cellContent : ''
//           }</td>`
//         );

//         tableRow.append(cell);
//       }
//     }

//     table.append(tableRow);
//   }

//   // Add the table to the card content
//   //  $('#cardContent_' + currentCard.id).append(table);

//   // Add input validation for decimal values (unchanged)
//   $('.input-cell').on('input', function () {
//     const inputValue = $(this).text();
//     const isValidDecimal = /^\d*\.?\d*$/.test(inputValue);
//     if (!isValidDecimal) {
//       // Clear the input if it's not a valid decimal
//       $(this).text('');
//     }
//   });

//   return cardHtml + table.prop('outerHTML') + '</div>';
// }

function addCardHtmlTable(currentCard, empty, random, isParent = false, container) {
  let cardHtml = `<div class='card ` + (empty ? 'empty' : '') + (random ? 'random' : '') + `' data-id=` + currentCard.id + `>`;
  if (!isParent) {
    cardHtml =
      cardHtml +
      `<div class="buttonRow">
              <span id="checkValues" class="check-values btn blue" onclick="validateInputCells('` +
      currentCard.id +
      `','` +
      (empty ? 'empty' : 'random') +
      `', '` +
      container +
      `')">
                  <i id="icon" class="material-icons">check</i>Check All
              </span>
              <span id="removeBoard" class="remove-button" onclick="removeCard('` +
      currentCard.id +
      `','` +
      (empty ? 'empty' : 'random') +
      `')">
                  <i id="icon" class="material-icons">clear</i>
              </span>
          </div>`;
  }

  const table = $('<table></table>');

  // Create the table header row
  const titleRow = $('<tr></tr>').addClass('row title-row');
  const colspan = currentCard.grid.header.length; // Title cell spans all columns + 1
  titleRow.append($(`<td class='cell title-cell' colspan='${colspan}'>${currentCard.title}</td>`));
  table.append(titleRow);

  if (currentCard.grid.header) {
    const headerValueRow = $('<tr></tr>').addClass('row');
    for (const headerValue of currentCard.grid.header) {
      headerValueRow.append(
        $(`<th class='cell header-cell' data-col='${currentCard.grid.header.indexOf(headerValue)}' data-row='0'>${headerValue}</th>`)
      );
    }
    table.append(headerValueRow);
  }

  for (const rowData of currentCard.grid.rows) {
    const tableRow = $('<tr></tr>');

    let hasMerge = rowData.style === 'merge'; // Flag to track merge row
    let currentColspan = hasMerge ? currentCard.grid.header.length : 1; // Set colspan for merged row
    const rowClass = rowData.order % 2 == 0 ? 'white' : 'blue';
    // Add label cell
    tableRow.append(
      $(
        `<td class='cell label-cell ${rowClass} ${hasMerge ? 'merged-cell' : ''}' colspan='${currentColspan}' data-col='0' data-row='${
          rowData.order + 1
        }'>${rowData.label}</td>`
      )
    );

    // Check if the row has 'merge' style even if no cell values

    if (!hasMerge && rowData.cells.length > 0) {
      // Add data cells for each value in the row (unchanged logic)
      let cellIndex = 1;
      for (const cellValue of rowData.cells) {
        const isLabel = isParent || !cellValue;
        //let cellContent = empty ? '' : random ? cellValue?.label ?? cellValue : cellValue?.label ?? cellValue;
        const x = shouldShowRandomContent();
        let cellContent = random & !isLabel ? (x ? cellValue : '') : cellValue;
        const cellClass = isLabel ? 'label-cell' : 'input-cell';

        const colspan = currentColspan > 1 ? currentColspan - 1 : 1; // Update current colspan for next cells
        currentColspan = colspan; // Update current colspan for next iteration

        const cell = $(
          `<td class='cell ${cellClass} ${rowClass}  ${colspan > 1 ? `colspan='${colspan}'` : ''} ${
            empty ? 'input-cell' : ''
          }' contenteditable='${!isLabel}' data-row='${
            rowData.order + 1
          }' data-col='${cellIndex}' data-input='${cellContent}' inputmode='decimal' pattern='[0-9]*' type='text'>${
            isLabel ? cellContent : empty ? '' : random ? cellContent : ''
          }</td>`
        );

        tableRow.append(cell);

        cellIndex++;
      }
    }

    table.append(tableRow);
  }

  // Add the table to the card content
  //  $('#cardContent_' + currentCard.id).append(table);

  // Add input validation for decimal values (unchanged)
  $('.input-cell').on('input', function () {
    const inputValue = $(this).text();
    const isValidDecimal = /^\d*\.?\d*$/.test(inputValue);
    if (!isValidDecimal) {
      // Clear the input if it's not a valid decimal
      $(this).text('');
    }
  });

  return cardHtml + table.prop('outerHTML') + '</div>';
}
//collection is the card collection
function validateInputCells(card, board, collectionName) {
  $('#cardContainer' + card + ' > .' + board)
    .find('.input-cell')
    .each(function () {
      const row = parseInt($(this).data('row'));
      const col = parseInt($(this).data('col'));
      const enteredValue = $(this).text();
      const card = $.grep(collectionName == 'specialty-tab-container' ? specialtyCardCollection : toppingCardCollection, (c) => {
        return c.id === $(this).closest('.card').data('id');
      })[0];

      if (verifyInput(card, row, col, enteredValue)) {
        // Correct value
        $(this).removeClass('bad').addClass('good');
      } else {
        // Incorrect value
        $(this).removeClass('good').addClass('bad');
      }
    });
}
function verifyInput(card, row, col, enteredValue) {
  // Check if the provided row and column are within the valid range
  if (row < 1 || col < 1) {
    console.error('Invalid row or column provided.');
    return false;
  }

  // Get the correct value for the specified row and column from the card object
  //const correctValue = card.grid[Object.keys(card.grid)[row - 1]][col - 1];
  const correctValue = card.grid.rows[row - 2].cells[col - 1];

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

function shouldShowRandomContent() {
  // Use Math.random() to decide randomly (adjust the threshold as needed)
  let random = Math.random() > 0.5;
  let r = Math.floor(Math.random() * 3) + 1;
  return random ?? r; // Adjust the threshold as needed
}

function addNewBlankBoard(id, collectionName) {
  let card = $.grep(collectionName == 'specialty-tab-container' ? specialtyCardCollection : toppingCardCollection, (c) => {
    return c.id === id;
  })[0];
  if (document.getElementsByClassName('empty')) {
    $('#cardContainer' + card.id)
      .children('.empty')
      .remove();
  }
  setTimeout(() => {
    $('#cardContainer' + card.id).append(addCardHtmlTable(card, true, false, false, collectionName));
  }, 200);
}
function addNewRandomBoard(id, collectionName) {
  let card = $.grep(collectionName == 'specialty-tab-container' ? specialtyCardCollection : toppingCardCollection, (c) => {
    return c.id === id;
  })[0];
  if (document.getElementsByClassName('random')) {
    $('#cardContainer' + card.id)
      .children('.random')
      .remove();
  }
  setTimeout(() => {
    $('#cardContainer' + card.id).append(addCardHtmlTable(card, false, true, false, collectionName));
  }, 200);
}

function removeCard(card, board) {
  $('#cardContainer' + card + ' > .' + board).remove();
}

let toppingCardCollection = [];
let specialtyCardCollection = [];
$(document).ready(function () {
  toppingCardCollection = getCardCollection();
  // Initial card display
  toppingCardCollection.forEach((card) => {
    createTabs(card);
  });

  specialtyCardCollection = getSpecialtyCardCollection();
  // Initial card display
  specialtyCardCollection.forEach((card) => {
    createSpecialtyTabs(card);
  });
  //createTabs(cardCollection[0])
  $('.pages').tabs();
  $('.pages').tabs('option', 'active', 0);

  $('.topping-tab-container').tabs();
  $('.topping-tab-container').tabs('option', 'active', 0);

  $('.specialty-tab-container').tabs();
  $('.specialty-tab-container').tabs('option', 'active', 0);

  // $(document).on('input', '.input-cell', function () {
  //     const row = parseInt($(this).data('row'));
  //     const col = parseInt($(this).data('col'));
  //     const enteredValue = $(this).text();

  //     // Get the card object based on your implementation
  //     const card = $.grep(cardCollection, (c) => {
  //         return c.id === $(this).closest('.card').data('id');
  //     })[0]; // You need to implement a method to get the current card object

  //     // Call verifyInput method
  //     $(this).removeClass('bad').removeClass('good').addClass(verifyInput(card, row, col, enteredValue) ? "good" : "bad");
  // });

  // Event listener for the "Next Card" button
  // $("#nextButton").on("click", function () {
  //     currentCardIndex = (currentCardIndex + 1) % cards.length;

  //     showCard();
  // });
});
