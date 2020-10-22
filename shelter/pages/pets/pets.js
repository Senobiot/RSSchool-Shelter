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
	// petsBlock = document.querySelector(".pets-page__content"),
	petsBlock = document.querySelector(".pets-page__content_pets"),
	// petsBlockWidth = petsBlock.offsetWidth,
	slidesLength,
	pets = [],
	arrRandomNum = [], // нужно обнулить, если перезапускаем функцию
	pagesOfAll,
	//let multiRandom = [[4, 0, 2, 1, 5, 7, 3, 6]]; //тут будет формироваться массив 6*8 при загрузке страницы;
	multiRandom = [4, 0, 2, 1, 5, 7, 3, 6];

	//определяем необходимое количество слайдов для каждой адаптивной страницы пагинации
	function pageSlidesQty (){
			if (window.innerWidth < 768) {slidesLength = 3;}
			if (window.innerWidth >= 768 && window.innerWidth < 1280) {slidesLength = 6;}
			if (window.innerWidth >= 1280) {slidesLength = 8;}
	}

	pageSlidesQty ();

//------------------------------------------------------cloning JSON in pets = [] ----------
	

		pets = JSON.parse(JSON.stringify(jsonPets));


//----------------------------------------------event close mask + menu if rotate mobile device & width > 767


window.addEventListener('resize', function(event){
  if (window.innerWidth > 767) {
	mask.classList.remove("active");
	burger_menu.classList.remove("active");
	burger.classList.remove("active");
	body.classList.remove("active");
	//popup.classList.remove("active");
  } 
  // if (petsBlock.offsetWidth !== petsBlockWidth) {
  // 	document.location.reload();
  // }

	pageSlidesQty ();
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

 function reset_animation() {
	setTimeout(function (){
	slider.style.animation = 'none';
	slider.style.animation = null; 	
	}, 900)
 }

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}


 //для 8 + 6 + 3 в виде одномерного

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

// формируем массив так, чтобы три первых цифры новой группы из 8 не были равны последним трем цифрам предыдущей группы
while (multiRandom.length < 48) { 
	getRandEigth(8);
		if (multiRandom.slice(-3).includes(arrRandomNum.slice(0,3)[0])) {
			arrRandomNum = [];
		}
		else if (multiRandom.slice(-3).includes(arrRandomNum.slice(0,3)[1])) {
			arrRandomNum = [];
		}
		else if (multiRandom.slice(-3).includes(arrRandomNum.slice(0,3)[2])) {
			arrRandomNum = [];
		}
		else {
			multiRandom.push(...arrRandomNum);
			arrRandomNum = [];
	}
}


// одномерный
function pagination(pageNumber) {
	for (let i = 0; i < slidesLength; i++) {
		slides[i].childNodes[3].textContent = pets[multiRandom[i + pageNumber*slidesLength]].name;
		slides[i].childNodes[1].alt = pets[multiRandom[i + pageNumber*slidesLength]].name + " picture";
		slides[i].childNodes[1].src = pets[multiRandom[i + pageNumber*slidesLength]].img;
	}
}


arrowR.addEventListener("click", function () {
	if (slider.style.animation === "") {
		slider.style.animation = "sliderMove_R 2s linear";
		if (!pets[multiRandom[(+currentPageBtn.innerHTML + 1)*slidesLength]]) {
			setTimeout(function (){
				lastPageBtn.disabled = true;
				arrowR.disabled = true;
				pagination(currentPageBtn.innerHTML);
				currentPageBtn.innerHTML++;
			}, 600)
	} else {
			setTimeout(function (){
				firstPageBtn.disabled = false;
				arrowL.disabled = false;
				pagination(currentPageBtn.innerHTML);
				currentPageBtn.innerHTML++;
				petsBlock.style.animation = "sliderMove_R 2s linear";
				}, 600)
		}
		reset_animation();
	}
})


arrowL.addEventListener("click", function () {
	if (slider.style.animation === "") {
		slider.style.animation = "sliderMove_L 2s linear";
		if (+currentPageBtn.innerHTML === 2) {
			setTimeout(function (){
			firstPageBtn.disabled = true;
			arrowL.disabled = true;
			pagination(currentPageBtn.innerHTML - 2);
			currentPageBtn.innerHTML--;
			}, 600)
		} else {
			setTimeout(function (){
				lastPageBtn.disabled = false;
				arrowR.disabled = false;
				pagination(currentPageBtn.innerHTML - 2);
				currentPageBtn.innerHTML--;
			}, 600)
		}

		reset_animation();
	}
})


lastPageBtn.addEventListener("click", function () {
	if (slider.style.animation === "") {
		slider.style.animation = "sliderMove_R 2s linear";
		setTimeout(function (){
			pagination(multiRandom.length/slidesLength - 1);
			currentPageBtn.innerHTML = multiRandom.length/slidesLength;
			lastPageBtn.disabled = true;
			arrowR.disabled = true;
			firstPageBtn.disabled = false;
			arrowL.disabled = false;
		}, 600)

		reset_animation();
	}
})

firstPageBtn.addEventListener("click", function () {
	if (slider.style.animation === "") {
		slider.style.animation = "sliderMove_L 2s linear";
		setTimeout(function (){
			pagination(0);
			currentPageBtn.innerHTML = 1;
			lastPageBtn.disabled = false;
			arrowR.disabled = false;
			firstPageBtn.disabled = true;
			arrowL.disabled = true;
		}, 600)

		reset_animation();
	}
})


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