<?php
//Sara Girke 2022 Webbutveckling II Mittuniversitetet
include("includes/header.php");

//Kontroll om användaren är inloggad
if (isset($_SESSION["admin"])) {
    header("Location: admin.php");
}

//Om formuläret fylls i och postas
if (isset($_POST['username'])) {

    //Sparar i variabler
    $username = $_POST['username'];
    $password = $_POST['password'];

    //kontrollera att användarnamn och lösenord är ifyllda
    if (empty($username) || empty($password)) {
        $errormsg = "<p class='error'><strong>Fyll i användarnamn och lösenord!</strong></p>";
    } else {
        //Om användarnamn och lösenord är ifyllda, kontrollera att användaren finns i databasen via webbtjänsten
        //POST med cURL
        $url = 'https://studenter.miun.se/~sagi1700/writeable/brunchprojekt/login.php'; //instansiera ny cURL session
        $curl = curl_init();
        
        //array
        $user = array("username" => $username, "password" => $password);
        //omvandlar till json
        $json_string = json_encode($user);
        //inställningar för cURL
        curl_setopt($curl, CURLOPT_URL, $url); //Anger var anropat ska skickas
        curl_setopt($curl, CURLOPT_POST, true); // Anger att det är ett POST anrop
        curl_setopt($curl, CURLOPT_POSTFIELDS, $json_string); // Anger vilken data som skickas med, json-variabeln
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // Tar bort automatisk echo.utskrift
        //Response och statuskod
        //Lagrar responsen i en variabel
        $data = json_decode(curl_exec($curl), true);
        //Lagrar http koden i en variabel
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);
        
        //Kontroll att det är en ok anrop
        if($httpcode === 200) {
            $_SESSION['admin'] = $username;
        //Korrekt användare skickas till admin-sidan
            header("Location: admin.php");
        } else {
            $errormsg = "<p class='error'><strong>Wrong username or password</strong></p>";
        }
    }
}

?>
<div class="container">
   

<div class="box">
            <h1>Admin BrunchClub </h1>
            <?php
    if (isset($errormsg)) {
        echo $errormsg;
    }
    ?>
   

    <!-- Formulär -->
    <form action="index.php" method="post">
        <label for="username">Username:</label>
        <br>
        <input type="text" name="username" id="username">
        <br>
        <label for="password">Password:</label>
        <br>
        <input type="password" name="password" id="password">
        <br>
        <input class="btn" type="submit" value="Login">
    </form>
    </div>    </div>
<br><br>

<?php
    include("includes/footer.php");
    ?>