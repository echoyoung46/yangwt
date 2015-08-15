$(function() {
	drawGraph();
	initAction();
	$("#nav-toggle").click(function(event) {
		$(".pull").slideToggle();
	});

})

/**
 * canvas绘制图形
 * @return {[type]} [description]
 */
function drawGraph() {

}

/**
 * 绑定DOM事件
 * @return {[type]} [description]
 */
function initAction() {

}

document.querySelector("#nav-toggle").addEventListener("click", function() {
	this.classList.toggle("active");
});