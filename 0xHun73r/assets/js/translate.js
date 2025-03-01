document.addEventListener("DOMContentLoaded", function () {
    const translations = {
        '不和': "0xhunt73r",
        'インスタグラム': "@0xhun73rr",
        'ウェンディゴ': "0xHun73r",
        '自分の': "owns",
        'あなた': "you",
        'インターネットプロトコル': "$ip", // Placeholder for IP address
    };

    function fetchIP() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                translations['インターネットプロトコル'] = data.ip; // Update translations with the IP address
            })
            .catch(error => console.error('Error fetching IP:', error));
    }

    function createPopup(text) {
        const popup = document.createElement("div");
        popup.textContent = text;
        popup.classList.add("english-name-popup");
        document.body.appendChild(popup);

        // Trigger the fade-in after the popup is added to the DOM
        setTimeout(() => {
            popup.style.opacity = "1";  // Fade-in effect
        }, 10); // Small delay to ensure transition is visible

        console.log("Popup created:", popup); // Debug log to confirm creation
        return popup;
    }

    function hideTranslation(popup) {
        if (popup && typeof popup.remove === 'function') {
            popup.remove(); // Just remove it immediately
            console.log("Popup removed:", popup); // Debug log to confirm removal
        } else {
            console.warn('Popup is not a valid DOM element or remove() is not a function');
        }
    }

    function showTranslation(event) {
        const target = event.target;
        if (target.tagName !== 'SPAN' || !target.classList.contains("japanese-name")) {
            return;
        }

        const japaneseWord = target.textContent.trim();
        const englishTranslation = translations[japaneseWord];
        if (!englishTranslation) {
            return;
        }

        const existingPopup = document.querySelector(".english-name-popup");

        // Hide existing popup before creating a new one
        if (existingPopup) {
            hideTranslation(existingPopup);
        }

        // Create a new popup
        const popup = createPopup(englishTranslation);
        target._popupElement = popup; // Store reference directly on the element
    }

    function handleMouseOut(event) {
        const target = event.target;
        if (target.tagName === 'SPAN' && target.classList.contains("japanese-name")) {
            const popup = target._popupElement; // Retrieve the stored popup element
            if (popup) {
                hideTranslation(popup); // Hide the popup
                delete target._popupElement; // Clean up
            }
        }
    }

    const namesList = document.querySelector(".names-list ul");
    if (namesList) {
        namesList.addEventListener("mouseover", showTranslation);
        namesList.addEventListener("mouseout", handleMouseOut);
    } else {
        console.error('.names-list ul not found in the DOM');
    }

    // Prevent lingering popups when switching quickly
    document.body.addEventListener("mouseout", (event) => {
        const popup = document.querySelector(".english-name-popup");
        if (popup && !namesList.contains(event.relatedTarget)) {
            hideTranslation(popup); // Hide if mouse is not over names list
        }
    });

    // Fetch the user's IP address
    fetchIP();
});
