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
let reviewWrapper = document.querySelector(".review__wrapper");
let reviews = document.querySelectorAll(".review");
let arrows = document.querySelectorAll(".arrow"); //thus left = arrow[0], right = arrow[1]
let leftArrow = arrows[0];
let rightArrow = arrows[1];
let currentIndex = 0;
//the following comments used to make sense but I refactored the code and I'm leaving it just in case it will be helpful when something breaks
//selects and groups all the small circles.
//Did this here because initializing indicators before the "for" loop above would not return any values
let indicators = document.querySelectorAll(".indicator__circle")


/* Calling these functions ensure that the first review is displayed 
and the corresponding indicator marked when the page loads*/
displayReview();
markIndicator();

//Add event listeners to arrows
leftArrow.addEventListener("click", moveLeft);
rightArrow.addEventListener("click", moveRight);



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

//Display a review
function displayReview() {
    for (let j = 0; j < reviews.length; j++) {
        reviews[j].style.display = "none";
    }
    setTimeout(() => {
        reviews[currentIndex].style.display = "block";
    }, 200)

}
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


//grey out the inactive arrows
function arrowInactive(arrow) {
    arrow.style.backgroundColor = "grey";
}
//colorize the active arrows
function arrowActive(arrow) {
    arrow.style.backgroundColor = "var(--bright-red)";
}

//REVIEW HOVER EFFECTS TO DISPLAY BUTTON
//increase button opacity to .5 for hovering reveiewWrapper a
let arrowsContainer = document.querySelector(".arrows__container");

reviewWrapper.addEventListener("mouseenter", arrowsShow);
reviewWrapper.addEventListener("mouseleave", arrowsHide);
//needed to repeat same code for arrow container since it lies outside the reviewWrapper
arrowsContainer.addEventListener("mouseenter", arrowsShow);
arrowsContainer.addEventListener("mouseleave", arrowsHide);
//increase button opacity to .1 for hovereing over the button itself
leftArrow.addEventListener("mouseenter", () => { leftArrow.style.opacity = "1"; })
rightArrow.addEventListener("mouseenter", () => { rightArrow.style.opacity = "1"; })

function arrowsShow() {
    leftArrow.style.opacity = "0.5";
    rightArrow.style.opacity = "0.5";
}
function arrowsHide() {
    leftArrow.style.opacity = "0";
    rightArrow.style.opacity = "0";
}








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







