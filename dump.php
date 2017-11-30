<?php
	$file = fopen("dump/dump.txt", "a") or die("Unable to open file!");
	$text = "test";
	echo $text;
	fwrite($file, "test\n");
	fclose($file);
?>
