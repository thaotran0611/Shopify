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

    public function getAllProduct()
    {
        try {
            $query = "SELECT distinct(CODE), NAME, PRICE, SALEOFF,IMG1,IMG2,IMG3,IMG4 FROM product;";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function getProduct($id)
    {
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
    public function filter_pro($info)
    {
        try {
            $first = True;
            $query = "SELECT distinct(CODE), NAME, PRICE, SALEOFF,IMG1,IMG2,IMG3,IMG4 FROM Product WHERE";
            if ($info['size'] != '') {
                $size = $info['size'];
                if ($first == False) {
                    $query = $query . " AND";
                }
                $query = $query . " SIZE='$size'";
                $first = False;
            }
            if ($info['color'] != '') {
                $color = $info['color'];
                if ($first == False) {
                    $query = $query . ' AND';
                }
                $query = $query . " COLOR ='$color'";
                $first = False;
            }
            // 1: < 300 000 , 2: 300 000 -> 500 000, 3: >500 000
            if ($info['price'] != '') {
                $price = $info['price'];
                if ($first == False) {
                    $query = $query . " AND";
                }
                if ($price == '0') {
                    $query = $query . " PRICE<300000";
                }
                if ($price == '1') {
                    $query = $query . " PRICE>=300000 AND PRICE <= 500000";
                }
                if ($price == '2') {
                    $query = $query . " PRICE>500000";
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

    public function filter_categories($id)
    {
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

    public function filter_collection($id)
    {
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

    public function getAllCategories()
    {
        try {
            $query = "SELECT ID, NAME from categories";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function getAllCollection()
    {
        try {
            $query = "SELECT ID, NAME from `collection`";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function deleteProduct($id)
    {
        try {
            $CODE = $id['CODE'];
            $query = "DELETE FROM product WHERE CODE='$CODE';";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function addProduct($data)
    {
        try {
            $CODE = $data['CODE'];
            $NAME = $data['NAME'];
            $CATEGORY = $data['CATEGORY'];
            $PRICE = $data['PRICE'];
            $SALE = $data['SALE'];
            $MATERIAL = $data['MATERIAL'];

            $DESCRIPTION = $data['DESCRIPTION'];
            $IMG = $data['IMG'];

            $sizes = (array) $data['SIZE'];
            $colors = (array) $data['COLOR'];
            if (($key = array_search("", $colors)) !== false) {
                unset($colors[$key]);
            }

            foreach ($sizes as $size) {
                foreach ($colors as $x => $val) {
                    $query = "INSERT INTO product VALUES ('$CODE','$NAME','$val','$size','$MATERIAL','$DESCRIPTION',0,'$SALE','$PRICE','$IMG[0]','$IMG[1]','$IMG[2]','$IMG[3]','$CATEGORY')";
                    $stmt = $this->conn->prepare($query);
                    $stmt->execute();
                }
            }
        } catch (mysqli_sql_exception $e) {
            throw new FileNotFoundError($e);
        }
    }
    public function get_info($id)
    {
        try {
            $query = "SELECT CODE, GROUP_CONCAT(distinct(SIZE)) AS SIZE, GROUP_CONCAT(distinct(COLOR) SEPARATOR '/') AS COLOR FROM product WHERE CODE = '$id'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function get_detail($id)
    {
        try {
            $query = "SELECT DISTINCT(CODE), product.NAME, MATERIAL, DESCRIPTION, SALEOFF, PRICE, IMG1, IMG2, IMG3, IMG4, categories.NAME AS CATEGORY
            FROM product JOIN categories ON CATEGORY_ID=categories.ID WHERE CODE = '$id'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function get_quanity($id, $color, $size)
    {
        try {
            $query = "SELECT QUANITY FROM product WHERE CODE = '$id' AND COLOR='$color' AND SIZE='$size'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->get_result();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function restock($data)
    {
        try {
            $QUANITY = $data['QUANITY'];
            $CODE = $data['CODE'];
            $SIZE = $data['SIZE'];
            $COLOR = $data['COLOR'];
            $query = "UPDATE product SET QUANITY='$QUANITY' WHERE CODE = '$CODE' AND SIZE='$SIZE' AND COLOR='$COLOR'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
    public function edit($data)
    {
        try {
            $CODE = $data['CODE'];
            $NAME = $data['NAME'];
            $PRICE = $data['PRICE'];
            $SALE = $data['SALE'];
            $MATERIAL = $data['MATERIAL'];
            $DESCRIPTION = $data['DESCRIPTION'];
            $IMG = $data['IMG'];
            $query = "UPDATE product SET NAME='$NAME', PRICE='$PRICE',SALEOFF='$SALE',MATERIAL='$MATERIAL',
            DESCRIPTION='$DESCRIPTION', IMG1='$IMG[0]',IMG2='$IMG[1]', IMG3='$IMG[2]', IMG4='$IMG[3]'
            WHERE CODE = '$CODE'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            throw new InternalServerError('Server Error !');
        }
    }
}
