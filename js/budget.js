

const form = document.querySelector('form'),
    inputItem = document.querySelector('#item'),
    inputBudget = document.getElementById('budget'),
    sumbitItem = document.getElementById(submit),
    table = document.querySelector('table'),
    tableBody = document.querySelector('tbody'),
    clearBtn = document.getElementById('clear'),
    totalInput = document.getElementById('total'),
    totalDiv = document.querySelector('.total-div'),
    cellItemInput = document.createElement('input'),
    modeBtns = document.querySelectorAll('.btn'),
    defaultCss = document.querySelector('#link'),
    fontChange = document.querySelector('#font-change');




cellItemInput.classList.add('budget-input');
cellItemInput.classList.add('budget-item-input');

let t = 0,
    i = 0;
//change font
fontChange.addEventListener('click', function (event) {
    if (document.body.style[0] === '--font-family') {
        document.body.removeAttribute('style')
    } else {
        document.body.setAttribute('style', "--font-family: 'Tillana', cursive")
    }
})
// change to default mode
modeBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        switch (event.target.id) {
            case 'btn-default': 
                defaultCss.href = 'css/default.css';
                break;
            case 'btn-green':
                defaultCss.href = 'css/green.css';
                break;
            case 'btn-blue':
                defaultCss.href = 'css/blue.css';
                break;
            default: 
                defaultCss.href = ''
        }
    })    
})



function newRow() {
    let x = inputBudget.value,
        y = inputItem.value,
        n = document.createElement('span');
    n.innerHTML = '&#8358;';
    firstLetter = y[0].toUpperCase();
    smallLetters = y.slice(1);

    // new row
    tableRow = document.createElement('tr');

    // first cell
    let cellItem = document.createElement('td');
    let cellItemP = document.createElement('p');
    cellItem.appendChild(cellItemP);
    tableRow.appendChild(cellItem);

    // second cell
    let cellBudget = document.createElement('td');
    tableRow.appendChild(cellBudget);
    let cellBudgetInput = document.createElement('input');
    cellBudgetInput.classList.add('budget-input');
    cellBudgetInput.classList.add('budget-cell-input');
    cellBudget.appendChild(n);
    cellBudget.appendChild(cellBudgetInput);

    // third cell
    let cellEdit = document.createElement('td');
    tableRow.appendChild(cellEdit);
    let editButton = document.createElement('button');
    cellEdit.appendChild(editButton);
    let editButtonI = document.createElement('i');
    editButtonI.setAttribute('class', 'fa fa-pencil-square-o');
    editButton.appendChild(editButtonI);

    // fourth cell
    let cellDelete = document.createElement('td');
    tableRow.appendChild(cellDelete);
    let deleteButton = document.createElement('button');
    let deleteButtonI = document.createElement('i');
    deleteButtonI.setAttribute('class', 'fa fa-trash');
    cellDelete.appendChild(deleteButton);
    deleteButton.appendChild(deleteButtonI);
    cellBudgetInput.type = 'number';
    cellBudgetInput.value = x;
    cellItemP.innerHTML = firstLetter + smallLetters;

    // adding new row
    tableBody.appendChild(tableRow);
    let s = cellBudgetInput.value;

    // function to edit row
    let i = 0;
    function editRow() {
        if (i === 0) {
            let item = cellItemP.innerHTML;
            cellItemP.replaceWith(cellItemInput);
            cellItemInput.value = item;
            editButtonI.setAttribute('class', 'fa fa-floppy-o');
            i = 1;
        } else {
            editButtonI.setAttribute('class', 'fa fa-pencil-square-o');
            cellItemInput.replaceWith(cellItemP);
            cellItemP.innerHTML = cellItemInput.value;
            t = t - parseInt(s);
            s = cellBudgetInput.value;
            t = t + parseInt(s);
            i = 0;
        }
        totalInput.value = n.innerHTML + t;
    }

    // function to delete row
    function deleteRow() {
        deleteButton.closest('tr').remove();
        t = t - parseInt(s);
        s = cellBudgetInput.value;
        if (tableBody.hasChildNodes()) {
            totalDiv.style.display = 'flex';
        } else {
            t = 0;
            totalDiv.style.display = 'none';
        }
        totalInput.value = n.innerHTML + t;
    }
    t = t + parseInt(s);
    totalInput.value = n.innerHTML + t;
    editButton.addEventListener('click', function (event) {
        editRow();
    })
    deleteButton.addEventListener('click', function (event) {
        deleteRow();
    })
}

form.addEventListener('submit', function (event) {
    totalDiv.style.display = 'flex';
    newRow();
    event.preventDefault();
    // inputItem.value = '';
    // inputBudget.value = '';
})
clearBtn.addEventListener('click', function (event) {
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.childNodes[0]);
    }
    t = 0;
    totalDiv.style.display = 'none';

})