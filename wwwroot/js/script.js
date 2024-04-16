<<<<<<< HEAD
//Objects and classes are defined here

const LoginPage = {
    //HTML to show first login page
    loginHTML: `    
	    <!--Simple logo at top of login page-->
		    <nav class="navbar bg-light">
			    <div class="container-fluid">
				    <h1 class="navbar-brand logoname">
					    <img src="img/ReminAdore Logo.png" alt="Logo" width="100" height="100" class="d-inline-block align-text-b">
						    ReminAdore
				    </h1>
			    </div>
		    </nav>
=======
const body = document.querySelector(".body");
>>>>>>> Testing

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

<<<<<<< HEAD
        <!--HTML for login box-->
            <div class="container mt-5">
                <div class="card mx-auto loginbox" style="width:fit-content; height:fit-content">
                    <div class="card-header text-center">
                        <h3 class="loginmessage">Login or sign-up to get started</h3>
                    </div>
                    <div class="card-body">
                        <form id="login-form">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" id="username" name="username" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password" required>
                            </div>
                            <button type="submit" class="btn btn-primary login">Login</button>
                            <button type="button" class="btn btn-success sign-up">Sign Up</button>

                            <div class="mt-3 text-danger" id="error-message"></div>
                        </form>
                    </div>
                </div>
            </div>`,
    //Code to create description animation
    descriptions: [
        "Never miss a friend's birthday again!",
        "Your personal birthday reminder.",
        "Your birthday reminder app.",
        "Show your friends you care. Never miss a birthday.",
        "Effortlessly remember birthdays."
    ],
};

const SignUpPage = {
    signupHTML: `<div class="container mt-5">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <button class="btn btn-light mb-3 goBackButton">
                                <i class="fas fa-arrow-left"></i>Go Back
                            </button>

                            <div class="card">
                                <div class="card-header text-center">
                                    <h2>Sign Up</h2>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="mb-3">
                                            <label for="name" class="form-label">Name</label>
                                            <input type="text" class="form-control" id="name" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="email" required> </div>
                                        <div class="mb-3">
                                            <label for="username" class="form-label">Username</label>
                                            <input type="text" class="form-control" id="username" required> </div>
                                        <div class="mb-3">
                                            <label for="dateOfBirth" class="form-label">Date of Birth</label>
                                            <input type="date" class="form-control" id="dateOfBirth" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="password" class="form-label">Password</label>
                                            <input type="password" class="form-control" id="password" required>
                                        </div>
                                        <button type="submit" class="btn btn-primary w-100">Sign Up</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
};

//Execution start code

const body = document.querySelector(".body");
body.innerHTML = LoginPage.loginHTML;
//Code to create description animation
let currentDescIndex = 0; // Keep track of the current description index
async function updateDescription() {
    const descriptionElement = document.querySelector(".description");
    if (descriptionElement) {
        descriptionElement.innerText = LoginPage.descriptions[currentDescIndex];  // Update the text inside the description div
    } 
    currentDescIndex = (currentDescIndex + 1) % LoginPage.descriptions.length; // Increment the index and loop back to 0 if it exceeds the array length
}
setInterval(updateDescription, 3000); // Set the interval to change description every 3000 milliseconds (3 seconds)
updateDescription(); // Initial call to set the first description immediately

// Code for sign - up button
document.querySelector(".sign-up").addEventListener("click", () => { body.innerHTML = SignUpPage.signupHTML; });
const goBackButton = document.querySelector(".goBackButton");
if (goBackButton) {
    goBackButton.addEventListener("click", () => {
        body.innerHTML = LoginPage.loginHTML;
    });
}
=======
// Further code for login and descriptions animations should be handled appropriately


>>>>>>> Testing

//Code related to loginbox
    /*let loginStatus = false;
    const usernameInput = document.getElementById('username');
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