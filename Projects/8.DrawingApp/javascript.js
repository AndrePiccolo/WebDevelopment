$(function(){
    
    var paint = false;
    var paint_erase = "paint";
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    var container = $("#container");
    var mouse = {x:0, y:0};
    
    //load image from localStorage
    if(localStorage.getItem("imageCanvas") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0); //positioning image
        }
        img.src = localStorage.getItem("imageCanvas"); //load image
    }
    
    //begin line style
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    //click mouse action
    container.mousedown(function(e){
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    });
    
    //move mouse action
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint){
            if(paint_erase == "paint"){
                ctx.strokeStyle = $("#paintColor").val();
            } else {
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
    
    //release mouse action
    container.mouseup(function(){
        paint = false;
    });
    
    //Mouse leave container action
    container.mouseleave(function(){
        paint = false;
    });
    
    //Reset button action
    $("#reset").click(function(){
       ctx.clearRect(0,0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    
    //Save button action
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imageCanvas", canvas.toDataURL());
        } else {
            window.alert("Your browser does not support local storage!");
        
        } 
    });
    
    //Erase button action
    $("#erase").click(function(){
       if(paint_erase == "paint"){
           paint_erase = "erase";
       } else {
           paint_erase = "paint";
       }
        $(this).toggleClass("eraseMode");
    });
    
    //change color input
    $("#paintColor").change(function(){
       $("#circle").css("background-color", $(this).val()); 
    });
    
    //change linewidth using slider
    $("#slider").slider({
        min:3,
        max:30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });
});