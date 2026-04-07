// Yatai (Ramen Stall) Constructor
function Yatai(name, location, specialty, price, openHours){

this.name = name;
this.location = location;
this.specialty = specialty;
this.price = price;
this.openHours = openHours;

// Display method
this.display = function(){
return `
<div class="stall">
<h2>${this.name}</h2>
<p><strong>Location:</strong> ${this.location}</p>
<p><strong>Specialty:</strong> ${this.specialty}</p>
<p><strong>Price:</strong> $${this.price}</p>
<p><strong>Hours:</strong> ${this.openHours}</p>
</div>
`;
};

}

// Array of 5 Yatai objects
const yataiStalls = [

new Yatai("Midnight Tonkotsu", "Fukuoka Alley", "Tonkotsu Ramen", 9, "6PM - 2AM"),
new Yatai("Dragon Bowl", "Tokyo Street", "Spicy Miso Ramen", 11, "5PM - 12AM"),
new Yatai("Kyoto Noodles", "Gion District", "Shoyu Ramen", 10, "4PM - 11PM"),
new Yatai("Osaka Bite", "Dotonbori", "Takoyaki Ramen", 12, "6PM - 1AM"),
new Yatai("Sapporo Steam", "Snow Market", "Miso Butter Ramen", 13, "3PM - 10PM")

];

// Display all stalls
function showYatai(){

let output = "";

yataiStalls.forEach(stall => {
output += stall.display();
});

document.getElementById("output").innerHTML = output;

}

// Run on page load
window.onload = showYatai;