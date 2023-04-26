<?php
include_once(dirname(__FILE__) . '/../controllers/order.controller.php');

$url_components = parse_url($_SERVER['REQUEST_URI']);
$url = array_filter(explode('/', $url_components['path']));

$params = '';
if (count($url_components) > 1)
    parse_str($url_components['query'], $params);

$method = $_SERVER['REQUEST_METHOD'];

session_start();
// api/orders/add
if ($url['3'] == 'add' and $method == 'POST') {
    try {
        $data = (array) json_decode(file_get_contents('php://input'));
        echo OrderController::makeOrder($data);
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
} //api/orders/detail?code= // code of 1 order
elseif ($url['3'] == 'detail' and $method == 'GET') {
    try {
        echo OrderController::getOrder($params['code']);
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
}
//api/orders/allOrder?CustomerID=
elseif ($url['3'] == 'allOrder' and $method == 'GET') {
    try {
        echo OrderController::getAllOrder($params['CustomerID']);
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
}
//api/orders/confirm
elseif ($url['3'] == 'confirm' and $method == 'PUT') {
    try {
        $data = (array) json_decode(file_get_contents('php://input'));
        echo OrderController::confirm($data['OrderID']);
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
} elseif ($url['3'] == 'chart' and $method == 'GET') {
    try {
        echo OrderController::chart();
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
} elseif ($url['3'] == 'all' and $method == 'GET') {
    try {
        echo OrderController::getAllAdmin();
        http_response_code(200);
    } catch (CustomError $e) {
        echo json_encode(['msg' => $e->getMessage()]);
        http_response_code($e->getStatusCode());
    }
}
