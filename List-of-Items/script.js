let favorites = [
  "Bach",
  "Palestrina",
  "Hildegard von Bingen",
  "Orchestral",
  "Renaissance",
  "Medieval",
  "Gregorian Chant",
  "Polyphony",
  "Monophony",
  "Choral Music"
];


let listDiv = document.getElementById("list");

for (let i = 0; i < favorites.length; i++) {
  let item = document.createElement("div");
  item.textContent = favorites[i];
  listDiv.appendChild(item);
}