<?php

/**
* Get unique values
*/
function super_unique($array,$key)

{

   $temp_array = array();

   foreach ($array as &$v) {

       if (!isset($temp_array[$v[$key]]))

       $temp_array[$v[$key]] =& $v;

   }

   $array = array_values($temp_array);

   return $array;



}

/**
 * Look for cities by state
 */
  function searchCities($server, $db, $collection, $query = null) {    
   
  $conn = new MongoClient($server);    
  $_db = $conn->{$db};   
  $collection = $_db->{$collection};
  $criteria['state'] = $query;    
  $cursor= $collection->find($criteria)->fields(array('city' => true,'_id'=>false));  
  $cursor->sort(array('city' => 1)); 
  foreach ($cursor as $result) {     
    //$result['_id'] = $result['_id']->{'$id'};       
    $output['results'][] = $result;    
  }    
   
  $conn->close();    
  $names= array_map(create_function('$arr', 'return $arr["city"];'), $output['results']);
 
  return $names;    
}

/**
 * Look for zipcode by city
 */
  function searchZipcodes($server, $db, $collection, $query = null) {    
   
  $conn = new MongoClient($server);    
  $_db = $conn->{$db};   
  $collection = $_db->{$collection};
  $criteria['city'] = $query;    
  $cursor= $collection->find($criteria);  

  //$cursor->sort(array('zip' => 1)); 

  foreach ($cursor as $result) {     
    $result['_id'] = $result['_id']->{'$id'};      
    $output['results'][] = $result;    
  }    
   
  $conn->close();    
  if($cursor->count()>0)
      return $output; 
    else return array();
}

/**
 * Get geolocation by zipcode
 */
  function getLocationByZipCode($server, $db, $collection, $query = null) {    
   
  $conn = new MongoClient($server);    
  $_db = $conn->{$db};   
  $collection = $_db->{$collection};
  $criteria['zip'] = $query;    
  $cursor= $collection->find($criteria);  

  foreach ($cursor as $result) {     
    $result['_id'] = $result['_id']->{'$id'};      
    $output['results'][] = $result;    
  }    
   
  $conn->close();    
  if($cursor->count()>0)
      return $output['results'][0]; 
    else return array();
}


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
/**
 * Collection count
 */
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

