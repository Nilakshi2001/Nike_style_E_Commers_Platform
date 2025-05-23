<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $message = trim($_POST["message"]);

    if (!empty($name) && !empty($email) && !empty($message)) {
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $message);

        if ($stmt->execute()) {
            header("Location: ../contact.html?success=1");
            exit();
        } else {
            header("Location: ../contact.html?error=1");
            exit();
        }
        $stmt->close();
    } else {
        header("Location: ../contact.html?error=2");
        exit();
    }
}
?>
