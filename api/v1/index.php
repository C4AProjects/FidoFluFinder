<?php
require '.././libs/Slim/Slim.php';
//require '.././libs/Geocoder/Geocoder.php';

//require_once '.././libs/bulletproof/bulletproof.php';

require_once 'passwordHash.php';

require '.././mongo/crud.php';
require '.././mongo/list.php';
require '.././mongo/command.php';


\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();

use Slim\Slim;

//$image = new ImageUploader\BulletProof;

//localhost
define('MONGO_HOST', 'localhost');
//qa server (mongolab)
//define('MONGO_HOST', 'mongodb://selom:admin123@ds053080.mongolab.com:53080/ubadb');
define('MONGO_DB', 'fido');

$app = new \Slim\Slim();
$db = 'fido';

//Set default Time zone
date_default_timezone_set('Africa/Accra');
/**
 * Routing
 */
//$app->get('/geocode/:address','getGeocode');
$app->get(    '/location/:query',      'getLocation');
$app->get(    '/cities/:query',      'getCities');
$app->get(    '/zipcodes/:query',      'getZipcodes');
$app->get(    '/:collection',      '_list');
$app->post(   '/:collection',      '_create');
$app->get(    '/:collection/:id',  '_read');
$app->put(    '/:collection/:id',  '_update');
$app->delete( '/:collection/:id',  '_delete');
$app->post('/:collection/:id/:arrayName','_insertInArray');
$app->put('/:collection/:id/:arrayName','_modifyInArray');
$app->delete('/:collection/:id/:arrayName','_deleteInArray');



/**
 * Verifying required params posted or not
 */
function verifyRequiredParams($required_fields,$request_params){
  $error = false;
  $error_fields = "";
  foreach ($required_fields as $field) {
    if (!isset($request_params->$field) || strlen(trim($request_params->$field)) <= 0) {
      $error = true;
      $error_fields .= $field . ', ';
    }
  }

  if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
    $response = array();
        //$app = \Slim\Slim::getInstance();
    $response["status"] = "error";
    $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
    echoResponse(200, $response);
        //$app->stop();
  }
}


$app->post('/upload/upload/files/:folder', function($folder) use ($app) {
  try {

    if (!isset($_FILES['fileToUpload'])) {
      echo "No files uploaded!!";
      return;
    }
    
    $files = $_FILES['fileToUpload'];

    $allowedExts = array("gif", "jpeg", "jpg", "png");
 $temp = explode(".", $files['name']);
 $extension = end($temp);
 if(in_array($extension, $allowedExts)){
     $name = uniqid('img-'.date('Ymd').'-');
 }
 else
 {
     $name = uniqid('attach-'.date('Ymd').'-');
 }
        
    //$name = uniqid('img-'.date('Ymd').'-');

    $img=move_uploaded_file($files['tmp_name'], 'uploads/' . $name);

    echo $name;

  } 
  catch (Exception $e) {
    echo $e->getMessage();
  }

});



function getCities($state){
  $data = searchCities(
    MONGO_HOST, 
    MONGO_DB, 
    "places",
    $state
    ); 

  show($data);
}

function getZipcodes($city){
  $data = searchZipcodes(
    MONGO_HOST, 
    MONGO_DB, 
    "places",
    $city
    ); 

  show($data);
}

function getLocation($zip){
  $data = getLocationByZipCode(
    MONGO_HOST, 
    MONGO_DB, 
    "places",
    intval($zip)
    ); 
  
  show($data);
}



/*function getGeocode(){
//geocode here
}*/

function _insertInArray($collection, $id,$ArrayName){

  $document = json_decode(Slim::getInstance()->request()->getBody(), true);

  $data = InsertInArray(
    MONGO_HOST, 
    MONGO_DB, 
    $collection, 
    $id,
    $document,
    $ArrayName
    ); 
  
  show($data);
}

function _modifyInArray($collection, $id, $ArrayName){

  $document = json_decode(Slim::getInstance()->request()->getBody());
  //verifyRequiredParams(array('QueryKey', 'QueryKeyValue','TargetValue','TargetKey'),$document);
   //$response = array();

  

  $QueryKey = $document->QueryKey;
  $QueryKeyValue = $document->QueryKeyValue;
  $TargetValue=$document->TargetValue;
  $TargetKey=$document->TargetKey;

  $data = ModifyInArray(
    MONGO_HOST, 
    MONGO_DB, 
    $collection, 
    $QueryKey,
    $QueryKeyValue,
    $ArrayName,
    $TargetKey,
    $TargetValue
    ); 
  show($data);

//show($document);

}

function _deleteInArray($collection, $id,$ArrayName){

  $document = json_decode(Slim::getInstance()->request()->getBody(), true);

  $data = DeleteInArray(
    MONGO_HOST, 
    MONGO_DB, 
    $collection, 
    $id,
    $document,
    $ArrayName
    ); 
  
  show($data);
}


function show($data) {
  header("Content-Type: application/json");
  echo json_encode($data);
  exit;
}



// @todo: add count collection command mongo/commands.php

// List

function _list($collection){

  $select = array(
    'limit' =>    (isset($_GET['limit']))   ? $_GET['limit'] : false, 
    'page' =>     (isset($_GET['page']))    ? $_GET['page'] : false,
    'filter' =>   (isset($_GET['filter']))  ? $_GET['filter'] : false,
    'wildcard' =>    (isset($_GET['wildcard']))   ? $_GET['wildcard'] : false,
    'sort' =>     (isset($_GET['sort']))    ? $_GET['sort'] : false
    );
  
  $data = mongoList(
    MONGO_HOST, 
    MONGO_DB, 
    $collection,
    $select
    );


  echoResponse(200,$data);
  
}

// Create

function _create($collection){

  $document = json_decode(Slim::getInstance()->request()->getBody(), true);

  $data = mongoCreate(
    MONGO_HOST, 
    MONGO_DB, 
    $collection, 
    $document
    ); 
show($data);
}

// Read

function _read($collection, $id){

  $data = mongoRead(
    MONGO_HOST,
    MONGO_DB,
    $collection,
    $id
    );
  
  show($data);
}

// Update 

function _update($collection, $id){

  $document = json_decode(Slim::getInstance()->request()->getBody(), true);

  $data = mongoUpdate(
    MONGO_HOST, 
    MONGO_DB, 
    $collection, 
    $id,
    $document
    ); 
  
  show($data);
}

// Delete

function _delete($collection, $id){

  $data = mongoDelete(
    MONGO_HOST, 
    MONGO_DB, 
    $collection, 
    $id
    ); 
  
  show($data);
}

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
      }
    // Access-Control headers are received during OPTIONS requests
      if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

      }


      $app->options('/(:x+)', function() use ($app) {
    //...return correct headers...
        $app->response->setStatus(200);
      });

      $app->get("/", function() {
        echo "<h1>FIDO API</h1> <h3>".$_SERVER['REMOTE_ADDR']."</h3>";
      });



      function echoResponse($status_code, $response) {
        global $app;
        $app->status($status_code);
        $app->contentType('application/json');
        echo json_encode($response,JSON_NUMERIC_CHECK);
      }

      function responseHanlder($data = null,$res) {
        $res->header('Content-Type', 'application/json');
        $res->header('Access-Control-Allow-Origin', '*');
        $res->header('Access-Control-Allow-Headers', 'x-requested-with, content-type');
        $res->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        $res->write(json_encode($data));
      }


      require_once './authentication.php';
      $app->run();
      ?>