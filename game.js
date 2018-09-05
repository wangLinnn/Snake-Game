			//自调用函数---游戏对象
			(function(){
				var that=null; //划重点
				//游戏的构造函数
				function Game(map){
					this.food=new Food();//食物对象
					this.snake=new Snake();//小蛇对象
					this.map=map;//地图
					that=this;        //划重点
				}
				Game.prototype.init=function(){
					//初始化游戏
					this.food.init(this.map);
					this.snake.init(this.map);
					//调用自动移动小蛇的方法
					this.runSnake(this.food,this.map);
					//调用用户按键的方法
					this.bindKey();
				}
				
				//添加原型方法---设置小蛇可以自动的移动
				Game.prototype.runSnake=function(food,map){
					//自动的去移动
					var timeId=setInterval(function(){
						//移动小蛇
						this.snake.move(food,map);
						//初始化小蛇
						this.snake.init(map);
						//横纵坐标的最大值
						var maxX=map.offsetWidth/this.snake.width;
						var maxY=map.offsetHeight/this.snake.height;
						//小蛇的头的坐标
						var headX=this.snake.body[0].x;
						var headY=this.snake.body[0].y;
						//判断撞墙时的动作
						if(headX<0||headX>=maxX){
							clearInterval(timeId);
							alert("游戏结束");
						}
						if(headY<0||headY>=maxY){
							clearInterval(timeId);
							alert("游戏结束");
						}
					}.bind(that),150);
				};
				
				//添加原型方法---设置用户按键，改变小蛇的移动方向
				Game.prototype.bindKey=function(){
					//获取用户的按键，改变小蛇的方向
					document.addEventListener("keydown",function(e){
						//获取按键的值
						switch (e.keyCode){
							case 37:this.snake.direction="left";break;
							case 38:this.snake.direction="top";break;
							case 39:this.snake.direction="right";break;
							case 40:this.snake.direction="bottom";break;
						}
					}.bind(that),false)
				};
				
				
				//把Game暴露给window，外部就可以访问Game对象了
				window.Game=Game;
			})();