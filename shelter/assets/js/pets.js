let burger = document.querySelector(".burger"),
	burger_menu = document.querySelector(".nav"),
	burger_menu_links = document.querySelectorAll(".nav li"),
	body = document.querySelector("body"),
	mask = document.querySelector(".mask"),
	firstPageBtn = document.querySelector(".firstPage"),
	arrowL = document.querySelector(".arrowL"),
	arrowR = document.querySelector(".arrowR"),
	currentPageBtn = document.querySelector(".currentPage"),
	lastPageBtn = document.querySelector(".lastPage"),
	slider = document.querySelector(".pets-page__content_pets"),
	slides = document.querySelectorAll(".pets__tile"),
	popup = document.querySelector(".popup"),
	pets = [];

//------------------------------------------------------cloning JSON in pets = [] ----------
	
	fetch('../../assets/js/pets.json').then((response) => {
		response.json().then((text) => {
		pets = JSON.parse(JSON.stringify(text));
		})
	}) 

//----------------------------------------------event close mask + menu if rotate mobile device & width > 767

window.addEventListener('resize', function(event){
  if (window.innerWidth > 767) {
	mask.classList.remove("active");
	burger_menu.classList.remove("active");
	burger.classList.remove("active");
	body.classList.remove("active");
	//popup.classList.remove("active");
  }
});
//-----------------------------------------------events for burger/menu & slide up-----------------

burger.addEventListener("click", function () {
	this.classList.toggle("active");
	mask.classList.toggle("active");
	burger_menu.classList.toggle("active");
	body.classList.toggle("active");
})

burger_menu.addEventListener("click", function () {
	this.classList.toggle("active");
	mask.classList.toggle("active");
	burger.classList.toggle("active");
	body.classList.toggle("active");
	
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

//----------------------------------------------remove event from menu area---------------------------

for (let i = 0; i < burger_menu_links.length; i++) { 
		burger_menu_links[i].addEventListener('click', e => e.stopPropagation());
	}

//---------------------------------------------------------------------------animation

 // function reset_animation() { //сюда сразу запихнул рандомизацию слайдов
	// setTimeout(function (){
	// 	randomSlide()	
	// }, 600)
	// setTimeout(function (){
	// slider.style.animation = 'none';
	// slider.style.animation = null; 	
	// }, 900)
 // }

// arrowL.addEventListener("click", function () {
// 	if (slider.style.animation === "") {
// 		slider.style.animation = "sliderMove_L 2s linear";
// 		reset_animation()
// 	}
// })

// arrowR.addEventListener("click", function () {
// 	if (slider.style.animation === "") {
// 		slider.style.animation = "sliderMove_R 2s linear";
// 		reset_animation()
// 	}
// })
//------------------------------------------------------ functions get random number inclusive interval
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}


let arrRandomNum = []; // нужно обнулить, если перезапускаем функцию
let multiRandom = [[4, 0, 2, 1, 5, 7, 3, 6]]; //тут будет формироваться массив 6*8 при загрузке страницы;
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

//формируем массив из 48 элементов, мне нужен  только многомерный массив с индексами объекта pet
//но так как PP то я первый элемент из 8 цифр добавил как в макете
for (let i = 1; i < 6; i++) {
	getRandEigth(8)
	multiRandom.push(arrRandomNum);
	arrRandomNum = [];
}

function pagination(pageNumber) {
	for (let i = 0; i < slides.length; i++) {
		slides[i].childNodes[3].textContent = pets[multiRandom[pageNumber][i]].name;
		slides[i].childNodes[1].alt = pets[multiRandom[pageNumber][i]].name + " picture";
		slides[i].childNodes[1].src = pets[multiRandom[pageNumber][i]].img;
	}
}

arrowR.addEventListener("click", function () {
	pagination(currentPageBtn.innerHTML);
	currentPageBtn.innerHTML++;
	if (+currentPageBtn.innerHTML === 6) {
		lastPageBtn.disabled = true;
		arrowR.disabled = true;
	} else if (arrowL.disabled === true) {
		firstPageBtn.disabled = false;
		arrowL.disabled = false;
	}
})


arrowL.addEventListener("click", function () {
	pagination(currentPageBtn.innerHTML - 2);
	currentPageBtn.innerHTML--;
	if (+currentPageBtn.innerHTML === 1) {
		firstPageBtn.disabled = true;
		arrowL.disabled = true;
	} else if (arrowR.disabled === true) {
		lastPageBtn.disabled = false;
		arrowR.disabled = false;
	}
})


lastPageBtn.addEventListener("click", function () {
	pagination(5);
	currentPageBtn.innerHTML = 6;
		lastPageBtn.disabled = true;
		arrowR.disabled = true;
		firstPageBtn.disabled = false;
		arrowL.disabled = false;
})

firstPageBtn.addEventListener("click", function () {
	pagination(0);
	currentPageBtn.innerHTML = 1;
		lastPageBtn.disabled = false;
		arrowR.disabled = false;
		firstPageBtn.disabled = true;
		arrowL.disabled = true;
})

// function randomSlide () {
// 	let first = getRandomIntInclusive(0, 7);
// 	let second = getRandomIntInclusive(0, 7);
// 	if (second === first) {
// 		second = getRandomIntInclusive(0, 7)
// 	}
// 	let third = getRandomIntInclusive(0, 7);
// 	if (third === first || third === second) {
// 		third = getRandomIntInclusive(0, 7)
// 	}
// 	slides[0].childNodes[3].textContent = pets[first].name;
// 	slides[0].childNodes[1].alt = pets[first].name + " picture";
// 	slides[0].childNodes[1].src = pets[first].img;
// 	slides[1].childNodes[3].textContent = pets[second].name;
// 	slides[1].childNodes[1].alt = pets[second].name + " picture";
// 	slides[1].childNodes[1].src = pets[second].img;
// 	slides[2].childNodes[3].textContent = pets[third].name;
// 	slides[2].childNodes[1].alt = pets[third].name + " picture";
// 	slides[2].childNodes[1].src = pets[third].img;
// }

// //-------------------------------------modals popups-------------------------

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