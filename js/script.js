'use strict';
/*Test z przyciskiem button
document.getElementById("test-button").addEventListener("click", function () {
    const links = document.querySelectorAll(".titles a");
    console.log("links", links);
    for (let link of links) {
        console.log("link:", link);
    }
    for (let i = 0; i < links.length; i++) {
        console.log(links[i]);
    }
}); */
const titleClickHandler = function (event) {
    console.log("Link został kliknięty!");
    console.log("Event:", event);
    /* 1 remove class 'active' from all article links- usunięcie klasy active ze wszystkich linków */
    const activeLinks = document.querySelectorAll(".titles a.active");
    for (let activeLink of activeLinks) {
        activeLink.classList.remove("active");
        console.log("link z klasą active dla linków:", activeLink);
    }

    /* 2 add class 'active' to the clicked link */

    /* 3 remove class 'active' from all articles- usunięcie klasy active ze wszystkich artykułów*/
    const activeArticles = document.querySelectorAll("article.active");
    console.log(activeArticles);
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove("active");
        console.log("link z klasą active dla articles:", activeArticle);
    }

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
}
const links = document.querySelectorAll(".titles a");
for (let link of links) {
    link.addEventListener("click", titleClickHandler);
}