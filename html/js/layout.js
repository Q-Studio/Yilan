$(function(){

function outline(){
	return $(window).width()/(100/2.5);
}

$('.all_center').css({
	'padding-left': function(index,value){
		return outline() ;
	},
	'padding-right': function(index,value){
		return outline() ;
	}
});












});