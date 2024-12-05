var socket, room
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function viettu(){
  var currentWordElement = document.getElementById("currentWord");
  var spanContent = currentWordElement.innerText;
  const inputElement = document.getElementById('text');
  inputElement.value = "đẽ";
  const form = inputElement.form;
  await delay(1000);
  const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13 });
  inputElement.dispatchEvent(enterEvent);
}

async function aura999(){
  $.getJSON(`https://raw.githubusercontent.com/kynguyen321/Rated-VNOI/refs/heads/main/cheto_noitu_pro/init.json`, function (data) {
  if (data.error) {
    console.log(`Đã có lỗi xảy ra`)
  } else {
    currentWord = data
            $('#currentWord').html(data.text)
            let maxFontPixels = Math.min($(window).width() * 0.1, 100); // 10% of screen width, but not more than 100px

            $('.jtextfill').show().textfill({
                maxFontPixels: maxFontPixels
            });
            $("#head").html(data.tail)
            $('#text').val("").focus()
            //$('.live-count').html(currentSkip)
  }
})

  // điền từ
  // const form = inputElement.form;
  // const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13 });
  // inputElement.dispatchEvent(enterEvent);
}

async function todo(){
  await delay(1000);
  aura999();
  await delay(1000);
  viettu();
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
                todo();
            }
            currentWord = data
        }
        
socket = io("https://solo.noitu.pro");
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
                    todo();
                } else {
                    $('#group-text').hide()
                    $("#text").attr("disabled", true)
                    $('#noti > h3').html(`Đối thủ đang trả lời`)
                }
            })
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
}, 3000); // Kiểm tra mỗi giây
                    swal({
                        title: "Trò chơi kết thúc!",
                        text: data.win ? "Bạn đã dành chiến thắng" : "Bạn đã thua",
                        buttons: ["Trang chủ", "Chơi lại"],
                        icon: data.win == true ? "success" : "error",
                    }).then((playAgain) => {
                        let rand = Math.random()
                        if (playAgain) {
                            //runAd()
                            socket.close()
                            startGame()
                        } else {
                            window.location = "/"
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
                    todo();
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
