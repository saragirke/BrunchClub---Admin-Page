<?php
//Sara Girke 2022 Webbutveckling II Mittuniversitetet
include("includes/header.php");

if (!isset($_SESSION["admin"])) {
    header("Location: index.php");
}

?>

<div class="navbar">
  <a href="admin.php">Menu</a>
  <a class="active" href="book.php">Bookings</a>
  <a href="admin.php?logout">Logout</a>
</div>



<div class= "content">
<h2> Bookings </h2>

    <p id="error"></p>
<!-- För utskrift av bokningar -->
    <table id="booktable">
    </table>

<br>
<br>


<!-- Formulär för ny bokning -->
            <h2>Create new booking</h2>
            <form>

<br>
    <label for="fname">First name:</label><br>
    <input type="text" id="fname" name="fname"><br><br>

    <label for="lname">Last name:</label><br>
    <input type="text" id="lname" name="lname"><br><br>

    <label for="email">E-mail</label><br>
    <input type="text" id="email" name="email"><br><br>

    <label for="date">Date:</label><br>
    <input type="date" id="date" name="date">
<br><br>

<label for="time">Time:</label><br>
<select id="time" name="time">
    <option value="10:00-11:30">10:00-11:30</option>
    <option value="10:30-12:30">10:30-12:30</option>
    <option value="11:00-13:00">11:00-13:00</option>
    <option value="11:30-13:30">11:30-13:30</option>
   
</select>
<br><br>
    <label for="amount">Amount</label><br>
    <select id="amount" name="amount">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
       
</select>

    <br><br>
    <button id="booksubmit">ADD</button>
</form>

</div>

    <?php
    //Logga ut 
    if (isset($_GET["logout"])) {
        session_destroy();
        header("Location: index.php");
    }
    ?>


<script src="js/book.js"></script>
    <?php
    include("includes/footer.php");
    ?>