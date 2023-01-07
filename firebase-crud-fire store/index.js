import { saveTask,getTasks,onGetTasks,deleteTask,getTask,updateTask } from "./firebase.js";

const taskform = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {
  onGetTasks ((querySnapshot) =>{
    taskContainer.innerHTML = '';
    querySnapshot.forEach((doc) =>{
      const task = doc.data();
  
      taskContainer.innerHTML += `   
          <div class=card card-body mt-2 border-primary>
            <h3 class="h5">${task.title}</h3>
            <p>${task.description}</p>
            <div>
            <button class="btn btn-primary btn-delete" data-id="${doc.id}">Delete</button>
            <button class="btn btn-secundary btn-edit" data-id="${doc.id}">Edit</button>
            </div>
          </div>
      `;
      
    });

    const btnsDelete = taskContainer.querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn => {
      btn.addEventListener('click', ({target: {dataset}}) => {
        deleteTask(dataset.id);
      })
    })

    const btnsEdit = taskContainer.querySelectorAll('.btn-edit');
    btnsEdit.forEach(btn => {
      btn.addEventListener('click', async e => {
        const doc = await getTask(e.target.dataset.id)
        const task = doc.data();

        taskform['task-title'].value = task.title;
        taskform['task-description'].value = task.description;

        editStatus = true;
        id = doc.id;
        taskform['btn-task-save'].innerText = 'Update'
      })
      
    })
  });
});

taskform.addEventListener('submit', (e) =>{
  e.preventDefault();

  const title = taskform['task-title'];
  const description = taskform['task-description'];
  if(!editStatus){
    saveTask(title.value,description.value);
    
  }else{
    updateTask(id,{
      title: title.value,
      description: description.value
    });

    editStatus = false;
  }

  taskform.reset();
})