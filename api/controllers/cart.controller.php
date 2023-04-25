<?php
    include_once(dirname(__FILE__) . '/../models/cart.model.php');
    include_once(dirname(__FILE__) . '/../middleware/error.php');
    include_once(dirname(__FILE__) . '/../middleware/utils.php');

    use Firebase\JWT\JWT;

    class CartController{
        public static function addCart($data){
            $temp = new Cart();
            $temp->addCart($data);
            throw new FileNotFoundError("Product not found !");
        }
        public static function calculate($id){
            $temp = new Cart();
            $temp->calculate($id);
            throw new FileNotFoundError("Product not found !");
        }
    }

?>