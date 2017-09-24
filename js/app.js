// var a = [...document.querySelectorAll('.row')];


var x = 'url("images/swords.png")';
var o = 'url("images/cannonballs.png")';
var skull = 'url("images/skull.jpg")'
var player = x;
var boxes = [...document.querySelectorAll('.box')];

function start(){
	var rows = [...document.querySelectorAll('.row')];
	
	rows.forEach((el)=>{
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
		
		if(hasWon(player)){
			console.log('ayylmao');
			fillSkull()
		}
		player === x ? player = o : player = x;
		setText(player);
		msg.innerText = '';	
	}
	if(isFull()){
		event.preventDefault();
		msg.innerText = "Reset the game you Landlubber!"
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

function setText(player, won = false){
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
		if(horizontal){
			console.log('ayylmao');
			return true;
		}	
	}
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