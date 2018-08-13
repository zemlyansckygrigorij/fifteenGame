

    var images = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15];
	//var images = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
	var countGame = -1;
	var countStep = 0;
	var countField = document.getElementById("countGame");
	var gameField = document.getElementById("game");
	var finishField = document.getElementById("finish");	
	var commandsField = document.getElementById("commands");


	//Запуск игры	
	game();

	//запуск новой игры
	function game(){
		countStep = 0;
		countGame++;
		resetFinish();
		// перемешивание элементов массива
		//images.sort(compareRandom);
		drawTable()	;
		drawCount();
	}

	//Возврат на исходные позиции
	function reset(){
		drawTable()	;
		countStep = 0;
		drawCount();
	}

	// нарисовать элемент подсчет игр и ходов
	function drawCount(){
		var child = "<p> Количество игр - "+countGame+"<br> Количество ходов - "+countStep+"</p>";
		countField.innerHTML = child;
	}


	// нарисовать элемент поля игры
	function drawTable(){
	  
		var table = "<table>";
		var k = 0;

		for( var  i = 1; i < 5; i++){	
			table = table + "<tr>";
			for( var j = 1; j < 5; j++){
				table = table + '<td id = "x'+j+ 'y'+i+'" onclick="move(this, '+j +','+i+')">';
				if(images[k] >0){
					table = table + '<img id = "'+ images[k] +'"  src="img/'+ images[k] +'.png" >';
				}
				
				table = table + '</td>'; 
				k++;
			}
			table = table + "</tr>";
		}
		table = table +  "</table>";
		gameField.innerHTML = table;
	}

	// получение массива в случайном порядке
	function compareRandom(a, b) {
		return Math.random() - 0.5;
	}

	// команда щелчка на элемента 
	function move(obj, x, y){
		
		this.x = x;
		this.y = y;
		this.obj = obj;
		checkRoute(this.obj,  this.x,  this.y);
		
		if(isFinish()){
			finish();
		}
	}


	// проверка направления движения
	function checkRoute(o ,x , y){
		this.x = x;
		this.y = y;
		this.o = o;
		
		// если щелчок  произошел на пустом поле
		if (o.childNodes.length == 0) { 
		   return ;
		}
		
		moveElement(o, x-1, y); //движение влево
		moveElement(o, x+1, y); //движение вправо
		moveElement(o, x, y-1); //движение вверх
		moveElement(o, x, y+1); //движение вниз	

	}


	function moveElement(obj, x, y){
		
		this.currentObject = obj;
		this.newY = y;
		this.newX = x;
		// проверка выхода за пределы таблицы
		if(y>0 & y<5 & x<5 & x>0){
			this.newObject = document.getElementById("x"+x+"y"+y);
			
			// проверка пустоты элемента
			if(newObject.childNodes.length == 0){
				// увеличение числа шагов и перерисовка элемента подсчета игр и ходов
				countStep++;
				drawCount();
				
				//обмен картинками между элементами таблицы
				newObject.appendChild(currentObject.childNodes[0]);
				currentObject.innerHTML = "";
			}		
		}
	}


	// проверка окончания игры
	function isFinish(){
	  // формируем массив id-s
		var currentImages =[];
		for( var  i = 1; i < 5; i++){	
			for( var j = 1; j < 5; j++){
				var Object = document.getElementById("x"+j+"y"+i);
				
				if(Object.childNodes.length > 0){
					currentImages.push(Object.childNodes[0].id);
				}else{
					currentImages.push(0);	
				}
			}
		}
		//проверяем расположение id-s (если по порядку то игра окончена) 
		for( var  i = 0; i < 15; i++){	
			if(i+1 != currentImages[i]){
				return ;
			}
		}	
		return true;
	}

	// удалить элементы countField ,gameField, commandsField
	// вставить элемент finishField
	function finish(){
		countField.classList.add("invisible")
		gameField.classList.add("invisible");
		commandsField.classList.add("invisible");
		finishField.classList.remove("invisible");
	}

	// удалить элемент finishField countField ,gameField, commandsField
	// вставить элементы  countField ,gameField, commandsField
	function resetFinish(){
		countField.classList.remove("invisible")
		gameField.classList.remove("invisible");
		commandsField.classList.remove("invisible");
		finishField.classList.add("invisible");
	}

