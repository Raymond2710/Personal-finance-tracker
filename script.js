export let budgetLimit = JSON.parse(localStorage.getItem('budget'))
  
export function saveBudget(budget) {
  localStorage.setItem('budget', JSON.stringify(budget))
}

export function utils() {
  
  const menuBtn = document.getElementById('menuBtn');
  let toggleBtn = document.getElementById('darkBtn');
  let budgetBtn = document.getElementById('budget');
  
  
  let theme = JSON.parse(localStorage.getItem('mode'));
  let budget = 0;
  
  if (theme === 'dark') {
    document.body.classList.add('dark');
      toggleBtn.textContent = 'Light Mode';
  }
  
  function saveMode(mode) {
    localStorage.setItem('mode',JSON.stringify(mode))
  }
  
  
  
  menuBtn.addEventListener('click', () => {
    let menu = document.getElementById('menu').classList.toggle('show')
  });
  
  toggleBtn.addEventListener('click', (e) => {
    
    e.preventDefault()
    let toggleValue = e.target.textContent;
    if (toggleValue.includes('Dark Mode')) {
      document.body.classList.add('dark');
      toggleBtn.textContent = 'Light Mode';
      saveMode('dark');
    } else {
      document.body.classList.remove('dark');
      toggleBtn.textContent = 'Dark Mode';
      saveMode('light');
    }
    
  });
  
  budgetBtn.addEventListener('click', (e) => {
    
    e.preventDefault()
    budget = Number(prompt('Enter budget'));
    if (budget <= 0 || budget === '' || budget === ' ') {
      return
    }
    saveBudget(budget)
    
  })
}


