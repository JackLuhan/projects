speller={
	init:function(n){//定义初始化方法
			this.hard=n;//定义难度属性
			this.step=this.useTime=0;//定义步数属性和显示时间属性
			this.blank=(n==21)?8:14;//定义空白位置属性
			this.createGrid();//执行createGrid()方法
			clearInterval(this.timer);//中止超时
			this.timer=setInterval(function(){//设置超时
				speller.useTime++;//累加时间
				document.getElementById("times").innerHTML=('0'+parseInt(speller.useTime/60)).slice(-2)+':'+('0'+speller.useTime%60).slice(-2);//格式化时间
			},1000);
	}
	,createGrid:function(){//定义createGrid()方法
		if(this.hard==21){//如果当前是一般模式
			//设置图块到左侧的距离
			var X=function(n){
				return n%3*100;
			}
			//设置图块到顶部的距离
			var Y=function(n){
				return parseInt(n/3)*100;
			}
			//定义图块数组
			for(var i=0,html=[];i<9;i++){
				html.push('<p onclick="speller.move(this);" id="'+i+'" class="'+i+'" style="left:'+X(i)+'px;top:'+Y(i)+'px;background-position:-'+X(i)+'px -'+Y(i)+'px;"></p>');
			}
			document.getElementById("shell").innerHTML=html.join('');//将图块布局到页面中
			this.ran();//执行ran()方法
		}else{//如果当前是困难模式
			//设置图块到顶部的距离
			var X=function(n){
				return n%5*100;
			}
			//设置图块到顶部的距离
			var Y=function(n){
				return parseInt(n/5)*100;
			}
			//定义图块数组
			for(var i=0,html=[];i<15;i++){
				html.push('<p onclick="speller.move(this);" id="'+i+'" class="'+i+'" style="left:'+X(i)+'px;top:'+Y(i)+'px;background-position:-'+X(i)+'px -'+Y(i)+'px;"></p>');
			}
			document.getElementById("shell").innerHTML=html.join('');//将图块布局到页面中
			this.ran();//执行ran()方法
		}
	}
	,ran:function(p){//定义ran()方法
		var ps=document.getElementById("shell").getElementsByTagName("P");//获取所有P元素
		var l=ps.length;//获取所有P元素个数
		var me=this;//将对当前对象的引用赋值给变量me
		ps[this.blank].style.display="none";//将最后一块拼图隐藏
		//随机获取和空白位置相邻的图块的编号
		var en=function(n){
			var arr=[];
			if(me.hard==21){
				if(n<8 && n%3!=2){
					arr.push(n+1);
				}
				if(n>0 && n%3!=0){
					arr.push(n-1);
				}
				if(n>2){
					arr.push(n-3);
				}
				if(n<6){
					arr.push(n+3);
				}
			}else{
				if(n<14 && n%5!=4){
					arr.push(n+1);
				}
				if(n>0 && n%5!=0){
					arr.push(n-1);
				}
				if(n>4){
					arr.push(n-5);
				}
				if(n<10){
					arr.push(n+5);
				}
			}
			return arr[parseInt(Math.random()*arr.length)]*1;
		}
		//获取图块所在的P元素
		var getp=function(n){
			for(var i=0;i<l;i++){
				if(ps[i].className==n){
					return ps[i];
				}
			}
		}
		//对图块随机进行移动
		for(var i=0;i<me.hard;i++){
			this.move2(getp(en(this.blank*1)));
		}
	}
	//定义使图块随机移动的move2()方法
	,move2:function(p){
		var pos=p.className*1,POS=this.blank*1,abs=Math.abs(pos-POS),max=pos>POS?pos:POS;
		if(this.hard==21){//如果当前是一般模式
			p.style.top=parseInt(POS/3)*100+"px";
			p.style.left=POS%3*100+"px";
			p.className=POS;this.blank=pos;
		}else{//如果当前是困难模式
			p.style.top=parseInt(POS/5)*100+"px";
			p.style.left=POS%5*100+"px";
			p.className=POS;this.blank=pos;
		}
	}
	//定义移动图块的move()方法
	,move:function(p){
		var pos=p.className*1;
		var POS=this.blank*1;
		var abs=Math.abs(pos-POS);
		var max=pos>POS?pos:POS;
		if(this.hard==21){//如果当前是一般模式
			if(abs==3){
				p.style.top=parseInt(POS/3)*100+"px";
			}else if(abs==1&&max%3!=0){
				p.style.left=POS%3*100+"px";
			}else{return;}
		}else{//如果当前是困难模式
			if(abs==5){
				p.style.top=parseInt(POS/5)*100+"px";
			}else if(abs==1&&max%5!=0){
				p.style.left=POS%5*100+"px";
			}else{return;}
		}
		p.className=POS;//将当前空白位置的编号赋值给移动的图块
		this.blank=pos;//将移动的图块编号定义为新的空白位置
		document.getElementById("steps").innerHTML=++this.step;//步数加1
		if(this.check()){//如果完成拼图
			if(this.hard==21){//如果当前是一般模式
				var last=document.getElementById("shell").getElementsByTagName("P")[8];//获取最后一块拼图
			}else{//如果当前是困难模式
				var last=document.getElementById("shell").getElementsByTagName("P")[14];//获取最后一块拼图
			}
			last.style.display="block";//显示最后一块拼图
			alert('你成功了!再来一次吧!');//弹出对话框
			this.init(document.getElementById("hard").value);//初始化拼图游戏
		}
	}
	//定义检测拼图是否完成的check()方法
	,check:function(){
		var p=document.getElementById("shell").getElementsByTagName("P");
		for(var i=0,l=p.length;i<l;i++){
			if(p[i].className!=p[i].id){
				return false;
			}
		}
		return true;
	}
}
speller.init(document.getElementById("hard").value);//初始化拼图游戏
//显示或隐藏原图
document.getElementById("showall").onclick=function(){
	document.getElementById("show").style.display=document.getElementById("show").style.display=="none"?"":"none";
}
//选择拼图游戏模式
document.getElementById("hard").onchange=function(){
	speller.init(this.value);
	if(this.value==21){//如果当前是一般模式
		document.getElementById("shell").style.width=299;
		document.getElementById("show").style.width=299;
	}else{//如果当前是困难模式
		document.getElementById("shell").style.width=499;
		document.getElementById("show").style.width=499;
	}
}
//document.all&&document.execCommand("BackgroundImageCache", false, true);