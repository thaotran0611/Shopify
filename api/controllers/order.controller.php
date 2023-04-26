<?php
include_once(dirname(__FILE__) . '/../models/order.model.php');
include_once(dirname(__FILE__) . '/../middleware/error.php');
include_once(dirname(__FILE__) . '/../middleware/utils.php');


class OrderController
{
    public static function makeOrder($data)
    {
        $temp = new Order();
        $temp->makeOrder($data);
    }
    public static function getOrder($id)
    {
        $temp = new Order();
        $new = $temp->getOrder($id);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function getAllOrder($id)
    {
        $temp = new Order();
        $new = $temp->getAllOrder($id);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function confirm($id)
    {
        $temp = new Order();
        $temp->confirm($id);
    }
    public static function chart()
    {
        $temp = new Order();
        $new = $temp->chart();
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function getAllAdmin()
    {
        $temp = new Order();
        $new = $temp->getAll_Admin();
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
}
