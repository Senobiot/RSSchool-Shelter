// document.querySelector(".help_link").addEventListener("click", function () {
// 	this.classList.add("active");
// 	setTimeout(function (){
// 		document.querySelector(".help_link").innerHTML = "Under<br>construction";
// 		document.querySelector(".help_link").style.cssText = "width: 105.11px"; 
// 	}, 1000)
// 	setTimeout(function (){
// 		document.querySelector(".help_link").innerHTML = "Help the shelter";
// 	}, 3000)

// 	setTimeout(function (){
// 		document.querySelector(".help_link").classList.remove("active");
// 	}, 4000)
// })

// document.querySelector(".contacts_link").addEventListener("click", function () {
// 	this.classList.add("active");
// 	setTimeout(function (){

// 		document.querySelector(".contacts_link").innerHTML = "Under<br>construction";
// 	}, 1000)
// 	setTimeout(function (){
// 		document.querySelector(".contacts_link").innerHTML = "Contacts";
// 	}, 3000)

// 	setTimeout(function (){
// 		document.querySelector(".contacts_link").classList.remove("active");
// 	}, 4000)
// })

let burger = document.querySelector(".burger"),
	burger_menu = document.querySelector(".nav"),
	body = document.querySelector("body")

burger.addEventListener("click", function () {
	this.classList.toggle("active");
	burger_menu.classList.toggle("active");
	body.classList.toggle("active");
})