const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");
const mobileMenu = document.querySelector(".mobile__menu");


hamburger.addEventListener("click", () => {
    if (hamburger.classList.contains("hamburger__open")) {
        hamburger.classList.remove("hamburger__open");
        overlay.classList.remove("overlay__show");
        mobileMenu.classList.remove("mobile__menu__show")
    } else {
        hamburger.classList.add("hamburger__open");
        overlay.classList.add("overlay__show");
        mobileMenu.classList.add("mobile__menu__show");
    }
})


// SLIDER/CAROUSEL INTERACTIVITY
let reviews = document.querySelectorAll(".review");
let arrows = document.querySelectorAll(".arrow"); //thus left = arrow[0], right = arrow[1]
let leftArrow = arrows[0];
let rightArrow = arrows[1];
let currentIndex = 0;


//create indicator circles based on number of reviews to display
for (let i = 0; i < reviews.length; i++) {
    let indicatorCircle = document.createElement("span");
    indicatorCircle.className = "indicator__circle";
    //============================
    //add event listener to indicators. Come back to revise the functions here
    indicatorCircle.addEventListener("click", () => {
        currentIndex = i;
        displayReview();
        markIndicator();
        if (currentIndex === reviews.length - 1) {
            arrowInactive(rightArrow);
            arrowActive(leftArrow);
        } else if (currentIndex === 0) {
            arrowInactive(leftArrow);
            arrowActive(rightArrow);
        }
        else {
            arrowActive(leftArrow);
            arrowActive(rightArrow);
        }

    })

    let indicatorContainer = document.querySelector(".indicator__container");
    indicatorContainer.append(indicatorCircle);
}

//grey out the passed  arrow
function arrowInactive(arrow) {
    arrow.style.backgroundColor = "grey";

}
//Activate arrow
function arrowActive(arrow) {
    arrow.style.backgroundColor = "var(--bright-red)";
}

//Display a review
function displayReview() {
    for (let j = 0; j < reviews.length; j++) {
        reviews[j].style.display = "none";
    }
    reviews[currentIndex].style.display = "block";
}

//selects and groups all the small circles.
//Did this here because initializing indicators before the "for" loop above would not return any values
let indicators = document.querySelectorAll(".indicator__circle")

//Activate corresponding indicator 
function markIndicator() {
    for (let j = 0; j < indicators.length; j++) {
        indicators[j].classList.remove("indicator__mark");
        indicators[currentIndex].classList.add("indicator__mark");
    }
}

//move to PREVIOUS review
function moveLeft() {
    if (currentIndex === 0) {
        arrowInactive(leftArrow);
    } else {
        currentIndex--;
        displayReview();
        markIndicator();
        arrowActive(rightArrow);
    }
}

//move to NEXT review
function moveRight() {
    if (currentIndex < reviews.length - 1) {
        currentIndex++;
        displayReview();
        markIndicator();
        arrowActive(leftArrow);

    } else if (currentIndex === reviews.length - 1) {
        arrowInactive(rightArrow);
    }
}

//Add event listeners to arrows
leftArrow.addEventListener("click", moveLeft);
rightArrow.addEventListener("click", moveRight);

/* Calling these functions ensure that the first review is displayed 
and the corresponding indicator marked when the page loads*/
displayReview();
markIndicator();


// if (currentIndex === reviews.length - 1) {
//     console.log("last review");
//     arrowInactive(rightArrow);
// } else if (currentIndex === 0) {
//     arrowInactive(leftArrow);
// } else {
//     leftArrow.style.backgroundColor = "var(--bright-red)";
//     rightArrow.style.backgroundColor = "var(--bright-red)";
// }


//ISSUES TO FIX
// 1. Arrows do not immediately inactivate when the first or last review is displayed using the arrow buttons
// 2. No transition between reviews
// 3. Change whole appearance at larger screen widths






