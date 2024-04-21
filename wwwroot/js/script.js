//Classes and objects
//class template for to-do list
class ToDoClass {
    ToDoString; //String variable to hold to-do list
    ToDoDate; //Date variable to hold reminder date
}

//class for creating reminder objects 
class ReminderClass {
    name;  //name of person
    DOB; //DOB of the person
    RMB; //Remind me before
    ToDo = []; //To do list for each person
    assignAttr(name, DOB, RMB) { //function to assign name and DOB
        this.name = name;
        this.DOB = DOB;
        this.RMB = RMB;
    }
}

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
    //object for reminders (template to store into JSON file)
    const Reminders = new ReminderClass();
    MainContent.innerHTML = AddBHTML.HTML;
    let tdcount = 1;

    document.querySelector("#add-todo-btn").addEventListener("click", () => {
        tdcount++;
        const newTodoHTML = `
            <div class="todo-item mb-3">
                <label for="todo-${tdcount}" class="form-label">To-Do Item</label>
                <input type="text" class="form-control todo-input" id="todo-${tdcount}" placeholder="Enter a to-do item">
                <label for="todo-reminder-${tdcount}" class="form-label mt-2">Reminder Date</label>
                <input type="date" class="form-control todo-reminder-input" id="todo-reminder-${tdcount}">
            </div>`;
        document.querySelector(".todo-items").insertAdjacentHTML('beforeend', newTodoHTML);
    });

    document.querySelector("#reminder-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.querySelector("#name").value;
        const DOB = document.querySelector("#dateOfBirth").value;
        const RB = document.querySelector("#remindBefore").value;
        Reminders.assignAttr(name, DOB, RB);
        for (let i = 0; i < tdcount; ++i) {
            //Variable of TodoClass type (template to store into ReminderClass and then store into JSON file)
            const TDVar = new ToDoClass();
            TDVar.ToDoString = document.querySelector(`#todo-${i + 1}`).value;
            TDVar.ToDoDate = document.querySelector(`#todo-reminder-${i + 1}`).value;
            Reminders.ToDo.push(TDVar);
        }

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
        runHomePage();
    });

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
    
