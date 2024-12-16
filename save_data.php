<!-- /var/www/html/daily-tracker/save_data.php -->
<?php
session_start();
$dataFile = 'tracker_data.json';

if (!isset($_SESSION['user_id'])) {
  exit('Unauthorized access.');
}

$data = json_decode(file_get_contents($dataFile), true) ?? [];
$today = date('Y-m-d');

if (!in_array($today, $data)) {
  $data[] = $today;
  file_put_contents($dataFile, json_encode($data));
  echo json_encode(['status' => 'success', 'message' => '打卡成功']);
} else {
  echo json_encode(['status' => 'error', 'message' => '今天已经打卡']);
}
?>
