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
});


//Code to create description animation
