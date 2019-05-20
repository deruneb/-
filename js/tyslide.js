;(function($){
			$.fn.extend({
				"tySlide":function(options){
					var defaults={
						width:550,//轮播的宽度
						height:200,//轮播的高度
						isShowbtn:true //是否显示左右的按钮
					}
					var opts=$.extend({},defaults,options)
					this.each(function(){
							var that=$(this);
							var itemcount=$(this).find("ul.btnitem>li").length;//总共的滚动个数
							var imgW=parseInt(opts.width);//图片初始值
							var imgH=parseInt(opts.height);//图片高度
							var ulWidth=imgW*(itemcount+2);//包裹图片的ul的总宽度
							var btnitemulleft=(imgW/2) -((20+4)*itemcount)/2-1;      //最后1像素是margin-right=2px 修正的  一边留1px
							$(this).css({"width":imgW,"height":imgH});//设置大盒子的宽度和高度
							$(this).find(".boxinner").css({"width":ulWidth,"height":imgH,"left":-imgW});//设置装图片的盒子ul宽高
							$(this).find(".boxinner>li").css({"width":imgW,"height":imgH});//设置装图片的盒子li宽高
							$(this).find(".boxinner>li>a>img").css({"width":imgW,"height":imgH});//设置装图片的盒子li宽高
							$(this).find(".btnitem").css({"width":(20+4)*itemcount,"left":btnitemulleft});	//下面小圆圈的ul宽高和位置
							
							var btnHeight=$(this).find(".btnleft").height();
							$(this).find(".btnleft").css({"top":(imgH/2)-(btnHeight/2)});	//下面小圆圈的ul宽高和位置
							$(this).find(".btnright").css({"top":(imgH/2)-(btnHeight/2)});	//下面小圆圈的ul宽高和位置
							if(!opts.isShowbtn)
							{
								$(this).find(".btnleft").hide();
								$(this).find(".btnright").hide();
							}
							else
							{
								$(this).find(".btnleft,.btnright").hover(function(){
									that.find("span").addClass("btnhover")
								},function(){
									that.find("span").removeClass("btnhover")
								});
								
							}
							
							var firstitem=$(this).find("ul.boxinner>li:first").clone();//克隆第一个li
							var lastitem=$(this).find("ul.boxinner>li:last").clone();//克隆最后一个li
							$(this).find("ul.boxinner").append(firstitem).prepend(lastitem);//把最后一个li加到最前，最第一个li加到最后
							
							var i=2;//第一次显示第几个图片
							function gotoshow(num)//传递一个索引，显示第几个li的图片
							{
								var leftpos=-(num-1)*imgW; //计算ul盒子左边的坐标，这个坐标只可能小于0，如果大于0了，左边就没内容显示了
								if(leftpos<=0)
								{
									that.find(".boxinner").stop(true,true).animate({"left":leftpos},500,function(){//异步执行 回调
										var index=num%itemcount-2;
										that.find(".btnitem>li").eq(index).addClass("current").siblings().removeClass("current");
										if(num==(itemcount+2))
										{
											that.find(".boxinner").css({"left":-imgW+"px"});//当显示最右边的li时候，由于最右边的图片和第二张图片一样， 立即将坐标的位置设置为左边第二个li的坐标
											i=2;//坐标改了，索引也要改对应
										}
										if(num==1)
										{
											that.find(".boxinner").css({"left":-imgW*itemcount+"px"});
											i=itemcount+1;
										}
									});
								}
							}
							//自动播放
							function autopaly()
							{
								if(!that.find(".boxinner").is(":animated"))
								{
									i++
									gotoshow(i);
								}				
							}
							//定时器
							var timer=setInterval(autopaly,3000);
							$(this).find(".boxinner").hover(function(){
								clearInterval(timer);
							},function(){
								timer=setInterval(autopaly,3000);
							});
							
							$(this).find(".btnleft").click(function(){
								if(!that.find(".boxinner").is(":animated"))
								{
									i--;
									gotoshow(i);
								}
								
							});
								
							$(this).find(".btnright").click(function(){
								
								if(!that.find(".boxinner").is(":animated"))
								{
									i++;
									gotoshow(i);
								}
							});
							$(this).find(".btnitem>li").click(function(index,item){
									clearInterval(timer);
									var index=that.find(".btnitem>li").index(this);//返回索引 从0开始
									i=index+2; //索引从0开始，本来该加1，加上前面又拷贝了一个li，所以对应的是index+2的图片
									gotoshow(i);
									timer=setInterval(autopaly,3000);
									$(this).addClass("current").siblings().removeClass("current");
							});
					});
				
				}
			});
		})(jQuery);