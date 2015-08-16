$(function() {
	//绑定事件
	initAction();
	//创建作品展示列表
	createList();
	//初始化技能滑块
	initFlexslider();
	//绘制技能图
	drawGraph();
})


/**
 * 绑定DOM事件
 * @return {[type]} [description]
 */
function initAction() {
	//菜单下拉按钮
	$("#nav-toggle").click(function(event) {
		$(".pull").slideToggle();
	});

	document.querySelector("#nav-toggle").addEventListener("click", function() {
		this.classList.toggle("active");
	});

	//平滑滚动跳转
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 2000);
				return false;
			}
		}
	});
}

/**
 * 创建作品展示列表
 * @return {[type]} [description]
 */
function createList() {
	var imgArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "1.jpg", "2.jpg"];
	var html = '';
	var distance = 130;	//缩略图间距
	var left = 0;	//起始位置
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
	//创建原型
	var viewList = new Viewlist( listObj );
	viewList.init();
	//绑定左右箭头控制事件
	$(".experience_arrow_left").on('click', function() { viewList.moveFocus(-1); });
	$(".experience_arrow_right").on('click', function() { viewList.moveFocus(1); });
	//绑定缩略图点击事件
	$("#experience_thumb ul").on('click', 'li', function() {
		$this = $(this);
		var index = $this.index();
		console.log(index);
		var currPos = viewList.pos;
		var step = index - currPos;
		viewList.moveFocus(step);
	});
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

/**
 * 绘制每个技能图
 * @return {[type]} [description]
 */
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
 * canvas绘制圆形
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