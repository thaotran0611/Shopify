<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");

class Database
{
  private $serverName;
  private $username;
  private $password;
  private $databaseName;
  private $conn;
  public function __construct()
  {
    $this->conn = null;
    $this->serverName =  $_ENV['DB_SERVER_NAME'];
    $this->username = $_ENV['DB_USER_NAME'];
    $this->databaseName = $_ENV['DB_NAME'];
    $this->password = $_ENV['DB_PASSWORD'];
  }

  public function connect()
  {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $this->conn = mysqli_connect($this->serverName, $this->username, $this->password, $this->databaseName);
    $this->conn->set_charset("utf8");
    if ($this->conn->connect_errno) {
      echo "Failed to connect to MySQL: " . $this->conn->connect_error;
      exit();
    }
    // echo "Connect successfully";
    return $this->conn;
  }
}
// Test connection
// $db = new Database();
// $db->connect();
