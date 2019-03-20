var date = new Date().toString();
var year = parseInt(date.split(" ")[3]);
var month = date.split(" ")[1];
var today = parseInt(date.split(" ")[2]);
var weeks = date.split(" ")[0];
var month_list = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    month = month_list.indexOf(month)+1;
var week_sym = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

var firstDay;
var thisDate;
var now;
var flag = 0;  //switchState函数的标志位
var flagN = 0;
var flagS = 0;
var timeStamp;
var myStorage = localStorage;


//dom动态生成html结构 

var outer = document.getElementsByClassName("outer")[0];
var container = document.createElement("div");
    container.className="container";
    outer.appendChild(container);
var logo = document.createElement("div");
    logo.className="logo";
    container.appendChild(logo);
var logoImg = document.createElement("img");
    logoImg.setAttribute("src","image/calender_logo");
    logoImg.setAttribute("class","logoImg");
    logo.appendChild(logoImg);    
var header = document.createElement("div");
    header.setAttribute("class","header");
var week_bar = document.createElement("div");
    week_bar.setAttribute("class","week-bar");
var day = document.createElement("div");
    day.setAttribute("class","day");
    container.appendChild(header);
    container.appendChild(week_bar);
    container.appendChild(day);
var header_span;  


    // outer.appendChild(container);  
// 创建日期网格的函数
function createDay(){
	for(var i = 0;i < 42;i++){
	 	var day_span = document.createElement("span");
	 	if(i%7==0){
	 		day_span.setAttribute("class","D center sunday");
	 		// day_span.setAttribute("index",i);
		    day.appendChild(day_span);
	 	}else if(i==6||i==13||i==20||i==27||i==34||i==41){
	 		day_span.setAttribute("class","D center saturday");
	 		// day_span.setAttribute("index",i);
		    day.appendChild(day_span);
	 	}else if(i%2==0){
	 		day_span.setAttribute("class","D center date1");
	 		// day_span.setAttribute("index",i);
		    day.appendChild(day_span);
	 	}else{
	 		day_span.setAttribute("class","D center date2");
	 		// day_span.setAttribute("index",i);
		    day.appendChild(day_span);
	 	}
	}
};

// 创建头部网格的函数
function createHeader(){
	var sym = ["<<","<"," "," ",">",">>"];
	for(var k=0;k<6;k++){
		header_span = document.createElement("span");
		if(k==2){
			header_span.setAttribute("class","center year");
			header_span.innerHTML=year;
			header.appendChild(header_span);
		}else if(k==3){
			header_span.setAttribute("class","center month");
			header_span.innerHTML=month;
			header.appendChild(header_span);
		}else{
			header_span.setAttribute("class","center btn");
			header_span.innerHTML=sym[k];
			header.appendChild(header_span);
		}
	}
};

// 创建星期网格的函数
function createWeek(){
	for(var j=0;j<7;j++){
		var week_span = document.createElement("span");
		week_span.setAttribute("class","center");
		week_span.innerHTML=week_sym[j];
		week_bar.appendChild(week_span);
	}
};

// 绘制日历网格函数
	createDay();
	createHeader();
	createWeek();

// 更新年份
function modify_year(){
	header_span = document.createElement("span");
	header_span.setAttribute("class","center year");
	header_span.innerHTML=year;
	header.replaceChild(header_span,year_tab);
	year_tab = document.getElementsByClassName('year')[0]
}

function pre_Year(){
	if(document.getElementById("today")){
		removeToday();
	}
	if((firstDay-((365+if_leap(year))%7))>=0){
		firstDay = firstDay-((365+if_leap(year))%7);
	}else if(firstDay-((365+if_leap(year))%7)<0){
		firstDay = firstDay-((365+if_leap(year))%7)+7;
	}
	year -= 1; 
	if_leap(year);
	day_in_month = [31,28+if_leap(year),31,30,31,30,31,31,30,31,30,31];
	modify_year();
	for(var i = 0;i < 42;i++){
		day_tab[i].innerHTML = " ";
	}
	print_Date(month);
	flagN = 0;
}
   
function next_Year(){
	if(document.getElementById("today")){
		removeToday();
	}
	firstDay = (firstDay+(365+if_leap(year+1)))%7;
	year += 1; 
	if_leap(year);
	day_in_month = [31,28+if_leap(year),31,30,31,30,31,31,30,31,30,31];
	modify_year();
	for(var i = 0;i < 42;i++){
		day_tab[i].innerHTML = " ";
	}
	print_Date(month);
	flagN = 0;
}

//更新月份 
function modify_month(){
	header_span = document.createElement("span");
	header_span.setAttribute("class","center month");
	header_span.innerHTML=month;
	header.replaceChild(header_span,month_tab);
	month_tab = document.getElementsByClassName('month')[0];
}

function pre_Month(){
	if(document.getElementById("today")){
		removeToday();
	}
	var m = month;
	if((m-2)>=0){
		firstDay = 7-(day_in_month[m-2]-firstDay)%7;
	}else if((m-2)<0){
		m = 13;
		firstDay = 7-(day_in_month[m-2]-firstDay)%7;
	}
	month -=1;
	for(var i = 0;i < 42;i++){
		day_tab[i].innerHTML = " ";
	}
	if(month == 0){
		month = 12;
		year-=1;
		if_leap(year);
		day_in_month = [31,28+if_leap(year),31,30,31,30,31,31,30,31,30,31];
		modify_year();
	}
	modify_month();
	print_Date(month);
	flagN = 0;
}

function next_Month(){
	if(document.getElementById("today")){
		removeToday();
	}
	firstDay = (firstDay+day_in_month[month-1])%7;
	month +=1;
	for(var i = 0;i < 42;i++){
		day_tab[i].innerHTML = " ";
	}
	if(month == 13){
		month = 1;
		year+=1;
		if_leap(year);
		day_in_month = [31,28+if_leap(year),31,30,31,30,31,31,30,31,30,31];
		modify_year();
	}
	print_Date();
	modify_month();
	flagN = 0;
}

// 判断今年是否是润年
function if_leap(year){
	return (year%100==0?
		res=(year%400==0?1:0):
		res=(year%4==0?1:0));
}

var day_in_month = [31,28+if_leap(year),31,30,31,30,31,31,30,31,30,31];
// 获取每一个日历单元格的dom对象集合
var day_tab = document.getElementsByClassName('D');
// 获取显示年份的dom对象
var year_tab = document.getElementsByClassName('year')[0];
// 获取显示月份的dom对象
var month_tab = document.getElementsByClassName('month')[0];
// 获取控制加减月份年份的按钮dom对象集合
var btn = document.getElementsByClassName('btn');
// 获取日期第一行的单元格
var week = document.getElementsByClassName('week');

var edit = document.createElement("img");
    edit.setAttribute("src","image/edit.png");
    edit.className = "edit";


function first_day_in_week(){
	var inFirstWeek = today%7;
	if((week_sym.indexOf(weeks)+1)<inFirstWeek){
		firstDay = 7-(inFirstWeek-(week_sym.indexOf(weeks)+1))
	}else if((week_sym.indexOf(weeks)+1)>inFirstWeek){
		firstDay = (week_sym.indexOf(weeks)+1)-inFirstWeek
	}
}
first_day_in_week();

function getTheDate(){
	thisDate = parseInt(this.innerText);
	return thisDate;
}

function print_Date(){
	for(var j = 0;j <42;j++){
		day_tab[j].removeEventListener("click",showNote,false);
		day_tab[j].removeEventListener("click",getTheDate,false);
	}
	var f = firstDay;
	for(var i=1;i<=day_in_month[month-1];i++){
		f++;
		day_tab[f - 1].addEventListener("click",showNote,false);
		day_tab[f - 1].addEventListener("click",getTheDate,false);
		day_tab[f - 1].innerHTML=i;
	}
}
print_Date();

function return_now(){
	for(var i = 0;i < 42;i++){
		day_tab[i].innerHTML = " ";
	}
	month = date.split(" ")[1];
	month = month_list.indexOf(month)+1;
	modify_month();
	year = parseInt(date.split(" ")[3]);
	modify_year();
	first_day_in_week();
	print_Date(month);
	now = day_tab[firstDay+today-1];
	now.setAttribute("id","today");
	flagN = 0;
}


function removeToday(){
	var t = document.getElementById("today");
	t.setAttribute("id","");
}

function hide(){
	header.setAttribute("class","header hide");
	week_bar.setAttribute("class","week-bar hide");
	day.setAttribute("class","hide day");
}

function show(){
	header.setAttribute("class","header show");
	week_bar.setAttribute("class","week-bar show");
	day.setAttribute("class","day show");
}

function switchState(){
	if(flag == 1){
		hide();
		flag = 0;
			day_tab[parseInt(thisDate)+firstDay-1].removeChild(note);
		    flagN = 0;
	}
	else if(flag == 0){
		show();
		flag = 1;
		flagS = 0;
		if(notePad.contains(input)){  //用contains（）方法判断notePad节点下有没有input节点。
			notePad.removeChild(input);
		}
	}
}



var ruturnNow = document.getElementsByClassName("today")[0];

btn[0].addEventListener("click",pre_Year,false);
btn[3].addEventListener("click",next_Year,false);
btn[1].addEventListener("click",pre_Month,false);
btn[2].addEventListener("click",next_Month,false);
// ruturnNow.addEventListener("click",return_now,false);
day.addEventListener("dblclick",return_now,true);
logoImg.addEventListener("click",switchState,false);
edit.addEventListener("click",createNote,false);





// 测试代码，自动回滚时间
// var timer = setInterval(pre_Month,20);

var note = document.createElement("div");
    note.className = "note";
var up = document.createElement("div");
    up.className = "triangle-up";
var notePad = document.createElement("div");
    notePad.className = "notePad"
    note.appendChild(up);
    note.appendChild(notePad);
    notePad.appendChild(edit);
var input = document.createElement("textarea");
    input.className = "input";
    // day_tab[34].appendChild(note);

function showNote(){
	if(flagN == 0){
		this.appendChild(note);
		flagN = 1;
	}else if(this.hasChildNodes()){
		if(flagN == 1){
		if(notePad.contains(input)){  //用contains（）方法判断notePad节点下有没有input节点。
			notePad.removeChild(input);
		}
		this.removeChild(note);
		flagN = 0;
	    }
	    flagS = 1;
    }
    if(flagS === 0){
		edit.setAttribute("src","image/edit.png");
		flagS = 1;
	}else if(flagS === 1){
		edit.setAttribute("src","image/submit.png");
		flagS = 0;
	}
}

var message;

function createNote(){
	if(flagS === 0){
		edit.setAttribute("src","image/edit.png");
		flagS = 1;
		notePad.removeChild(input);
		input.className = "text";
		notePad.appendChild(input);
		timeStamp = year +"-"+ month +"-"+ thisDate;
	    message = input.value;
	    myStorage.setItem(timeStamp,message);
	}else if(flagS === 1){
		edit.setAttribute("src","image/submit.png");
		flagS = 0;
		notePad.appendChild(input);
		input.className = "input readonly";
		// input.value = " ";
		input.value = " ";
	}
	// input.value = "";
	
	// alert(parseInt(this.innerText));
}


note.addEventListener("click",function(e){
	e.stopPropagation()
});





// day_tab[5].addEventListener("click",showNote,false);













