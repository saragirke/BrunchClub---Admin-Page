<?php
//Sara Girke 2022 Webbutveckling II Mittuniversitetet
//aktivera sessioner
session_start();
$devmode = false;

if ($devmode) {
    // Aktivera felrapportering
    error_reporting(-1);
    ini_set("display_errors", 1);
}
