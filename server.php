<?php
$_POST = json_decode(file_get_contents("php://input"), true);       //ეს იმისთვის, რომ php-მ იმუშაოს json-თან
echo var_dump($_POST);