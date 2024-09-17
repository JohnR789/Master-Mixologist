# Master-Mixologist

Find your next alcoholic drink of choice


Introduction
Master Mixologist is a web application that helps users discover new alcoholic drink recipes based on their preferences. Users can search for drinks by flavor, alcohol type, and mixer, view detailed recipes, save favorites, and learn more about ingredients. The app features a modern, nightlife-inspired design with intuitive UI/UX enhancements.

Features
Discover New Drinks: Automatically displays a new random alcoholic drink every 10 seconds.
Advanced Search: Search for drinks based on desired flavor, alcohol type, and mixer.
Detailed Recipes: View step-by-step preparation guides with ingredients and instructions.
Ingredient Information: Get detailed information about selected ingredients.
Favorites: Save and manage your favorite drink recipes.
Responsive Design: Optimized for both desktop and mobile devices.
User-Friendly Interface: Enhanced UI/UX with icons, loading indicators, and feedback messages.

 demo: https://johnr789.github.io/Mikeys-Mixology/

Installation
To run the Master Mixologist application locally, follow these steps:

Clone the Repository

bash
Copy code
git clone https://github.com/your-username/master-mixologist.git
Navigate to the Project Directory

bash
Copy code
cd master-mixologist
Install Dependencies

Since this is a front-end project, dependencies are included via CDN links. No additional installation is required for dependencies.
Obtain a Spoonacular API Key

Sign up for a free account at Spoonacular.
Navigate to your profile and retrieve your API key.
Update the API Key

Open script.js in a text editor.

Replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key:

javascript
Copy code
const SPOONACULAR_API_KEY = 'YOUR_SPOONACULAR_API_KEY';
Replace Placeholder Content

Background Image: In styles.css, replace 'your-vice-city-background.jpg' with the path or URL to your desired background image.
Banner Image: If you have a banner image, update the README with your image URL.
Run a Local Web Server

It's recommended to run the project on a local web server to avoid CORS issues.

You can use Live Server extension for VSCode or run a simple server with Python:

bash
Copy code
# For Python 3.x
python -m http.server 8000

# For Python 2.x
python -m SimpleHTTPServer 8000
Open your browser and navigate to http://localhost:8000.

Usage
Explore New Drinks

The "Discover New Drinks" section automatically updates with a new random drink every 10 seconds.
Click on the View Recipe button to see the full recipe on the source website.
Search for Drinks

Enter your desired flavor, alcohol type, or mixer in the search fields.
Click on Generate Drink Recipe to fetch a drink that matches your criteria.
If available, ingredient information will be displayed below the recipe.
Save Favorites

After generating a recipe, click on Save to Favorites to add it to your favorites list.
Click on View Favorites to see all your saved recipes.
You can remove a recipe from favorites by clicking the Remove button.
Responsive Design

The application is optimized for various screen sizes. Try resizing your browser or accessing it on a mobile device.
Configuration
API Key Security
Important: Do not expose your Spoonacular API key in public repositories.
For production use, consider setting up a backend server to securely handle API requests.
Adjusting Random Drink Interval
The interval for updating the random drink can be adjusted in script.js:

javascript
Copy code
// Update every 30 seconds (30000 milliseconds)
setInterval(updateRandomDrink, 30000);
Be mindful of API rate limits to avoid exceeding your quota.

Updating Icons
The application uses Font Awesome for icons.

Ensure that the Font Awesome script tag in index.html is updated with your kit ID or uses the CDN link.

html
Copy code
<!-- Using CDN -->
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"
  crossorigin="anonymous"
></script>
Dependencies
Spoonacular API: Used for fetching drink recipes and ingredient information.
Font Awesome: Provides icons for UI elements.
Google Fonts: Uses the 'Roboto' font for typography.
Contributing
Contributions are welcome! If you'd like to contribute to Master Mixologist, please follow these steps:

Fork the Repository

Click the Fork button at the top-right corner of this page.
Clone Your Fork

bash
Copy code
git clone https://github.com/your-username/master-mixologist.git
Create a Feature Branch

bash
Copy code
git checkout -b feature/YourFeatureName
Commit Your Changes

bash
Copy code
git commit -am 'Add some feature'
Push to the Branch

bash
Copy code
git push origin feature/YourFeatureName
Create a Pull Request

Open a pull request on the original repository with a description of your changes.
License
This project is licensed under the MIT License.

Acknowledgements
Spoonacular for their comprehensive food API.
Font Awesome for the icon library.
Unsplash or other image providers for background images (if used).
Contributors: Thank you to everyone who has contributed to this project.
