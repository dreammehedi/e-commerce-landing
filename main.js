const slider = document.querySelector(".reviews-slider");
let isMouseDown = false;
let startX;
let scrollLeft;
let cloneCount = 0;
let autoScrollInterval;

// Function to clone reviews for infinite scrolling effect
function cloneReviews() {
  const reviewCards = document.querySelectorAll(".review-card");
  reviewCards.forEach((card) => {
    const clone = card.cloneNode(true);
    slider.appendChild(clone);
  });
  cloneCount++;
}

// Initialize with two sets of clones
cloneReviews();
cloneReviews();

// Function to start auto-scrolling
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    slider.scrollLeft += 1;

    // Check if we need to clone more reviews when the user scrolls near the end
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 50) {
      cloneReviews();
    }
  }, 10); // Adjust the interval for scroll speed
}

// Function to stop auto-scrolling
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function mouseMoveScroll(e) {
  if (!isMouseDown) return;
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // Increase the multiplier for faster scrolling
  slider.scrollLeft = scrollLeft - walk;

  // Check if we need to clone more reviews when the user scrolls near the end
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 50) {
    cloneReviews();
  }
}

// Event listeners for mouse interactions
slider.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  stopAutoScroll(); // Stop auto-scroll when the user interacts
});

slider.addEventListener("mouseleave", () => {
  isMouseDown = false;
  slider.classList.remove("active");
  startAutoScroll(); // Resume auto-scroll when the user stops interacting
});

slider.addEventListener("mouseup", () => {
  isMouseDown = false;
  slider.classList.remove("active");
  startAutoScroll(); // Resume auto-scroll when the user stops interacting
});

slider.addEventListener("mousemove", mouseMoveScroll);

// Start the auto-scrolling
startAutoScroll();
