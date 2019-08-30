let $allButtons=$('.buttons>button')
let $slides=$('.images')
let $allImages=$('.images>img')
let current=0

FakeSlides()
bindEvents()
$slides.css({transform:'translateX(-400px)'})


$('.prePic').on('click',function(){
	goToSlides(current-1)
})
$('.nextPic').on('click',function(){
	goToSlides(current+1)
})


let timer=setInterval(function(){goToSlides(current+1)},2000)

$('.container').on('mouseenter',function(){
	window.clearInterval(timer)
})
$('.container').on('mouseleave',function(){
	timer=setInterval(function(){goToSlides(current+1)},2000)
})


function bindEvents(){
	$('.buttons').on('click','button',function(e){
	 // on的第二个参数'button'是选择器，这是代理事件
	 let $button=$(e.currentTarget)
		let index=$button.index() // 第几个孩子（按钮）
		goToSlides(index)		
	})
}

function goToSlides(index){
	if(index>$allButtons.length-1){ 
		index=0 // 在最后一张图时，点击下一张，需要展示第一张，故index=0
	}else if(index<0){
		index=$allButtons.length-1 // 在第一张图，点击上一张，需要展示最后一张图
	}
	if(current===$allButtons.length-1&&index===0){
		// 点完最后一张图的 按钮 后，点击第一张图的 按钮
		$slides.css({transform:`translateX(${-(index+4)*400}px)`}).one('transitionend',function(){
			$slides.hide().offset()
			$slides.css({transform:`translateX(${-(index+1)*400}px)`}).show()
		})
	}else if(current===0&&index===$allButtons.length-1){
		$slides.css({transform:'translateX(0)'})
		.one('transitionend',function(){
			$slides.hide().offset()
			$slides.css({transform:`translateX(${-(index+1)*400}px)`}).show()
		})
	}else{
		$slides.css({transform:`translateX(${-(index+1)*400}px)`})		
	}
	current=index
}

function FakeSlides(){
	let $firstCopy=$allImages.eq(0).clone(true)
	let $lastCopy=$allImages.eq($allImages.length-1).clone(true)
	$slides.append($firstCopy)
	$slides.prepend($lastCopy)
}