<?php

namespace App\Utils;

class ApiStatusCode
{
    const SUCCESS = 100;
    const UNKNOWN_ERROR = 101;

    const NOT_FOUND = 102;

    const FAILED = 103;
    const VALIDATION_ERROR = 103;

    const TOKEN_EXPIRED = 104;
    const TOKEN_INVALID = 105;
}
