function GetSide(m,n){
	var resultArr=[];//定义坐标数组
	var tempX=0;//定义转动光标横坐标
    var tempY=0;//定义转动光标纵坐标
    var direction="RightDown";//定义初始转动方向
	while(tempX>=0 && tempX<n && tempY>=0 && tempY<m){
		resultArr.push([tempY,tempX]);//添加数组元素
		if(direction=="RightDown"){//如果光标向右或向下转动
			if(tempX==n-1){
				tempY++;
			}else{
				tempX++;
			}
			if(tempX==n-1&&tempY==m-1){
				direction="LeftUp"
			}
		}else{//如果光标向左或向上转动
			if(tempX==0){
				tempY--;
			}else{
				tempX--;
			}
			if(tempX==0&&tempY==0){//如果横纵坐标都为0则结束循环
				break;
			}
		}
	}
	return resultArr;//返回坐标数组
}
var index=0;           //转动光标当前索引
var prevIndex=0;          //转动光标前一位置索引
var Speed=300;           //初始速度
var Time;        //设置超时返回的ID
var Light;//设置超时返回的ID
var arr = GetSide(5,5);         //初始化数组
var SlowIndex=0;           //变慢位置索引
var EndIndex=0;//结束转动位置索引
var tb = document.getElementById("tb");     //获取表格对象 
var cycle=0;           //计算转动第几圈
var EndCycle=2;           //转动的圈数
var flag=false;           //结束转动标志 
var quick=0;           //控制加速
var btn = document.getElementById("btn1");//获取抽奖按钮
var resultDiv;//显示结果的元素
var selected;//结束转动位置的单元格
function StartGame(){
	if(document.getElementById("prizeDiv")){//如果存在该元素
		document.body.removeChild(resultDiv);//移除元素
	}
	clearInterval(Time);//取消超时设置
	clearInterval(Light);//取消超时设置
	cycle=0;//圈数重新设置为0
	flag=false;
	SlowIndex=Math.floor(Math.random()*16);//随机获取变慢位置索引
	Time = setInterval(Star,Speed);//设置超时
}
function Star(num){
	if(index>=arr.length){//如果转动光标当前索引大于等于数组长度
		index=0;//转动光标索引重新设置为0
		cycle++;//转动圈数加1
	}
	if(flag==false){
		if(quick==5){//走5格开始加速
			clearInterval(Time);//取消超时设置
			Speed=50;//速度加快
			Time=setInterval(Star,Speed);//设置超时
		}
		//如果到达指定圈数并且当前光标索引等于变慢位置索引
		if(cycle==EndCycle && index==parseInt(SlowIndex)){
			clearInterval(Time);//取消超时设置
			Speed=300;//速度变慢
			flag=true;       //触发结束			 
			Time=setInterval(Star,Speed);//设置超时
		}
	}
	tb.rows[arr[index][0]].cells[arr[index][1]].className="light1";//设置转动光标所在单元格样式
	if(index>0){//如果转动光标索引大于0
		prevIndex=index-1;//获取前一位置索引
	}else{//如果转动光标索引等于0
		prevIndex=arr.length-1;//获取前一位置索引
	}
	tb.rows[arr[prevIndex][0]].cells[arr[prevIndex][1]].className="playnormal";//设置前一单元格样式
	if(parseInt(SlowIndex)+5<arr.length){//如果变慢位置索引加5小于数组长度
		EndIndex=parseInt(SlowIndex)+5;//获取结束转动位置索引
	}else{//如果变慢位置索引加5大于等于数组长度
		EndIndex=parseInt(SlowIndex)+5-arr.length;//获取结束转动位置索引
	}
	if(flag==true && index==EndIndex){ //如果结束转动标志为true并且转动光标索引等于结束转动位置索引
		quick=0;
		clearInterval(Time);//取消超时设置
		setTimeout(showResult,100);//设置超时并显示抽奖结果
	}	
	index++;//转动光标索引加1
	quick++;
}
function showResult(){
	selected=tb.rows[arr[EndIndex][0]].cells[arr[EndIndex][1]];//获取结束转动位置的单元格
	resultDiv = document.createElement("div");//创建div元素
	resultDiv.id="prizeDiv";//设置元素id
	resultDiv.className = "prizeDiv";//为div设置class属性值
	var prize=selected.firstChild.title;//获取抽中的奖品
	if(prize!="感谢您的参与"){
		resultDiv.innerHTML = "恭喜您获得"+prize;//显示的内容
	}else{
		resultDiv.innerHTML = prize;//显示的内容
	}
	document.body.appendChild(resultDiv);//向body中添加div元素
	Light=setInterval(flash,100);
}
function flash(){//设置光标闪烁效果
	if(selected.className=="light1"){//如果结束转动位置的单元格class属性值为light1
		selected.className="light2";//设置class属性值为light2
	}else{
		selected.className="light1";//设置class属性值为light1
	}
}