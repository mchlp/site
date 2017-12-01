<?php
    $dump = "test";
    parse_str($_SERVER["QUERY_STRING"]);
    $file = fopen("dump/dump.txt", "a") or die("Unable to open file!");
    $text = "\n" . date("Y/m/d h:i:s a -- ") . $dump;
    echo $text;
	fwrite($file, $text);
	fclose($file);
?>
