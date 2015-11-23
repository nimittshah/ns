/**
 * ...
 * @author nimit shah
 */
var alertmsg;
var alertBoxPopup;// = '<div id="alertboxpopup"><div id="alertbox" class="centered"><div id="alertmsg">This is default message!</div><div id="alertbtns"><div id="alertokay" class="centered">Okay</div></div></div></div>';
var alertLeft, alertTempLeft;

(function() {
	init();
})();

function init(){
	//console.log("alertmsg : ");
	alertmsg = new alertMSG();
	alertBoxPopup = document.createElement("div");
	alertBoxPopup.id = "alertboxpopup";
	alertBoxPopup.style.zIndex = "0";
	alertBoxPopup.innerHTML = '<div id="alertbox" class="centered"><div id="alertheader"><div id="alerttype"></div><div id="alerttitle">Title goes here!</div></div><div id="alertmsg"  class="scrollbar">This is default message!</div><div id="alertbtns"><div id="alertokay" class="centered">Okay</div></div></div>';
}

function alertMSG(){
	show = function(type, title, str){
		document.body.insertBefore(alertBoxPopup, document.body.firstChild);
		//console.log(document.getElementById("alertokay"));
		document.getElementById("alertmsg").innerHTML = str;
		
		if (document.getElementById("alertokay").addEventListener) {
			document.getElementById("alertokay").addEventListener("click", hideAlert);
		}else{
			document.getElementById("alertokay").attachEvent("click", hideAlert);
		}
		
		var offset = document.getElementById("alertbox").getBoundingClientRect();
		
		document.getElementById("alerttype").style.backgroundImage = "url('images/"+type+".png')";
		document.getElementById("alerttitle").innerHTML = title;
		
		alertLeft = alertTempLeft = offset.left;
		//alertBoxPopup.style.opacity = 0;
		document.getElementById("alertbox").style.left = (alertLeft - 100) +"px";
		//console.log(document.getElementById("alerttype").style.backgrounImage);
		doLeftMove();
	};
	
	hide = function(){ 
		//alertTempLeft = (alertLeft-100)*-1;
		//alertBoxPopup.style.opacity = 1;
		//alert("123");
		doRightMove();
	}
	
	return {
        show: show,
		hide: hide
	}
};

function hideAlert(){
	alertmsg.hide();
}

function doLeftMove() {
	document.getElementById("alertbox").style.left = (alertTempLeft+10)+'px'; // pseudo-property code: Move right by 10px
	//console.log("alertTempLeft : " + alertTempLeft + " style.left : " + document.getElementById("alertbox").style.left + " opacity : " + alertBoxPopup.style.opacity);
	alertBoxPopup.style.opacity = (parseFloat(alertBoxPopup.style.opacity) + 0.1);
	alertTempLeft-=10;
	if(alertTempLeft>=0)
		setTimeout(doLeftMove,3); // call doLeftMove() in 20 msec
}
function doRightMove() {
	document.getElementById("alertbox").style.left = (alertTempLeft+10)+'px'; // pseudo-property code: Move right by 10px
	//console.log("alertTempLeft : " + alertTempLeft + " style.left : " + document.getElementById("alertbox").style.left + " opacity : " + alertBoxPopup.style.opacity);
	alertBoxPopup.style.opacity = (parseFloat(alertBoxPopup.style.opacity) - 0.1);
	alertTempLeft-=10;
	if(alertTempLeft>=-alertLeft){
		setTimeout(doRightMove,3); // call doLeftMove() in 20 msec
	}else{
		document.body.removeChild(alertBoxPopup);
	}
}