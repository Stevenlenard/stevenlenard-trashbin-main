<?php
require_once '../includes/config.php';

if (!isLoggedIn() || !isAdmin()) {
    sendJSON(['success' => false, 'message' => 'Unauthorized']);
}

try {
    $filter = $_GET['filter'] ?? 'all';
    
    $sql = "SELECT b.bin_id, b.bin_code, b.location, b.type, b.capacity, b.status, 
                   CONCAT(u.first_name, ' ', u.last_name) as assigned_to
            FROM bins b
            LEFT JOIN users u ON b.assigned_to = u.user_id";

    if ($filter !== 'all') {
        $sql .= " WHERE b.status = '" . $conn->real_escape_string($filter) . "'";
    }

    $sql .= " ORDER BY b.status DESC, b.capacity DESC";

    $result = $conn->query($sql);
    $bins = [];
    
    while ($row = $result->fetch_assoc()) {
        $bins[] = $row;
    }

    sendJSON(['success' => true, 'bins' => $bins]);
} catch (Exception $e) {
    sendJSON(['success' => false, 'message' => $e->getMessage()]);
}
?>
