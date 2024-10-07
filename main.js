let selectedNotes;

document.addEventListener("DOMContentLoaded", loadStickyNotes);

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createStickyNote(content = "", bgColor = getRandomColor(), textColor = "#333") {
    const container = document.getElementById("sticky-notes-container");
    const note = document.createElement("div");
    note.classList.add("sticky-note");  // Add a class for your note

    note.style.backgroundColor = bgColor;

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Write your note here....";
    textarea.value = content;
    textarea.style.color = textColor;
    textarea.addEventListener("input", adjustHeight);
    textarea.addEventListener("input", saveStickyNotes);
    note.appendChild(textarea);

    const deleteButton = document.createElement("div");
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", deleteNote);
    note.appendChild(deleteButton);

    container.appendChild(note);

    note.addEventListener("click", function () {
        if (selectedNotes) {
            selectedNotes.classList.remove("selected");
        }
        note.classList.add("selected");
        selectedNotes = note;
    });

    saveStickyNotes();
}

function deleteNote() {
    if (selectedNotes === event.target.parentNode) {
        selectedNotes = null;
    }

    event.target.parentNode.remove();
    saveStickyNotes();
}

document.getElementById("bg-color").addEventListener("input", function () {
    if (selectedNotes) {
        selectedNotes.style.backgroundColor = this.value;
        saveStickyNotes();
    }
});

document.getElementById("text-color").addEventListener("input", function () {
    if (selectedNotes) {
        selectedNotes.querySelector("textarea").style.color = this.value;
        saveStickyNotes();
    }
});

function adjustHeight(event) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";  // Adjust height based on content
}

function saveStickyNotes() {
    const container = document.getElementById("sticky-notes-container");
    const notes = Array.from(container.children).map((note) => {
        const textarea = note.querySelector("textarea");
        return {
            content: textarea.value,
            bgColor: note.style.backgroundColor,
            textColor: textarea.style.color,
        };
    });
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

function loadStickyNotes() {
    const notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
    notes.forEach((note) => {
        createStickyNote(note.content, note.bgColor, note.textColor);
    });
}
