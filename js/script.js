// Fetch ingredient list and populate the combobox
fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
  .then(response => response.json())
  .then(data => {
    const ingredientSelect = document.getElementById('ingredient');
    data.drinks.forEach(ingredient => {
      const option = document.createElement('option');
      option.value = ingredient.strIngredient1;
      option.textContent = ingredient.strIngredient1;
      ingredientSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error fetching ingredients:', error));

// Function to display cocktails in the results container
function displayCocktails(drinks) {
  const resultsContainer = document.getElementById('cocktailResults');
  resultsContainer.innerHTML = '';

  if (!drinks) {
    resultsContainer.innerHTML = '<p class="col-12 text-center">No results found</p>';
    return;
  }

  drinks.forEach(drink => {
    const cocktailCard = document.createElement('div');
    cocktailCard.className = 'col-md-4 mb-4';
    cocktailCard.innerHTML = `
      <div class="card h-100">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${drink.strDrink}</h5>
          <p class="card-text">Type: ${drink.strAlcoholic || 'N/A'}</p>
          <a href="html/cocktail-details.html?id=${drink.idDrink}" class="btn btn-neon mt-2">View Details</a>
        </div>
      </div>
    `;
    resultsContainer.appendChild(cocktailCard);
  });
}

// Search cocktails by name, type, or ingredient based on priority
function searchCocktails() {
  const cocktailName = document.getElementById('cocktailName').value.trim();
  const selectedType = document.getElementById('type').value;
  const selectedIngredient = document.getElementById('ingredient').value;

  let endpoint;

  if (cocktailName) {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`;
  } else if (selectedType) {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${selectedType}`;
  } else if (selectedIngredient) {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`;
  } else {
    const resultsContainer = document.getElementById('cocktailResults');
    resultsContainer.innerHTML = '<p class="col-12 text-center">Please enter a name, select a type, or choose an ingredient.</p>';
    return;
  }

  fetch(endpoint)
    .then(response => response.json())
    .then(data => displayCocktails(data.drinks))
    .catch(error => console.error('Error fetching cocktails:', error));
}

// Add event listeners
document.getElementById('searchByName').addEventListener('click', searchCocktails);
document.getElementById('cocktailName').addEventListener('input', searchCocktails);
document.getElementById('type').addEventListener('change', searchCocktails);
document.getElementById('ingredient').addEventListener('change', searchCocktails);