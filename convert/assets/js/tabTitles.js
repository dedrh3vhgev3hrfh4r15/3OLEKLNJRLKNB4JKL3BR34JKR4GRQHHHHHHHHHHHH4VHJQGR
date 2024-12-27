const tabTitles = ['@convert', '@reped', '@dead'];
let index = 0x0;

function updateTabTitle() {
    document.title = tabTitles[index];
    index = (index + 0x1) % tabTitles.length;
}

updateTabTitle();
setInterval(updateTabTitle, 0x1f4); // Update tab title every 500ms
