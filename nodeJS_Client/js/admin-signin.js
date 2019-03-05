	// const userName = document.getElementById("usernamee").text;
            // const password = document.getElementById("passwordd").text;
            let but = document.getElementById("presslogin")
            but.addEventListener("click",function () {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                    console.log(this.response);
                  }
                };
                xhttp.open("POST", "http://192.168.1.90:5000/admin");
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send(JSON.stringify(
                    {
                  "email":document.getElementById("usernamee").value,
                  "password":document.getElementById("passwordd").value
            }
            )
            );
              });
            