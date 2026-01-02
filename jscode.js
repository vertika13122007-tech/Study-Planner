const addbut = document.getElementById("button");
const input = document.getElementById("add");
const taskList = document.querySelector(".task_list");
let count_task = 0;
let complete_task = 0;
const progress_bar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress_text");





function update_progress(){
    let progress_per= count_task === 0 ? 0 : (complete_task/count_task)*100;
    progressText.textContent = "Progress : " + Math.round(progress_per) +"%";
    progress_bar.style.width = progress_per + "%";
}





/* Taking value from the task bar */

addbut.addEventListener( "click", () => {
    const tasktext = input.value.trim();
    if( tasktext === "")
        return;
    else if(tasktext !== ""){
        count_task++;
    }


    /* Creating Task Card Items*/

    const card = document.createElement("div");
    card.className = "task_card";

    const dot = document.createElement("span");
    dot.className = "category_dot";

    dot.addEventListener( "click", () => {
        let choice = prompt("Enter the category of the task : ");
        if (choice === "assignments" || choice === "Assignments" ) {
            dot.className = "category_dot assignments";
        }
        else if (choice === "exam" || choice === "Exam") {
            dot.className = "category_dot exam";
        } 
        else if (choice === "personal" || choice === "Personal") {
            dot.className = "category_dot personal";
        } 
        else {
            dot.className = "category_dot"; // reset
        }
    });

    const text = document.createElement("p");
    text.className = "task_text";
    text.textContent = tasktext;

    const actions = document.createElement("div"); 
    actions.className = "task_actions";





    /* Functionality of action buttons */

    const completebut = document.createElement("button");
    completebut.textContent = "✔"
    completebut.addEventListener( "click" , () => {
        if (!text.classList.contains("completed")) {          //This is one fix of the whole button function  
            text.classList.add("completed");                  //because when we are just counting the numbers
            text.style.textDecoration = "line-through";       //the more number of times we click the percentage just increases
            text.style.color = "#888888";
            complete_task++;
        }
        else {
            text.classList.remove("completed");
            text.style.textDecoration = "none";
            text.style.color = "#000000" ;
            complete_task--;
        }
        update_progress();

    });


    const editbtu = document.createElement("button");
    editbtu.textContent = "✏️";
    editbtu.addEventListener( "click", () => {
        const newTask = prompt("Edit task :", text.textContent);
        if (newTask)
            text.textContent = newTask;
    });


    const deletebtu = document.createElement("button");
    deletebtu.textContent = "❌" ;
    deletebtu.addEventListener( "click" , () =>{
        card.remove();
        count_task--;
        update_progress();
    });





    /* Appending everthing*/

    actions.appendChild(completebut);
    actions.appendChild(editbtu);
    actions.appendChild(deletebtu);

    card.appendChild(dot);
    card.appendChild(text);
    card.appendChild(actions);

    taskList.appendChild(card);

    input.value ="";
    update_progress();
});