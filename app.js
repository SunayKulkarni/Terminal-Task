#!/usr/bin/env node

import fs from "fs";

const jsonPath = 'data.json';


//create json file if not present.
if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify([]));
}


//reading the json file.
const data = fs.readFileSync(jsonPath,'utf-8');

const tasks = JSON.parse(data);




const args = process.argv.slice(2);

const command = args[0];
const desc = args[1];





//add functionality
if(command==='add'){

    if(!desc){
        console.log("please provide the description");
        process.exit(1);
    }

    const unique_id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1; // takes the highest id 

    

    const newData = {
        id: unique_id,
        description:desc,
        status: 'todo'
    }

    
     tasks.push(newData);

   fs.writeFileSync(jsonPath,JSON.stringify(tasks));

   console.log("\x1b[32mTask added successfully!\x1b[0m");
}

else if(command==='list'){
    const stat = args[1];

    
        const filteredTasks = stat ?tasks.filter(task=> task.status === stat):tasks;
         filteredTasks.forEach(task => {
             console.log(
              `  (${task.id})   |   Description: ${task.description}  |   Status: ${task.status}  `
            );
    });
}

// status feature
else if(command==='mark-done'){
    const loc = Number(args[1]);
    console.log(loc);
    const task = tasks.find(task => task.id === loc);

    if(!task){
        console.log("Task not found");
        process.exit(1);
    }
     task.status='done';
     fs.writeFileSync(jsonPath,JSON.stringify(tasks))
    
    
     console.log("\x1b[32mStatus changed successfully!\x1b[0m");

}

else if(command==='mark-in-progress'){
    const loc = Number(args[1]);
    console.log(loc);
    const task = tasks.find(task => task.id === loc);

    if(!task){
        console.log("Task not found");
        process.exit(1);
    }
     task.status='in-progress';
     fs.writeFileSync(jsonPath,JSON.stringify(tasks))
    
    
     console.log("\x1b[32mStatus changed successfully!\x1b[0m");

}

 //delete functionality
 else if(command==='delete'){
    const removeId = Number(args[1]);

    const filter = removeId?tasks.filter(task=>task.id!==removeId): process.exit(1)  ;

    fs.writeFileSync(jsonPath,JSON.stringify(filter));

    console.log("Task removed succesfully");

 }

 //

 else if(command==='tt-help'){
        console.log(`
    * Commands:
    -----------------------------------------------
    add "description"        → Add a new task with status "todo"
    list                     → List all tasks
    list [status]            → List tasks by status (todo, done, in-progress)
    mark-in-progress [id]    → Mark a task as "in-progress"
    mark-done [id]           → Mark a task as "done"
    delete [id]              → Delete a task by ID
    help                     → Show this help menu

    * Example Usage:
    -----------------------------------------------
    terminal-task add "Buy groceries"
    terminal-task list
    terminal-task list done
    terminal-task mark-in-progress 2
    terminal-task mark-done 3
    terminal-task delete 4
    terminal-task help
       ` );
 }

 if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify([]));
}



