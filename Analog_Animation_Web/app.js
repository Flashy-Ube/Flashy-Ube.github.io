function updateClock() {
    let now = new Date();
    let elements = document.getElementsByClassName("site-date");

    for (let el of elements) {
        el.innerText = now.toLocaleTimeString();
    }
}

setInterval(updateClock, 1000);
updateClock();



const stickers = document.querySelectorAll('.sticker');

stickers.forEach(sticker => {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    sticker.addEventListener('mousedown', (e) => {
        isDragging = true;
        sticker.style.cursor = "grabbing";

        // Calculate where inside the sticker you clicked
        offsetX = e.clientX - sticker.offsetLeft;
        offsetY = e.clientY - sticker.offsetTop;

        e.preventDefault(); // stops the red 🚫 symbol
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        sticker.style.left = (e.clientX - offsetX) + "px";
        sticker.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        sticker.style.cursor = "grab";
    });
});


// JavaScript Object
const people = [
  { name: "Miori", age: 19, city: "Weslaco" },
  { name: "Oslo", age: 25, city: "Harlingen" },
  { name: "Tehanu", age: 31, city: "Brownsville" }
];

// Fill table on data.html
const tableBody = document.querySelector("#data-table tbody");
if (tableBody) {
  people.forEach(p => {
    let row = `<tr><td>${p.name}</td><td>${p.age}</td><td>${p.city}</td></tr>`;
    tableBody.innerHTML += row;
  });
}

// Session Storage for contact form
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    sessionStorage.setItem("savedName", name);
    document.getElementById("saved-name").innerText = name;
  });

  // Load saved name on page load
  let saved = sessionStorage.getItem("savedName");
  if (saved) {
    document.getElementById("saved-name").innerText = saved;
  }
}
