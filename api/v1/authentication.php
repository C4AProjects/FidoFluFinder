<?php 
$app->get('/session', function(){
     global $db;
    $session = $db->getSession();
    $response["api_key"] = $session['api_key'];
    $response["userid"] = $session['userid'];
    $response["username"] = $session['username'];
    echoResponse(200, $session);
});
/*
$app->get('/test/findone/mongo', function(){
     global $db;
      $collection_name = "users";
    $user = mongoCollectionFindOne(
    MONGO_HOST, 
    MONGO_DB, 
    $collection_name, 
    array('email' => 'selomb@mt2014.com')
  );     
    echoResponse(200, $user);
});
*/

$app->post('/users/login', function() use ($app) {
     global $db;
    //require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('username', 'password'),$r);
    $response = array();
    $password = $r->password;
    $username = $r->username;
    $collection_name = "users";
    $user = mongoCollectionFindOne(
    MONGO_HOST, 
    MONGO_DB, 
    $collection_name, 
    array('username' => $username)
  );     
    $user['_id'] = $user['_id']->{'$id'};
    if ($user != NULL ) {
        
        if(passwordHash::check_password($user['password'],$password)){
             $response['status'] = "success";
            $response['message'] = 'Logged in successfully.';
            $response["data"] = $user;
        }
       
         else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
   
}
    else {
        $response['status'] = "error";
        $response['message'] = 'No such user is registered';
    }
    echoResponse(200, $response);    
});
$app->post('/users/signup', function() use ($app) {
    $r = json_decode($app->request->getBody());
     global $db;
     $collection_name = "users";
    $document = array();
    
    
    verifyRequiredParams(array('email','password'),$r);
    $email=$r->email;
  $password=$r->password;
    //check user with same email exist
 $count = mongoCollectionCount(
    MONGO_HOST, 
    MONGO_DB, 
    $collection_name, 
    array('email' => $email)
  ); 
    if($count<=0){
        $password = passwordHash::hash($password);
        $api_key = generateApiKey();
        $tz_string = "Africa/Lagos"; // Use one from list of TZ names http://us2.php.net/manual/en/timezones.php
        $tz_object = new DateTimeZone($tz_string);
        
        $date= new DateTime();
         $date->setTimezone($tz_object);
           
        $signUpArray=array(
            "email"=>$r->email,
            "username"=>$r->username,
            "password"=>$password,
            "api_key"=>$api_key,
            "createdAt"=>$date->format('Y/m/d H:i:s'),
            "status"=>1
            );
        
        $data = mongoCreate(
    MONGO_HOST, 
    MONGO_DB, 
    $collection_name, 
    $signUpArray
  ); 
echoResponse(201, $data);
}
        
});
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

// $states => array('AB' => 'Abia', 'AJ' => 'Abuja','AN' => 'Anambra','AD' => 'Adamawa','AK' => 'Akwa Ibom',                'BA' => 'Bauchi',                'BY' => 'Bayelsa',                'BE' => 'Benue',                'BO' => 'Borno',                'CR' => 'Cross River',                'DE' => 'Delta',                'ED' => 'Edo',                'EK' => 'Ekiti',                'EB' => 'Ebonyi',                'EN' => 'Enugu',                'GO' => 'Gombe',                'IM' => 'Imo',                'KN' => 'Kano',                'LA' => 'Lagos',                'NS' => 'Nassarawa',                'JI' => 'Jigawa',                'KB' => 'Kebbi',                'KD' => 'Kaduna',                'KG' => 'Kogi',                'KT' => 'Katsina',                'KW' => 'Kwara',                'NR' => 'Niger',                'OG' => 'Ogun',                'ON' => 'Ondo',                'OS' => 'Osun',                'OY' => 'Oyo',                'PL' => 'Plateau',                'RV' => 'Rivers',                'SO' => 'Sokoto',                'TA' => 'Taraba',                'YB' => 'Yobe',                'ZM' => 'Zamfara'                       );

function generateApiKey() {
        return md5(uniqid(rand(), true));
    }

?>