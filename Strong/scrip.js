let slideIndex = 1;
let intervalId;

function showSlides() {
  let slides = document.getElementsByClassName("image");
  let firstIndex = slideIndex % slides.length;
  let secondIndex = (slideIndex + 1) % slides.length;
  let thirdIndex = (slideIndex + 2) % slides.length;

  if (firstIndex === 0) firstIndex = slides.length;
  if (secondIndex === 0) secondIndex = slides.length;
  if (thirdIndex === 0) thirdIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  slides[firstIndex - 1].style.display = "block";
  slides[secondIndex - 1].style.display = "block";
  slides[thirdIndex - 1].style.display = "block";
}

function startCarousel() {
  intervalId = setInterval(function() {
    slideIndex++;
    showSlides();
  }, 1500);
}

function stopCarousel() {
  clearInterval(intervalId);
}

function changeSlide(n) {
  slideIndex += n;
  showSlides();
}

showSlides(); 
