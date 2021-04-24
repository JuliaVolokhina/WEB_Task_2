//let id = -1;
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function(e) {

  let newTitle = document.getElementById("note-title");
  let newTxt = document.getElementById("note-text");
  
  if (newTitle.value === "" & newTxt.value === "") {
      return alert("Заполните название или содержание заметки!")
  }

  if (newTitle.value.length > 30) {
    return alert("Слишком длинный заголовок!")
  }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    "title": newTitle.value,
    "text": newTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  newTxt.value = "";
  newTitle.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
        <div class="note">
            <h3 class="note-title"> ${element.title} </h3>
            <p class="note-text"> ${element.text}</p>
            <button id="${element.title}"onclick="deleteNote(this.id)" class="del-btn"></button>
            <button id="${element.title}"onclick="openEditWindow(this.id)" class="edit-btn">Редактировать</button>
        </div>
            `;
  });
  //<button id="${element.title}"onclick="editNote(this.id)" class="edit-btn">Редактировать</button>

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } 
  else {
    notesElm.innerHTML = ``;
  }
}

function deleteNote(index) {
    let confirmDel = confirm("Удалить выбранную заметку?");
    if (confirmDel === true) {
        let notes = localStorage.getItem("notes");
        if (notes === null) {
            notesObj = [];
        } 
        else {
            notesObj = JSON.parse(notes);
        }

        const index = notesObj.findIndex(item => item.title === newTitle);

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }  
}

function editNote() {
    let notes = localStorage.getItem("notes");
    let newTitle = document.getElementById("edit-note-title");
    let newTxt = document.getElementById("edit-note-text");

    if (newTitle.value === "" && newTxt.value === "") {
      return alert("Заполните название или содержание заметки!")
    }

    if (newTitle.value.length > 30) {
      return alert("Слишком длинный заголовок!")
    }

    if (notes === null) {
      notesObj = [];
    } 
    else {
      notesObj = JSON.parse(notes);
    }

    let oldTitle = document.getElementById('myModalEdit').dataset.index;
    let indexItem = notesObj.findIndex(item => item.title === oldTitle);

    notesObj[indexItem].title = newTitle.value
    notesObj[indexItem].text = newTxt.value

    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

var modal = document.getElementById('myModal');
var btn = document.getElementById("plusBttn");

btn.onclick = function() {
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";        
    }
}

function openEditWindow(index) {
  document.getElementById('edit-note-title').value = index;
    document.getElementById('edit-note-text').value = index;
    var modalEdit = document.getElementById('myModalEdit');
    modalEdit.dataset.index = index;
    modalEdit.style.display = "block";
}

function closeEditWindow() {
  let modalEdit = document.getElementById('myModalEdit');
  modalEdit.style.display = "none";
}

/*window.onclick = function(event) {
    if (event.target == modalEdit) {
      modalEdit.style.display = "none";
    }
}*/

showNotes();