//create a board table with size m x n
//create random cell for the table with m rows and n columns
//create cells and its neighbour
//recalculate cells and its neighbours
//create rules based on cell state

var convayGame = (function(){
	var rowValue = 5;
	var columnValue = 5;
	var row = [];
	var column = [];
	function initializeBoard(){
		for(var i = 0;i<rowValue;i++){
			column = [];
			for(var j = 0;j<columnValue;j++){
				//Creating board with random Value;
				column[j]=Math.round(Math.random());
			}
			row[i]=column;
		}
		renderBoard(row);
		// console.log("Board : ",JSON.stringify(row));
	}
	function getNeighboursStates(x,y){
		var alive = 0;
		var dead = 0;
		var cell;
		for(var i=x-1;i<=x+1;i++){
			for(var j=y-1;j<=y+1;j++){
				if(x == i  &&  y == j){
				} else{
					cell = getCellValue(i,j,1);
					if(cell){
						alive++;
					} else{
						dead++;
					}
				} 
			}
		}
		return{
			alive:alive,
			dead:dead
		}
	}
	function getCellValue(x,y,f){
		if(x <= (-1) || y <= (-1)){
			if(f){
				//console.info("x y value",x,y,0);
			}
			return 0;
		}else if(x >= rowValue  ||  y >= columnValue){
			if(f){
				//console.info("x y value",x,y,0);
			}
			return 0;
		}else{
			if(f){
				//console.info("x y row",x,y,row[x][y]);
			}
			return row[x][y];
		}
	}
	function run(){
		var newStateValue = [];
		for(var i = 0;i<rowValue;i++){
			newStateValue[i] = [];
			for(var j = 0;j<columnValue;j++){
				var neighbours = getNeighboursStates(i,j);
				//console.log("Cell Number: ",i+1,j+1);
				var oldValue = getCellValue(i,j);
				var newValue;
				newValue = newStateValue[i][j] = rule(oldValue,neighbours.dead,neighbours.alive);
				if(newValue!=oldValue)
					refreshCell(i,j,newStateValue[i][j]?'alive':'dead');
			}
		}
		row = newStateValue;
		//console.log("New State",JSON.stringify(newStateValue));
		// console.log("New State",JSON.stringify(row));
		// refreshBoard(row);
	}
	function rule(cellValue,dead,alive){
		//console.log("Cell Value :",cellValue,"dead :",dead,"alive :",alive);
		if(cellValue){
			if(alive==2||alive==3){
				// console.log("Next State Value 1: ",1);
				return 1;
			} else{
				// console.log("Next State Value 2: ",0);
				return 0;
			}
		} else{
			if(alive==3){
				// console.log("Next State Value 3: ",1);
				return 1;
			} else{
				// console.log("Next State Value 4: ",0);
				return 0;
			}
		}
	}
	function renderBoard(row){
		var board = '';
		for(var i=0; i<row.length; i++){
			board += '<div class="row">'
			for(var j=0;j<row[i].length;j++){
				var className = "dead";
				if(row[i][j]) className = "alive";
				board += '<span class="cell cell-'+i+'-'+j+' '+className+'"></span>';
			}
			board += '</div>';	
		}
		delete board,i,j,row,className;
		// console.log(document.getElementById('container'));
		document.getElementById('container').innerHTML = board;
	}

	function refreshCell(i,j,className){
		var cName = 'cell-'+i+'-'+j;
		var cellAlive = document.getElementsByClassName(cName);
			cellAlive[0].className = 'cell cell-'+i+'-'+j+' '+className;
		delete cellAlive,cName;
	}
	return {
		createBoard:function(m,n){
			if(arguments.length!=2){
				throw "Illegal Argument length";
				return;
			}
			rowValue = m;
			columnValue = n;
			initializeBoard();
		},
		nextState:function(){
			run();
		},
		reinitialize:function(){
			initializeBoard();
		}
	}
}());
