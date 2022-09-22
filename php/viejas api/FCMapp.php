<?php
    $url = "https://fcm.googleapis.com/fcm/send";
    $token = "cEloSsVcTBi6ZaLz6znhK4:APA91bHzIOlMLI2lKGaZ7IjUiOh-Mgrf3zuF8wPgrmjarnP7Gy_B3EH6cFuUIX4tAsioGddFarjCKX-GffLYZmsieCnVGIkbVw3eexPS7STBlgOqoY63HKS4amFY9NQfXlgUwvidedxd";
    $serverKey = 'AAAA18ETG60:APA91bEs3DKGVWzLclcCuc8EeXu76WVzz2OZiV-7qVh9W0zy-dWsY9h-ZyQN4A9a2lymhBofJt-W9ml7zHfvzo6ntD-goI7J_C9ANBinJA9e8q9Hn4_UzQUulSghVq8iOi5Huce5qkCS';
    $title = "Notification title";
    $body = "Hello I am from Your php server";
    $notification = array('title' =>$title , 'body' => $body, 'sound' => 'kh.wav', 'channelid' => 'get-notifications', 'badge' => '1');
    $arrayToSend = array('to' => $token, 'notification' => $notification,'priority'=>'high');
    $json = json_encode($arrayToSend);
    $headers = array();
    $headers[] = 'Content-Type: application/json';
    $headers[] = 'Authorization: key='. $serverKey;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST,"POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
    curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
    //Send the request
    $response = curl_exec($ch);
    //Close request
    if ($response === FALSE) {
    die('FCM Send Error: ' . curl_error($ch));
    }
    curl_close($ch);
?>