const List = ['help', 'quit', 'exit', 'hello', 'list', 'add', 'remove', 'edit', 'check', 'uncheck'];
class Task {
  constructor(task) {
    this.taskName = task;
    this.checked = false;
  }
}

const fs = require('fs');
const path = 'database.json';
let proc = process.argv;
let path1 = proc[2];

if (proc.length > 2) {
  fs.open('./' + path1, 'a',
    (err) => { if (err) console.log("error"); }
  );
};

function startApp(name) {
  try {
    var data = fs.readFileSync((path1) ? path1 : path);
    try {
      if (data == '') throw 'Empty'
    }
    catch { data = '[]' }
    task = JSON.parse(data);
  } catch (e) {
    console.log('error: make sure the file existed', e);
    console.log('----------------------------');
    process.exit();
  }
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log('----------------------------');
}

function onDataReceived(text) {
  var t = text.trim();
  if (t === 'quit' || t === 'exit') {
    quit();
  }
  else if (text.startsWith("hello")) {
    hello(t);
  }
  else if (text.startsWith("add")) {
    add(t);
  }
  else if (text.startsWith("remove")) {
    remove(t);
  }
  else if (text.startsWith("edit")) {
    edit(t);
  }
  else if (text.startsWith("check")) {
    check(t);
  }
  else if (text.startsWith("uncheck")) {
    uncheck(t);
  }
  else if (t === 'help') {
    help();
  }
  else if (t === 'list') {
    list();
  }
  else {
    unknownCommand(text);
  }
}

function list() {
  task.forEach((obj, index) =>
    obj.checked ? console.log(`[✓] ${index + 1}- ${obj.taskName}`) : console.log(`[ ] ${index + 1}- ${obj.taskName}`));
  console.log('----------------------------');
}

function add(arg) {
  if (arg == "add") {
    console.log('"error" no task to add!')
  } else {
    arg = arg.replace("add ", "");
    task.push(new Task(arg));
    console.log(arg + ' has been added to list successfully.')
  }
  console.log('----------------------------');
}

function remove(arg) {
  if (arg == "remove") {
    task.pop();
    console.log('task ' + (task.length + 1) + ' has been removed from list successfully.')
  }
  else {
    let arr = arg.split(" ");
    let index = parseInt(arr[1]);
    if (isNaN(index)) {
      console.log("please enter a number to remove task");
    }
    else if (index < 1 || index > task.length) {
      console.log('this task number is not exist!');
    }
    else {
      task.splice(index - 1, 1);
      console.log('task ' + index + ' has been removed from list successfully.')
    }
  }
  console.log('----------------------------');
}

function edit(arg) {
  if (arg == "edit") {
    console.log('"error" no task to edit!')
  } else {
    let arr = arg.split(" ")
    let index = parseInt(arr[1]);
    if (isNaN(index)) {
      let str = arg.replace("edit ", "");
      task[task.length - 1].taskName = str;
      console.log('the task ' + task.length + ' change to \'' + str + '\'');
    } else {
      let str = String(arr.splice(2, arr.length - 2)).replace(/,/g, " ");
      task[index - 1].taskName = str;
      console.log('the task ' + arr[1] + ' change to \'' + str + '\'');
    }
  }
  console.log('----------------------------');
}

function check(arg) {
  if (arg == "check") {
    console.log('error: no task to be checked')
  } else {
    let index = parseInt(arg.replace("check ", ""));
    task[index - 1].checked = true;
    console.log('checked successfully');
  }
  console.log('----------------------------');
}

function uncheck(arg) {
  if (arg == "uncheck") {
    console.log('error: no task to be unchecked')
  } else {
    let index = parseInt(arg.replace("uncheck ", ""));
    task[index - 1].checked = false;
    console.log('unchecked successfully');
  }
  console.log('----------------------------');
}

function hello(arg) {
  arg == "hello" ? console.log("hello!") : console.log(arg + "!");
  console.log('----------------------------');
}

function help() {
  List.forEach(element => console.log("-", element));
  console.log('----------------------------');
}

function unknownCommand(c) {
  console.log('unknown command: \'' + c.trim() + '\'')
  console.log('----------------------------');
}

function quit() {
  try {
    let data = JSON.stringify(task);
    fs.writeFileSync((path1) ? path1 : path, data);
  } catch (e) {
    console.log(e);
    console.log('error: make sure the file existed')
    console.log('----------------------------');
  }
  console.log('data saved successfully')
  console.log('Quitting now, goodbye!')
  console.log('----------------------------');
  process.exit();
}

startApp('Mostafa Kassem')