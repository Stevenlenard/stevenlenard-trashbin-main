<?php
// Database Configuration
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'trashbin_management';

// MySQLi Connection (for backward compatibility)
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
}
$conn->set_charset("utf8mb4");

// PDO Connection (for newer APIs)
try {
    $pdo = new PDO(
        "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]));
}

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function isLoggedIn() {
    return isset($_SESSION['user_id']) && isset($_SESSION['role']);
}

function isAdmin() {
    return isLoggedIn() && $_SESSION['role'] === 'admin';
}

function isJanitor() {
    return isLoggedIn() && $_SESSION['role'] === 'janitor';
}

function generateEmployeeId() {
    global $conn;
    // Format: JAN-XXXXX (5 random digits)
    do {
        $randomNum = rand(10000, 99999);
        $employee_id = 'JAN-' . $randomNum;
        
        // Check if this employee_id already exists
        $result = $conn->query("SELECT employee_id FROM users WHERE employee_id = '$employee_id'");
    } while ($result->num_rows > 0);
    
    return $employee_id;
}

function getCurrentUserId() {
    return $_SESSION['user_id'] ?? null;
}

function getCurrentUserRole() {
    return $_SESSION['role'] ?? null;
}

// Response helper
function sendJSON($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
?>
