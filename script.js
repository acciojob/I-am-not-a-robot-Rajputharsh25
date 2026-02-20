// 1. Initial Data
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
let selectedImages = [];

const container = document.getElementById('image-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const para = document.getElementById('para');
const header = document.getElementById('h');

// 2. Randomize and Display Images
function init() {
    selectedImages = [];
    para.textContent = "";
    resetBtn.style.display = 'none';
    verifyBtn.style.display = 'none';
    container.innerHTML = "";

    // Choose one image to repeat
    const duplicate = imageClasses[Math.floor(Math.random() * imageClasses.length)];
    const imagesToDisplay = [...imageClasses, duplicate];

    // Shuffle images using Fisher-Yates algorithm
    for (let i = imagesToDisplay.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagesToDisplay[i], imagesToDisplay[j]] = [imagesToDisplay[j], imagesToDisplay[i]];
    }

    // Render images
    imagesToDisplay.forEach((className, index) => {
        const img = document.createElement('img');
        img.className = className;
        img.dataset.index = index; // Unique identifier for each tile
        img.addEventListener('click', handleImageClick);
        container.appendChild(img);
    });
}

// 3. Click Behavior and State Management
function handleImageClick(e) {
    const img = e.target;

    // Prevent clicking the same tile twice
    if (selectedImages.includes(img)) return;

    // State 2: At least one tile clicked
    selectedImages.push(img);
    img.classList.add('selected');
    resetBtn.style.display = 'inline';

    // State 3: Exactly two tiles clicked
    if (selectedImages.length === 2) {
        verifyBtn.style.display = 'inline';
    } else {
        verifyBtn.style.display = 'none';
    }
}

// 4. Verification Logic
verifyBtn.addEventListener('click', () => {
    // State 4: After clicking Verify
    verifyBtn.style.display = 'none';
    
    const [first, second] = selectedImages;
    if (first.className === second.className) {
        para.textContent = "You are a human. Congratulations!";
    } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
});

// 5. Reset Behavior
resetBtn.addEventListener('click', init);

// Run on page load
init();