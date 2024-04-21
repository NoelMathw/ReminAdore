//Classes and objects
//class template for to-do list
class ToDoClass {
    ToDoString; //String variable to hold to-do list
    ToDoDate; //Date variable to hold reminder date
}

//class for creating reminder objects 
class ReminderClass {
    #name;  //name of person
    #DOB; //DOB of the person
    #RMB; //Remind me before
    ToDo = []; //To do list for each person
    assignAttr(name, DOB, RMB) { //function to assign name and DOB
        this.#name = name;
        this.#DOB = DOB;
        this.#RMB = RMB;
    }
}

//object for reminders (template to store into JSON file)
const Reminders = new ReminderClass();

//Variable of TodoClass type (template to store into ReminderClass and then store into JSON file)
const TDVar = new ToDoClass();

//HTML object for adding reminder
const AddBHTML = {
    HTML: `
<div class="d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <div class="card shadow-lg p-3 mb-5 rounded newcard" style="width: 30rem;">
        <div class="card-body">
            <h3 class="card-title text-center mb-4">Add New Reminder</h3>
            <form id="reminder-form">
                <div class="mb-3">
                    <label for="name" class="form-label">Person's Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter name" required>
                </div>
                <div class="mb-3">
                    <label for="dateOfBirth" class="form-label">Date of Birth</label>
                    <input type="date" class="form-control" id="dateOfBirth" required>
                </div>
                <div class="mb-3">
                    <label for="remindBefore" class="form-label">Remind me before (in days)</label>
                    <input type="number" class="form-control" id="remindBefore" placeholder="Number of days" required>
                </div>

                <fieldset class="mb-4">
                    <legend>To-Do List</legend>
                    <div class="todo-items">
                        <div class="todo-item mb-3">
                            <label for="todo-1" class="form-label">To-Do Item</label>
                            <input type="text" class="form-control todo-input" id="todo-1" placeholder="Enter a to-do item">
                            <label for="todo-reminder-1" class="form-label mt-2">Reminder Date</label>
                            <input type="date" class="form-control todo-reminder-input" id="todo-reminder-1">
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline-primary mt-2" id="add-todo-btn">
                        <i class="fa fa-plus"></i> Add To-Do Item
                    </button>
                </fieldset>
                <button type="submit" class="btn btn-primary w-100">Save Reminder</button>
            </form>
        </div>
    </div>
</div>`,
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

//Element object of the main-content
const MainContent = document.querySelector(".main-content");
//Element object of navigation buttons
const Home = document.querySelector(".Home");
const AllB = document.querySelector(".AllB");
const AddB = document.querySelector(".AddB");


//Functions which change page according to navigation button user selects
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
    MainContent.innerHTML = AddBHTML.HTML;  //Changing main page content into a card so that the user can add more reminders
    const AddTD = document.querySelector("#add-todo-btn");
    const TDitems = document.querySelector(".todo-items");
    let tdcount = 1;  //taking account of number of to do items
    AddTD.addEventListener("click", () => {   //Adding more to do inputs for user
        const tdstring = `<div class="todo-item mb-3">
                            <label for="todo-${tdcount + 1}" class="form-label">To-Do Item</label>
                            <input type="text" class="form-control todo-input" id="todo-${tdcount + 1}" placeholder="Enter a to-do item">
                            <label for="todo-reminder-${tdcount + 1}" class="form-label mt-2">Reminder Date</label>
                            <input type="date" class="form-control todo-reminder-input" id="todo-reminder-${tdcount + 1}">
                        </div>`;
        TDitems.innerHTML += tdstring;
        ++tdcount;
    });
    //Input elements
    const nameInput = document.querySelector("#name");
    const DOBInput = document.querySelector("#dateOfBirth");
    const RBInput = document.querySelector("#remindBefore");
    let ToDOStringElements = []; //Array to hold to-do string elements
    let ToDODateElements = []; //Array to hold to-do date elements
    for (let i = 1; i <= tdcount; i++)  //Storing to-do elements to array
    {
        ToDOStringElements.push(document.querySelector(`#todo-${i}`));
        ToDODateElements.push(document.querySelector(`#todo-reminder-${i}`));
    }
    //Function to store values to variables and to JSON file
    document.querySelector("#reminder-form").addEventListener("submit", (event) => {
        event.preventDefault();
        //Acquiring all data into variables
        const name = nameInput.value;
        const DOB = DOBInput.value;
        const RB = RBInput.value;
        //Array to hold to-do data in variables
        let ToDOString = [];
        let ToDODate = [];
        for (let i = 0; i < tdcount; i++) {  //Storing string and date of to-do list to array
            ToDOString.push(ToDOStringElements[i].value);
            ToDODate.push(ToDODateElements[i].value);
        }
        Reminders.assignAttr(name, DOB, RB); //Assigning inputs to Reminders object
        for (let i = 0; i < tdcount; i++) {  //Assigning to-do data to Reminders object in the form of ToDoClass object template
            TDVar.ToDoString = ToDOString[i];
            TDVar.ToDoDate = ToDODate[i];
            Reminders.ToDo.push(TDVar);
        }
        //const ReminderJSON = JSON.stringify(Reminders);
        fetch('http://localhost:3000/add-reminder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Reminders)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
    runHomePage();
}


//Event listeners for navigation buttons
Home.addEventListener("click", runHomePage);
AllB.addEventListener("click", runAllBPage);
AddB.addEventListener("click", runAddBPage);

runHomePage(); //First call to run the home page


/*
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
    
