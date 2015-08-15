function Viewlist(_param) {
	this.listArr = _param.list;	//图片列表
	this.container = _param.container;	//大图容器
	this.thumb_container = _param.thumb_container;	//缩略图容器
	this.left_arrow = _param.left_arrow,	//左箭头容器
	this.right_arrow = _param.right_arrow,	//右箭头容器
	this.pos = _param.position;	//焦点位置,从0开始
	this.showCount = _param.count;	//显示出来的条目数量
	this.distance = _param.distance;	//左移距离

	var maxLeft = this.distance * (this.listArr.length - 2),
		keyFlag = true;	//click事件是否响应

	//初始化
	this.init = function() {
		$(this.thumb_container).find("li").eq(this.pos).addClass('select');

		var imgUrl = $(this.thumb_container).find("img").eq(this.pos).attr("src");
		$(this.container).attr("src", imgUrl);

	}
	//焦点移动
	this.moveFocus = function( _num ) {
		if( keyFlag == false ) {
			console.log("false");
			return;
		}
		keyFlag == false;
		var distance = this.distance;
		if( this.pos + _num < 0 ){
			this.pos = 0;
		}else if( this.pos + _num >= this.showCount ) {
			this.pos += _num;
			$(this.thumb_container).find("li").each(function(i, ele) {
				var currLeft = parseInt($(ele).css("left"));
				var moveLeft = currLeft - distance;
				if( moveLeft < -130 ){
					moveLeft = maxLeft;
					console.log(moveLeft);
				}
				$(ele).css("left", moveLeft + "px");
			});
		}else{
			this.pos += _num;
		}
		console.log(this.pos);
		$(this.thumb_container).find("li").eq(this.pos).addClass('select').siblings().removeClass('select');
		var imgUrl = $(this.thumb_container).find("img").eq(this.pos).attr("src");
		$(this.container).attr("src", imgUrl);
		setTimeout(function(){
			keyFlag = true;
		},2000);
	}
}