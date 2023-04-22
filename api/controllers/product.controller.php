<?php
    include_once(dirname(__FILE__) . '/../models/product.model.php');
    include_once(dirname(__FILE__) . '/../middleware/error.php');
    include_once(dirname(__FILE__) . '/../middleware/utils.php');

    use Firebase\JWT\JWT;

    class ProductController{
        public static function getAllProduct(){
            $temp = new Product();
            $new = $temp->getAllProduct();
            if ($new->num_rows > 0) {
                $rows = $new->fetch_all(MYSQLI_ASSOC);
                $rows = json_encode($rows);
                return $rows;
            }
            throw new FileNotFoundError("Product not found !");
        }
        public static function getProduct($id){
            $temp = new Product();
            $new = $temp->getProduct($id);
            if ($new->num_rows > 0) {
                $rows = $new->fetch_all(MYSQLI_ASSOC);
                $rows = json_encode($rows);
                return $rows;
            }
            throw new FileNotFoundError("Product not found !");
        }
        
        public static function filter_pro($info){
            $temp = new Product();
            $new = $temp->filter_pro($info);
            if ($new->num_rows > 0) {
                $rows = $new->fetch_all(MYSQLI_ASSOC);
                $rows = json_encode($rows);
                return $rows;
            }
            throw new FileNotFoundError("Product not found !");
        }
        public static function filter_categories($info){
            $temp = new Product();
            $new = $temp->filter_categories($info);
            if ($new->num_rows > 0) {
                $rows = $new->fetch_all(MYSQLI_ASSOC);
                $rows = json_encode($rows);
                return $rows;
            }
            throw new FileNotFoundError("Product not found !");
        }
        public static function filter_collection($info){
            $temp = new Product();
            $new = $temp->filter_collection($info);
            if ($new->num_rows > 0) {
                $rows = $new->fetch_all(MYSQLI_ASSOC);
                $rows = json_encode($rows);
                return $rows;
            }
            throw new FileNotFoundError("Product not found !");
        }
        
    }
