const form = document.querySelector('form');
        inputItem = document.querySelector('#item');
        inputBudget = document.getElementById('budget');
        sumbitItem = document.getElementById(submit);
        table = document.querySelector('table');
        tableBody = document.querySelector('tbody');
        clearBtn = document.getElementById('clear');
        totalInput = document.getElementById('total')
        totalDiv = document.querySelector('.total-div')
        let t = 0;
form.addEventListener('submit', function (event) {
    totalDiv.style.display = 'flex';
    const x = inputBudget.value;
    y = inputItem.value;
    n = document.createElement('span');
    n.innerHTML = '&#8358;';
    // new row
    tableRow = document.createElement('tr');
    // first cell
    let cellItem = document.createElement('td');
    let cellItemInput = document.createElement('input');
    cellItemInput.classList.add('budget-input');
    cellItem.appendChild(cellItemInput);
    cellItemInput.readOnly = 'readOnly';
    tableRow.appendChild(cellItem);
    // second cell
    let cellBudget = document.createElement('td');
    tableRow.appendChild(cellBudget);
    let cellBudgetInput = document.createElement('input');
    cellBudgetInput.classList.add('budget-input');
    cellBudget.appendChild(n);
    cellBudget.appendChild(cellBudgetInput);
    cellBudgetInput.readOnly = 'readOnly';
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
    cellItemInput.value = y;
    tableBody.appendChild(tableRow);
    event.preventDefault();
    inputItem.value = '';
    inputBudget.value = '';
    let s = cellBudgetInput.value;
    deleteButton.addEventListener('click', function (event) {
        deleteButton.parentNode.parentNode.remove();
        if (tableBody.hasChildNodes()) {
            totalDiv.style.display = 'flex';
        } else {
            t = 0;
            totalDiv.style.display = 'none';
        }
    })
    let i = 0;
    editButton.addEventListener('click', function (event) {
        cellBudgetInput.toggleAttribute("readonly");
        cellItemInput.toggleAttribute("readonly");
        if (i === 0) {
            editButtonI.setAttribute('class', 'fa fa-floppy-o');
            i = 1;
        } else {
            editButtonI.setAttribute('class', 'fa fa-pencil-square-o');
            i = 0;
            t = +t - parseInt(s);
            s = cellBudgetInput.value;
        t = +t + parseInt(s);
        }
        totalInput.value = n.innerHTML + t;
    })
    t = t + parseInt(s);
    totalInput.value = n.innerHTML + t;
})
clearBtn.addEventListener('click', function (event) {
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.childNodes[0]);
        // console.log('working')
    } 
    t = 0;
    totalDiv.style.display = 'none';
    
})