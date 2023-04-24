<?php
include_once(dirname(__FILE__) . '/../controllers/product.controller.php');

$url_components = parse_url($_SERVER['REQUEST_URI']);
$url = array_filter(explode('/', $url_components['path']));

$params = '';
if (count($url_components) > 1)
    parse_str($url_components['query'], $params);

$method = $_SERVER['REQUEST_METHOD'];

session_start();
// api/products/all
if ($url['3'] == 'all' and $method == 'GET') {
    try {
        echo ProductController::getAllProduct();
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
} // api/products/categories
elseif ($url['3'] == 'categories' and $method == 'GET') {
    try {
        echo ProductController::getAllCategories();
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
}
// api/products/collections
elseif ($url['3'] == 'collections' and $method == 'GET') {
    try {
        echo ProductController::getAllCollection();
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
}
//api/products/detail?code=
elseif ($url['3'] == 'detail' and $method == 'GET') {
    try {
        echo ProductController::getProduct($params['code']);
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
}
//api/products/filter_pro?size=M
// size , price , color 
elseif ($url['3'] == 'filter_pro' and $method == 'GET') {
    $info = array('size' => '', 'price' => '', 'color' => '');

    if (array_key_exists('size', $params)) {
        $info['size'] = $params['size'];
    }
    if (array_key_exists('color', $params)) {
        $info['color'] = $params['color'];
    }
    if (array_key_exists('price', $params)) {
        $info['price'] = $params['price'];
    }
    try {
        echo ProductController::filter_pro($info);
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
} //api/products/filter_categories?id=1
elseif ($url['3'] == 'filter_categories' and $method == 'GET') {
    try {
        echo ProductController::filter_categories($params['id']);
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
} //api/products/filter_collection?id=1
elseif ($url['3'] == 'filter_collection' and $method == 'GET') {
    try {
        echo ProductController::filter_collection($params['id']);
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
}
