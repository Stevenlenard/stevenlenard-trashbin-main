<?php
require_once '../includes/config.php';

if (!isLoggedIn() || !isAdmin()) {
    sendJSON(['success' => false, 'message' => 'Unauthorized']);
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $bin_code = $conn->real_escape_string($data['bin_code']);
    $location = $conn->real_escape_string($data['location']);
    $type = $conn->real_escape_string($data['type']);
    $capacity = intval($data['capacity']);

    $sql = "INSERT INTO bins (bin_code, location, type, capacity, status) 
            VALUES ('$bin_code', '$location', '$type', $capacity, 'empty')";

    if ($conn->query($sql)) {
        sendJSON(['success' => true, 'message' => 'Bin added successfully', 'bin_id' => $conn->insert_id]);
    } else {
        sendJSON(['success' => false, 'message' => $conn->error]);
    }
} catch (Exception $e) {
    sendJSON(['success' => false, 'message' => $e->getMessage()]);
}
?>
