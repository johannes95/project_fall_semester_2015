<?php
/*

Simple function for getting URL string and putting it into test-DB.



Reminder:

Should probably do ->

create table TestFeed(id int primary key auto_increment, text varchar(255) unique);

or something to avoid duplicate tweets.

*/

function startMiner() {
    
    $old_path = getcwd();
    chdir('/home/ubuntu/workspace/AlexTestFolder/Erlang/twitter-feeder/');
    $output = shell_exec('erl -pa deps/*/ebin -pa ebin -config twitterminer -s startapp start');       /*---./script.sh var1 var2---*/
    chdir($old_path);   /*Optional..?*/
}

/*
Changed addTweet to add Battle info to the database!
*/

function addTweet($Name, $Hit) {
    
    if (isset($Name)) {
        
        $IP = "0.0.0.0";
        $User = "arnolf";

        $con = mysqli_connect($IP, $User, "", "CelebrityDM");
    
        $query = "insert into Battle(name, hit, time) values ('".$Name."', '".$Hit."','".date("Y-m-d H:i:s")."');";
    
        if (mysqli_query($con, $query)) {
            echo '<html><body><br><a><b>';
            echo 'New record created!';
            echo '</b></a></br></body></html>';
        } else {
            echo '<html><body><br><a><b>';
            echo "Error: " . $query . "<br>" . mysqli_error($con);
            echo '</b></a></br></body></html>';
        }
    
        mysqli_close($con);
    
    } else {
        echo '<html><body><br><a><b>';
        echo 'No info in variable';
        echo '</b></a></br></body></html>';
    }
    
}

$Name = $_GET['Name'];
$Hit = $_GET['Hit'];

//startMiner();
addTweet($Name, $Hit);

//https://celebritydeathhash-arnolf.c9.io/AlexTestFolder/test.php?TweetText="Test insert with GET!"

?>