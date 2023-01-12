"use strict";
//Sara Girke 2022 Webbutveckling II Mittuniversitetet

//Variabel för fetch-anropet
let url = "https://studenter.miun.se/~sagi1700/writeable/brunchprojekt/booking.php";

//Kör funktionen init när webbläsaren har laddat klart
window.onload = init;

function init() {
    //Läsa in bokningar
  getBooking();

}


//Hämtar element för fälten i formulär för att boka bord
const inputFname = document.getElementById("fname");
const inputLname = document.getElementById("lname");
const inputEmail= document.getElementById("email");
const inputDate = document.getElementById("date");
const inputTime = document.getElementById("time");
const inputAmount = document.getElementById("amount");
const bookBtn = document.getElementById("booksubmit");

const errorEl = document.getElementById("error");

// Eventhanterare för submitknappen för bokning
bookBtn.addEventListener("click", addBooking);



// Hämta bokningar
function getBooking() {
    fetch(url)
    .then(response => {
        if(response.status !=200) {
            return
        }
        return response.json()
        .then(data => writeBooking(data))
        .catch(err => console.log(err))
    }) 

}



//Skriver ut bokningar
function writeBooking(bookings) {

//Variabel för utskrift i tabell
const bookTable = document.getElementById("booktable");
//Skapar rubriker i tabellen
bookTable.innerHTML = "<tr><th>First name</th><th>Last name</th><th>E-mail</th><th>Date</th><th>Time</th><th>Amount</th><tr>"

//Loop och utskrift till tabellen samt knappar
    bookings.forEach(booking => {

    bookTable.innerHTML += `
    <td id="fname${booking.id}" contenteditable>${booking.fname}</td>
    <td id="lname${booking.id}" contenteditable>${booking.lname}</td>
    <td id="email${booking.id}" contenteditable>${booking.email}</td>
    <td id="date${booking.id}" contenteditable>${booking.date}</td>
    <td id="time${booking.id}" contenteditable>${booking.time}</td>
    <td id="amount${booking.id}" contenteditable>${booking.amount}</td>

    
    <td><p><button data-id=${booking.id} class="delete">Delete</button> <br><br>
    <button data-id=${booking.id} class="update">Update</button> </p></td>
    
    `});

    //Variabler för knappar
    let deleteBtn = document.getElementsByClassName("delete");
    let updateBtn = document.getElementsByClassName("update");

    // Evenetlistener för knapparna, anropar funktioner för delete och update
    for(let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", deleteBooking);
        updateBtn[i].addEventListener("click", updateBooking);
    }

}




//Funktion för att radera bokning
function deleteBooking(event) {
// Sparar id i variabel med dataset
let id = event.target.dataset.id;

    fetch(url + "?id="+ id, {
        method: "DELETE"
    })
    .then(response => response.json())
    //Anropar GET för att ladda om sidan och direkt se att en bokning har tagits bort
    .then(data => getBooking())
    .then(data => refreshPage())
    .then(data => init())
    .catch(err => console.log(err))
}




function updateBooking(event) {
// Sparar id i variabel med dataset
let id = event.target.dataset.id;

//Hämtar element från utskriften av menyn + dess id
let bookFname= document.getElementById("fname" + id).innerHTML;
let bookLname= document.getElementById("lname" + id).innerHTML;
let bookEmail= document.getElementById("email" + id).innerHTML;
let bookDate= document.getElementById("date" + id).innerHTML;
let bookTime= document.getElementById("time" + id).innerHTML;
let bookAmount=document.getElementById("amount" + id).innerHTML;

// JSON-sträng, skapar ett JS-pbjekt som konverteras till JSON
let jsonStr = JSON.stringify({
fname : bookFname,
lname : bookLname,
email : bookEmail,
date : bookDate,
time : bookTime,
amount: bookAmount,
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
    .then(data => getBooking())
    .then(data => init())
    .catch(err => console.log(err))
    errorEl.innerHTML= "<b>Updated!</b>";
}






    //Rensar formuläret efter tillagd bokning
    function emptyForm() {
    inputName.value ="";
    inputDesc.value ="";
    inputPrice.value ="";
    }



    function refreshPage(){
        window.location.reload();
    } 



    // Skapa ny bookning
function addBooking(event) {
    //Metod som hindrar att ladda om sidan
    event.preventDefault();
    
    //Variabler av förumläret inmatade värden
    let bookFname = inputFname.value;
    let bookLname = inputLname.value;
    let bookEmail = inputEmail.value;
    let bookDate = inputDate.value;
    let bookTime = inputTime.value;
    let bookAmount = inputAmount.value;
    const errorEl = document.getElementById("error");


    
    // JSON-sträng, skapar ett JS-pbjekt som konverteras till JSON
    let jsonStr = JSON.stringify({
        fname :  bookFname,
        lname :  bookLname,
        email:   bookEmail,
        date :   bookDate,
        time :   bookTime,
        amount : bookAmount
    
    });
    //Kontrolelrar att samtliga fält är ifyllda
    if(bookFname == "" || bookLname == "" || bookEmail == "" || bookDate == "" || bookTime == "" || bookAmount == "" ) {
        errorEl.innerHTML= "<p style=color=red;> Fill in all information </p>";
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
    .then(data => emptyForm())
    .catch(err=> console.log(err))
    errorEl.innerHTML= "Booking created!";
    }
    }