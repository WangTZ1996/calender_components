var date = new Date().toString();
var year = parseInt(date.split(" ")[3]);
var month = date.split(" ")[1];
var today = parseInt(date.split(" ")[2]);
var weeks = date.split(" ")[0];
var month_list = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    month = month_list.indexOf(month)+1;
var week_sym = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

var firstDay;
var now;

//dom动态生成html结构 
var container = document.getElementsByClassName("container")[0];
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
// 创建日期网格的函数
function createDay(){
	for(var i = 0;i < 42;i++){
	 	var day_span = document.createElement("span");
	 	if(i%7==0){
	 		day_span.setAttribute("class","D center sunday");
		    day.appendChild(day_span);
	 	}else if(i==6||i==13||i==20||i==27||i==34||i==41){
	 		day_span.setAttribute("class","D center saturday");
		    day.appendChild(day_span);
	 	}else if(i%2==0){
	 		day_span.setAttribute("class","D center date1");
		    day.appendChild(day_span);
	 	}else{
	 		day_span.setAttribute("class","D center date2");
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

// 自执行一次绘制日历网格函数
(function createTable(){
	createDay();
	createHeader();
	createWeek();
})();

// 

// 更新年份
function modify_year(){
	header_span = document.createElement("span");
	header_span.setAttribute("class","center year");
	header_span.innerHTML=year;
	header.replaceChild(header_span,year_tab);
	year_tab = document.getElementsByClassName('year')[0]
}

function pre_Year(){
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
}
   
function next_Year(){
	firstDay = (firstDay+(365+if_leap(year+1)))%7;
	year += 1; 
	if_leap(year);
	day_in_month = [31,28+if_leap(year),31,30,31,30,31,31,30,31,30,31];
	modify_year();
	for(var i = 0;i < 42;i++){
		day_tab[i].innerHTML = " ";
	}
	print_Date(month);
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
}

function next_Month(){
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
	modify_month();
	print_Date(month);
}

// 判断今年是否是润年
function if_leap(year){
	return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
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

function first_day_in_week(){
	var inFirstWeek = today%7;
	if((week_sym.indexOf(weeks)+1)<inFirstWeek){
		firstDay = 7-(inFirstWeek-(week_sym.indexOf(weeks)+1))
	}else if((week_sym.indexOf(weeks)+1)>inFirstWeek){
		firstDay = (week_sym.indexOf(weeks)+1)-inFirstWeek
	}
}

first_day_in_week();

function print_Date(){
	var f = firstDay;
	for(var i=1;i<=day_in_month[month-1];i++){
		f++;
		day_tab[f-1].innerHTML=i;
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
	now.setAttribute("class","D today center");
}
return_now();

var ruturnNow = document.getElementsByClassName("today")[0];

btn[0].addEventListener("click",pre_Year,false);
btn[3].addEventListener("click",next_Year,false);
btn[1].addEventListener("click",pre_Month,false);
btn[2].addEventListener("click",next_Month,false);
ruturnNow.addEventListener("click",return_now,false);

// 测试代码，自动回滚时间
// var timer = setInterval(pre_Month,20);
