<?php
    function utf8_string_array_encode(&$array){
        foreach ($array as &$obj){
            foreach ($obj as $key => &$value) {
                $result = json_encode($value, JSON_UNESCAPED_UNICODE);
                if ($result == false){
                    echo $value;
                }
                $value = $result;
            }
        }
        return $array;
    }
