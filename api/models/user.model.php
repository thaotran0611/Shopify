<?php

include_once(dirname(__FILE__) . '/../config/db.php');
include_once(dirname(__FILE__) . '/../middleware/error.php');

class User
{
  private $conn;

  public function __construct()
  {
    $db = new Database();
    $this->conn = $db->connect();
  }

  public function getAllUser()
  {
    try {
      $query = "SELECT * FROM Customer";
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return $stmt->get_result();
    } catch (mysqli_sql_exception $e) {
      throw new InternalServerError('Server Error !');
    }
  }
  public function getUser($username)
  {
    try {
      $username = mysqli_real_escape_string($this->conn, $username);
      $query = "SELECT `CustomerID`, `Phone_Number`, `USERNAME`, `PASSWORD`, `NAME`, `BIRTHDAY`, `AVATAR`, `ROLE` FROM Customer WHERE username = '$username'";
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return $stmt->get_result();
    } catch (mysqli_sql_exception $e) {
      echo $this->conn->error;
      throw new InternalServerError('Server Error !');
    }
  }
  public function createUser($username, $password, $name, $phone, $birthday, $avatar, $role)
  {
    try {
      $username = mysqli_real_escape_string($this->conn, $username);
      $password = mysqli_real_escape_string($this->conn, $password);
      $name = mysqli_real_escape_string($this->conn, $name);
      $phone = mysqli_real_escape_string($this->conn, $phone);
      $birthday = mysqli_real_escape_string($this->conn, $birthday);
      $avatar = mysqli_real_escape_string($this->conn, $avatar);
      $role = mysqli_real_escape_string($this->conn,  $role);

      $query = "INSERT INTO Customer (`Phone_Number`, `USERNAME`, `PASSWORD`, `NAME`, `BIRTHDAY`, `AVATAR`, `ROLE`) VALUES('$phone','$username','$password','$name','$birthday','$avatar','$role');";
      $stmt = $this->conn->prepare($query);
      return $stmt->execute();
    } catch (mysqli_sql_exception $e) {
      echo $this->conn->error;
      throw new InternalServerError('Server Error !');
    }
  }
}
