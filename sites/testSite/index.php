<?php
    require_once "recaptchalib.php";

    $secret = "6LcrXiUUAAAAAFdfD4dTcJLh96RMyiwSPRh94963";
    $response = null;
    $reCaptcha = new ReCaptcha($secret);

    if ($_POST["g-recaptcha-response"]) {
        $response = $reCaptcha->verifyResponse(
            $_SERVER["REMOTE_ADDR"],
            $_POST["g-recaptcha-response"]
        );
    }

    if ($response != null && $response->success) {
        echo "reCaptcha validated!";
    }

    foreach ($_POST as $key => $value) {
        echo '<p><strong>' . $key.':</strong> '.$value.'</p>';
    }
?>
