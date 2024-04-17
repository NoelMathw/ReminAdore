//Classes and objects
//class template for to-do list
class ToDoClass {
    ToDoString; //String variable to hold to-do list
    ToDoDate; //
}
//class for creating reminder objects 
class ReminderClass {
    #name;  //name of user
    #DOB; //DOB of the user
    ToDo = [{}]; //To do list for each user
}


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


//Element object of navigation buttons
const Home = document.querySelector(".Home");
const AllB = document.querySelector(".AllB");
const AddB = document.querySelector(".AddB");


//Functions which change page according to page user selects
function runHomePage() {
    Home.classList.add('active');
    AllB.classList.remove('active');
    AddB.classList.remove('active');
} 

function runAllBPage() {
    AllB.classList.add('active');
    Home.classList.remove('active');
    AddB.classList.remove('active');
}

function runAddBPage() {
    AddB.classList.add('active');
    Home.classList.remove('active');
    AllB.classList.remove('active');
}


//Event listeners for navigation buttons
Home.addEventListener("click", runHomePage);
AllB.addEventListener("click", runAllBPage);
AddB.addEventListener("click", runAddBPage);

runHomePage(); //First call to run the home page


/*const body = document.querySelector(".body"); //Using this element to change body
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
        });*/
    
