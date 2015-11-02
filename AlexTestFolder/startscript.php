<?php


function startMiner() {
    
    $old_path = getcwd();
    chdir('/home/ubuntu/workspace/AlexTestFolder/Erlang/twitter-feeder/');
    $output = shell_exec('erl -pa deps/*/ebin -pa ebin -config twitterminer -s startapp start');       /*---./script.sh var1 var2---*/
    chdir($old_path);   /*Optional..?*/
}

startMiner();

?>