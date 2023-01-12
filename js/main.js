"use strict";
//Sara Girke 2022 Webbutveckling II Mittuniversitetet
//Variabel för fetch-anropet
let url = "https://studenter.miun.se/~sagi1700/writeable/brunchprojekt/menu.php";

//Kör funktionen init när webbläsaren har laddat klart
window.onload = init;

function init() {
    //Läsa in meny
  getMenu();

}

//Hämtar element från formuläret på menysidan
const inputCat = document.getElementById("category");
const inputName = document.getElementById("name");
const inputDesc = document.getElementById("description");
const inputPrice = document.getElementById("price");
const submitBtn = document.getElementById("submit");

// Eventhanterare för submitknappen på menysidan
submitBtn.addEventListener("click", addFood);

//Variabel för utskrift av error-meddelanden
const errorEl = document.getElementById("error");

// Hämta menyn
function getMenu() {
    fetch(url)
    .then(response => {
        if(response.status !=200) {
            return
        }
        return response.json()
        .then(data => writeMenu(data))
        .catch(err => console.log(err))
    }) 

}



    //Funktion för utskrift av menyn
    function writeMenu(menus) {
    const errorEl = document.getElementById("error");

    //Variabel för utskrift i tabell
    const foodTable = document.getElementById("foodtable");

    //Skapar rubriker i tabellen
    foodTable.innerHTML = "<tr><th>Category</th><th>Name</th><th>Description</th><th>Price</th><tr>"

//Loop och utskrift till tabellen
    menus.forEach(menu => {

    foodTable.innerHTML += `
    <td id="category${menu.id}" contenteditable>${menu.category}</td>
    <td id="name${menu.id}" contenteditable>${menu.name}</td>
    <td id="description${menu.id}" contenteditable>${menu.description}</td>
    <td id="price${menu.id}" contenteditable>${menu.price} </td>
    
    <td><button data-id=${menu.id} class="delete">Delete</button> </td> 
    <td><button data-id=${menu.id} class="update">Update</button> </td>
  
    
    `});

    //Variabler för knappar
    let deleteBtn = document.getElementsByClassName("delete");
    let updateBtn = document.getElementsByClassName("update");

    // Evenetlistener för knapparna, anropar funktioner för delete och update
    for(let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", deleteFood);
        updateBtn[i].addEventListener("click", updateMenu);
    }


}




//Funktion för att radera i menyn
function deleteFood(event) {
// Sparar id i variabel med dataset
let id = event.target.dataset.id;

    fetch(url + "?id="+ id, {
        method: "DELETE"
    })
    .then(response => response.json())
    //Anropar GET för att ladda om sidan och direkt se att en rätt har tagits bort
    .then(data => getMenu())
    .catch(err => console.log(err))
    errorEl.innerHTML= "<b>Food deleted!</b>";
}




function updateMenu(event) {
// Sparar id i variabel med dataset
let id = event.target.dataset.id;

//Hämtar element från utskriften av menyn + dess id
let foodcategory= document.getElementById("category" + id).innerHTML;
let foodname= document.getElementById("name" + id).innerHTML;
let fooddescription= document.getElementById("description" + id).innerHTML;
let foodprice= document.getElementById("price" + id).innerHTML;

// JSON-sträng, skapar ett JS-pbjekt som konverteras till JSON
let jsonStr = JSON.stringify({
category : foodcategory,
name : foodname,
description : fooddescription,
price : foodprice,
id: id
});

fetch(url, {
    method: "PUT",
    //Headers är ett objekt som anger inställningar som ska skickas med
    headers: {
"content-type": "application/json"
    },
    body: jsonStr
})
    .then(response => response.json())
    //Anropar GET för att ladda om sidan och direkt se att en rätt har tagits bort
     .then(data => getMenu())
    .catch(err => console.log(err))
    errorEl.innerHTML= "<b>Course updated!</b>";
}



// Funktion för att lägga till i menyn
function addFood(event) {
    //Metod som hindrar att ladda om sidan
    event.preventDefault();
    
    //Skapar variabler av det som matas in i formuläret
    let foodCat = inputCat.value;
    let foodName = inputName.value;
    let foodDesc = inputDesc.value;
    let foodPrice = inputPrice.value;
    const errorForm = document.getElementById("errorform");
    
    // JSON-sträng, skapar ett JS-pbjekt som konverteras till JSON
    let jsonStr = JSON.stringify({
        category : foodCat,
        name : foodName,
        description: foodDesc,
        price: foodPrice
    
    });
    if(foodCat == "" || foodName == "" || foodDesc == "" || foodPrice == "" ) { //Kontroll av fälten
        errorForm.innerHTML= "<p style=color=red;> All fields must be filled! </p>"; 
    }
    else{
       
    fetch(url, {
        method: "POST",
        //Headers är ett objekt som anger inställningar oms ska skickas med
        headers: {
    "content-type": "application/json"
        },
        body: jsonStr
    })
    
    .then(response => response.json())
    .then(data => init())
    //Rensa formuläret efter skick
    .then(data => emptyForm())
    .catch(err=> console.log(err))
    errorForm.innerHTML= "<p style=color=red;>Added!</p>";
    }
    }



    
    
    //Rensar formuläret efter tillagd rätt
    function emptyForm() {
    inputName.value ="";
    inputDesc.value ="";
    inputPrice.value ="";
    }

    function refreshPage(){
        window.location.reload();
    } 