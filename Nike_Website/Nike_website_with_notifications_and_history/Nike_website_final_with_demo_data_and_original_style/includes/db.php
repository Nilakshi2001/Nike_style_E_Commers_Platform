<?php
$host = "localhost";
$user = "root"; // Default for local server like XAMPP
$pass = "";
$dbname = "nike_website_db";

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

