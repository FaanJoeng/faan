window.onload = function(){
	var regBox = document.getElementById('register-box');
	var loginBox = document.getElementById('login-box');
	var username = document.getElementById('reg-username');
	var pass= document.getElementById('reg-pass');
	var passConfirm = document.getElementById('reg-pass-confirm');
	var tips = document.getElementById('reg-tips');
    var switchBtn = document.getElementById('switchToLogin');
    var submitBtn = document.getElementById('submit');

	username.oninput = function(){
        tips.innerHTML = "Notice:Username must contain at least 6 and no more than 10 letters or numbers";
	} 

	username.onblur = function(){
        var xhr = new XMLHttpRequest();
        var rege = /[a-zA-Z0-9]{6,10}/;

        if(rege.test(username.value)){
        	xhr.onload = function(){
	            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
	            	var message = JSON.parse(xhr.responseText);
	            	tips.innerHTML = message.msg;
	            	if(message.msg === 'Username available'){
	            		tips.style.color = 'green';
	            	}
                }
            }
            xhr.open('get', 'register/search?username=' + username.value, true);
            xhr.send();
        }else{
        	tips.style.color = '#f5683d';
        	tips.innerHTML = "Notice:Username must combine numbers with letters,no more than 10 characters";
        }
        
	}

	pass.oninput = function(){
		tips.style.color = '#f5683d';
		tips.innerHTML = "Notice : 6 numbers only.";
	}

	pass.onblur = function(){
		var rege = /\d{6}/;
		if(!rege.test(pass.value)){
            tips.innerHTML = "Notice : 6 numbers only.";
		}
	}

	passConfirm.onblur = function(){
		if(pass.value !== this.value){
			tips.innerHTML = "Please confirm your password again.";
		}else if(passConfirm.value !== ' '){
			tips.innerHTML = " ";
            submit.removeAttribute('disabled');
		}
	}

	switchBtn.onclick = function(){
		regBox.style.display = "none";
        loginBox.style.display = "block";
	}



}