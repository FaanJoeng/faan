window.onload = function(){
	var username = document.getElementById('reg-username');
	var tips = document.getElementById('reg-tips');

	username.oninput = function(){
        tips.innerHTML = "hello";
        console.log('haha')
	} 

	username.onblur = function(){

	}
}