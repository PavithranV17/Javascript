const listAnimation = document.querySelector(".listAnimation");
const nav = document.querySelector(".nav-items");

listAnimation.addEventListener("click", event => {
    listAnimation.classList.toggle("active");
    nav.classList.toggle("active");
});

const newsButton = document.querySelectorAll(".newsletter");
const model = document.querySelector(".model");
const close = document.querySelector(".close");

newsButton.forEach(news => {
    news.addEventListener("click", event => {
        model.classList.add("show");
    });
});

close.addEventListener("click", () => {
    model.classList.remove("show");
});

const acc = document.querySelector(".acc");
try{
    acc.addEventListener("click", event => {
        event.target.classList.toggle("active");
        event.target.nextElementSibling.classList.toggle("active");
    });
} catch(error){
    console.log(error);
}

// swiper
try{
    const swiper = new Swiper(".mySwiper", {
        navigation: {
        nextEl: ".next",
        prevEl: ".prev",
        },
    });
} catch(error){
    console.log(error);
}