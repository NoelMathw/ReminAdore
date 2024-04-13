//HTML to show first login page
    const loginHTML = `    
	    <!--Simple logo at top of login page-->
		    <nav class="navbar bg-light">
			    <div class="container-fluid">
				    <h1 class="navbar-brand logoname">
					    <img src="img/ReminAdore Logo.png" alt="Logo" width="100" height="100" class="d-inline-block align-text-b">
						    ReminAdore
				    </h1>
			    </div>
		    </nav>

        <!--Description of the app-->
            <div id="app-descriptions text-center" class="description"></div>

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
                            <button type="submit" class="btn btn-primary">Login</button>
                            <button type="button" class="btn btn-success">Sign Up</button>

                            <a href="#" class="btn btn-link">Forgot Password?</a>

                            <div class="mt-3 text-danger" id="error-message"></div>
                        </form>
                    </div>
                </div>
            </div>`;

    const body = document.querySelector(".body");
    body.innerHTML = loginHTML;

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



    



