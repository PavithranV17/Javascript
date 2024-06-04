const submitButton = document.querySelector(".add");
let allData = localStorage.getItem("key") !== null ? JSON.parse(localStorage.getItem("key")) : [];
const incomeHis = document.querySelector(".income-list");
const expenseHis = document.querySelector(".expense-list");
const balance = document.querySelector("#balanced");
const income = document.querySelector("#incomed");
const expense = document.querySelector("#expensed");


function innerTag(id, source, date, amount){
    return `<li data-id=${id}>
                <p>
                <span>${source}</span>
                <span>${date}</span>
                </p>
                <span>${amount}</span>
                <i class="bi bi-trash delete"></i>
            </li>`;
};

function li(id, source, date, amount){
    if(amount > 0){
        incomeHis.innerHTML += innerTag(id, source, date, amount);
    } else{
        expenseHis.innerHTML += innerTag(id, source, date, amount);
    }
};

function individualData(source,amount){
    const dt = new Date();
    const getData = {
        id: Math.floor(Math.random()*100),
        source: source,
        amount: amount,
        date: `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`
    };
    allData.push(getData);
    localStorage.setItem("key",JSON.stringify(allData));
    li(getData.id, source, getData.date, amount);
};


submitButton.addEventListener("submit",event => {
    event.preventDefault();

    individualData(submitButton.source.value, Number(submitButton.amount.value));
    submitButton.reset();
    updateAmount();
});

function getTransaction(){
    allData.forEach(element => {
        if(element.amount > 0){
            li(element.id, element.source, element.date, element.amount);
        } else {
            li(element.id, element.source, element.date, element.amount);
        }
    });
};
getTransaction();


function localDataClear(getId){
    allData = allData.filter(fil => fil.id !== getId);
    localStorage.setItem("key",JSON.stringify(allData));
    updateAmount();
}


incomeHis.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();

        localDataClear(Number(event.target.parentElement.dataset.id));
    }
});

expenseHis.addEventListener("click",event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();

        localDataClear(Number(event.target.parentElement.dataset.id));
    }
});

function updateAmount(){
    const incomePlus = allData.filter(fil => fil.amount > 0).reduce((t,r) => t += r.amount,0)
    const expenseMinus = allData.filter(fil => fil.amount < 0).reduce((t,r) => t += Math.abs(r.amount),0)

    income.textContent = incomePlus;
    expense.textContent = expenseMinus;
    balance.textContent = incomePlus - expenseMinus;
};
updateAmount();