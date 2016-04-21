var tegeltemplate = "<div style='background-image:url([bgimage])' class='box'><div class='bbox title'>"+
					"<a tagret='_blank' class='title' href='[titleurl]'>[title]</a></div>"+
					"<div style='width:100%;height:100%' onclick=\"window.open('[titleurl]','_blank')\"></div>"+
					"<div class='bbox link'>[link]</div></div>"

function tegelsleggen(){
	mytegel = tegel
	if (mytegel_string = getCookie("GeodanTegels")){mytegel=JSON.parse(mytegel_string)}
	var i,j, tegelvloer="", tegelHTML="", linkHTML="",BR=""
	for (i = 0; i < mytegel.length; i++) {
		tegelHTML=tegeltemplate
		tegelHTML=tegelHTML.replace('[bgimage]',mytegel[i].image)
		tegelHTML=tegelHTML.replace('[title]',mytegel[i].title)
		tegelHTML=tegelHTML.replace(/\[titleurl\]/g,mytegel[i].url)
		tegelHTML=tegelHTML.replace(/\[nr\]/g,i)
		linkHTML=""
		if (mytegel[i].link){
			BR=""
			for (j = 0; j < mytegel[i].link.length; j++) {
				linkHTML+=BR+"<a target='_blank' href='"+mytegel[i].link[j].url+"'>"+mytegel[i].link[j].link+"</a>"
				BR="<br>"
			}
		}
		tegelvloer+=tegelHTML.replace('[link]',linkHTML)
	}
	id('tegels').innerHTML=tegelvloer
}

function id(id){return document.getElementById(id)}

var theme, defaulttheme={	tegelcolor:"lightgrey",bgimage:"image/weiland.jpg"}
function themeDraw(){
	var myTheme_string = getCookie("GeodanTheme")
	if (myTheme_string){
		theme = JSON.parse(myTheme_string)
	}else{
		theme = defaulttheme
	}
	document.body.style.backgroundImage="url('"+theme.bgimage+"')";
	class_bgcolor("box",theme.tegelcolor)
}
function class_bgcolor(classname, color) {
    elements = document.getElementsByClassName(classname);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor=color;
    }
}
function search(e){
	var go=false
	if (e){
		if (e.keyCode==13){go=true}
	}else{
		if (id('search').value.length>0) {go=true}
	}

	if (go){
		var i, radios = document.getElementsByName('content')
		var content=""
		for (var i=0, len=radios.length; i<len; i++) {
			if ( radios[i].checked ) {
				content = radios[i].value;
				break;
			}
		}
		 window.open(content+id('search').value,"_blank")
	}
}

function resettegel(){
	mytegel = tegel
	setCookie("GeodanTegels",JSON.stringify(tegel),100)
	tegelsleggen()
}

function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++)
	  {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	  }
	return "";
}

function rand(min,max){
	var delta = max-min+1
	return parseInt((Math.random()*delta)+min);
}
