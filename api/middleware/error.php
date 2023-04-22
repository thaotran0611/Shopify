<?php

class CustomError extends Exception
{
    protected $statusCode;
    public function getStatusCode()
    {
        return $this->statusCode;
    }
}

class BadRequestError extends CustomError
{
    public function __construct($message)
    {
        $this->statusCode = 400;
        $this->message = $message;
    }
}

class UnauthorizedError extends CustomError
{
    public function __construct($message)
    {
        $this->statusCode = 401;
        $this->message = $message;
    }
}

class UnauthenticatedError extends CustomError
{
    public function __construct($message)
    {
        $this->statusCode = 403;
        $this->message = $message;
    }
}

class FileNotFoundError extends CustomError
{
    public function __construct($message)
    {
        $this->statusCode = 404;
        $this->message = $message;
    }
}
class InternalServerError extends CustomError
{
    public function __construct($message)
    {
        $this->statusCode = 500;
        $this->message = $message;
    }
}
