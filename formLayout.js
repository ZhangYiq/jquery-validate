/*表单布局
1.使用例子（配置项说明）:
var form1 = new CT.View.Compoment.Formlayout({
	labelAlign: 'right', //名称label对齐方式（可选）。默认左对齐： 'left'S
	labelWidth: '200px', //名称label的长度（可选）。默认值为120px
	bgColor: '#fff', //itembody（名称、控件）的背景颜色（可选）。
	items: [{
		important: true, //是否带星号（可选）。默认值为false
		label: label, //名称label组件：内部通过getEl（）方法获取其的Dom节点
		content: comboBox, //控件：内部通过getEl（）方法获取其的Dom节点
		help: xx, //帮助提示组件（可选）：内部通过getEl（）方法获取其的Dom节点
		error: xx //错误提示组件（可选）：内部通过getEl（）方法获取其的Dom节点
	}]
})
*/

CT.View.Compoment.Formlayout = CT.Widget.Base.extend({
	
	construct:function(param){

		var me = this;
		me.labelWidth = param.labelWidth ? param.labelWidth: '120px';
		me.labelAlign = param.labelAlign ? param.labelAlign: 'left';
		me.bgColor = param.bgColor;
		
		if(!_.isArray(param.items)){
			return;
		}
		me.el = $("<form>");
		me.el.submit(function(e) {
			e.preventDefault();
		});
		_.each(param.items, function(item, index){
			var itemDiv = me.createItemDiv(item);
			me.el.append(itemDiv);
		});
		/*jquery.validate*/
		$(document).ready(function() {
			if(param.validate != null)
				me.el.validate(param.validate);
		});
		/*jquery.validate*/
	},

	getEl: function(){
		return this.el;
	},
	
	addItem: function(item){
		var newItemDiv = this.createItemDiv(item);
		
		this.el.append(newItemDiv);
	},
	
	createItemDiv: function(item){
		item.labelWidth = this.labelWidth;
		item.labelAlign = this.labelAlign;
		item.bgColor = this.bgColor;
		
		var $item = $("<div>").addClass('form-item');
		
		//必填项
		var leftClass = "";
		var $item_Important = $("<span>").css('float', 'left')
							.css('color', 'rgb(215, 62, 57)')
							.css('position','relative')
							.css('margin-top','2px')
							.css('font-size','20px')
							.css('width', '20px');
		if(item.important){
			$item_Important.html("*");
			leftClass = "left-important-div";
		}else{
			$item_Important.html("&nbsp;");
			leftClass = "left-div";
		}
		
		//名称
		var $item_label =  $("<div>").addClass('namelabel')
						.css('text-align', item.labelAlign)
						.css('width', item.labelWidth);

		if(item.label){
			$item_label.append(item.label.getEl());
		}
		
		var $item_left = $("<div>").addClass(leftClass)
							.append($item_Important)
							.append($item_label);
		
		//输入组件
		var $item_content = $("<div>").addClass("centert-div");
		if(item.content){
//			if(item.content.setWidth){
//				item.content.setWidth("100%");
//			}
			var contentTmp = item.content.getEl();
			$item_content.append(contentTmp);
		}
		
		var $item_body = $("<div>").addClass('form-body')
						.append($item_left)
						.append($item_content);
		if(item.bgColor){
			$item_body.css('background', item.bgColor);
		}
		//提示信息
		var $item_tip = $("<div>").addClass('form-item-tip-div');
		if(item.help){
			$item_tip.append(item.help.getEl());
		}
		if(item.error){
			$item_tip.append(item.error.getEl());
		}
		$item.append($item_body).append($item_tip);
		
		return $item;
	},
	
	removeItem: function(itemIndex){
		var domChildren = this.el.children();
		var domChildrenNum = domChildren.size();
		
		if(itemIndex >= domChildrenNum || itemIndex < 0){
			return;
		}
		
		domChildren[itemIndex].remove();
	},
	
	hideItem : function(itemIndex){
		var domChildren = this.el.children();
		var domChildrenNum = domChildren.size();
		
		if(itemIndex >= domChildrenNum || itemIndex < 0){
			return;
		}
		
		$(domChildren[itemIndex]).hide();
	},
	
	showItem : function(itemIndex){
		var domChildren = this.el.children();
		var domChildrenNum = domChildren.size();
		
		if(itemIndex >= domChildrenNum || itemIndex < 0){
			return;
		}
		
		$(domChildren[itemIndex]).show();
	}
	
});
