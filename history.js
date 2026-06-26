import {transactions, save, removeTransaction, deleteData} from './transactions.js';
 import {utils} from './script.js';

let transactionLists = document.getElementById('transactionLists');

function renderHistory(data = transactions) {
  
  let transactionsHtml = ''
  data.forEach(transaction => {
  
  transactionsHtml += `
    <li class="transactions transactions-${transaction.id}">
      <div class="transaction">
          <strong>${transaction.name}</strong><br> ${transaction.category}<br> ${transaction.date}
      </div>
      <div class="amount">
        ${transaction.amount}
      </div>
      <div id="buttons">
        <button class="edit" onclick="editTransaction('${transaction.id}')">
          Edit
        </button>
        <button class="delete"  onclick="deleteTransaction('${transaction.id}')" >
          Delete
        </button>
      </div>
    </li>
    `;
  
});

transactionLists.innerHTML = transactionsHtml;
  
}

 window.deleteTransaction = function(id) {
    
    deleteData(id);
    renderHistory();
    
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
  renderHistory();
  transactionForm.reset();
  document.querySelector('.transaction-form').classList.remove('display');

  }); 

document.getElementById('remove').addEventListener('click', () => {
  document.querySelector('.transaction-form').classList.remove('display');
});

 document.getElementById('search').addEventListener('input', (e) => {
  
  const search = e.target.value.toLowerCase();
  const filtered = transactions.filter( transaction => transaction.name.toLowerCase().includes(search));
  renderHistory(filtered);
  
  
});

document.getElementById('category').addEventListener('change', (e) =>  {
  
  const categoryValue = e.target.value;
  
  if (categoryValue === 'all') {
    renderHistory();
    return;
  } 
  const filtered = transactions.filter( transaction => transaction.category === categoryValue);
  renderHistory(filtered)
  
});

document.getElementById('sort').addEventListener('change', (e) => {
  
  let sorted = [...transactions];
  let sortValue = e.target.value;
  
  if (sortValue === 'newest') {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date)
      );
  } else if (sortValue === 'oldest') {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date)
      );
  } else if (sortValue === 'high') {
    sorted.sort((a, b) => b.amount - a.amount);
  } else if (sortValue === 'low') {
    sorted.sort((a, b) => a.amount- b.amount);
  }
  
  renderHistory(sorted)
  
});

document.getElementById('dateSort').addEventListener('change', (e) => {
  
  let dateValue = e.target.value;
  let filtered = transactions.filter( transaction => transaction.date === dateValue);
  renderHistory(filtered);
  
})

utils()
renderHistory()