var x_score = 0;
var o_score = 0;
var x = 'url("images/swords.png")';
var o = 'url("images/cannonballs.png")';
var skull = 'url("images/skull.jpg")'
var player = x;
var boxes = [...document.querySelectorAll('.box')];
var res_button = document.querySelector('.reset')
var start_button = document.querySelector('.start');
var audio = document.querySelector('#intro');

window.onload = bgAudStart();
start_button.addEventListener('click', start);

res_button.addEventListener('click', function reset(){
	boxes.forEach((el)=>{
		el.style.backgroundImage='';
	})
	document.querySelector('.winner').innerHTML = '...';
	document.querySelector('h3').innerHTML = '...';
	res_button.style.display = 'none';
});

function start(){
	var rows = [...document.querySelectorAll('.row')];
	audio.pause();
	audio.currentTime =0;
	loopAudStart();
	start_button.style.display = 'none';
	rows.forEach((el)=>{
		el.style.display = 'block';
		el.addEventListener('click',function onClick(event){
			//if click on row AND div inside row, block gets executed
			if(event.target && event.target.nodeName == 'DIV'){
				setPlayer(event.target,event)
			}
		})
	})
}

function setPlayer(box, event){
	var msg = document.querySelector('h3');

	//if box has been marked, raise alert
	if(box.style.backgroundImage != ''){
		event.preventDefault();
		msg.innerText ="Click an empty spot matey!"
	}else{
		//Make the box background the player's img
		//check who player is, then switch to 'o' or 'x' player(pass the turn)
		box.style.backgroundImage = player;
		playSound(player);
		if(hasWon(player)){
			fillSkull();
			updateBoard(player);
			displayWinner(player);
		}
		player === x ? player = o : player = x;
		setText(player);
		msg.innerText = '';
		if(isFull()){
			event.preventDefault();
			document.querySelector('.winner').innerHTML =
				"Draw! And here I thought y' was worth me trouble!"
			msg.innerText = "Reset the game you Landlubber!";
			res_button.style.display = "block";
		}	
	}
}
function fillSkull(){
	boxes.forEach((el)=>{
		if(el.style.backgroundImage === ''){
			el.style.backgroundImage = skull;
		}
	})
}
function isFull(){
	for(var i=0;i<boxes.length;i++){
		if(boxes[i].style.backgroundImage === ''){
			return false;
		}
	}
	return true;
}

function setText(player){
	var msg = document.querySelector('h2');
	if(player === x){
		msg.innerText = "Swords up Lads!";
	}else{
		msg.innerText = "Cannons Ready to Fire!";
	}
}

function hasWon(player){
	for(var i=0;i<3;i++){
		var horizontal = checkHor(i,player);
		var vertical = checkVer(i,player);
		var diag = checkDiagUp(player) || checkDiagDown(player);
		if(horizontal || vertical || diag){
			console.log('ayylmao');
			return true;
		}	
	}
	return false;
}

function checkHor(index,player){
	var first = boxes[index].style.backgroundImage;
	var second = boxes[index+3].style.backgroundImage;
	var third = boxes[index+6].style.backgroundImage;

	if(first === player && second === player && third === player){
		return true;
	}
	return false;
}
function checkVer(index,player){
	index === 1 ? index +=2 : index;
	index === 2 ? index +=4 : index;
	var first = boxes[index].style.backgroundImage;
	var second = boxes[index+1].style.backgroundImage;
	var third = boxes[index+2].style.backgroundImage;

	if(first === player && second === player && third === player){
		return true;
	}
	return false;
}
function checkDiagUp(player){
	var up = [0,4,8];

	for(var i=0; i<3;i++){
		if(boxes[up[i]].style.backgroundImage != player){
			return false;
		}
	}
	return true;
}

function checkDiagDown(player){
	var down = [2,4,6];
	for(var i=0; i<3;i++){
		if(boxes[down[i]].style.backgroundImage != player){
			return false;
		}
	}
	return true;
}

function playSound(player){
	var audio = '';
	player === x ? audio = document.querySelector('#sword') : audio = document.querySelector('#cannon');
	audio.play();
}
function bgAudStart(){
	audio = document.querySelector('#intro');
	audio.play();
	return audio; 
}
function loopAudStart(){
	audio = document.querySelector('#loop');
	audio.play();
}
function displayWinner(player){
	if(player === x){
		document.querySelector('.winner').innerHTML =
		 "Swords win! looks like yer all out of gunpowder!";
	}else{
		document.querySelector('.winner').innerHTML =
		 "Cannon victory! Not so sharp eh? bringing swords to a gunfight!";
	}
}
function updateBoard(player){
	player === x ? x_score +=1 : o_score +=1;
	res_button.style.display = 'block';
	document.querySelector('.cannon').innerHTML = o_score;
	document.querySelector('.swords').innerHTML = x_score;
}