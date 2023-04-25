<?php
include_once(dirname(__FILE__) . '/../models/cart.model.php');
include_once(dirname(__FILE__) . '/../middleware/error.php');
include_once(dirname(__FILE__) . '/../middleware/utils.php');

use Firebase\JWT\JWT;

class CartController
{
    public static function addCart($data)
    {
        $temp = new Cart();
        $temp->addCart($data);
    }
    public static function calculate($id)
    {
        $temp = new Cart();
        $new = $temp->calculate($id);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
    }
    public static function getDetail($id)
    {
        $temp = new Cart();
        $new = $temp->getDetail($id);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
}
