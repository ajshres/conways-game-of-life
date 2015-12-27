convayGame.createBoard(40,40);

var button = document.getElementById('run');
button.addEventListener('click',function(){
	convayGame.nextState();
});

var initGame = document.getElementById('initGame');
initGame.addEventListener('click',function(){
	convayGame.createBoard(40,40);
});