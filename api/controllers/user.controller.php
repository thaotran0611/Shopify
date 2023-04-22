<?php
include_once(dirname(__FILE__) . '/../models/user.model.php');
include_once(dirname(__FILE__) . '/../middleware/error.php');
include_once(dirname(__FILE__) . '/../middleware/utils.php');

use Firebase\JWT\JWT;

class UserController
{
  public static function getAllUser()
  {
    $temp = new User();
    $new = $temp->getAllUser();
    if ($new->num_rows > 0) {
      $rows = $new->fetch_all(MYSQLI_ASSOC);
      $rows = json_encode($rows);
      return $rows;
    }
    throw new FileNotFoundError("User not found !");
  }
  public static function login($info)
  {
    $temp = new User();
    $new = $temp->getUser($info['username']);
    if ($new->num_rows == 1) {
      $rows = $new->fetch_all(MYSQLI_ASSOC);
      if ($rows[0]['PASSWORD'] == $info['password']) {
        $key = $_SERVER['SECRET_KEY'];
        unset($rows[0]['PASSWORD']);
        $getDate = new DateTimeImmutable();
        $rows['CREATED_TIME'] = $getDate->modify('+1 hour')->getTimestamp();
        $jwt = JWT::encode($rows, $key, 'HS256');
        return json_encode(["data" => [
          'role' => $rows[0]['ROLE'],
          'id' => (string)$rows[0]['CustomerID'],
          'avatar' => $rows[0]['AVATAR'],
          'avatar' => $rows[0]['AVATAR'],
          'birthday' => $rows[0]['BIRTHDAY'],
          'phone' => $rows[0]['Phone_Number'],
          'token' => $jwt
        ]]);
      }
      throw new FileNotFoundError("Incorrect password !");
    }
    throw new BadRequestError('Invalid username or password');
  }
  public static function signup($info)
  {
    $temp = new User();
    $new = $temp->getUser($info['username']);
    if ($new->num_rows == 0) {
      $create = $temp->createUser($info['username'], $info['password'], $info['name'], $info['phone'], $info['birthday'], $info['avatar'], $info['role']);
      if ($create) {
        http_response_code(200);
        return json_encode(["msg" => "success"]);
      }
      throw new FileNotFoundError("User not created !");
    }
    throw new FileNotFoundError("Username exist !");
  }
}
