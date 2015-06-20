<?php
/**
 * Collection count
 */

  
/**
 * Find document (Work in Progress)
 */

function mongoCollectionFindOne($server, $db, $collection, $query = null) {

  try {

    $conn = new MongoClient($server);
    $_db = $conn->{$db};
    $collection = $_db->{$collection};
    
    if($query) {
      return $collection->findOne($query);
    } else {
      return $collection->findOne();
    }
    
  } catch (MongoConnectionException $e) {
    die('Error connecting to MongoDB server');
  } catch (MongoException $e) {
    die('Error: ' . $e->getMessage());
  }
  
}

function mongoCollectionCount($server, $db, $collection, $query = null) {

  try {

    $conn = new MongoClient($server);
    $_db = $conn->{$db};
    $collection = $_db->{$collection};
    
    if($query) {
      return $collection->count($query);
    } else {
      return $collection->count();
    }
    
  } catch (MongoConnectionException $e) {
    die('Error connecting to MongoDB server');
  } catch (MongoException $e) {
    die('Error: ' . $e->getMessage());
  }
  
}

function InsertInArray($server, $db, $collection,$id, $ArrayItem, $ArrayName) {

  try {

    $conn = new MongoClient($server);
    $_db = $conn->{$db};
    $collection = $_db->{$collection};
    
    $criteria = array(
      '_id' => new MongoId($id)
      );
    
    
    $collection->update($criteria,array('$push' => array($ArrayName => $ArrayItem)));
    $conn->close();

    return "successful";
    
  } catch (MongoConnectionException $e) {
    die('Error connecting to MongoDB server');
  } catch (MongoException $e) {
    die('Error: ' . $e->getMessage());
  }

}

function ModifyInArray($server, $db, $collection,$QueryKey, $QueryKeyValue, $ArrayName, $TargetKey,$TargetValue) {

  try {

    $conn = new MongoClient($server);
    $_db = $conn->{$db};
    $collection = $_db->{$collection};
    
    
    $collection->update(array($ArrayName.".".$QueryKey => $QueryKeyValue), 
      array('$set' => array($ArrayName.".$.".$TargetKey => $TargetValue)));
    $conn->close();
    
    return "successful";
    
  } catch (MongoConnectionException $e) {
    die('Error connecting to MongoDB server');
  } catch (MongoException $e) {
    die('Error: ' . $e->getMessage());
  }

}

function DeleteInArray($server, $db, $collection, $id,$ArrayItem, $ArrayName) {

  try {

    $conn = new MongoClient($server);
    $_db = $conn->{$db};
    $collection = $_db->{$collection};
    
    $criteria = array(
      '_id' => new MongoId($id)
      );
    
    
    $collection->update($criteria,array('$pull' => array($ArrayName => $ArrayItem)));
    $conn->close();
    
    return "successful";
    
  } catch (MongoConnectionException $e) {
    die('Error connecting to MongoDB server');
  } catch (MongoException $e) {
    die('Error: ' . $e->getMessage());
  }

}

