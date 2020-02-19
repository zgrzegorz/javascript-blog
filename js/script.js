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
    event.preventDefault();
    const clickedElement = this;
    console.log("Link został kliknięty!");
    console.log("Event:", event);
    /* 1 remove class 'active' from all article links- usunięcie klasy active ze wszystkich linków */
    const activeLinks = document.querySelectorAll(".titles a.active");
    for (let activeLink of activeLinks) {
        activeLink.classList.remove("active");
        console.log("link z klasą active dla linków:", activeLink);
    }

    /* 2 add class 'active' to the clicked link- dodanie klasy active dla klikniętego linka*/
    clickedElement.classList.add("active");
    console.log("clickedElement:", clickedElement);
    console.log("clickedElement with plus:" + clickedElement);
    /* 3 remove class 'active' from all articles- usunięcie klasy active ze wszystkich artykułów*/
    const activeArticles = document.querySelectorAll("article.active");
    console.log(activeArticles);
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove("active");
        console.log("link z klasą active dla articles:", activeArticle);
    }

    /* get 'href' attribute from the clicked link- pobranie atrybutu klikniętego linku */
    const articleSelector = clickedElement.getAttribute("href");
    console.log("Pobrany atrybut klikniętego linku:", articleSelector);
    /* find the correct article using the selector (value of 'href' attribute)- wyszukanie właściwego artykułu*/
    const targetArticle = document.querySelector(articleSelector);
    console.log("Artykuł o szukanym selektorze:", targetArticle);
    /* add class 'active' to the correct article- dodanie klasy active do znalezionego artykułu */
    targetArticle.classList.add("active");

}

const generateTitleLinks = function () {
    /* remove contents of titleList- usunięcie listy linków w lewej kolumnie */
    const titleList = document.querySelector(".titles");
    titleList.innerHTML = "";
    /* for each article- dla każdego artykułu*/
    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll("article.post");
    console.log("Wszystkie artykuły:", articles);
    let html = "";
    for (let article of articles) {
        /* get the article id- pobranie id artykułu */
        const articleId = article.getAttribute("id");
        console.log("Wszystkie id:", articleId);
        /* find the title element- znalezienie tytułu */
        const postTitle = article.querySelector(".post-title");
        /* get the title from the title element */
        const articleTitle = postTitle.innerHTML;
        console.log("Wyświetl tytuł:", articleTitle);
        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log("Nowy link:", linkHTML);
        /* insert link into titleList- wstawienie linkówHTML do listy*/
        //titleList.insertAdjacentHTML("beforeend", linkHTML);
        html = html + linkHTML;
        console.log("Zawartość zmiennej html:", html);
    }
    titleList.innerHTML = html;
}
generateTitleLinks();
const links = document.querySelectorAll(".titles a");
for (let link of links) {
    link.addEventListener("click", titleClickHandler);
}