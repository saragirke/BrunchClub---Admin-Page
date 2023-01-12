<?php
//Sara Girke 2022 Webbutveckling II Mittuniversitetet
include("includes/header.php");
if (!isset($_SESSION["admin"])) {
    header("Location: index.php");
}
?>

<div class="navbar">

  <a class="active" href="admin.php">Menu</a>
  <a href="book.php">Bookings</a>
  <a href="admin.php?logout">Logout</a>
</div>


<div class= "content">
    <h2> Current Menu </h2>
<p>Updates are made directly in the menu. Click the update-button to commit the change.</p>
<p id="error"></p>

    <table id="foodtable"> 

    </table>

<br>
<br>

            <h2>Add to menu</h2>

            <!-- Formulär -->

            <form>
                <label for="category">Category:</label><br>
                <select id="category" name="category">
                    <option value="Coffee">Coffee</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Smoothie">Smoothie</option>
                    <option value="Pancake">Pancake</option>
                    <option value="Drink">Drink</option>
                </select>
                
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name"><br>

                <label for="description">Description</label><br>
                <input type="text" id="description" name="description"><br>

                <label for="price">Price:</label><br>
                <input type="text" id="price" name="price">

                <br><br>
                <p id="errorform"></p>
                <button id="submit">ADD</button>
              </form>

</div>

    <?php
    //Om användaren klickat på logga ut 
    if (isset($_GET["logout"])) {
        session_destroy();
        header("Location: index.php");
    }
    ?>


<script src="js/main.js"></script>
    <?php
    include("includes/footer.php");
    ?>