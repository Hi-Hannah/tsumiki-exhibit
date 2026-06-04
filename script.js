let cardStack = document.getElementById('card-stack');
let allCards = [];
let currentCards = [];
let cardHistory = [];
let currentLanguage = 'en';
let startX, startY, currentCard, isDragging = false;
let isAnimating = false;

const END_SCREEN_DATA = {
    title_en: 'Would you like to bring a piece of this artwork home and create your own?',
    title_de: 'Möchtest du einen Teil dieses Kunstwerkes zu dir nach Hause holen und ein Eigenes kreieren?',
    text_en: 'The Tsumiki building blocks for this pyramid are already available in our online shop. You can reserve your own set <a href="https://tchoban-foundation-shop.de/en/p/tsumiki-22-building-blocks" target="_blank" class="end-link">here</a>. After the exhibition ends, we’ll send you your set, or you can pick it up at the museum. By doing so, you’re not only making a sustainable choice, but also supporting the<em> more trees</em> project and our museum!',
    text_de: 'Die Tsumiki-Bauteile dieser Pyramide findest du schon jetzt in unserem Online-Shop. <a href="https://tchoban-foundation-shop.de/p/tsumiki-22-bausteine" target="_blank" class="end-link">Hier</a> kannst du dir dein eigenes Set reservieren. Nach Ende der Ausstellung schicken wir dir dein Set zu oder du kannst es im Museum abholen. Damit handelst du nicht nur nachhaltig, sondern unterstützt auch das Projekt von<em> more trees</em> und unser Museum!',
    btn_en: 'Restart Stack',
    btn_de: 'Karten neu laden'
};

const INFO_MODAL_DATA = {
    title_en: 'About this',
    title_de: 'Über das Projekt',
    text_en: `
        A project by the Tchoban Foundation –Museum for Architectural Drawing<br><br>
        <strong>Photography</strong> <br> Ikunori Yamamoto <br> Kengo Kuma & Associates <br>Annika Paetsch<br><br>
        <strong>Designed & developed by</strong><br> Hannah Hijazi<br><br>
        <a href="http://www.tchoban-foundation.de/8-1-Contact-Imprint.html" target="_blank">Impressum</a>
    `,
    text_de: `
        Ein Projekt der Tchoban Foundation – Museum für Architekturzeichnung <br><br>
        <strong>Fotografie</strong><br> Ikunori Yamamoto <br> Kengo Kuma & Associates <br>Annika Paetsch<br><br>
        <strong>Design & Entwicklung</strong><br> Hannah Hijazi<br><br>
        <a href="http://www.tchoban-foundation.de/8-0-Kontakt-Impressum.html" target="_blank">Impressum</a>
    `
};

// Default cards data (embedded for file:// protocol support)
const DEFAULT_CARDS = [
  {
    "id": 1,
    "title_en": "Tsumiki Pyramid",
    "title_de": "Tsumiki-Pyramide",
    "text_en": "by Kengo Kuma<br>A pyramid made out of cedar wood components",
    "text_de": "von Kengo Kuma<br>Pyramide aus Zedernholz-Bauteilen",
    "imagePath": "images/tsumiki-1.png",
    "imagePosition": {
      "top": "250px",
      "left": "10%",
      "width": "300px"
    }
  },
  {
    "id": 2,
    "title_en": "What is Tsumiki?",
    "title_de": "Was ist Tsumiki? ",
    "text_en": "Tsumiki (積み木) is the Japanese word for wooden building blocks. Literally translated, it means “stacked wood”. Unlike traditional wooden building blocks, Kengo Kuma’s Tsumiki consists of a set of lightweight, triangular cedar pieces designed to branch upward like growing twigs.",
    "text_de": "„Tsumiki“ (積み木) ist das japanische Wort für Holzbausteine. Wörtlich übersetzt bedeutet der Ausdruck „Holz stapeln“. Im Gegensatz zu traditionellen Holzbausteinen besteht Kengo Kumas Tsumiki aus leichten, dreieckigen Zedernholzteilen – gestaltet in der Form sich nach oben verästelnder Zweige.",
    "imagePath": "images/tsumiki-2.png",
    "imagePosition": {
      "top": "300px",
      "right": "-30px",
      "width": "250px",
      "height": "200px"
    }
  },
  {
    "id": 3,
    "title_en": "The story <br>behind it ...",
    "title_de": "Die<br> Geschichte <br>dahinter ...",
    "text_en": "Kengo Kuma's Tsumiki was commissioned by the composer Ryuichi Sakamoto. In 2007, Sakamoto founded the forest conservation organization <em>more trees</em> – driven by the urgent need to take action against accelerating deforestation and the growing crisis of climate change. Under the guiding vision of \"connecting cities and forests\", Kuma now leads the organization. Originally conceived as a children's toy, the wooden forms are also used in architecture.",
    "text_de": "Kengo Kumas Tsumiki entstand im Auftrag des Komponisten Ryuichi Sakamoto. Dieser gründete 2007 die Waldschutzorganisation <em>more trees</em> mit dem Ziel, die Biodiversität der japanischen Wälder wiederherzustellen. Unter dem Grundsatz „Städte und Wälder verbinden“ leitet Kuma heute die Organisation. Ursprünglich als Kinderspielzeug konzipiert, werden die Holzformen auch in der Architektur verwendet.",
    "imagePath": "images/tsumiki-3.png",
    "imagePosition": {
      "top": "0px",
      "right": "15px",
      "width": "160px",
      "height": "180px"
    }
  },
  {
    "id": 4,
    "title_en": "The wood",
    "title_de": "Das Holz",
    "text_en": "After 1945, many dense cedar forests were planted as monocultures across Japan. As timber prices later declined, many of these forests were left unmanaged and forgotten. <em>More trees</em> works to revitalize these neglected forests through careful thinning, while replanting with tree species suited to the local climate and natural environment of each region. The Tsumiki shapes are handcrafted from FSC-certified cedar wood (FSC – Forest Stewardship Council). Tsumiki aims to bring people closer to environmental stewardship and offer sustainable alternatives.",
    "text_de": "Nach 1945 wurden in Japan viele dichte Zedernwälder als Monokulturen angelegt. Als die Holzpreise später sanken, wurden viele dieser Wälder nicht mehr gepflegt und gerieten in Vergessenheit. <em>More trees</em> setzt sich dafür ein, diese vernachlässigten Wälder durch sorgfältige Lichtung wiederzubeleben und gleichzeitig Baumarten anzupflanzen, die für das lokale Klima und die natürliche Umgebung der jeweiligen Region geeignet sind. Die Tsumiki-Formen werden aus FSC-zertifiziertem Zedernholz (FSC – Forest Stewardship Council) in Handarbeit hergestellt. Ziel ist es, den Menschen Umweltschutz näherzubringen und ihnen nachhaltige Alternativen zu bieten.",
    "imagePath": "images/tsumiki-4.png",
    "imagePosition": {
       "top": "-93px",
      "right": "-10px",
      "width": "250px"
    }
  },
  {
    "id": 5,
    "title_en": "What has been built with Tsumiki?",
    "title_de": "Was wurde mit Tsumiki gebaut?",
    "text_en": "Tokyo, 2015<br>Tsumiki Pavilion, as part of Tokyo Design Week.",
    "text_de": "Tokio 2015<br>Tsumiki Pavillon als Teil der Tokyo Design Week.",
    "imagePath": "images/tsumiki-5.png",
    "imagePosition": {
     "top": "250px",
      "left": "0px",
      "width": "380px"
    }
  },
  {
    "id": 6,
    "title_en": "“I used to play by myself with building blocks endlessly, and it was a big influence on me becoming an architect.”",
    "title_de": "„Früher habe ich Ewigkeiten allein mit Bauklötzen gespielt – das hat maßgeblich dazu beigetragen, dass ich Architekt geworden bin.”",
    "text_en": "– Kengo Kuma<br> <span class='card-text-small'> (Source: <em>more trees</em>,<br> http://more-trees-design.jp/project/tsumiki) </span>",
    "text_de": "– Kengo Kuma<br> <span class='card-text-small'>(Quelle: <em>more trees</em>,<br> http://more-trees-design.jp/project/tsumiki)</span>"
  }
];

function getRandomRotation() {
    return (Math.random() * 10 - 5);
}

// Load cards from JSON or use embedded defaults
async function loadCards() {
    try {
        const response = await fetch('data/cards.json');
        if (response.ok) {
            allCards = await response.json();
        } else {
            allCards = DEFAULT_CARDS;
        }
    } catch (error) {
        console.log('Using embedded card data');
        allCards = DEFAULT_CARDS;
    }
    
    // Assign rotation once during load
    allCards.forEach(card => {
        if (!card.rotation) {
            card.rotation = getRandomRotation();
        }
    });
    
    initializeCards();
}

// Initialize cards
function initializeCards() {
    currentCards = [...allCards];
    renderCards();
}

function renderCards() {
    cardStack.innerHTML = '';
    
    const controlsContainer = document.querySelector('.controls');
    
    // WENN NOCH KARTEN DA SIND
    if (currentCards.length > 0) {
        if (controlsContainer) controlsContainer.style.display = 'flex';

        currentCards.forEach((cardData, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.zIndex = currentCards.length - index;
            
            const rotation = cardData.rotation || 0;
            card.style.setProperty('--random-rotation', rotation);
            card.style.transform = `rotate(${rotation}deg)`;
            
            const image = document.createElement('img');
            image.className = 'card-image';
            image.src = cardData.imagePath;
            image.alt = `Card ${cardData.id}`;
            
            const pos = cardData.imagePosition;
            if (pos.top) image.style.top = pos.top;
            if (pos.left) image.style.left = pos.left;
            if (pos.right) image.style.right = pos.right;
            if (pos.width) image.style.width = pos.width;
            if (pos.height) image.style.height = pos.height;
            if (pos.transform) image.style.transform = pos.transform;
            
            const content = document.createElement('div');
            content.className = 'card-content';
            
            const title = document.createElement('h2');
            title.className = 'card-title';
            title.innerHTML = currentLanguage === 'en' ? cardData.title_en : cardData.title_de;
            
            const text = document.createElement('p');
            text.className = 'card-text';
            text.innerHTML = currentLanguage === 'en' ? cardData.text_en : cardData.text_de;

            content.appendChild(title);
            content.appendChild(text);
            card.appendChild(image);
            card.appendChild(content);
            cardStack.appendChild(card);
            
            updateTopCardClass();
        });
    } 
    // WENN KEINE KARTEN MEHR DA SIND (Endscreen)
    else {
        if (controlsContainer) controlsContainer.style.display = 'none';

        const endScreen = document.createElement('div');
        endScreen.className = 'end-screen';
        
       const endTitle = document.createElement('h2');
        endTitle.className = 'end-title'; 
        endTitle.style.marginBottom = '15px'; 
        endTitle.textContent = currentLanguage === 'en' ? END_SCREEN_DATA.title_en : END_SCREEN_DATA.title_de;
        endScreen.appendChild(endTitle);
        // ----------------------------------------------

        const endText = document.createElement('p');
        endText.className = 'end-text';
        endText.innerHTML = currentLanguage === 'en' ? END_SCREEN_DATA.text_en : END_SCREEN_DATA.text_de;
        endScreen.appendChild(endText); // Wird nach dem Titel angehängt

        // Wrapper für die beiden nebeneinanderliegenden Buttons
        const endActionsWrapper = document.createElement('div');
        endActionsWrapper.className = 'end-actions-wrapper';
        
        // 1. Restart Button
        const resetBtn = document.createElement('button');
        resetBtn.className = 'control-btn next-btn';
        resetBtn.textContent = currentLanguage === 'en' ? END_SCREEN_DATA.btn_en : END_SCREEN_DATA.btn_de;
        
        resetBtn.addEventListener('click', () => {
            cardHistory = [];
            initializeCards();
        });
        
        // 2. Info Button (wird hier dynamisch erzeugt)
        const infoBtn = document.createElement('button');
        infoBtn.className = 'control-btn info-btn';
        infoBtn.title = 'Informationen';
        infoBtn.innerHTML = `
            <span>i</span>
        `;
        
        // Klick-Event für das Impressum / Info
        infoBtn.addEventListener('click', () => {
           openInfoModal();
        });
        
        // Beide Buttons in den Wrapper packen
        endActionsWrapper.appendChild(resetBtn);
        endActionsWrapper.appendChild(infoBtn);
        
        endScreen.appendChild(endText);
        endScreen.appendChild(endActionsWrapper);
        cardStack.appendChild(endScreen);
    }
    
    updateControlButtons();
}

// Update control button states
function updateControlButtons() {
    const undoBtn = document.getElementById('btn-undo');
    undoBtn.disabled = cardHistory.length === 0;
}

// Update logo based on language
function updateLogo() {
    const logo = document.getElementById('logo');
    const subtitleText = document.getElementById('subtitle-text');
    const nextBtn = document.getElementById('btn-next');
    const nextLabel = nextBtn ? nextBtn.querySelector('span') : null;
    
    if (currentLanguage === 'en') {
        logo.src = 'logo/logo_en.jpg';
        subtitleText.textContent = 'Exhibition';
        if (nextLabel) nextLabel.textContent = 'next card';
    } else {
        logo.src = 'logo/logo_de.jpg';
        subtitleText.textContent = 'Ausstellung';
        if (nextLabel) nextLabel.textContent = 'Nächste Karte';
    }
}

// Language switching
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLanguage = btn.dataset.lang;
        updateLogo();
        renderCards();
    });
});

// Control buttons
document.getElementById('btn-undo').addEventListener('click', () => {
    if (cardHistory.length > 0 && !isAnimating) {
        isAnimating = true;
        const restoredCardData = cardHistory.pop();
        currentCards.unshift(restoredCardData);
        
        // 1. Create ONLY the restored card element
        const card = document.createElement('div');
        card.className = 'card entering'; // Add 'entering' immediately for the smooth slide-in
        card.style.zIndex = currentCards.length; // It goes to the very top
        
        const rotation = restoredCardData.rotation || 0;
        card.style.setProperty('--random-rotation', rotation);
        card.style.transform = `rotate(${rotation}deg)`;
        
        // Build the image
        const image = document.createElement('img');
        image.className = 'card-image';
        image.src = restoredCardData.imagePath;
        image.alt = `Card ${restoredCardData.id}`;
        
        const pos = restoredCardData.imagePosition;
        if (pos.top) image.style.top = pos.top;
        if (pos.left) image.style.left = pos.left;
        if (pos.right) image.style.right = pos.right;
        if (pos.width) image.style.width = pos.width;
        if (pos.height) image.style.height = pos.height;
        if (pos.transform) image.style.transform = pos.transform;
        
        // Build the content
        const content = document.createElement('div');
        content.className = 'card-content';
        
        const title = document.createElement('h2');
        title.className = 'card-title';
        title.innerHTML = currentLanguage === 'en' ? restoredCardData.title_en : restoredCardData.title_de;
        
        const text = document.createElement('p');
        text.className = 'card-text';
        text.innerHTML = currentLanguage === 'en' ? restoredCardData.text_en : restoredCardData.text_de;
        
        content.appendChild(title);
        content.appendChild(text);
        card.appendChild(image);
        card.appendChild(content);
        
        // 2. Insert it at the BEGINNING of the DOM stack (on top of others)
        // instead of clearing everything out
        cardStack.insertBefore(card, cardStack.firstChild);
        //color
        updateTopCardClass();
        updateControlButtons();
        
        // 3. Clean up the animation class once done
        setTimeout(() => {
            card.classList.remove('entering');
            isAnimating = false;
        }, 500);
    }
});

document.getElementById('btn-next').addEventListener('click', () => {
    if (currentCards.length > 0 && !isAnimating) {
        swipeCard(1, { useAnimation: true });
    }
});

// Touch/Mouse events
cardStack.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

cardStack.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('touchend', endDrag, { passive: false });

function startDrag(e) {
    if (currentCards.length === 0 || isAnimating) return;

    if (e.touches && e.touches.length) {
        document.body.style.overflow = 'hidden';
    }

    currentCard = cardStack.querySelector('.card');
    if (!currentCard) return;

    const target = e.target;
    const startedOnText = target && target.closest && target.closest('.card-text');

    startX = e.clientX || e.touches[0].clientX;
    startY = e.clientY || e.touches[0].clientY;
    isDragging = true;
    currentCard.style.transition = 'none';
    currentCard.dataset.dragMode = startedOnText ? 'text' : 'horizontal';
}

function drag(e) {
    if (!isDragging || !currentCard) return;

    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;
    const deltaX = x - startX;
    const deltaY = y - startY;

    if (currentCard.dataset.dragMode === 'text' && Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
        return;
    }

    if (Math.abs(deltaX) >= 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (Math.abs(deltaX) < 8 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
    }

    currentCard.style.transform = `translate(${deltaX}px, 0) rotate(${deltaX * 0.1}deg)`;
}

function endDrag(e) {
    if (!isDragging || !currentCard) return;

    document.body.style.overflow = '';

    const x = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : startX);
    const y = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : startY);
    const deltaX = x - startX;
    const deltaY = y - startY;
    const threshold = 100;

    isDragging = false;
    currentCard.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

    if (currentCard.dataset.dragMode === 'text' && Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
        delete currentCard.dataset.dragMode;
        currentCard.style.transform = `rotate(${getRandomRotation()}deg)`;
        currentCard.style.opacity = '1';
        return;
    }

    if (Math.abs(deltaX) <= threshold || Math.abs(deltaX) < Math.abs(deltaY)) {
        currentCard.style.transform = `rotate(${getRandomRotation()}deg)`;
        currentCard.style.opacity = '1';
        delete currentCard.dataset.dragMode;
        return;
    }

    const direction = deltaX > 0 ? 1 : -1;
    currentCard.style.transform = `translate(${direction * 300}px, 0) rotate(${direction * 30}deg)`;
    currentCard.style.opacity = '0';
    delete currentCard.dataset.dragMode;
    setTimeout(() => {
        swipeCard(direction, { useAnimation: false });
    }, 300);
}

function swipeCard(direction, { useAnimation = true } = {}) {
    if (currentCards.length === 0 || isAnimating) return;

    const topEl = cardStack.querySelector('.card');

    if (useAnimation && topEl) {
        isAnimating = true;
        topEl.classList.add('exiting');
        
        setTimeout(() => {
            const removedCard = currentCards.shift();
            cardHistory.push(removedCard);
            
            if (topEl && topEl.parentNode === cardStack) {
                cardStack.removeChild(topEl);
            }
            
            // HIER ANPASSEN: Wenn keine Karten mehr da sind, Endscreen rendern
            if (currentCards.length === 0) {
                renderCards();
            } else {
                updateTopCardClass();
            }
            
            updateControlButtons();
            isAnimating = false;
        }, 500);
    } else {
        // Immediate removal (nach Drag)
        const removedCard = currentCards.shift();
        cardHistory.push(removedCard);
        
        if (topEl && topEl.parentNode === cardStack) {
            cardStack.removeChild(topEl);
        }
        
        // HIER ANPASSEN: Wenn keine Karten mehr da sind, Endscreen rendern
        if (currentCards.length === 0) {
            renderCards();
        } else {
            updateTopCardClass();
        }
        
        updateControlButtons();
    }
}

function updateTopCardClass() {
    // Remove the 'top' class from any card that currently has it
    document.querySelectorAll('.card.top').forEach(card => card.classList.remove('top'));
    
    // Add 'top' to the first card in the DOM container
    const topCard = cardStack.querySelector('.card');
    if (topCard) {
        topCard.classList.add('top');
    }
}
// Initialize on page load
loadCards();




// Funktion zum Öffnen des Modals (Zentral gesteuert)
function openInfoModal() {
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    if (!modal) return;

    // Texte basierend auf der aktuell gewählten Sprache setzen
    if (currentLanguage === 'en') {
        modalTitle.textContent = INFO_MODAL_DATA.title_en;
        modalText.innerHTML = INFO_MODAL_DATA.text_en;
    } else {
        modalTitle.textContent = INFO_MODAL_DATA.title_de;
        modalText.innerHTML = INFO_MODAL_DATA.text_de;
    }
    
    modal.classList.add('show');
}

// Funktion zum Schließen des Modals
function closeInfoModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Event-Listener sicher initialisieren
function setupModalEvents() {
    const closeBtn = document.getElementById('modal-close-btn');
    const modal = document.getElementById('info-modal');

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeInfoModal();
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            // Schließt das Modal nur, wenn man auf den dunklen Hintergrund klickt
            if (e.target === modal) {
                closeInfoModal();
            }
        });
    }
}

// WICHTIG: Erst ausführen, wenn das gesamte Fenster und DOM vollständig geladen sind
window.addEventListener('load', () => {
    setupModalEvents();
});