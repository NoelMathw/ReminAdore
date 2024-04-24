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

//HTML object for All Birthdays page
const AllBHTML = {
    FirstHTML: `<div class="container">
                    <div class="row d-flex flex-row">
                    </div>
                </div>`,

    CardHTML:`<div class="col-md-6 col-lg-4"> <div class="card newcard">
                   <div class="card-header">
                        <h3 class="personname"></h3>
                   </div>
                   <div class="card-body">
                        <p class="personage"><strong>Age:</strong></p>
                        <p class="personDOB"><strong>Date of Birth:</strong></p>
                        <p class="personRMB"><strong>Remind me before:</strong></p>

                        <h4>To-Do List</h4>
                            <ul class="list-group">
                            </ul>
                   </div>
              </div>
              </div>`,
}

//HTML object for Home page
const HomeHTML = {
    HTML: `<div class="container">
            <section class="section">
                <h2 class="section-heading">Birthdays Today</h2>
                <div class="row BTSection">
                </div>
            </section>

            <section class="section">
                <h2 class="section-heading">Tasks due Today</h2>
                    <ul class="list-group TTSection">
                    </ul>
            </section>

            <section class="section">
                <h2 class="section-heading">Upcoming Birthdays (< month)</h2>
                    <div class="row UBSection">
                    </div>
            </section>

            <section class="section">
                <h2 class="section-heading">Upcoming Tasks (< week)</h2>
                    <ul class="list-group UTSection">
                    </ul>
            </section>
           </div>`,

    CardHTML: `<div class="col-md-4">
                    <div class="card newcard">
                        <div class="card-body">
                            <h5 class="card-title"></h5>
                            <p class="card-text">Age: </p>
                        </div>
                    </div>
               </div>`,

    TaskHTML: `<li class="list-group-item">Task 1</li>
               <li class="list-group-item">Task 2</li>`

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
    MainContent.innerHTML = HomeHTML.HTML;
    const BirthdayToday = document.querySelector(".BTSection");
    const TasksToday = document.querySelector(".TTSection");
    const UpBirthday = document.querySelector(".UBSection");
    const UpTasks = document.querySelector(".UTSection");
    let BT = 0;
    let UB = 0;
    let TT = 0;
    let UT = 0;
    fetch('./JSON/Reminders.JSON')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(Reminders => {
            Reminders.forEach((reminder, index) => {
                if (index < Reminders.length) {
                    let DOBString = reminder.DOB.split("-");
                    let currentDate = new Date;
                    if ((Number(DOBString[1]) === (currentDate.getMonth() + 1)) && Number(DOBString[2]) === currentDate.getDate()) {
                        BT = 1;
                        BirthdayToday.innerHTML += HomeHTML.CardHTML;
                        //Update the newly added card with information
                        const addedCards = BirthdayToday.querySelectorAll('.newcard');
                        const currentCard = addedCards[addedCards.length - 1];
                        currentCard.querySelector(".card-title").innerText = reminder.name;
                        let age;
                        if ((currentDate.getMonth() + 1) < DOBString[1]) { age = currentDate.getFullYear() - DOBString[0] - 1; }
                        else if ((currentDate.getMonth() + 1) === DOBString[1]) {
                            if ((currentDate.getDate()) < DOBString[2]) {
                                age = currentDate.getFullYear() - DOBString[0] - 1;
                            }
                            else {
                                age = currentDate.getFullYear() - DOBString[0];
                            }
                        }
                        else {
                            age = currentDate.getFullYear() - DOBString[0];
                        }
                        currentCard.querySelector(".card-text").textContent = `Age: ${age}`;
                    }
                    if ((Number(DOBString[1]) === (currentDate.getMonth() + 1))) {
                        UB = 1;
                        UpBirthday.innerHTML += HomeHTML.CardHTML;
                        //Update the newly added card with information
                        const addedCards = UpBirthday.querySelectorAll('.newcard');
                        const currentCard = addedCards[addedCards.length - 1];
                        currentCard.querySelector(".card-title").innerText = reminder.name;
                        let age;
                        if ((currentDate.getMonth() + 1) < Number(DOBString[1])) { age = currentDate.getFullYear() - DOBString[0] - 1; }
                        else if ((currentDate.getMonth() + 1) === Number(DOBString[1])) {
                            if ((currentDate.getDate()) < Number(DOBString[2])) {
                                age = currentDate.getFullYear() - DOBString[0] - 1;
                            }
                            else {
                                age = currentDate.getFullYear() - DOBString[0];
                            }
                        }
                        else {
                            age = currentDate.getFullYear() - DOBString[0];
                        }
                        currentCard.querySelector(".card-text").textContent = `Age: ${age}`;
                    }
                    for (const todo of reminder.ToDo) {
                        let ToDODate = todo.ToDoDate.split("-");
                        const todoItem = document.createElement('li');
                        todoItem.className = 'list-group-item';
                        if ((Number(ToDODate[1]) === (currentDate.getMonth() + 1)) && (Number(ToDODate[0]) === currentDate.getFullYear())) {
                            if ((Number(ToDODate[2]) - currentDate.getDate()) < 7) {
                                UT = 1;
                                todoItem.textContent = `${todo.ToDoString} (For ${reminder.name}'s birthday)`;
                                UpTasks.appendChild(todoItem);
                            }
                        }
                        if ((Number(ToDODate[1]) === (currentDate.getMonth() + 1)) && (Number(ToDODate[2]) === currentDate.getDate()) && (Number(ToDODate[0]) === currentDate.getFullYear())) {
                            TT = 1;
                            todoItem.textContent = `${todo.ToDoString} (For ${reminder.name}'s birthday)`;
                            TasksToday.appendChild(todoItem);
                        }
                    }
                }
            });
            if (BT === 0) {
                BirthdayToday.innerHTML = `<p class="text-center default-message">Don't worry. There's no birthdays today, we'll remind you if there is one</p>`;
            }
            if (TT === 0) {
                TasksToday.innerHTML = `<p class="text-center default-message">Don't worry. There's no tasks due today, we'll remind you if there is one</p>`;
            }
            if (UB === 0) {
                UpBirthday.innerHTML = `<p class="text-center default-message">There's no birthdays anytime soon</p>`;
            }
            if (UT === 0) {
                UpBirthday.innerHTML = `<p class="text-center default-message">No upcoming tasks for you. Relax and have fun</p>`;
            }
        })
        .catch(error => {
            console.error('Failed to load JSON:', error);
            MainContent.innerHTML = '<p>Error loading page.</p>';
        });
} 

function runAllBPage() {
    AllB.classList.add('active');
    Home.classList.remove('active');
    AddB.classList.remove('active');
    MainContent.innerHTML = AllBHTML.FirstHTML;
    const CardRow = document.querySelector(".row");
    fetch('./JSON/Reminders.JSON')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(Reminders => {
            Reminders.forEach((reminder, index) => {
                if (index < Reminders.length) {  
                    const cardHTML = AllBHTML.CardHTML;
                    CardRow.innerHTML += cardHTML;
                    // Update the newly added card with reminder information
                    const addedCards = CardRow.querySelectorAll('.newcard');
                    const currentCard = addedCards[addedCards.length - 1];
                    currentCard.querySelector(".personname").innerText = currentCard.querySelector(".personname").textContent + " " + reminder.name;
                    let DOBString = reminder.DOB.split("-");
                    let currentDate = new Date;
                    let age;
                    if ((currentDate.getMonth() + 1) < Number(DOBString[1])) { age = currentDate.getFullYear() - DOBString[0] - 1; }
                    else if ((currentDate.getMonth() + 1) === Number(DOBString[1])) {
                        if ((currentDate.getDate()) < Number(DOBString[2])) {
                            age = currentDate.getFullYear() - DOBString[0] - 1;
                        }
                        else {
                            age = currentDate.getFullYear() - DOBString[0];
                        }
                    }
                    else {
                        age = currentDate.getFullYear() - DOBString[0];
                    }
                    currentCard.querySelector(".personage").innerText = currentCard.querySelector(".personage").textContent + " " + age; 
                    currentCard.querySelector(".personDOB").innerText = currentCard.querySelector(".personDOB").textContent + " " + reminder.DOB;
                    currentCard.querySelector(".personRMB").innerText = currentCard.querySelector(".personRMB").textContent + " " + reminder.RMB + " days";
                    const TD = document.querySelectorAll(".list-group");
                    const currentTD = TD[TD.length - 1];
                    for (const todo of reminder.ToDo) {
                        const todoItem = document.createElement('li');
                        todoItem.className = 'list-group-item';
                        if (todo.ToDoString === "") { continue; }
                        else if (todo.ToDoDate === "") {
                            todoItem.textContent = `${todo.ToDoString}`;
                            currentTD.appendChild(todoItem);
                            continue;
                        }
                        else {
                            todoItem.textContent = `${todo.ToDoString} (Due on: ${todo.ToDoDate})`;
                            currentTD.appendChild(todoItem);
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Failed to load JSON:', error);
            MainContent.innerHTML = '<p>Error loading page.</p>';
        });
}

function runAddBPage() {
    AddB.classList.add('active');
    AllB.classList.remove('active');
    Home.classList.remove('active');
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


//Requesting notification permission from user
Notification.requestPermission((result) => {
    console.log(result);
});

//Notifying user of birthdays or tasks
function notify() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {
        fetch('./JSON/Reminders.JSON')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(Reminders => {
                Reminders.forEach((reminder, index) => {
                    if (index < Reminders.length) {
                        let DOBString = reminder.DOB.split("-");
                        let currentDate = new Date;
                        if ((Number(DOBString[1]) === (currentDate.getMonth() + 1)) && Number(DOBString[2]) === currentDate.getDate()) {
                            const text = `Hey there. It's ${reminder.name}'s birthday today. Don't forget to wish him`;
                            const img = `./img/ReminAdore Logo.png`;
                            const notification = new Notification("Birthday reminder", { body: text, icon: img });
                        }
                        if ((Number(DOBString[1]) === (currentDate.getMonth() + 1)) && (Number(DOBString[2]) - currentDate.getDate()) === Number(reminder.RMB)) {
                            const text = `Hey there. It's ${reminder.name}'s birthday within ${reminder.RMB} days. You told us to remind you today`;
                            const img = `./img/ReminAdore Logo.png`;
                            const notification = new Notification("Birthday reminder", { body: text, icon: img });
                        }
                        for (const todo of reminder.ToDo) {
                            let ToDODate = todo.ToDoDate.split("-");
                            if ((Number(ToDODate[1]) === (currentDate.getMonth() + 1)) && (Number(ToDODate[2]) === currentDate.getDate()) && (Number(ToDODate[0]) === currentDate.getFullYear())) {
                                const text = `Hey, you have a task due today
Task: ${todo.ToDoString} (For ${reminder.name}'s birthday)`;
                                const img = `./img/ReminAdore Logo.png`;
                                const notification = new Notification("Task reminder", { body: text, icon: img });
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Failed to load JSON:', error);
                MainContent.innerHTML = '<p>Error loading page.</p>';
            });
    }
}



const now = new Date();
const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); // 12 AM 
const millisecondsUntilTarget = targetTime.getTime() - now.getTime();

// Execute the notification function at 12 AM
setTimeout(notify, millisecondsUntilTarget);