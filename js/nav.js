// Add a footer nav bar for all prototype pages.
let links = '<nav style="margin-top: 5em;">';
links += '<a href="index.html">Demo 1</a> | <a href="shred.html">Demo 2</a>';
links += '</nav>';

// @todo this breaks demo1 for some reason?
document.querySelector(".container").insertAdjacentHTML('beforeend', links);

// Add a class to the active page link.
const addLinkClass = () => {
    var currentPage = location.href;
    var allA = document.getElementsByTagName("A");
    for (var i = 0, len = allA.length; i < len; i++) {
        if (allA[i].href == currentPage) {
            allA[i].className = "active";
        }
    }
}

addLinkClass();