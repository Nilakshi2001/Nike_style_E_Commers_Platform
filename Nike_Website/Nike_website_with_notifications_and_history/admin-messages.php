<?php
require 'includes/db.php';

// Handle reply submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["reply"], $_POST["message_id"])) {
    $reply = trim($_POST["reply"]);
    $message_id = intval($_POST["message_id"]);

    if (!empty($reply) && $message_id > 0) {
        $stmt = $conn->prepare("UPDATE contacts SET reply = ?, reply_date = NOW() WHERE id = ?");
        $stmt->bind_param("si", $reply, $message_id);
        $stmt->execute();
        $stmt->close();
    }
}

// Fetch all contact messages
$result = $conn->query("SELECT * FROM contacts ORDER BY date_sent DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin - Contact Messages</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        .container { padding: 2rem; max-width: 800px; margin: auto; }
        .message-box { background: #fff; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .reply-form textarea { width: 100%; padding: 0.5rem; margin-top: 0.5rem; border-radius: 6px; }
        .reply-form button { margin-top: 0.5rem; padding: 0.5rem 1rem; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .replied { background-color: #e8f5e9; }
    </style>
</head>
<body>
<div class="container">
    <h2>📬 Contact Messages</h2>
    <?php while ($row = $result->fetch_assoc()): ?>
        <div class="message-box <?php echo $row['reply'] ? 'replied' : ''; ?>">
            <p><strong>Name:</strong> <?php echo htmlspecialchars($row['name']); ?></p>
            <p><strong>Email:</strong> <?php echo htmlspecialchars($row['email']); ?></p>
            <p><strong>Message:</strong> <?php echo nl2br(htmlspecialchars($row['message'])); ?></p>
            <p><strong>Date Sent:</strong> <?php echo $row['date_sent']; ?></p>
            <?php if ($row['reply']): ?>
                <p><strong>✅ Replied:</strong> <?php echo nl2br(htmlspecialchars($row['reply'])); ?><br><em>on <?php echo $row['reply_date']; ?></em></p>
            <?php else: ?>
                <form class="reply-form" method="POST">
                    <input type="hidden" name="message_id" value="<?php echo $row['id']; ?>">
                    <textarea name="reply" rows="3" placeholder="Type your reply..."></textarea>
                    <button type="submit">Send Reply</button>
                </form>
            <?php endif; ?>
        </div>
    <?php endwhile; ?>
</div>
</body>
</html>
