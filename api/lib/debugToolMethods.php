<?php

/**
 * Sets the http response code to the $responseCode received from the parameter.
 * Echoes a string message back to the front end.
 * Terminates script.
 * 
 * @param [number] $responseCode
 * @param [string] $message
 * @return void
 */
function logError($responseCode, $message)
{
    http_response_code($responseCode);
    echo json_encode($message);
    die();
}
