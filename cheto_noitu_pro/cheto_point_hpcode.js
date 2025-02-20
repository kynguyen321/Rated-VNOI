var userInput = prompt("Vui lòng nhập một bội số của 5:");
        var multipleOfFive = Number(userInput);

        if (isNaN(multipleOfFive) || multipleOfFive % 5 !== 0) {
            alert("Đầu vào không hợp lệ. Vui lòng nhập một bội số của 5.");
        } else {
            var loopCount = multipleOfFive / 5;
            var i = 0;

            function sendRequest() {
                if (i < loopCount) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://hpcode.edu.vn/getdocx/?idp=qua', true);

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            // Do nothing with the response
                        }
                    };

                    xhr.send();

                    i++;
                    setTimeout(sendRequest, 4000); // Wait for 2 seconds before sending the next request
                }
            }

            sendRequest(); // Start the recursive function
        }
