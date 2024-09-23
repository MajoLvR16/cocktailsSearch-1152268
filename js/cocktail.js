const urlParams = new URLSearchParams(window.location.search);
const drinkId = urlParams.get('id');

async function getCocktailDetails() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
    const data = await response.json();
    const drink = data.drinks[0];

    document.getElementById('cocktailName').textContent = drink.strDrink;

    let ingredients = '';
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
            ingredients += `<li>${measure ? measure : ''} ${ingredient}</li>`;
        }
    }

    document.getElementById('cocktailDetails').innerHTML = `
        <div class="col-md-6">
            <img src="${drink.strDrinkThumb}/preview" class="img-fluid" alt="${drink.strDrink}">
        </div>
        <div class="col-md-6">
            <h5>Ingredients</h5>
            <ul>${ingredients}</ul>
            <h5>Instructions</h5>
            <p>${drink.strInstructions}</p>
        </div>`;
}

getCocktailDetails();
