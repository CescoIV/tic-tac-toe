// var a = [...document.querySelectorAll('.row')];


var x = 'url("images/swords.png")';
var o = 'url("images/cannonballs.png")';
var player = x;

function start(){
	var boxes = [...document.querySelectorAll('.box')];
	
	boxes.forEach((el)=>{
		el.addEventListener('click',onClick(event))
			// setPlayer(el,event);
	})
}

function onClick(i){
	setPlayer(this,i);
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
			return true;
		}
		player === x ? player = o : player = x;
		setText(player);
		msg.innerText = '';	
	}
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
	var boxes = [...document.querySelectorAll('.box')];

	for(var i=0;i<3;i++){
		var horizontal = checkHor(i,boxes,player);
		if(horizontal){
			return true;
		}else{
			return false;
		}	
	}
}

function checkHor(index,boxes,player){
	var first = boxes[index].style.backgroundImage;
	var second = boxes[index+3].style.backgroundImage;
	var third = boxes[index+6].style.backgroundImage;

	if(first === player && second === player && third === player){
		return true;
	}
	return false;
}