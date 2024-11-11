// tunnel code server noitu 1vs1

        ;
        (function ($) {
            $.fn.textfill = function (options) {
                var fontSize = options.maxFontPixels;
                var ourText = $('span:visible:first', this);
                var maxHeight = $(this).height();
                var maxWidth = $(this).width();
                var textHeight;
                var textWidth;
                do {
                    ourText.css('font-size', fontSize);
                    textHeight = ourText.height();
                    textWidth = ourText.width();
                    fontSize = fontSize - 1;
                } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
                return this;
            }
        })(jQuery);

        var currentWord = {
            text: "",
            tail: ""
        }
        var socket, room
        var currentTime
        var score = 0
        var timeInterval

        function formatSecond() {
            let minute = `${parseInt(currentTime / 60)}`
            if (minute.length < 2) minute = `0${minute}`
            let second = `${currentTime % 60}`
            if (second.length < 2) second = `0${second}`
            $('.time').html(`${minute}:${second}`)
        }

        function startTimer() {
            restartTimer()
            timeInterval = setInterval(() => {
                currentTime--
                formatSecond()
                if (currentTime <= 0) {
                    clearInterval(timeInterval)
                }
            }, 1000)
        }

        function restartTimer() {
            currentTime = 10
            formatSecond()
            if (timeInterval) {
                clearInterval(timeInterval)
            }
        }
        

        function bindWord(data) {
            let maxFontPixels = Math.min($(window).width() * 0.1, 100); // 10% of screen width, but not more than 100px

            $('.jtextfill').show().textfill({
                maxFontPixels: maxFontPixels
            });
            if (currentWord.text != data.text) {
                $('#currentWord').html(data.text)
                $("#head").html(data.tail)
                $('#text').val("").focus()
            }
            currentWord = data

        }

        function startGame() {
            confetti.stop()
            $('#username').hide()
            $('#group-text').hide()
            $('.jtextfill').hide()
            $('#noti > h3').html("Đang tìm kiếm đối thủ")
            $('#noti').show()
            $('.score').html(`(${score}) ${decodeURIComponent(Cookies.get("name2"))}`)

            socket = io("https://solo.noitu.pro");

            setTimeout(() => {
                socket.emit('queue', {
                    id: Cookies.get('id'),
                    name: decodeURIComponent(Cookies.get('name2'))
                });
            }, 2000)

            socket.on("end", (data) => {
                if (data && data.room == room) {
                    if (data.win) {
                        confetti.start()
                    }
                    restartTimer()
                    const intervalId = setInterval(() => {
  const playAgainButton = document.querySelector('.swal-button.swal-button--confirm');
  
  if (playAgainButton) {
    playAgainButton.click();
    clearInterval(intervalId); // Dừng việc kiểm tra sau khi nhấn nút
  }
}, 1000); // Kiểm tra mỗi giây
                    swal({
                        title: "Trò chơi kết thúc!",
                        text: data.win ? "Bạn đã dành chiến thắng" : "Bạn đã thua",
                        buttons: ["Trang chủ", "Chơi lại"],
                        icon: data.win == true ? "success" : "success",
                    }).then((playAgain) => {
                        let rand = Math.random()
                        if (playAgain) {
                            //runAd()
                            if(data.win==false)console.log("-1");
                            socket.close()
                            startGame()
                        } else {
                            startGame()
                        }
                    })
                }
                if (data && data.points) {
                    score = data.points
                }
            })
            socket.on("points", (data) => {
                score = data.points
                $('.score').html(`(${score}) ${decodeURIComponent(Cookies.get("name2"))}`)
            })
            socket.on("ready", (data) => {
                // clearTimeout(autoClose)
                room = data
                socket.emit('ready', data);
            })

            socket.on("play", (data) => {
                startTimer()
                
                let mee = decodeURIComponent(Cookies.get("name2")).length < 30 ? decodeURIComponent(Cookies.get("name2")) : decodeURIComponent(Cookies.get("name2")).slice(0, 27) + "..."
                let opponent = data.opponent.name.length < 30 ? data.opponent.name : data.opponent.name.slice(0, 27) + "..."
                $('.score').html(`<span class="elo">(${score})</span> ${mee} vs ${opponent} <span class="elo">(${data.opponent.points})</span>`)
                bindWord(data.word)
                if (data.isAnswer) {
                    $('#noti').hide()
                    $('#group-text').show()
                    $("#text").attr("disabled", false).focus()
                } else {
                    $('#group-text').hide()
                    $("#text").attr("disabled", true)
                    $('#noti > h3').html(`Đối thủ đang trả lời`)
                }
            })

            socket.on("answer", (data) => {
                startTimer()
                $('#noti').hide()
                $('#group-text').show()
                $("#text").attr("disabled", false).focus()
                bindWord(data.word)
            })
        }

        function editName() {
            $('#group-text').hide()
            $('#username').show()
            $('#noti').hide()
        }

        function startOrEditName() {
            if (Cookies.get('id') && Cookies.get("name2")) {
                startGame();
            } else {
                editName();
            }
        }
        $(document).ready(function () {

            $('#username').hide()
            $('#group-text').hide()
            $('.jtextfill').hide()

            scoreBoard()
            showAds(() => {
                if (Cookies.get('guideSolo')) {
                    startOrEditName()
                } else {
                    Cookies.set("guideSolo", "123", {
                        expires: 7
                    })
                    swal({
                        title: "Hướng dẫn",
                        text: "Chế độ 1vs1 là chế độ giúp người chơi có thể chơi nối từ trực tiếp với người khác. Trong vòng 10s, mỗi người chơi phải đưa ra từ nối chính xác cho từ mà đối thủ đưa ra. Nhập từ vào ô trả lời và ấn Enter để gửi đáp án! Nếu không thể trả lời hoặc hết thời gian, bạn sẽ thua!",
                        button: false,
                        icon: "info"
                    }).then(() => {
                        startOrEditName()
                    })
                }
            })


            $('#username').keydown(function (e) {
                if (e.keyCode == 13 && $('#username').val().trim() != "") {
                    Cookies.set("name2", encodeURIComponent($('#username').val()), {
                        expires: 365
                    })
                    if (!Cookies.get("id"))
                        Cookies.set("id", makeid(), {
                            expires: 365
                        })
                    startGame()
                }
            })

            $("#text").keydown(function (e) {
                if (e.keyCode == 13) {
                    if ($("#text").val() != "") {
                        let text = $("#head").html() + " " + $("#text").val()
                        let tail = ""
                        if (text.split(' ').length < 2 || currentWord.chuan == text.trim()
                            .toLowerCase()
                            .split('-').join(' ') || text.split(' ')[0].trim().toLowerCase() !=
                            currentWord.tail) {
                            $("#head").html(currentWord.tail)
                            $('#text').val("").focus()
                        } else {
                            startTimer()
                            socket.emit("answer", {
                                room,
                                word: text
                            })
                            $('#currentWord').html(text)
                            $('#group-text').hide()
                            $("#head").html($("#text").val().trim())
                            $("#text").val("").attr("disabled", true)
                            $('#noti > h3').html(`Đối thủ đang trả lời`)
                            $('#noti').show(``)
                        }

                    }

                }
            })
        });

        function titleCase(str) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                // You do not need to check if i is larger than splitStr length, as your for does that for you
                // Assign it back to the array
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            // Directly return the joined string
            return splitStr.join(' ');
        }
        
        
// end code server

// skip word
let check_skip = false;
function skip() {
  if (check_skip) return; // Không chạy nếu hàm đang thực thi
  check_skip = true;      // Đặt cờ khi hàm bắt đầu
            $.getJSON(`/init`, function (data) {
                    if (data.error) {
                        console.log(`Đã có lỗi xảy ra`)
                    } else {
                        bindWord(data)
                    }
                })
  check_skip = false;  // Đặt cờ về false khi hàm hoàn tất
        }
// end skip

let check_cheat = false;
// start cheating yeah
function cheat(){
  if (check_cheat) return; // Không chạy nếu hàm đang thực thi
  check_cheat = true;      // Đặt cờ khi hàm bắt đầu
  var currentWordElement = document.getElementById("currentWord");
var spanContent = currentWordElement.innerText; 

// console.log(spanContent); 
// fetch(`/answer?word=${encodeURIComponent(spanContent)}`)
//   .then(response => response.json())
//   .then(data => {
//     if(data.win==true){
//       skip();
//     }
//   })

// currentWordElement = document.getElementById("currentWord");
// spanContent = currentWordElement.innerText; 

fetch(`/answer?word=${encodeURIComponent(spanContent)}`)
  .then(response => response.json())
  .then(data => {
    const tailContent = data.nextWord.tail;

    const inputElement = document.getElementById('text');
    inputElement.value = tailContent;

    const form = inputElement.form; 
    if (form) {
      form.submit();
    } else {
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13 });
      inputElement.dispatchEvent(enterEvent);
    }
  })

check_cheat = false;  // Đặt cờ về false khi hàm hoàn tất
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let isRunning = false;
async function checkAndCheat() {
    if (isRunning) return; // Không chạy nếu hàm đang thực thi
    isRunning = true;      // Đặt cờ khi hàm bắt đầu
    // Vòng lặp vô hạn
    var inputElement = document.querySelector('input.form-control.input-lg.shadow-none#text');
    
    if (inputElement) {
        // Kiểm tra xem phần tử có hiện trên trang không
        var isVisible = inputElement.offsetWidth > 0 && inputElement.offsetHeight > 0 && window.getComputedStyle(inputElement).visibility !== 'hidden';

        if (isVisible) {
            var currentWordElement = document.getElementById("currentWord");
            var spanContent = currentWordElement.innerText;
            const response = await fetch(`/answer?word=${encodeURIComponent(spanContent)}`);
            const data = await response.json();

            if (data.win === true || data.success === false) {
                await skip(); // Đợi skip() hoàn thành ( trung bình 0.5 giây)
                await delay(1000);
                await cheat(); // Sau đó mới gọi cheat() ( trung bình 0.5 giây )
            } else {
                cheat();
                // if can't -> success = true   win = true
                // if can -> success = true   win = false
                // ngoại lệ -> success = false
            }
        }
    }
    isRunning = false;  // Đặt cờ về false khi hàm hoàn tất
}
async function startChecking() {
    console.log("Viết bởi PankozaVN")
    console.log("Chill và tận hưởng code <3")
    while (true) {
        await checkAndCheat();  // Đợi checkAndCheat() hoàn thành
        await delay(1000);      // Dừng 1 giây trước khi lặp lại
    }
}

startChecking(); // Bắt đầu vòng lặp
