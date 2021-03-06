(function(window, document, undefined) {
    var hearts = [];
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            setTimeout(callback, 1000 / 60)
        }
    })();
    init();

    function init() {
        css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
        attachEvent();
        gameloop()
    }

    function gameloop() {
        for (var i = 0; i < hearts.length; i++) {
            if (hearts[i].alpha <= 0) {
                document.body.removeChild(hearts[i].el);
                hearts.splice(i, 1);
                continue
            }
            hearts[i].y--;
            hearts[i].scale += 0.004;
            hearts[i].alpha -= 0.013;
            hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color
        }
        requestAnimationFrame(gameloop)
    }

    function attachEvent() {
        var old = typeof window.onclick === "function" && window.onclick;
        window.onclick = function(event) {
            old && old();
            createHeart(event)
        }
    }

    function createHeart(event) {
        var d = document.createElement("div");
        d.className = "heart";
        hearts.push({
            el: d,
            x: event.clientX - 5,
            y: event.clientY - 5,
            scale: 1,
            alpha: 1,
            color: randomColor()
        });
        document.body.appendChild(d)
    }

    function css(css) {
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css))
        } catch (ex) {
            style.styleSheet.cssText = css
        }
        document.getElementsByTagName("head")[0].appendChild(style)
    }

    function randomColor() {
        return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")"
    }
})(window, document);
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState == "hidden") {
        normal_title = document.title;
        document.title = "(づ￣ 3￣)づ记得回来找HDQ噢~"
    } else {
        document.title = normal_title
    }
});
if (window.console && window.console.log) {
    console.log("版权所有：http://www.hdqyf.club");
    console.log("官方微博：https://weibo.com/u/5470832383?refer_flag=1005055010_");
    console.log(" _(:3」∠)_ HDQ只是一枚小白，求大神不要黑")
}
var d = "<div class='maple'>❄️<div>";
setInterval(function() {
    var f = $(document).width();
    var e = Math.random() * f;
    var o = 0.2 + Math.random();
    var fon = 20 + Math.random() * 10;
    var l = e - 100 + 200 * Math.random();
    var k = 8000 + 5000 * Math.random();
    var deg = Math.random() * 360;
    $(d).clone().appendTo(".maplebg").css({
        left: e + "px",
        opacity: o,
        transform: "rotate(" + deg + "deg)",
        "font-size": fon
    }).animate({
        top: "550px",
        left: l + "px",
        opacity: 0.1,
    }, k, "linear", function() {
        $(this).remove()
    })
}, 1888);
var simpleAlert = function(opts) {
    var opt = {
        "closeAll": false,
        "content": "",
        "buttons": {}
    };
    var option = $.extend(opt, opts);
    var dialog = {};
    var $simpleAlert = $('<div class="simpleAlert">');
    var $shelter = $('<div class="simpleAlertShelter">');
    var $simpleAlertBody = $('<div class="simpleAlertBody">');
    var $simpleAlertBodyClose = $('<img class="simpleAlertBodyClose" src="https://s1.ax1x.com/2018/04/27/C3teeI.png" height="14" width="14"/>');
    var $simpleAlertBodyContent = $('<p class="simpleAlertBodyContent">' + option.content + "</p>");
    dialog.init = function() {
        $simpleAlertBody.append($simpleAlertBodyClose).append($simpleAlertBodyContent);
        var num = 0;
        var only = false;
        var onlyArr = [];
        for (var i = 0; i < 2; i++) {
            for (var key in option.buttons) {
                switch (i) {
                    case 0:
                        onlyArr.push(key);
                        break;
                    case 1:
                        if (onlyArr.length <= 1) {
                            only = true
                        } else {
                            only = false
                        }
                        num++;
                        var $btn = $('<button class="simpleAlertBtn simpleAlertBtn' + num + '">' + key + "</button>");
                        $btn.bind("click", option.buttons[key]);
                        if (only) {
                            $btn.addClass("onlyOne")
                        }
                        $simpleAlertBody.append($btn);
                        break
                }
            }
        }
        $simpleAlert.append($shelter).append($simpleAlertBody);
        $("body").append($simpleAlert);
        $simpleAlertBody.show().animate({
            "marginTop": "-128px",
            "opacity": "1"
        }, 300)
    };
    $simpleAlertBodyClose.bind("click", function() {
        option.closeAll = false;
        dialog.close()
    });
    dialog.close = function() {
        if (option.closeAll) {
            $(".simpleAlert").remove()
        } else {
            $simpleAlertBody.animate({
                "marginTop": "-188px",
                "opacity": "0"
            }, 200, function() {
                $(".simpleAlert").last().remove()
            })
        }
    };
    dialog.init();
    return dialog
};