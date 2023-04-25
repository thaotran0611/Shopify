<?php
include_once(dirname(__FILE__) . '/../models/product.model.php');
include_once(dirname(__FILE__) . '/../middleware/error.php');
include_once(dirname(__FILE__) . '/../middleware/utils.php');

use Firebase\JWT\JWT;

class ProductController
{
    public static function getAllProduct()
    {
        $temp = new Product();
        $new = $temp->getAllProduct();
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function getProduct($id)
    {
        $temp = new Product();
        $new = $temp->getProduct($id);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }

    public static function filter_pro($info)
    {
        $temp = new Product();
        $new = $temp->filter_pro($info);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function filter_categories($info)
    {
        $temp = new Product();
        $new = $temp->filter_categories($info);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function filter_collection($info)
    {
        $temp = new Product();
        $new = $temp->filter_collection($info);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function getAllCategories()
    {
        $temp = new Product();
        $new = $temp->getAllCategories();
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function getAllCollection()
    {
        $temp = new Product();
        $new = $temp->getAllCollection();
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function get_info($id)
    {
        $temp = new Product();
        $new = $temp->get_info($id);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function get_detail($id)
    {
        $temp = new Product();
        $new = $temp->get_detail($id);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }
    public static function get_quanity($id, $color, $size)
    {
        $temp = new Product();
        $new = $temp->get_quanity($id, $color, $size);
        if ($new->num_rows > 0) {
            $rows = $new->fetch_all(MYSQLI_ASSOC);
            $rows = json_encode($rows);
            return $rows;
        }
        throw new FileNotFoundError("Product not found !");
    }

    public static function addProduct($data)
    {
        $temp = new Product();
        $temp->addProduct($data);
    }

    public static function restock($data)
    {
        $temp = new Product();
        $temp->restock($data);
    }
    public static function edit($data)
    {
        $temp = new Product();
        $temp->edit($data);
    }

    public static function deleteProduct($id)
    {
        $temp = new Product();
        $temp->deleteProduct($id);
        // throw new FileNotFoundError("Categories not found !");
    }
}
