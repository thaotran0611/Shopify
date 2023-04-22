<?php
    include_once(dirname(__FILE__) . '/../config/db.php');
    include_once(dirname(__FILE__) . '/../middleware/error.php');


class Product
{
    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getAllProduct(){
        try {
            $query = "SELECT distinct(CODE), NAME, PRICE, SALEOFF,IMG1,IMG2,IMG3,IMG4 FROM product;";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function getProduct($id){
        try {
            $query = "SELECT CODE, NAME, MATERIAL, DESCRIPTION,PRICE, SALEOFF,IMG1,IMG2,IMG3,IMG4, GROUP_CONCAT(distinct(SIZE)) AS SIZE, GROUP_CONCAT(distinct(COLOR)) AS COLOR 
            FROM ltw.product 
            WHERE CODE = '$id'
            GROUP BY CODE, NAME, MATERIAL, DESCRIPTION,PRICE, SALEOFF,IMG1,IMG2,IMG3,IMG4;";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function filter_pro($info){
        try {
            $first = True;
            $query = "SELECT distinct(CODE), NAME, PRICE, SALEOFF,IMG1,IMG2,IMG3,IMG4 FROM Product WHERE";
            if($info['size']!=''){
                $size = $info['size'];
                if($first == False){
                    $query = $query." AND";
                }
                $query = $query." SIZE='$size'";
                $first = False;
            }
            if($info['color']!=''){
                $color = $info['color'];
                if($first == False){
                    $query = $query.' AND';
                }
                $query = $query." COLOR ='$color'";
                $first = False;
                
            }
            // 1: < 300 000 , 2: 300 000 -> 500 000, 3: >500 000
            if($info['price']!=''){
                $price = $info['price'];
                if($first == False){
                    $query = $query." AND";
                }
                if($price == '1'){
                    $query = $query." PRICE<300000";
                }
                if($price == '2'){
                    $query = $query." PRICE>=300000 AND PRICE <= 500000";
                }
                if($price == '3'){
                    $query = $query." PRICE>500000";
                }
                $first = False;
            }
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }

    public function filter_categories($id){
        try {
            $query = "SELECT distinct(CODE), NAME, PRICE, SALEOFF,IMG1,IMG2,IMG3,IMG4 FROM product
            WHERE CATEGORY_ID = '$id';";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }

    public function filter_collection($id){
        try {
            $query = "SELECT distinct(CODE), NAME, PRICE, SALEOFF,IMG1,IMG2,IMG3,IMG4 
            FROM product join in_collection on code=ProductCode
            WHERE CollectID = '$id';";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }

    
    public function delete($id){
        try {
            $query = "DELTE FROM Product WHERE CODE='$id'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }


    public function edit(){}


}
