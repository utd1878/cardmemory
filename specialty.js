// const pizzacheeses = createCardObject(
//   ['3.5', '5.0', '7.0', '9.0'],
//   null,
//   ['1.5', '2.5', '3.5', '4.5'],
//   { label: 'Regular' },
//   { label: 'Add Top + Bottom when doing extra', style: 'merge' },
//   { label: 'Extra' }
// );

const buffaloChicken = createCardObject(
  'cheese',
  'Buffalo Chicken',
  'Buffalo Chicken',
  'buffaloChicken',
  'Buffalo Chicken',
  'Buffalo Chicken',
  'Ingredients',
  { label: 'AMERICAN CHEESE', values: [4, 6, 7, 9] },
  { label: 'CHICKEN', value: [2.0, 3.0, 4.0, 5.0] },
  { label: 'ONION', values: [1.0, 1.5, 2.0, 2.5] },
  { label: 'PROVOLONE', values: [2.5, 3.5, 4.7, 6.0] },
  { label: 'CHEDDAR BLEND', values: [1.0, 2.0, 2.5, 3.5] },
  { label: 'POST BAKE', style: 'merge' },
  { label: 'HOT BUFFALO', values: [1.0, 2.0, 2.5, 3.5] }
);

function addCardHtmlTableV2(currentCard, empty, random, isParent = false) {
  let cardHtml = `<div class='card ` + (empty ? 'empty' : '') + (random ? 'random' : '') + `' data-id=` + currentCard.id + `>`;
  if (!isParent) {
    cardHtml =
      cardHtml +
      `<div class="buttonRow">
                <span id="checkValues" class="check-values btn blue" onclick="validateInputCells('` +
      currentCard.id +
      `','` +
      (empty ? 'empty' : 'random') +
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

  // Create the table header with header content (if present)
  let headerHtml = '';
  if (currentCard.header) {
    headerHtml = `<div class='table-header'>${currentCard.header}</div>`;
  }

  // Create the table title row
  const titleRow = $('<tr></tr>').addClass('row title-row');
  const colspan = currentCard.grid.header.length;
  titleRow.append($(`<td class='cell title-cell' colspan='<span class="math-inline">\{colspan\}'\></span>{currentCard.title}</td>`));
  table.append(titleRow);

  // Create a header row for header values (if present)
  if (currentCard.grid.header) {
    const headerValueRow = $('<tr></tr>');
    for (const headerValue of currentCard.grid.header) {
      headerValueRow.append($(`<th>${headerValue}</th>`));
    }
    table.append(headerValueRow);
  }

  // Generate data rows and cells based on grid data
  for (const rowData of currentCard.grid.rows) {
    const tableRow = $('<tr></tr>');

    // Add label cell
    tableRow.append($(`<td class='cell label-cell'>${rowData.label}</td>`));

    let hasMerge = rowData.style === 'merge'; // Flag to track merge row
    let currentColspan = hasMerge ? currentCard.grid.header.length : 1; // Set colspan for merged row

    // Check if the row has 'merge' style even if no cell values
    if (hasMerge) {
      const cell = $(
        `<td class='cell <span class="math-inline">\{hasMerge ? 'merged\-cell' \: 'input\-cell'\}' colspan\='</span>{currentColspan}' contenteditable='false' data-row='<span class="math-inline">\{
    rowData\.order
    \}' data\-col\='' inputmode\='decimal' pattern\='\[0\-9\]\*' type\='text'\></span>{
              rowData.label ?? ''
            }</td>`
      );
      tableRow.append(cell);
    } else {
      // Add data cells for each value in the row (unchanged logic)
      for (const cellValue of rowData.cells) {
        const isLabel = isParent || !cellValue;
        let cellContent = empty ? '' : random ? cellValue?.label ?? cellValue : cellValue?.label ?? cellValue;
        const cellClass = isLabel ? 'label-cell' : 'input-cell';

        const colspan = currentColspan > 1 ? currentColspan - 1 : 1; // Update current colspan for next cells
        currentColspan = colspan; // Update current colspan for next iteration

        const cell = $(
          `<td class='cell ${cellClass}  ${
            colspan > 1 ? `colspan='${colspan}'` : ''
          }' contenteditable='<span class="math-inline">\{\!isLabel\}' data\-row\='</span>{
                rowData.order
              }' data-col='' inputmode='decimal' pattern='[0-9]*' type='text'>${cellContent}</td>`
        );

        tableRow.append(cell);
      }
    }

    table.append(tableRow);
  }

  // Add the table to the card content
  cardHtml = cardHtml + table.prop('outerHTML');

  // Add input validation for decimal values (unchanged)
  $('.input-cell').on('input', function () {
    const inputValue = $(this).text();
    const isValidDecimal = /^\d*\.?\d*$/.test(inputValue);
    if (!isValidDecimal) {
      // Clear the input if it's not a valid decimal
      $(this).text('');
    }
  });

  return cardHtml + '</div>';
}
