export let transactions = JSON.parse(localStorage.getItem('transactionData')) || [];

export function save() {
  localStorage.setItem('transactionData',JSON.stringify(transactions));
}

export let food = 0;
export let transport = 0;
export let bills = 0;
export let entertainment = 0;
  
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
  
export let categoryAmounts = [
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
  
export function removeTransaction(transactionId) {
  
  let newTransactions = [];
      transactions.forEach( transaction => {
        
        if (transaction.id !== transactionId) {
          newTransactions.push(transaction)
        }
        
      });
      transactions = newTransactions;
      save();
  
}  

export function deleteData(id) {
  transactions = transactions.filter( transaction => transaction.id !== id);
    save();
}