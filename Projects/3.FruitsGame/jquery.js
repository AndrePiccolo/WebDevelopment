var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = ['apple', 'banana','grapes','kiwi','mango','pear','pineapple','strawberry','watermelon'];

$(function(){
    //click on start reset button 
    $("#startreset").click(function(){
        
        //we are playing
        if(playing){
            //reload page
            location.reload();
            
        } else {
            //we are not playing
            playing = true;
            //set score to 0
            score = 0;
            $("#scorevalue").html(score);
            
            //show trials left
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();
            
            //hide game over box
            $("#gameOver").hide();
            //change button text to reset game
            $("#startreset").html("Reset Game");
            
            //start sending fruits
            startAction();
        }
    }); 

    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score);//update score
        
//        document.getElementById("slicesound").play();
        $("#slicesound")[0].play(); //play sound
        
        //stop fruits
//        stopAction();
        clearInterval(action);
        //hide fruit 
        $("#fruit1").hide("explode", 500); //slice fruit
        
        //send new fruit
        setTimeout(startAction, 500);
    });

//functions

    function addHearts(){
        $("#trialsLeft").empty();
        for(i=0; i<trialsLeft; i++){
            $("#trialsLeft").append('<img src="images/life.png" class="life">');
        }
    }

    //start sending fruits
    function startAction(){

        generateFruit();

        //Move fruit down by one step every 10ms
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            //check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                //check if we have trials left
                if(trialsLeft > 1){
                       generateFruit();

                        //reduce trials by one
                        trialsLeft--;

                        //populate trialsleft box
                        addHearts();

                   } else { //game over
                       playing = false;
                       $("#startreset").html("Start Game");
                       $("#gameOver").show();
                       $("#gameOver").html('<p>Game Over</p><p>Your Score is ' + score +'</p>');
                       $("#trialsLeft").hide();
                       stopAction();
                   }
               }
        }, 10);
    }

    //choose a random fruit
    function chooseFruit(){
        $("#fruit1").attr('src', 'images/'+ fruits[Math.round(8*Math.random())] +'.png');
    }

    //stop dropping fruits    
    function stopAction(){
        clearInterval(action);
        $("fruit1").hide();
    }

    //generate a fruit
    function generateFruit(){
        //generate a fruit
        $("#fruit1").show();
        chooseFruit(); //choose a random fruit
        $("#fruit1").css({'left': Math.round(550*Math.random()) , 'top':-50});
        //generate a random step
        step = 1 + Math.round(5*Math.random()); //change step  
    }
});