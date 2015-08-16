function Viewlist(_param) {
	this.listArr = _param.list;	//图片列表
	this.container = _param.container;	//大图容器
	this.thumb_container = _param.thumb_container;	//缩略图容器
	this.left_arrow = _param.left_arrow,	//左箭头容器
	this.right_arrow = _param.right_arrow,	//右箭头容器
	this.pos = _param.position;	//焦点位置,从0开始
	this.showCount = _param.count;	//显示出来的条目数量
	this.distance = _param.distance;	//左移距离

	var keyFlag = true,	//click事件是否响应
		focusPos = 0, 	//焦点所在位置
		listLength = this.listArr.length;

	//初始化
	this.init = function() {
		//焦点绑定到起始位置
		this.moveFocus(this.pos);
	}
	//焦点移动
	this.moveFocus = function( _num ) {
		var distance = this.distance;
		if( this.pos + _num < 0 || this.pos + _num >= listLength ) {
			return;
		}else {
			if( this.pos + _num >= this.showCount && _num > 0 || focusPos + _num < 0 && this.pos + _num >= 0 ){
				//焦点超过显示区域开始滑动
				this.pos += _num;
				//遍历滑动每个缩略图
				$(this.thumb_container).find("li").each(function(i, ele) {
					var currLeft = parseInt($(ele).css("left"));
					var moveLeft = currLeft - distance * _num;
					$(ele).css("left", moveLeft + "px");
				});
			}else {
				this.pos += _num;
				focusPos += _num;
			}
		}

		//获取焦点，大图显示缩略图
		$(this.thumb_container).find("li").eq(this.pos).addClass('select').siblings().removeClass('select');
		var imgUrl = $(this.thumb_container).find("img").eq(this.pos).attr("src");
		$(this.container).attr("src", imgUrl);
	}
}