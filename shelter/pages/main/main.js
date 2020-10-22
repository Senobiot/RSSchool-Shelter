let burger = document.querySelector(".burger"),
	burger_menu = document.querySelector(".nav"),
	burger_menu_links = document.querySelector(".nav ul"),
	body = document.querySelector("body"),
	mask = document.querySelector(".mask"),
	arrowL = document.querySelector(".arrowL"),
	arrowR = document.querySelector(".arrowR"),
	slider = document.querySelector(".friends__slider_viewport"),
	slides = document.querySelectorAll(".slide"),
	arrRandomNum = [], // нужно обнулить, если перезапускаем функцию
	repeat = [4, 0, 2],
	popup = document.querySelector(".popup");

	pets = JSON.parse(JSON.stringify(jsonPets));

	// for (let i = 0; i < burger_menu_links.length; i++) {
	// 	burger_menu_links[i].addEventListener('click', e => e.stopPropagation());
	// }
	burger_menu_links.addEventListener('click', e => e.stopPropagation())

window.addEventListener('resize', function(event){
  if (window.innerWidth > 767) {
	mask.classList.remove("active");
	burger_menu.classList.remove("active");
	burger.classList.remove("active");
	body.classList.remove("active");
	popup.classList.remove("active");
  }
});

burger.addEventListener("click", function () {
	this.classList.toggle("active");
	mask.classList.toggle("active");
	burger_menu.classList.toggle("active");
	body.classList.toggle("active");
})
burger_menu.addEventListener("click", function () {
	this.classList.remove("active");
	mask.classList.remove("active");
	burger.classList.remove("active");
	body.classList.remove("active");
	console.log("asd")
	
})
mask.addEventListener("click", function () {
	this.classList.remove("active");
	burger_menu.classList.remove("active");
	burger.classList.remove("active");
	body.classList.remove("active");
	popup.classList.remove("active");
	
})


document.querySelector(".nav_current").addEventListener("click", function () {
	burger_menu.classList.remove("active");
	mask.classList.remove("active");
	body.classList.remove("active");
	burger.classList.remove("active");
	body.scrollTo({ top: 0, behavior: 'smooth' });
})

 function reset_animation() { //сюда сразу запихнул рандомизацию слайдов
	setTimeout(function (){
		randomSlide()	
	}, 600)
	setTimeout(function (){
	slider.style.animation = 'none';
	slider.style.animation = null; 	
	}, 900)
 }

arrowL.addEventListener("click", function () {
	if (slider.style.animation === "") {
		slider.style.animation = "sliderMove_L 2s linear";
		reset_animation()
	}
})

arrowR.addEventListener("click", function () {
	if (slider.style.animation === "") {
		slider.style.animation = "sliderMove_R 2s linear";
		reset_animation()
	}
})

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getRandEigth (qty) {
	if (arrRandomNum.length < qty) {
		let number = getRandomIntInclusive(0, 7); // заданный интервал 0-7 - это индексы массива pets из 8 элемента
		if (arrRandomNum.includes(number)) {
			getRandEigth(qty)
		} else {
			arrRandomNum.push(number);
			getRandEigth(qty)}
	} else { return }
}

function randomSlide () {
	getRandEigth (3);
	if (repeat.includes(arrRandomNum[0])) {
			arrRandomNum = [];
			randomSlide ()
		}
		else if (repeat.includes(arrRandomNum[1])) {
			arrRandomNum = [];
			randomSlide ()
		}
		else if (repeat.includes(arrRandomNum[2])) {
			arrRandomNum = [];
			randomSlide ()
		} else {
				slides[0].childNodes[3].textContent = pets[arrRandomNum[0]].name;
				slides[0].childNodes[1].alt = pets[arrRandomNum[0]].name + " picture";
				slides[0].childNodes[1].src = pets[arrRandomNum[0]].img;
				slides[1].childNodes[3].textContent = pets[arrRandomNum[1]].name;
				slides[1].childNodes[1].alt = pets[arrRandomNum[1]].name + " picture";
				slides[1].childNodes[1].src = pets[arrRandomNum[1]].img;
				slides[2].childNodes[3].textContent = pets[arrRandomNum[2]].name;
				slides[2].childNodes[1].alt = pets[arrRandomNum[2]].name + " picture";
				slides[2].childNodes[1].src = pets[arrRandomNum[2]].img;
				repeat = [];
				repeat = [...arrRandomNum]; //для неповтора, когда слайд 1
				arrRandomNum = [];
			}
}

//-------------------------------------modals popups-------------------------

let key;
let index;
for (let i = 0; i < slides.length; i++) {
	slides[i].addEventListener("click", function () {
		mask.classList.add("active");
		popup.classList.add("active");
		popup_key (i);
	})
}

function popup_key (i) {
	key = slides[i].childNodes[3].textContent;
	index = pets.findIndex(j => j.name === key);
	popup.childNodes[3].src = pets[index].img;
	popup.childNodes[5].childNodes[1].textContent = key;
	popup.childNodes[5].childNodes[3].textContent = `${pets[index].type} - ${pets[index].breed}`;
	popup.childNodes[5].childNodes[5].childNodes[0].textContent = pets[index].description;
	popup.childNodes[5].childNodes[7].childNodes[1].childNodes[1].textContent = pets[index].age;
	popup.childNodes[5].childNodes[7].childNodes[3].childNodes[1].textContent = pets[index].inoculations;
	popup.childNodes[5].childNodes[7].childNodes[5].childNodes[1].textContent = pets[index].diseases;
	popup.childNodes[5].childNodes[7].childNodes[7].childNodes[1].textContent = pets[index].parasites;


}

document.querySelector(".popup_close").addEventListener("click", function () {
	document.querySelector(".popup").classList.remove("active");
	mask.classList.remove("active");
})