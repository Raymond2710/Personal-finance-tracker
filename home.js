import {transactions, save, removeTransaction,deleteData} from './transactions.js';
import {utils,budgetLimit,saveBudget} from './script.js';

const transactionLists = document.getElementById('transactionLists');
const transactionForm = document.getElementById('transactionForm');



function display() {
  
  let balance = 0;
  let income = 0;
  let expenses = 0
  
  transactions.filter(transaction => {
    if (transaction.type === 'income') {
      return transaction;
    };
  }).forEach(transaction => {
    income += transaction.amount;
  });
  
  transactions.filter(transaction => {
    if (transaction.type === 'expenses') {
      return transaction;
    };
  }).forEach(transaction => {
    expenses += transaction.amount;
  });
  
  balance = income - expenses;
  
  document.getElementById('balance').textContent = `$${balance}`;
  document.getElementById('income').textContent = `$${income}`;
  document.getElementById('expenses').textContent = `$${expenses}`;
  
let food = 0;
let transport = 0;
let bills = 0;
let entertainment = 0;
  
transactions.forEach( transaction => {
    
  if (transaction.category ==='food') {
    food += transaction.amount;
  } else if (transaction.category === 'transport') {
    transport += transaction.amount;
  } else if (transaction.category === 'bills') {
    bills += transaction.amount;
  } else if (transaction.category === 'entertainment') {
    entertainment += transaction.amount;
  }
    
})
  
  let categoryAmounts = [
  {
    name: 'food', 
    amount: food
  }, {
    name: 'transport', 
    amount: transport
  }, {
    name: 'bills', 
    amount: bills
  }, {
    name: 'entertainment', 
    amount: entertainment
  }
];
  
  let top = {
    name: '', 
    amount: 0
  };
  let summary = ''
  
  categoryAmounts.forEach(cat => {
    
    if (cat.amount > top.amount) {
      top.name = cat.name;
      top.amount = cat.amount;
    }
    
    summary += `
      <p class="summary">
        ${cat.name}: $${cat.amount}
      </p>
    `
    
  });
  
  document.getElementById('top-spending').innerHTML = `Top spending category: <strong>${top.name}<strong>`
  
  document.getElementById('summary').innerHTML = summary;
  
  document.getElementById('budgetLimit').innerHTML = `Budget: ${budgetLimit}`;
  
  budgetProgressBar(expenses)
  progressBars(income, food, transport, bills, entertainment);
  
}

 function renderTransactions() {
  
  let transactionHtml = '';
  
  for (let i = 0; i < transactions.length; i++) {
    
    if (i === 3) {
      break
    }
    
    transactionHtml += `
      <li class="transactions transactions-${transactions[i].id}">
        <div class="transaction">
          <strong>${transactions[i].name}</strong><br> ${transactions[i].category} <br> ${transactions[i].date}
        </div>
        <div class="amount">$${transactions[i].amount}</div>
        <div id="buttons">
          <button class="edit" onclick="editTransaction('${transactions[i].id}')">
            Edit
          </button>
          <button class="delete" onclick="deleteTransaction('${transactions[i].id}')">
            Delete
          </button>
        </div>
      </li>
    `;
    
  }
  
  transactionLists.innerHTML = transactionHtml;
  display();
  
}
  
  window.deleteTransaction = function(id) {
    
    deleteData(id);
    display();
    renderTransactions();
    
  }
  
  let index
  window.editTransaction = function(id) {
    
    let edited = transactions.find( (transaction, i) => { 
      
      if (transaction.id === id) {
        index = i;
        return transaction;
      }
      
    });
    
    document.querySelector('.transaction-form').classList.add('display');
      
    
    document.getElementById('transactionName').value = edited.name;
      document.getElementById('amount').value = edited.amount;
      document.getElementById('type').value = edited.type;
      document.getElementById('category').value = edited.category;
      document.getElementById('date').value = edited.date;
      
      deleteTransaction(edited.id);
      
      
    
  }
  
  
  transactionForm.addEventListener('submit', (e) => {
  
  
  e.preventDefault()
  
  let transaction = {
    id: Date.now().toString().toString(), 
    name: document.getElementById('transactionName').value, 
    amount: Number(document.getElementById('amount').value), 
    type: document.getElementById('type').value, 
    category: document.getElementById('category').value, 
    date: document.getElementById('date').value
  }
  
  transactions.splice(index,0,transaction);
  
  save();
  renderTransactions();
  display();
  transactionForm.reset();
  document.querySelector('.transaction-form').classList.remove('display');

  }); 
  
  document.getElementById('remove').addEventListener('click', () => {
    document.querySelector('.transaction-form').classList.remove('display');
  });
  
  
  


function progressBars(income, food,transport, bills,entertainment) {
  
  document.querySelector('.food-bar').style.width = (food / income) * 100 + '%';
  document.querySelector('.transport-bar').style.width = (transport / income) * 100 + '%';
  document.querySelector('.bills-bar').style.width = (bills / income) * 100 + '%';
  document.querySelector('.entertainment-bar').style.width = (entertainment / income) * 100 + '%';
  
}

function budgetProgressBar(expenses) {
    
    document.querySelector('.budget-bar').style.width = (expenses / budgetLimit) * 100 + '%';
    
    if (((expenses / budgetLimit) * 100) > 70) {
      document.querySelector('.budget-bar').style.background = 'red';
    } else {
      document.querySelector('.budget-bar').style.background = 'green';
    }
    
    if (expenses >= budgetLimit) {
      document.getElementById('warning').textContent = 'Budget limit exceeded'
    }
    
  }
  

utils()
renderTransactions()