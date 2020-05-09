<?php

/**
 * Creates and return a database connection
 * @return databaseConnection
 */
function createConnection()
{
    $conn = null;
    try {
        $conn = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME . ";" . "charset=utf8;", DB_USERNAME, DB_PASSWORD);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception  $e) {
        logError(500, $e->getMessage());
    }
    return $conn;
}

/**
 * General method to return database result based on the query input and the dynamic parameter inside the uri.
 * @param [databaseConnection] $conn
 * @param [string] $query
 * @return void
 */
function executeQuery($conn, $query, $dynamicParams = null)
{
    $stmt = $conn->prepare($query);

    try {
        $stmt->execute($dynamicParams);
    } catch (Exception $e) {
        $e->getMessage();
        logError(500, "Server error:" . $e);
    }

    return $stmt;
}



/**
 * Fetches the results from a statment and return it back to the front end
 *
 * @param [type] $stmt
 * @return void
 */
function returnQueryResult($stmt)
{
    try {
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $result = $stmt->fetchAll();
        return $result;
    } catch (Exception $e) {
        $e->getMessage();
        logError(500, "Server error:" . $e);
    }
}

/**
 * Returns a part of the uri string based on the index given.
 * @param [type] $string
 * @param [type] $valueIndex
 * @return string
 */
function retrieveDynamicValueFromURIString($string, $valueIndex)
{
    $stringCollection = explode('/', $string);
    return $stringCollection[$valueIndex];
}


/**
 * Stores all post values from a request inside an array and return it.
 * @param [type] $keys
 * @return array
 */
function retrieveDynamicValuesFromInput($keys)
{
    $data = json_decode(file_get_contents('php://input'), true);
    $stringCollection = [];
    foreach ($keys as &$value) {
        array_push($stringCollection, $data[$value]);
    }
    return $stringCollection;
}