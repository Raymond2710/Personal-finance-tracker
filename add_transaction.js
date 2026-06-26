import {transactions, save} from './transactions.js';
import {utils,} from './script.js';

const transactionForm = document.getElementById('transactionForm');


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
  
  transactions.unshift(transaction);
  
  save()
  transactionForm.reset()
  
})

utils();