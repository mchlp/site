<?php
	$file = fopen("text.txt", "a") or die("Unable to open file!");
	$text = "test";
	echo $text;
	fwrite($file, "test");
	fclose($file);
?>
