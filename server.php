<?php
// 1. ALLOW CROSS-ORIGIN REQUESTS FROM ANYWHERE (CORS Gateway)
header("Access-Control-Allow-Origin: *");

// 2. Set the standard text payload content header
header("Content-Type: text/plain; charset=UTF-8");

// 3. Array of attitudinal quotes...
$quotes = [
    "Be yourself; everyone else is already taken. — Oscar Wilde",
    "We don't see things as they are, we see them as we are. — Anaïs Nin"
];

$randomIndex = array_rand($quotes);
echo $quotes[$randomIndex];
?>

