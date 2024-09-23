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
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '';

  if (!drinks) {
    resultsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  drinks.forEach(drink => {
    const cocktailCard = document.createElement('div');
    cocktailCard.classList.add('cocktail-card');
    cocktailCard.innerHTML = `
      <a href="cocktail-details.html?id=${drink.idDrink}" class="cocktail-link">
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        <h3>${drink.strDrink}</h3>
        <p>Type: ${drink.strAlcoholic}</p>
        <p>${drink.strDescription ? drink.strDescription : "No description available."}</p>
      </a>
    `;
    resultsContainer.appendChild(cocktailCard);
  });
}

// Search cocktails by name, type, or ingredient based on priority
document.getElementById('searchByName').addEventListener('click', function() {
  const cocktailName = document.getElementById('cocktailName').value.trim();
  const selectedType = document.getElementById('type').value;
  const selectedIngredient = document.getElementById('ingredient').value;

  if (cocktailName) {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => displayCocktails(data.drinks))
      .catch(error => console.error('Error fetching cocktails by name:', error));
  } else if (selectedType) {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${selectedType}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => displayCocktails(data.drinks))
      .catch(error => console.error('Error fetching cocktails by type:', error));
  } else if (selectedIngredient) {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => displayCocktails(data.drinks))
      .catch(error => console.error('Error fetching cocktails by ingredient:', error));
  } else {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '<p>Please enter a name, select a type, or choose an ingredient.</p>';
  }
});

// Clear the results when input changes
document.getElementById('cocktailName').addEventListener('input', function() {
  document.getElementById('resultsContainer').innerHTML = '';
});

document.getElementById('type').addEventListener('change', function() {
  document.getElementById('resultsContainer').innerHTML = '';
});

document.getElementById('ingredient').addEventListener('change', function() {
  document.getElementById('resultsContainer').innerHTML = '';
});
