document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generate-button').addEventListener('click', generateDrinkRecipe);
    document.getElementById('save-favorite-button').addEventListener('click', saveToFavorites);
    document.getElementById('view-favorites-button').addEventListener('click', displayFavorites);

    // Start Random Drink Updates
    startRandomDrinkUpdates();
});

const SPOONACULAR_API_KEY = 'f0db5e7652f840c785f2b003602d6891';

async function generateDrinkRecipe() {
    const flavor = document.getElementById('flavor').value.trim();
    const alcohol = document.getElementById('alcohol').value.trim();
    const mixer = document.getElementById('mixer').value.trim();

    if (alcohol || flavor || mixer) {
        try {
            showLoadingSpinner();
            const recipe = await fetchSpoonacularRecipe(alcohol, flavor, mixer);
            hideLoadingSpinner();
            if (recipe) {
                displaySpoonacularRecipe(recipe);
                // Display ingredient info
                if (alcohol) await displayIngredientInfo(alcohol);
                if (mixer) await displayIngredientInfo(mixer);
            } else {
                showToast('No drinks found. Please try another search.', true);
            }
        } catch (error) {
            hideLoadingSpinner();
            console.error(error);
            showToast('Something went wrong. Please try again.', true);
        }
    } else {
        showToast('Please enter at least one search parameter.', true);
    }
}

async function fetchSpoonacularRecipe(alcohol, flavor, mixer) {
    const queryParams = [];
    if (alcohol) queryParams.push(`includeIngredients=${encodeURIComponent(alcohol)}`);
    if (mixer) queryParams.push(`includeIngredients=${encodeURIComponent(mixer)}`);
    if (flavor) queryParams.push(`tags=${encodeURIComponent(flavor)}`);

    const query = queryParams.join('&');

    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${query}&apiKey=${SPOONACULAR_API_KEY}&type=drink&number=1`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
        const recipeId = data.results[0].id;
        // Fetch detailed recipe information
        const recipeResponse = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`);
        const recipeData = await recipeResponse.json();
        return recipeData;
    } else {
        return null;
    }
}

function displaySpoonacularRecipe(recipe) {
    const recipeContainer = document.getElementById('recipe-container');
    let analyzedInstructions = recipe.analyzedInstructions;
    let steps = [];
    if (analyzedInstructions && analyzedInstructions.length > 0) {
        steps = analyzedInstructions[0].steps;
    }

    recipeContainer.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; border-radius:10px;">
        <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <ol>
            ${steps.map(step => `<li>${step.step}</li>`).join('')}
        </ol>
    `;
}

async function fetchRandomDrinkRecipe() {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=1&tags=drink`);
        const data = await response.json();
        if (data.recipes && data.recipes.length > 0) {
            return data.recipes[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching random drink:', error);
        return null;
    }
}

async function updateRandomDrink() {
    try {
        showLoadingSpinner();
        const drink = await fetchRandomDrinkRecipe();
        hideLoadingSpinner();
        if (drink) {
            const container = document.getElementById('random-drink-container');
            container.innerHTML = `
                <h3>${drink.title}</h3>
                <img src="${drink.image}" alt="${drink.title}" style="width:100%; border-radius:10px;">
                <p><strong>Ready in:</strong> ${drink.readyInMinutes} minutes</p>
                <a href="${drink.sourceUrl}" target="_blank" class="view-recipe-button"><i class="fas fa-external-link-alt"></i> View Recipe</a>
            `;
        }
    } catch (error) {
        hideLoadingSpinner();
        console.error('Error updating random drink:', error);
        showToast('Failed to load new drinks.', true);
    }
}

function startRandomDrinkUpdates() {
    updateRandomDrink();
    setInterval(updateRandomDrink, 30000);
}

async function fetchIngredientInfo(ingredientName) {
    try {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${encodeURIComponent(ingredientName)}&apiKey=${SPOONACULAR_API_KEY}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const ingredientId = data.results[0].id;
            const infoResponse = await fetch(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=1&apiKey=${SPOONACULAR_API_KEY}`);
            const infoData = await infoResponse.json();
            return infoData;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching ingredient info:', error);
        return null;
    }
}

async function displayIngredientInfo(ingredientName) {
    const info = await fetchIngredientInfo(ingredientName);
    const infoContainer = document.getElementById('ingredient-info');
    if (info) {
        infoContainer.innerHTML += `
            <h3>Ingredient Information</h3>
            <p><strong>Name:</strong> ${info.name}</p>
            <p><strong>Category:</strong> ${info.categoryPath ? info.categoryPath.join(', ') : 'N/A'}</p>
            <p><strong>Possible Units:</strong> ${info.possibleUnits ? info.possibleUnits.join(', ') : 'N/A'}</p>
            <img src="https://spoonacular.com/cdn/ingredients_250x250/${info.image}" alt="${info.name}" style="width:200px; border-radius:10px;">
        `;
    } else {
        infoContainer.innerHTML += `<p>No ingredient information available for ${ingredientName}.</p>`;
    }
}

function saveToFavorites() {
    const recipeContainer = document.getElementById('recipe-container');
    if (recipeContainer.innerHTML.trim() === '') {
        showToast('No recipe to save.', true);
        return;
    }

    const recipeTitle = recipeContainer.querySelector('h2').innerText;
    const recipeContent = recipeContainer.innerHTML;

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push({ title: recipeTitle, content: recipeContent });
    localStorage.setItem('favorites', JSON.stringify(favorites));

    showToast(`${recipeTitle} has been added to your favorites!`);
}

function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>You have no favorite recipes yet.</p>';
    } else {
        favoritesContainer.innerHTML = favorites.map(fav => `
            <div class="favorite-recipe">
                ${fav.content}
                <button onclick="removeFromFavorites('${fav.title}')"><i class="fas fa-trash"></i> Remove</button>
            </div>
        `).join('');
    }
}

function removeFromFavorites(title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.title !== title);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
    showToast(`${title} has been removed from your favorites.`);
}

/* Loading Spinner Functions */
function showLoadingSpinner() {
    document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').classList.add('hidden');
}

/* Toast Notification Function */
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.backgroundColor = isError ? '#FF6EC7' : '#00FFFF';
    toast.style.color = '#1a1a1a';
    toast.classList.remove('hidden');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 500);
    }, 3000);
}
