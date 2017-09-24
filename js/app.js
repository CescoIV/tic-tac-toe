// var a = [...document.querySelectorAll('.row')];


var x = "url('images/swords.png')"
var o = "url('images/cannonballs.png')"
var player = x;
function start(){
	var rows = [...document.querySelectorAll('.row')];
	
	rows.forEach((row)=>{
		row.addEventListener('click',(el)=>{
			//if click on row AND div inside row
			if(el.target && el.target.nodeName == 'DIV'){
				setPlayer(el.target,el);
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
		player === x ? player = o : player = x;
		setText(player);
		msg.innerText = '';	
	}
}

function setText(player){
	var msg = document.querySelector('h2');

	if(player === x){
		msg.innerText = "Swords up Lads!";
	}else{
		msg.innerText = "Cannons Ready to Fire!";
	}
}

