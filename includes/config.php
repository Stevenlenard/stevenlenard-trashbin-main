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

function getAllBins() {
    global $conn;
    $query = "SELECT b.bin_id, b.bin_code, b.location, b.type, b.capacity, b.status, 
                     b.assigned_to, CONCAT(u.first_name, ' ', u.last_name) as janitor_name,
                     b.latitude, b.longitude, b.installation_date, b.notes, 
                     b.created_at, b.updated_at
              FROM bins b
              LEFT JOIN users u ON b.assigned_to = u.user_id
              ORDER BY b.created_at DESC";
    
    $result = $conn->query($query);
    if ($result && $result->num_rows > 0) {
        $bins = [];
        while ($row = $result->fetch_assoc()) {
            $bins[] = $row;
        }
        return $bins;
    }
    return [];
}

function getBinById($bin_id) {
    global $conn;
    $bin_id = intval($bin_id);
    $query = "SELECT b.bin_id, b.bin_code, b.location, b.type, b.capacity, b.status, 
                     b.assigned_to, CONCAT(u.first_name, ' ', u.last_name) as janitor_name,
                     b.latitude, b.longitude, b.installation_date, b.notes, 
                     b.created_at, b.updated_at
              FROM bins b
              LEFT JOIN users u ON b.assigned_to = u.user_id
              WHERE b.bin_id = $bin_id";
    
    $result = $conn->query($query);
    if ($result && $result->num_rows > 0) {
        return $result->fetch_assoc();
    }
    return null;
}

function createBin($bin_code, $location, $type, $capacity, $status, $assigned_to = null, $latitude = null, $longitude = null, $installation_date = null, $notes = null) {
    global $conn;
    
    // Sanitize inputs
    $bin_code = $conn->real_escape_string($bin_code);
    $location = $conn->real_escape_string($location);
    $type = $conn->real_escape_string($type);
    $capacity = intval($capacity);
    $status = $conn->real_escape_string($status);
    $assigned_to = $assigned_to ? intval($assigned_to) : 'NULL';
    $latitude = $latitude ? floatval($latitude) : 'NULL';
    $longitude = $longitude ? floatval($longitude) : 'NULL';
    $installation_date = $installation_date ? "'{$conn->real_escape_string($installation_date)}'" : 'NULL';
    $notes = $notes ? "'{$conn->real_escape_string($notes)}'" : 'NULL';
    
    $query = "INSERT INTO bins (bin_code, location, type, capacity, status, assigned_to, latitude, longitude, installation_date, notes)
              VALUES ('$bin_code', '$location', '$type', $capacity, '$status', $assigned_to, $latitude, $longitude, $installation_date, $notes)";
    
    if ($conn->query($query)) {
        return ['success' => true, 'bin_id' => $conn->insert_id, 'message' => 'Bin created successfully'];
    }
    return ['success' => false, 'message' => 'Error creating bin: ' . $conn->error];
}

function updateBin($bin_id, $bin_code, $location, $type, $capacity, $status, $assigned_to = null, $latitude = null, $longitude = null, $installation_date = null, $notes = null) {
    global $conn;
    
    $bin_id = intval($bin_id);
    $bin_code = $conn->real_escape_string($bin_code);
    $location = $conn->real_escape_string($location);
    $type = $conn->real_escape_string($type);
    $capacity = intval($capacity);
    $status = $conn->real_escape_string($status);
    $assigned_to = $assigned_to ? intval($assigned_to) : 'NULL';
    $latitude = $latitude ? floatval($latitude) : 'NULL';
    $longitude = $longitude ? floatval($longitude) : 'NULL';
    $installation_date = $installation_date ? "'{$conn->real_escape_string($installation_date)}'" : 'NULL';
    $notes = $notes ? "'{$conn->real_escape_string($notes)}'" : 'NULL';
    
    $query = "UPDATE bins SET 
              bin_code = '$bin_code',
              location = '$location',
              type = '$type',
              capacity = $capacity,
              status = '$status',
              assigned_to = $assigned_to,
              latitude = $latitude,
              longitude = $longitude,
              installation_date = $installation_date,
              notes = $notes
              WHERE bin_id = $bin_id";
    
    if ($conn->query($query)) {
        return ['success' => true, 'message' => 'Bin updated successfully'];
    }
    return ['success' => false, 'message' => 'Error updating bin: ' . $conn->error];
}

function deleteBin($bin_id) {
    global $conn;
    $bin_id = intval($bin_id);
    
    $query = "DELETE FROM bins WHERE bin_id = $bin_id";
    
    if ($conn->query($query)) {
        return ['success' => true, 'message' => 'Bin deleted successfully'];
    }
    return ['success' => false, 'message' => 'Error deleting bin: ' . $conn->error];
}

function getBinsByJanitor($janitor_id) {
    global $conn;
    $janitor_id = intval($janitor_id);
    
    $query = "SELECT b.bin_id, b.bin_code, b.location, b.type, b.capacity, b.status, 
                     b.assigned_to, CONCAT(u.first_name, ' ', u.last_name) as janitor_name,
                     b.latitude, b.longitude, b.installation_date, b.notes, 
                     b.created_at, b.updated_at
              FROM bins b
              LEFT JOIN users u ON b.assigned_to = u.user_id
              WHERE b.assigned_to = $janitor_id
              ORDER BY b.created_at DESC";
    
    $result = $conn->query($query);
    if ($result && $result->num_rows > 0) {
        $bins = [];
        while ($row = $result->fetch_assoc()) {
            $bins[] = $row;
        }
        return $bins;
    }
    return [];
}

function getActiveJanitors() {
    global $conn;
    
    $query = "SELECT u.user_id, 
                     CONCAT(u.first_name, ' ', u.last_name) as full_name,
                     u.first_name, u.last_name,
                     u.email, u.phone, u.employee_id, u.status,
                     COUNT(b.bin_id) as assigned_bins
              FROM users u
              LEFT JOIN bins b ON u.user_id = b.assigned_to
              WHERE u.role = 'janitor' AND u.status = 'active'
              GROUP BY u.user_id
              ORDER BY u.first_name ASC";
    
    $result = $conn->query($query);
    if ($result && $result->num_rows > 0) {
        $janitors = [];
        while ($row = $result->fetch_assoc()) {
            $janitors[] = $row;
        }
        return $janitors;
    }
    return [];
}

function getAllJanitors($filter = 'all') {
    global $pdo;
    
    try {
        $sql = "SELECT u.user_id, u.first_name, u.last_name, u.email, u.phone, u.status, u.employee_id,
                       COUNT(b.bin_id) as assigned_bins
                FROM users u
                LEFT JOIN bins b ON u.user_id = b.assigned_to
                WHERE u.role = 'janitor'";

        $params = [];
        if ($filter !== 'all') {
            $sql .= " AND u.status = ?";
            $params[] = $filter;
        }

        $sql .= " GROUP BY u.user_id ORDER BY u.first_name ASC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    } catch (Exception $e) {
        return [];
    }
}
?>
