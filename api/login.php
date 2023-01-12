<?php
/* 
Code by Malin Larsson, Mittuniversitetet
Email: malin.larsson@miun.se
*/
?>
<?php
include_once("config.php");

//Läser in vilken metod som skickats och lagrar i en variabel
$method = $_SERVER['REQUEST_METHOD'];

//Om annan metod än POST skickats skickas felmeddelande
if($method != "POST") {
    http_response_code(405); //Method not allowed
    $response = array("message" => "Endast POST tillåts");
    echo json_encode($response);
    exit;
}

//Omvandlar body från JSON
$data = json_decode(file_get_contents("php://input"), true);

//Kontroll att username och password skickats med
if(isset($data["username"]) && isset($data["password"])) {
    $username = $data["username"];
    $password = $data["password"];
} else {
    http_response_code(400); //Bad request
    $response = array("message" => "Skicka med användarnamn och lösenord");
    echo json_encode($response);
    exit;
}

//Kontrollerar att användarnamn och lösenord är giltiga
if($username === "admin" && $password === "password") {
    $response = array("message" => "Inloggad", "user" => true);
    http_response_code(200); //Ok
} else {
    $response = array("message" => "Felaktigt användarnamn eller lösenord");
    http_response_code(401); //Unauthorized
}

//Skickar svar tillbaka till avsändaren
echo json_encode($response);
