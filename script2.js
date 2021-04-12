

  
var start_btn = document.getElementById("start_btn");
var main_menu = document.getElementById("main_menu");
var game_started_menu = document.getElementById("game_started_menu");
var game_end = document.getElementById("game_end");
var timer = document.getElementById("timer");
var baloon_area = document.getElementById("baloon_area");
var end_game_container = document.getElementById("end_game_container");
var end_game = document.getElementById("end_game");
var start_again2 = document.getElementById("start_again2");
var root = document.getElementById("root");
var Colors = ["red", "blue", "yellow", "green", "violet", "orange", "white", "floralwhite"];
var mm = 59;
var array_of_balloons = [];
var global_blown = 0;
var global_passed = 0;

function start_clocks () {
    
    timer.innerHTML = "1:00";
    clock = setInterval(()=> {
        if (mm <= 0) {
            clearInterval(clock);
            timer.innerHTML = "0:00";

            
            game_started_menu.classList.add("hidden");
            end_game_container.classList.remove("hidden");
            start_again2.classList.remove("hidden");
            root.classList.add("hidden");
            var all_balloons = document.getElementsByClassName("balloon1");
            for (let i = 0; i < all_balloons.length; i++) {
                all_balloons[i].remove();
            }
            end_game.innerHTML = "<pre>Game Over.\n Passed balloons:" + global_passed + "\nBlown balloons: " + global_blown + "</pre>";
            
        }
        else if (mm <= 9 && mm > 0) {
            timer.innerHTML = "0:0" + mm;
            mm = mm - 1;
        }
        else {
            timer.innerHTML = "0:" + mm;
            mm = mm - 1;
        }
    }, 1000)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function create () {
    var radius = getRandomInt(15, 51) + "px";
    var color = Colors[getRandomInt(0, 8)];
    var border_radius = parseInt(radius);
    
    var top = "680px";

    var theCSSprop = window.getComputedStyle(game_started_menu, null).getPropertyValue("width");
    
    var left = getRandomInt(10, parseInt(theCSSprop)-20) + "px";
    
    var random_balloon = document.createElement("div");
    baloon_area.append(random_balloon);
    random_balloon.classList.add("baloon1");
   
    
    random_balloon.style.cssText = "background-color: " + color + "; " + "width: " + radius + "; " + "height: "+ radius + "; " + "border-radius: " + border_radius + "px" + ";"; 
    random_balloon.style.top = top;
    random_balloon.style.left = left;

    return random_balloon;

}

function calc_width (left, width, offset) {
    var t_left =  parseInt(left);
    var t_width = parseInt(width);
    var t_offset = parseInt(offset) + 5;
    
    
    if (t_offset >= t_left && t_offset <= (t_left + t_width)) {
        return true;
    }
    else {
        return false;
    }
}

function calc_height (top) {
    var t_top = parseInt(top);
    
    if (t_top <= 10 && t_top >= 5) {
        return true;
    }
    else {
        return false;
    }
}

var blown = document.getElementById("blown");
var passed = document.getElementById("passed");

function blast (speed) {
    //создаем шар
    var balloon = create();

    // непрерывные проверки
    var motion = setInterval(() => {
        // Подъем шариков
        if (parseInt(balloon.style.top) >= -80){
            let tmp_top = parseInt(balloon.style.top) - 1;
            balloon.style.top = tmp_top.toString() + "px";  
        }
        // Проверка на соприкосновение с кончиком иглы
        if (calc_width(balloon.style.left, balloon.style.width, needle.style.left) && calc_height(balloon.style.top)) {
            console.log("blow!");
            balloon.remove();
            global_blown = global_blown + 1;
            blown.innerHTML = "Blown balloons: " + global_blown;
            clearInterval(motion);
        }
        // Шарик вылетел за верхнюю границу (пропущен)
        if (parseInt(balloon.style.top) < -80){
            
            console.log("ok");
            balloon.remove();
            global_passed = global_passed + 1;
            passed.innerHTML = "Passed balloons: " + global_passed;
            clearInterval(motion);
        }
    }, speed);
}

// рандомайзер скорости подъема
// вначале не быстро, потом быстрее
function calc_speed () {
    var speed = 30 - (59 - mm);
    speed = speed + getRandomInt(1, 30);
     if (speed <= 0) {
         speed = 1;
     }
    return speed;
}

// вызываем функцию создания и взаимодействия с шариком
function call_blast (count) {
    if (count <= 0) {

    }
    else {
        for (let i = 0; i < count; i++) {
            blast(calc_speed());
        }
    }
}

// старт игры
function start_game() {
    // каждую секунду создаем шар
    var rand = setInterval(() => {
        // прекратить если времение не осталось
        if (mm <= 0) {
            
            clearInterval(rand);
        }
        //продолжаем если время еще есть
        // кол-во шариков рандомится и зависит от времени
        else {
            
            let amount = 59 - mm;
            if (amount > 3) {
                amount = getRandomInt(2, 4);
            }
            call_blast(amount);
        }
    }, 1000)
}

// обработчик кнопки старта игры
start_btn.addEventListener('click', () => {
    main_menu.classList.toggle("hidden");
    game_started_menu.classList.toggle("hidden");
    blown.classList.toggle("hidden");
    passed.classList.toggle("hidden");
    start_clocks();
    start_game();
});

// просто перезагружаем страницу при нажатии на "начать сначала"
start_again.addEventListener('click', () => {
    clearInterval(clock);
    location.reload();
})
// просто перезагружаем страницу при нажатии на "начать сначала"
start_again2.addEventListener('click', () => {
    clearInterval(clock);
    location.reload();
})

var needle = document.getElementById("needle");
// обработка движения иглы - игла следит за курсором если тот находится
// в пределах блока с игрой
document.querySelector('.game_started_menu').onmousemove = function(event) {
    event = event || window.event;
    needle.style.left = event.offsetX + "px";
}


