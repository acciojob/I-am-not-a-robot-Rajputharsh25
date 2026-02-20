const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
let selectedTiles = [];

const container = document.getElementById('image-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const para = document.getElementById('para');

// State 1: Initialization / Reset
function init() {
    selectedTiles = [];
    para.textContent = "";
    resetBtn.style.display = 'none';
    verifyBtn.style.display = 'none';
    container.innerHTML = "";

    // Requirement: 5 unique, 1 duplicate
    const duplicateClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];
    const imagesToRender = [...imageClasses, duplicateClass];

    // Randomized Image Display: Shuffling the 6 images
    imagesToRender.sort(() => Math.random() - 0.5);

    imagesToRender.forEach((className, index) => {
        const img = document.createElement('img');
        img.className = className;
        // Use index to ensure we don't treat clicking the same physical tile twice as two selections
        img.setAttribute('data-index', index); 
        img.addEventListener('click', handleTileClick);
        container.appendChild(img);
    });
}

function handleTileClick(e) {
    const tile = e.target;
    const tileIndex = tile.getAttribute('data-index');

    // Prevent double-clicking the same image
    if (selectedTiles.find(t => t.index === tileIndex)) return;
    
    // Clicking more than two images should not display the Verify button
    if (selectedTiles.length >= 2) return;

    // State 2: At least one tile clicked
    selectedTiles.push({ class: tile.className, index: tileIndex });
    tile.classList.add('selected');
    resetBtn.style.display = 'inline';

    // State 3: Both tiles clicked
    if (selectedTiles.length === 2) {
        verifyBtn.style.display = 'inline';
    }
}

// State 4: Verification
verifyBtn.addEventListener('click', () => {
    verifyBtn.style.display = 'none';
    
    const [first, second] = selectedTiles;
    
    if (first.class === second.class) {
        para.textContent = "You are a human. Congratulations!";
    } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
});

// Reset Button behavior
resetBtn.addEventListener('click', init);

// Initial Load
init();