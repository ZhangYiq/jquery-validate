( function($, CT) {
	define(['moduleController', 'diskconfig', 'cluster', 'cpuOrMemGroup','imageSelection','descriptionInput','numberInput'], function() {
		var ClusterAddTemplateView = CT.Base.TemplateView.extend({
			template : "<%=region('basicConfPanel')%>" 
			    + "<div class='buttonPanel'>"
			    + "<%=region('okBtn')%>"
			    + "<%=region('cancelBtn')%>"
			    + "</div>" 
		});
		
		var ClusterAddViewController = CT.Base.ViewController.extend({
			templateView : new ClusterAddTemplateView(),
			construct : function() {
				//名称规则
				var nameRuleLab = new CT.Widget.Label({
					details: _.Lang("clusterManager", "createCluster", "nameRule"),
					paddingRight : "0.3"
				});				
				this.nameRuleEdt = new CT.Widget.TextField({
					emptyText : "",
					minLength: 1,
					maxLength : 30,
					regex: /^[\-a-zA-Z0-9\u4e00-\u9fa5]+$/,
					blankText:  _.Lang("errorRemain", "clusterNameRuleEmpty"),
					lengthText: CT.Common.format(_.Lang("errorRemain", "clusterNameRuleLength"), 1, 30),
					regexText: _.Lang("errorRemain", "clusterNameRule"),
					allowBlank : false
				});
				this.nameRuleEdt.getEl().attr('id','clusterName').attr('name','clusterName');
				this.nameRuleTip = new CT.Widget.DoubleTip({
					helpOnly: false,
					helpText : _.Lang("help", "clusterNameRule")
				});
				//详细描述
				var descrTextLab = new CT.Widget.Label({
					details: _.Lang("clusterManager", "createCluster", "detail"),
					paddingRight : "0.3"
				});
				this.descrTextEdt = new CT.View.Instance.DescriptionInput({});
				this.descrTextTip = new CT.Widget.Tip({});
				//服务器地址
				var serverAddLab = new CT.Widget.Label({
					details: _.Lang("clusterManager", "createCluster", "serverAddress"),
					paddingRight : "0.3"
				});				
				this.serverAddEdt = new CT.Widget.TextField({
					emptyText : "",
					minLength: 1,
					maxLength : 20,
					//服务器地址的正则验证表达式（带或者不带端口）
					regex: /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])(:\d{1,4}){0,1}$/,
					blankText:  _.Lang("errorRemain", "clusterAddressRuleEmpty"),
					lengthText: CT.Common.format(_.Lang("errorRemain", "clusterAddressNameRuleLength"), 1, 20),
					regexText: _.Lang("errorRemain", "clusterServiceAddress"),
					allowBlank : false
				});
				this.serverAddEdt.getEl().attr('id','serverAddress').attr('name','serverAddress');
				this.serverAddTip = new CT.Widget.DoubleTip({
					helpOnly: false,
					helpText : _.Lang("help", "clusterServiceAddress")
				});
				//用户名
				var userNameLab = new CT.Widget.Label({
					details: _.Lang("clusterManager", "createCluster", "userName"),
					paddingRight : "0.3"
				});				
				this.userNameEdt = new CT.Widget.TextField({
					emptyText : "",
					minLength: 1,
					maxLength : 30,
					regex: /^[\-a-zA-Z0-9\u4e00-\u9fa5]+$/,
					blankText:  _.Lang("errorRemain", "clusterUserNameRuleEmpty"),
					lengthText: CT.Common.format(_.Lang("errorRemain", "clusterUserNameRuleLength"), 1, 30),
					regexText: _.Lang("errorRemain", "clusterUserName"),
					allowBlank : false
				});
				this.userNameEdt.getEl().attr('id','userName').attr('name','userName');
				this.userNameTip = new CT.Widget.DoubleTip({
					helpOnly: false,
					helpText : _.Lang("help", "clusterUserName")
				});
				//密码
				var passWdLab = new CT.Widget.Label({
					details: _.Lang("clusterManager", "createCluster", "passwd"),
					paddingRight : "0.3"
				});	
				this.passWdEdt = new CT.Widget.TextField({
					type: "password",
					minLength: 1,
					maxLength : 127,
					regex: /^[A-Z]|[a-z]|[0-9]|[`~!@#$%^&*.<>/?！@#]{1,127}$/,
					blankText:  _.Lang("errorRemain", "clusterPasswordRuleEmpty"),
					lengthText: CT.Common.format(_.Lang("errorRemain", "clusterPasswordRuleLength"), 1, 127),
					regexText: _.Lang("errorRemain", "clusterPassword"),
					allowBlank : false
				});
				this.passWdEdt.getEl().attr('id','password').attr('name','password');
				this.passWdTip = new CT.Widget.DoubleTip({
					helpOnly: false,
					helpText : _.Lang("help", "clusterPassword")
				});
				//校验规则
					var addClusterValidation = {
							errorPlacement: function(error, element) {
								// Append error within linked label
								//_this.errorTip.show(error[0].innerText);
							},
						    rules: {
						    	serverAddress: {
							    	  required:true,
							    	  rangelength:[3,10],
							    	  isZipCode:true
						    	},
						    	userName:{
							    	  required:true,
							    	  rangelength:[3,10],
							    	  isZipCode:true
							    },
							    clusterName:{
							    	  required:true,
							    	  rangelength:[3,10],
							    	  isZipCode:true
							    },
							    password:{
							    	  required:true,
							    	  rangelength:[3,10],
							    	  isZipCode:true
							    }
						    },
						    messages: {
						    	serverAddress: {
							    	required:"请输入您的名字",
							    	rangelength:"名字长度应在3-10之间",
						    	},
						    	userName: {
							    	required:"请输入您的名字",
							    	rangelength:"名字长度应在3-10之间",
						    	},
						    	clusterName: {
							    	required:"请输入您的名字",
							    	rangelength:"名字长度应在3-10之间",
						    	},
						    	password: {
							    	required:"请输入您的名字",
							    	rangelength:"名字长度应在3-10之间",
						    	},
						   },
						   errorTips:{
							    serverAddress:this.serverAddTip,
							    userName:this.userNameTip,
							    clusterName:this.nameRuleTip,
							    password:this.passWdTip
						   },
						   onkeyup: function(element) { $(element).valid(); },
				}
				//总的配置输入信息容器
				this.basicConfPanel = new CT.View.Compoment.Formlayout({
					labelWidth : '160px', 
					bgColor :  'rgba(0, 0, 0, 0.2)', 
					items: [{
						important : true, 
						label : nameRuleLab, 
						content : this.nameRuleEdt,
						error: this.nameRuleTip,
					},{
						important : true, 
						label : serverAddLab, 
						content : this.serverAddEdt,
						error: this.serverAddTip,
					},{
						important : true, 
						label : userNameLab, 
						content : this.userNameEdt,
						error: this.userNameTip
					},{
						important : true, 
						label : passWdLab, 
						content : this.passWdEdt,
						error: this.passWdTip
					},{
						important : false, 
						label : descrTextLab, 
						content : this.descrTextEdt,
						error: this.descrTextTip
					}],
					validate:addClusterValidation,
				});
				this.basicConfPanel.getEl().attr("name", "GroupConfigPanel");
				
				this.validator =  new CT.Widget.Validator();
				this.validator.add(this.nameRuleEdt, true, this.nameRuleTip);
				this.validator.add(this.serverAddEdt, true, this.serverAddTip);
				this.validator.add(this.userNameEdt, true, this.userNameTip);
				this.validator.add(this.passWdEdt, true, this.passWdTip);
				
				var okBtn = new CT.Widget.Button({
					className : "defaultButton",
					isOpenAutoDelay: true,
					delayTime: 1000,
					name : _.Lang("common", "okBtn")
				});
				okBtn.bind("clickBtn", this.onClickOkBtn, this);
				
				var cancelBtn = new CT.Widget.Button({
					className : "nextButton",
					name : _.Lang("common", "cancelBtn")
				});
				cancelBtn.bind("clickBtn", this.onClickCancelBtn, this);	
				
				this.templateParam = {
					region : {
						basicConfPanel : this.basicConfPanel.getEl(),
						okBtn : okBtn.getEl(),
						cancelBtn : cancelBtn.getEl()
					}	
				};
			},
			
			onClickCancelBtn : function(){
				this.trigger("clickCancel");
			},
			
			onClickOkBtn : function(){
				// TODO输入框校验
				var ret = this.validator.isValid();
				if(!(ret === true)){
					return;
				}
				var ip=this.serverAddEdt.getValue().split(':');
				if(!ip[1]){
					ip[1]='80';
				}
				var param = {
						name : this.nameRuleEdt.getValue(),
						password : this.passWdEdt.getValue(),
						description : this.descrTextEdt.getValue(),
						ip : ip[0],
						userName : this.userNameEdt.getValue(),
						port:ip[1],
				};
				this.trigger("submit", param);
			},
			
			clearValue : function(){
				this.nameRuleEdt.setValue("");
				this.passWdEdt.setValue("");
				this.descrTextEdt.setValue("");
				this.userNameEdt.setValue("");
				this.serverAddEdt.setValue("");
				this.nameRuleEdt.focus(true);
			},
			
			clearValid: function(){
				this.validator.clearValid();
				this.nameRuleTip.hide();
				this.serverAddTip.hide();
				this.userNameTip.hide();
				this.passWdTip.hide();
			}
		});
		
		
		var ClusterAddManagerModule = CT.Base.PermissionModuleController.extend({
			// 权限控制
			filter : function(permissionInfo) {
			},
			construct : function(param) {
				// TODO
				this.viewController = new ClusterAddViewController();	
				// 渲染模块控制器的根节点
				this.$el.html(this.viewController.render());
				this.viewController.bind("submit" ,this.submit, this);
				this.viewController.bind("clickCancel" ,this.onCancel, this);	
			},
			submit : function(param){
				var _this = this;
				this.showLoading();
				$.ajax({
	            	type: 'POST',
	            	dataType : 'json',
	                url : _.GetUrl("createCluster"),
	                data : JSON.stringify(param),
	                success : function(rtnData, textStatus, xhr) {
	                	_this.trigger("submit", "clusterManager_add", rtnData);
	                },
					complete: _.bind(function(XHR, TS){
						this.hideLoading();
					},this),
	            });
			},
			onCancel : function(){
				this.trigger("quit", "clusterManager_add");
			},
			init : function() {
				// TODO 初始化控制
				this.$el.show();
				this.viewController.clearValue();
				this.viewController.clearValid();
			},
			pending : function() {
				this.viewController.clearValid();
				this.sendMsg([{
            		msgType : "removeNavigatePath",
            		msgInfo : [this.getControllerId()]
            	}]);
			},
			resume : function() {
				// TODO 重起控制
				this.$el.show();
			}
		});
		var getObject = function(param) {
	        return new ClusterAddManagerModule(param);
		};
		return {
			getObject: getObject
		};
	});
	
}) ($, CT);
