document.getElementById('searchBtn').addEventListener('click', async function () {
    const ingredient = document.getElementById('ingredient').value;
    const type = document.getElementById('type').value;
    const name = document.getElementById('name').value;
    let apiUrl = '';

    if (ingredient) {
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    } else if (type) {
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`;
    } else if (name) {
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    }

    if (apiUrl) {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Clear previous results
        document.getElementById('results').innerHTML = '';

        // Display the results
        data.drinks.forEach(drink => {
            document.getElementById('results').innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${drink.strDrinkThumb}/preview" class="card-img-top" alt="${drink.strDrink}">
                        <div class="card-body">
                            <h5 class="card-title">${drink.strDrink}</h5>
                            <button class="btn btn-info" onclick="viewDetails(${drink.idDrink})">View Details</button>
                        </div>
                    </div>
                </div>`;
        });
    }
});

// Function to navigate to the cocktail details page
function viewDetails(drinkId) {
    window.location.href = `cocktail.html?id=${drinkId}`;
}
