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
function echoQueryResult($stmt)
{
    try {
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $result = $stmt->fetchAll();
        echo json_encode($result);
    } catch (Exception $e) {
        $e->getMessage();
        logError(500, "Server error:" . $e);
    }
}