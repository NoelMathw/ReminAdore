const body = document.querySelector(".body");

// Use fetch() correctly with async/await or then()
fetch('./JSON/pages.JSON')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(pages => {
        // Now you have the JSON data
        body.innerHTML = pages.loginPage;  // Assuming pages.json has a property `loginPage`
    })
    .catch(error => {
        console.error('Failed to load JSON:', error);
        body.innerHTML = '<p>Error loading page.</p>';
    });

// Further code for login and descriptions animations should be handled appropriately



let loginStatus = false;
//Code related to loginbox
    /*const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const loginForm = document.getElementById('login-form');


    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission

      const username = usernameInput.value;
      const password = passwordInput.value;

      // ** Replace with your actual credential validation logic here **
      if (username === 'admin' && password === 'password123') {
        // Login successful (redirect to main app or display success message)
        window.location.href = '/dashboard'; // Redirect to dashboard
      } else {
        errorMessage.textContent = 'Invalid username or password.';
      }
    });*/


//Code to create description animation
const descriptions = [
    "Never miss a friend's birthday again!",
    "Your personal birthday reminder.",
    "Your birthday reminder app.",
    "Show your friends you care. Never miss a birthday.",
    "Effortlessly remember birthdays."
];
let currentDescIndex = 0; // Keep track of the current description index

async function updateDescription() {
    const descriptionElement = document.querySelector(".description");
    descriptionElement.innerText = descriptions[currentDescIndex]; // Update the text inside the description div
    currentDescIndex = (currentDescIndex + 1) % descriptions.length; // Increment the index and loop back to 0 if it exceeds the array length
}

setInterval(updateDescription, 3000); // Set the interval to change description every 4000 milliseconds (4 seconds)
updateDescription(); // Initial call to set the first description immediately



    



