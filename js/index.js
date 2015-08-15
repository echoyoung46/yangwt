$(function() {
	initAction();
	createList();
	initFlexslider();
	drawGraph();
})


/**
 * 绑定DOM事件
 * @return {[type]} [description]
 */
function initAction() {
	$("#nav-toggle").click(function(event) {
		$(".pull").slideToggle();
	});

	document.querySelector("#nav-toggle").addEventListener("click", function() {
		this.classList.toggle("active");
	});
}

/**
 * 创建作品展示列表
 * @return {[type]} [description]
 */
function createList() {
	var imgArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];
	var html = '';
	var distance = 130;
	var left = 0;
	$.each(imgArr, function(i, val) {
		left = i * distance + "px";
		html += '<li style="left: ' + left + ';"><img src="image/project/' + val + '"></li>';
	});
	$("#experience_thumb ul").html(html);
	var listObj = {
		"list" : imgArr,
		"container": "#experience_url",
		"thumb_container": "#experience_thumb",
		"left_arrow": ".experience_arrow_left",
		"right_arrow": ".experience_arrow_right",
		"position": 0,
		"count": 5,
		"distance": distance
	};

	var viewList = new Viewlist( listObj );
	viewList.init();
	$(".experience_arrow_left").on('click', function() { viewList.moveFocus(-1); });
	$(".experience_arrow_right").on('click', function() { viewList.moveFocus(1); });
}

/**
 * 初始化滑动块
 */
function initFlexslider() {
	$('#teamSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});
}

function drawGraph() {
	var graphObj = [
		{"dom":"myHTML", "num":"70", "name":"HTML5"},
		{"dom":"myCSS", "num":"70", "name":"CSS3"},
		{"dom":"myJS", "num":"80", "name":"JavaScript"},
		{"dom":"myJQ", "num":"70", "name":"jQuery"},
		{"dom":"myPHP", "num":"50", "name":"PHP"}
	];
	$.each(graphObj, function(i, val) {
		drawCircle(val.dom, val.num, val.name);
	});
}
/**
 * canvas绘制原型
 * @return {[type]} [description]
 */
function drawCircle(container, percentage, text) {
	var circle = percentage / 100;
	var canvas = document.getElementById(container);
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, 200, 200);

	//画圆
	ctx.beginPath();
	ctx.moveTo(100, 100);
	ctx.arc(100, 100, 100, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fillStyle = "#ddd";
	ctx.fill();

	//画进度
	ctx.beginPath();
	ctx.moveTo(100, 100);
	ctx.arc(100, 100, 100, 0, Math.PI*2*circle, false);
	ctx.closePath();
	ctx.fillStyle = "#e74c3c";
	ctx.fill();

	//画内部空白
	ctx.beginPath();
	ctx.moveTo(100, 100);
	ctx.arc(100, 100, 95, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fillStyle = "#008080";
	ctx.fill();

	// 画一条线  
    ctx.beginPath();  
    ctx.arc(100, 100, 90, 0, Math.PI * 2, true);  
    ctx.closePath();  
    // 与画实心圆的区别,fill是填充,stroke是画线  
    ctx.strokeStyle = '#ddd';  
    ctx.stroke();  
      
    //在中间写字 
    var text = text + '    ' + percentage + "%"; 
    ctx.font = "bold 15pt Arial";  
    ctx.fillStyle = '#e74c3c';  
    ctx.textAlign = 'center';  
    ctx.textBaseline = 'middle';  
    ctx.moveTo(100, 100);  
    ctx.fillText(text, 100, 100);  

}