

const form = document.querySelector('form'),
    inputItem = document.querySelector('#item'),
    inputBudget = document.getElementById('budget'),
    sumbitItem = document.getElementById('submit'),
    formBody = document.querySelector('.add-item-div'),
    currency = document.createElement('span'),
    table = document.querySelector('table'),
    tableBody = document.querySelector('tbody'),
    clearBtn = document.getElementById('clear'),
    totalInput = document.getElementById('total'),
    totalItems = document.getElementById('total-items'),
    totalDiv = document.querySelector('.total-div-contain'),
    cellItemInput = document.createElement('input'),
    modeBtns = document.querySelectorAll('.btn'),
    defaultCss = document.querySelector('#link'),
    fontChange = document.querySelector('#font-change'),
    savedBudgetArr = JSON.parse(localStorage.getItem('budgetItemsArr'));


let budgetArr = [],
 t = 0,
    i = 0,
    sN = 1;
currency.innerHTML = '&#8358;';
// currency.innerHTML = '&#36;';
// currency.innerHTML = '&#euro;';
// currency.innerHTML = '&#163;';

// currency.innerHTML = '&#65505;';


if (savedBudgetArr) {
    savedBudgetArr.forEach((savedBudgetArrItem) => {
        budgetArr.push(savedBudgetArrItem)
    })
    localStorage.setItem('budgetItemsArr', JSON.stringify(budgetArr));
}
//change font
fontChange.addEventListener('click', (event) => {
(document.body.style[0] === '--font-family') ? document.body.removeAttribute('style') : document.body.setAttribute('style', "--font-family: 'Tillana', cursive");
})
// change to default mode
modeBtns.forEach(function (btn) {
    btn.addEventListener('click', (event) => {
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
            case 'btn-yellow':
                defaultCss.href = 'css/yellow.css';
                break;
            case 'btn-purple':
                defaultCss.href = 'css/purple.css';
                break;
            case 'btn-red':
                defaultCss.href = 'css/red.css';
                break;
            case 'btn-dark':
                defaultCss.href = 'css/dark.css';
                break;
            default:
                defaultCss.href = ''
        }
    })
})

const createNewTableRow = (name, price) => {

    let newRow = `<tr class="table-row">
    <td>
        <p class="item-name">${name}</p>
        <input class="change-item" type="text" value="${name}">
    </td>
    <td class="">
        <span class="flex">
            ${currency.innerHTML}
            <span class="item-budget ml">${price}</span>
            <input class="budget-input ml change-budget" type="number" value="${price}">
        </span> 
    </td>
    <td class="printNot">
        <button class="edit-btn">
            <i class="fa fa-pencil-square-o"></i>
        </button>
    </td>
    <td class="printNot">
        <button class="delete-btn">
            <i class="fa fa-trash"></i>
        </button>
    </td>
</tr>`

    if (price < 10 && price % 5 !== 0) {
        alert('Input a value in multiples of 5 greater than 10')
    } else {
        inputItem.value = '';
        inputBudget.value = '';
        tableBody.innerHTML += newRow;
        t = t + parseInt(price);
        totalInput.value = currency.innerHTML + t;
        sN = tableBody.childElementCount;
        if (sN !== 0) {
            totalDiv.style.display = 'flex';
        }
        totalItems.value = sN;
        
    }
    let i = 0;
    function editRow(edit) {
        
        let editIcon = edit.querySelector('i');
        let editTableRow = edit.closest('.table-row');
        let editCellName = editTableRow.querySelector('.item-name');
        let changeItemName = editTableRow.querySelector('.change-item');
        let editCellBudget = editTableRow.querySelector('.item-budget');
        let changeItemBudget = editTableRow.querySelector('.change-budget');
        if (editIcon.classList.contains('fa-pencil-square-o')) {
            editIcon.className = 'fa fa-floppy-o';
            editCellName.style.display = 'none';
            changeItemName.style.display = 'block';
            editCellBudget.style.display = 'none';
            changeItemBudget.style.display = 'inline';
        } else {
            editIcon.className = 'fa fa-pencil-square-o';
            changeItemName.style.display = 'none';
            editCellName.style.display = 'block';
            changeItemBudget.style.display = 'none';
            editCellBudget.style.display = 'inline';
            name = changeItemName.value;
            editCellName.innerText = name;
            t = t - parseInt(price);
            price = changeItemBudget.value;
            editCellBudget.innerText = price;
            t = t + parseInt(price);
            budgetArr.forEach((budgetArrItem) => {
                if (Array.from(editTableRow.parentNode.children).indexOf(editTableRow) === budgetArr.indexOf(budgetArrItem)) {
                    budgetArrItem.objName = name;
                    budgetArrItem.objPrice = price;
                    localStorage.setItem('budgetItemsArr', JSON.stringify(budgetArr))
                }
            })
        }
        totalInput.value = currency.innerHTML + t;
    }

    // function to delete row
    function deleteRow(deleteButton) {
        let deleteTableRow = deleteButton.closest('.table-row');
        price = deleteTableRow.querySelector('.item-budget').innerText;
        budgetArr.forEach((budgetArrItem) => {
            if (Array.from(deleteTableRow.parentNode.children).indexOf(deleteTableRow) === budgetArr.indexOf(budgetArrItem)) {
                budgetArr.splice(Array.from(deleteTableRow.parentNode.children).indexOf(deleteTableRow), 1);
                localStorage.setItem('budgetItemsArr', JSON.stringify(budgetArr))
            } 
        })
        deleteTableRow.remove();
        t = t - parseInt(price);
        if (tableBody.hasChildNodes()) {
            totalDiv.style.display = 'flex';
        } else {
            t = 0;
            totalDiv.style.display = 'none';
        }
        totalInput.value = currency.innerHTML + t;
    }
    const editBtns = tableBody.querySelectorAll('.edit-btn'),
        deleteBtns = tableBody.querySelectorAll('.delete-btn');
    editBtns.forEach((editBtn) => {
        editBtn.addEventListener('click', () => {
            editRow(editBtn);
        })
    })
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', () => {
            deleteRow(deleteBtn);
            sN = tableBody.childElementCount;
            totalItems.value = sN;
        })
    })
}

budgetArr.forEach((budgetArrItem) => {
    name = budgetArrItem.objName;
    price = budgetArrItem.objPrice;
    createNewTableRow(name, price);
})

const newTableRow = () => {
    let price = inputBudget.value,
    y = inputItem.value,
        firstLetter = y[0].toUpperCase(),
        smallLetters = y.slice(1),
        name = firstLetter + smallLetters;
    createNewTableRow(name, price);
    budgetObj = {
        objName: name,
        objPrice: price,
    }
    budgetArr.push(budgetObj);
    localStorage.setItem('budgetItemsArr', JSON.stringify(budgetArr))


}
const printFunc = () => {
    document.querySelectorAll('.printNot').forEach(printNotElement => {
        printNotElement.classList.add('print-not-class');        
    });
    window.print();
    // document.querySelectorAll('.printNot').forEach(printNotElement => {
    //     printNotElement.classList.remove('print-not-class');      
    // });    
}
const printDone = () => {
    document.querySelectorAll('.printNot').forEach(printNotElement => {
        printNotElement.classList.remove('print-not-class');      
    });    
}
// printFunc();

// setTimeout(printDone, 2000);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    newTableRow();
})
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('budgetItemsArr');
    budgetArr.splice(0);
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.childNodes[0]);
    }
    t = 0;
    totalDiv.style.display = 'none';

})