<?php
include_once(dirname(__FILE__) . '/../config/db.php');
include_once(dirname(__FILE__) . '/../middleware/error.php');


class Cart
{
    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }
    public function addCart($data)
    { // id of customer
        try {
            $CUS = $data['CustomerID'];
            $CODE = $data['CODE'];
            $COLOR = $data['COLOR'];
            $SIZE = $data['SIZE'];
            $NUM = $data['NUM'];
            $query = "SELECT * FROM add_to_cart WHERE CustomerID='$CUS' AND ProductID='$CODE' AND COLOR='$COLOR' AND SIZE='$SIZE'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $query = "UPDATE add_to_cart SET NUMBER = NUMBER+'$NUM' WHERE CustomerID='$CUS' AND ProductID='$CODE' AND COLOR='$COLOR' AND SIZE='$SIZE'";
                $stmt = $this->conn->prepare($query);
                $stmt->execute();
            } else {
                $query = "INSERT INTO add_to_cart(ProductID, COLOR, SIZE, CustomerID, NUMBER) VALUES ('$CODE','$COLOR','$SIZE','$CUS','$NUM')";
                $stmt = $this->conn->prepare($query);
                $stmt->execute();
            }
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function calculate($id)
    {
        try {
            $query = "SELECT CustomerID, SUM(NUMBER), SUM(NUMBER*(PRICE*(1-SALEOFF))) AS TOTAL_COST
            FROM add_to_cart AS A JOIN product AS P ON ProductID=CODE AND A.COLOR = P.COLOR AND A.SIZE=P.SIZE WHERE CustomerID='$id'
            GROUP BY CustomerID;";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }

    public function getDetail($id)
    {
        try {
            $query = "SELECT * FROM add_to_cart AS A JOIN product AS P ON A.ProductID=P.CODE AND A.COLOR=P.COLOR AND A.SIZE=P.SIZE WHERE CustomerID='$id';";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function deleteCart($data)
    {
        try {
            $CODE = $data['ProductID'];
            $COLOR = $data['COLOR'];
            $SIZE = $data['SIZE'];
            $CustomerID = $data['CustomerID'];
            $query = "DELETE FROM add_to_cart WHERE COLOR='$COLOR' AND SIZE='$SIZE' AND ProductID='$CODE' AND CustomerID='$CustomerID';";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function edit($data)
    {
        try {
            $CODE = $data['ProductID'];
            $COLOR = $data['COLOR'];
            $SIZE = $data['SIZE'];
            $CustomerID = $data['CustomerID'];
            $NUM = $data['NUM'];
            $query = "UPDATE add_to_cart SET NUMBER= '$NUM' WHERE COLOR='$COLOR' AND SIZE='$SIZE' AND ProductID='$CODE' AND CustomerID='$CustomerID';";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
}
