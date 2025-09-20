<?php
session_start();
require 'db.php';

if(!isset($_SESSION['user_id'])){
    header("Location: login.php");
    exit;
}

$stmt = $pdo->query("SELECT t.*, u.username FROM threads t JOIN users u ON t.user_id = u.id ORDER BY created_at DESC");
$threads = $stmt->fetchAll();
?>
<a href="new_thread.php">Neuen Thread erstellen</a> | <a href="logout.php">Logout</a>
<h1>Forum</h1>
<?php foreach($threads as $thread): ?>
    <div>
        <a href="thread.php?id=<?= $thread['id'] ?>"><?= htmlspecialchars($thread['title']) ?></a>
        <small>von <?= htmlspecialchars($thread['username']) ?> am <?= $thread['created_at'] ?></small>
    </div>
<?php endforeach; ?>
