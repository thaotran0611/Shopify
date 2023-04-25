<?php
    include_once(dirname(__FILE__) . '/../models/order.model.php');
    include_once(dirname(__FILE__) . '/../middleware/error.php');
    include_once(dirname(__FILE__) . '/../middleware/utils.php');

    use Firebase\JWT\JWT;

    class OrderController{
        public static function makeOrder($data){
            $temp = new Order();
            $temp->makeOrder($data);
            throw new FileNotFoundError("Product not found !");
        }
    }
