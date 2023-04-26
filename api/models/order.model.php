<?php
include_once(dirname(__FILE__) . '/../config/db.php');
include_once(dirname(__FILE__) . '/../middleware/error.php');


class Order
{
    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }
    public function getAllOrder($id)
    { // id of customer
        try {
            $query = "SELECT * FROM orders WHERE CustomerID='$id';";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function getOrder($id)
    { // id of 1 order
        try {
            $query = "SELECT OrderID, CustomerID, orders.NAME ,TOTAL_PRODUCT, TOTAL_COST, PAY_METHOD, RECEIVE_PHONE, RECEIVE_ADDRESS, DATE_TIME, CODE, T.COLOR, T.SIZE, PRICE, SALEOFF ,NUMBER, IMG1
            FROM orders NATURAL JOIN include  AS T JOIN Product AS P ON T.ProductID=P.CODE AND T.COLOR=P.COLOR AND T.SIZE = P.SIZE 
            WHERE orders.OrderID='$id';";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function confirm($id)
    {
        try {
            $query = "UPDATE orders SET status = 1  WHERE OrderID='$id'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $query = "UPDATE product AS P, include AS I SET QUANITY = QUANITY - NUMBER 
            WHERE CODE = ProductID AND P.COLOR=I.COLOR AND P.SIZE = I.SIZE AND OrderID='$id';";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function makeOrder($info)
    {
        try {
            $CUSTOMER = $info['CUSTOMER'];
            $NAME = $info['NAME'];
            $PAY = $info['PAY'];
            $NOTE = $info['NOTE'];
            $PHONE = $info['PHONE'];
            $ADD = $info['ADD'];
            $COST = $info['COST'];
            $TOTAL_PRODUCT = $info['NUM'];

            $query = "INSERT INTO orders (CUSTOMERID,NAME,TOTAL_PRODUCT,TOTAL_COST,PAY_METHOD,NOTE,RECEIVE_PHONE,RECEIVE_ADDRESS) VALUES ('$CUSTOMER','$NAME','$TOTAL_PRODUCT','$COST','$PAY','$NOTE','$PHONE','$ADD');";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $query = "INSERT INTO include (ProductID,COLOR,SIZE,NUMBER,OrderID) SELECT ProductID, COLOR, SIZE, NUMBER, OrderID FROM add_to_cart JOIN (SELECT max(OrderID) AS OrderID FROM orders) AS TEMP WHERE CustomerID='$CUSTOMER';";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();


            $query = "DELETE FROM add_to_cart WHERE CustomerID='$CUSTOMER'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function chart()
    { // id of customer
        try {
            $query = "SELECT month(date_time) AS MONTH, sum(total_cost) AS TOTAL_COST from orders group by month(date_time);";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function getAll_Admin()
    { // id of 1 order
        try {
            $query = "SELECT * FROM orders";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
}
