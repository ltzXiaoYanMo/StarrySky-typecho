function Star(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 2) + 1;
    var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = "rgba(255,255,255," + alpha + ")"
}
Star.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill()
};
Star.prototype.move = function() {
    this.y -= 0.15;
    if (this.y <= -10) {
        this.y = HEIGHT + 10
    }
    this.draw()
};
Star.prototype.die = function() {
    stars[this.id] = null;
    delete stars[this.id]
};

function Dot(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 5) + 1;
    this.maxLinks = 2;
    this.speed = 0.5;
    this.a = 0.5;
    this.aReduction = 0.005;
    this.color = "rgba(255,255,255," + this.a + ")";
    this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
    this.dir = Math.floor(Math.random() * 140) + 200
}
Dot.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill()
};
Dot.prototype.link = function() {
    if (this.id == 0) {
        return
    }
    var previousDot1 = getPreviousDot(this.id, 1);
    var previousDot2 = getPreviousDot(this.id, 2);
    var previousDot3 = getPreviousDot(this.id, 3);
    if (!previousDot1) {
        return
    }
    ctx.strokeStyle = this.linkColor;
    ctx.moveTo(previousDot1.x, previousDot1.y);
    ctx.beginPath();
    ctx.lineTo(this.x, this.y);
    if (previousDot2 != false) {
        ctx.lineTo(previousDot2.x, previousDot2.y)
    }
    if (previousDot3 != false) {
        ctx.lineTo(previousDot3.x, previousDot3.y)
    }
    ctx.stroke();
    ctx.closePath()
};

function getPreviousDot(id, stepback) {
    if (id == 0 || id - stepback < 0) {
        return false
    }
    if (typeof dots[id - stepback] != "undefined") {
        return dots[id - stepback]
    } else {
        return false
    }
}
Dot.prototype.move = function() {
    this.a -= this.aReduction;
    if (this.a <= 0) {
        this.die();
        return
    }
    this.color = "rgba(255,255,255," + this.a + ")";
    this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
    this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed, this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed;
    this.draw();
    this.link()
};
Dot.prototype.die = function() {
    dots[this.id] = null;
    delete dots[this.id]
};
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    WIDTH, HEIGHT, mouseMoving = false,
    mouseMoveChecker, mouseX, mouseY, stars = [],
    initStarsPopulation = 80,
    dots = [],
    dotsMinDist = 2,
    maxDistFromCursor = 50;
setCanvasSize();
init();

function setCanvasSize() {
    WIDTH = document.documentElement.clientWidth, HEIGHT = document.documentElement.clientHeight;
    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT)
}
function init() {
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    for (var i = 0; i < initStarsPopulation; i++) {
        stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT))
    }
    ctx.shadowBlur = 0;
    animate()
}
function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (var i in stars) {
        stars[i].move()
    }
    for (var i in dots) {
        dots[i].move()
    }
    drawIfMouseMoving();
    requestAnimationFrame(animate)
}
window.onmousemove = function(e) {
    mouseMoving = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    clearInterval(mouseMoveChecker);
    mouseMoveChecker = setTimeout(function() {
        mouseMoving = false
    }, 100)
};

function drawIfMouseMoving() {
    if (!mouseMoving) {
        return
    }
    if (dots.length == 0) {
        dots[0] = new Dot(0, mouseX, mouseY);
        dots[0].draw();
        return
    }
    var previousDot = getPreviousDot(dots.length, 1);
    var prevX = previousDot.x;
    var prevY = previousDot.y;
    var diffX = Math.abs(prevX - mouseX);
    var diffY = Math.abs(prevY - mouseY);
    if (diffX < dotsMinDist || diffY < dotsMinDist) {
        return
    }
    var xVariation = Math.random() > 0.5 ? -1 : 1;
    xVariation = xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
    var yVariation = Math.random() > 0.5 ? -1 : 1;
    yVariation = yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
    dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
    dots[dots.length - 1].draw();
    dots[dots.length - 1].link()
}
function degToRad(deg) {
    return deg * (Math.PI / 180)
}
function setcursorbyid(id, cursorstyle) {
    if (document.getelementbyid) {
        if (document.getelementbyid(id).style) {
            document.getelementbyid(id).style.cursor = cursorstyle
        }
    }
}
$(document).ready(function() {
    function container_btn(){
        $(".stick").toggleClass(function() {
            return $(this).is(".open, .close") ? "open close" : "open"
        });
        
        var tinw = $(".tin-son-nav-wap").width();
        if(tinw==0){
            $(".tin-son-nav-wap").animate({width:'200px'});
            $(".tin-son-nav-wap-z").show();
        }else{
            $(".tin-son-nav-wap-z").hide();
            $(".tin-son-nav-wap").animate({width:'0px'});
        }
    }
    $(".container-btn").click(function() {
        
        container_btn();
       
    });
    $(".tin-son-nav-wap-z").click(function() {
        
        container_btn();
       
    });
    
    var cheight = $(".tin-protect .container").height();
    var winheight = $(window).height();
    if (cheight > (winheight - 100)) {
        $(".tin-footer").css("position", "inherit")
    }
    
    $("#sousou").click(function(){
       var $sousou = $(".sousou");
       $sousou.css('margin-top','280px');
       $sousou.toggle(); 
       $(".sousou-z").toggle();
       $sousou.stop().animate({
           marginTop:'300px'
       },400);
    });
    $(".sousou-z").click(function(){
       $(".sousou").toggle(); 
       $(this).toggle();
    });
});
$(function() {
    $("#viewer_img").viewer({
        navbar: false,
        button: true,
        toolbar: false,
        title: false
    });
    $("pre").addClass("line-numbers").css("white-space", "pre-wrap");
    window.onload = function() {
        $(".code-toolbar pre").before('<div class="pre-mac"><span></span><span></span><span></span></div>');
        $(".code-toolbar .toolbar-item .copy-to-clipboard-button>span").html("复制")
    };
    $(".toTop").on("click", function() {
        $(".tin-protect").animate({
            scrollTop: 0
        }, 300)
    });
    $(".tin-nf li").click(function() {
        var cl = $(this).data("nian");
        console.log(cl);
        $(".tin-protect").animate({
            scrollTop: $(".nian-" + cl).offset().top - 30
        }, 500)
    });
    $(".post-warp-content a").attr("target", "_blank")
});