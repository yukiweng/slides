
let index=0
init()
setInterval(()=>{
	makeLeave(getImage(index))
	.one('transitionend',(toRight)=>{
		makeEnter($(toRight.currentTarget))
	})
	makeCurrent(getImage(index+1))
	index+=1
},3000)



//封装函数

// 1.初始化
function init(){
	$(`.images>img:nth-child(${index+1})`).addClass('current').siblings('img').addClass('enter')
}

// 2.返回 图片数量
function pic(n){
	n=n%5
	return n+1
}

// 3. 第几张图片
function getImage(index){
return $(`.images>img:nth-child(${pic(index)})`)
}

// 4. 三种状态的class
function makeCurrent($node){
	$node.removeClass('enter leave').addClass('current')
	return $node
}
function makeLeave($node){
	$node.removeClass('current enter').addClass('leave')
	return $node
	// 其他两种状态不return也没问题，会自动返回undefined
	// 但makeLeave需要返回节点，因为需要对节点进行.one操作
}
function makeEnter($node){
	$node.removeClass('leave current').addClass('enter')
	return $node
}