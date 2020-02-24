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
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link został kliknięty!');
  console.log('Event:', event);
  /* 1 remove class 'active' from all article links- usunięcie klasy active ze wszystkich linków */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
    console.log('link z klasą active dla linków:', activeLink);
  }
  /* 2 add class 'active' to the clicked link- dodanie klasy active dla klikniętego linka*/
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  console.log('clickedElement with plus:' + clickedElement);
  /* 3 remove class 'active' from all articles- usunięcie klasy active ze wszystkich artykułów*/
  const activeArticles = document.querySelectorAll('article.active');
  console.log(activeArticles);
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
    console.log('link z klasą active dla articles:', activeArticle);
  }
  /* get 'href' attribute from the clicked link- pobranie atrybutu klikniętego linku */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('Pobrany atrybut klikniętego linku:', articleSelector);
  /* find the correct article using the selector (value of 'href' attribute)- wyszukanie właściwego artykułu*/
  const targetArticle = document.querySelector(articleSelector);
  console.log('Artykuł o szukanym selektorze:', targetArticle);
  /* add class 'active' to the correct article- dodanie klasy active do znalezionego artykułu */
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = '') {
  console.log('Postać atrybutu customSelector:', customSelector);
  //const generateTitleLinks = function (customSelector = '') {
  console.log('Funkcja działa');
  /* remove contents of titleList- usunięcie listy linków w lewej kolumnie */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article- dla każdego artykułu*/
  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('Wartość selectora:', optArticleSelector + customSelector);
  console.log('Wszystkie artykuły z selectorem .post i atrybutem data-tags:', articles);
  let html = '';
  for (let article of articles) {
    /* get the article id- pobranie id artykułu */
    const articleId = article.getAttribute('id');
    console.log('Wszystkie id:', articleId);
    /* find the title element- znalezienie tytułu */
    const postTitle = article.querySelector(optTitleSelector);
    /* get the title from the title element */
    const articleTitle = postTitle.innerHTML;
    console.log('Wyświetl tytuł:', articleTitle);
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('Nowy link:', linkHTML);
    /* insert link into titleList- wstawienie linkówHTML do listy*/
    //titleList.insertAdjacentHTML("beforeend", linkHTML);
    html = html + linkHTML;
    console.log('Zawartość zmiennej html:', html);
  }
  titleList.innerHTML = html;
}

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('Wyświetl wszystkie elementy articles:', articles);
  /* make html variable with empty string */
  let html = '';
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper with class .post-tags .list */
    const tag = article.querySelector(optArticleTagsSelector);
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('Wszystkie znaczniki z atrybitem data-tags:', articleTags);
    /* split tags into array */
    console.log(articleTags.split(' '));
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let articleTagArray of articleTagsArray) {
      /* generate HTML of the link */
      console.log(articleTagArray);
      const linkHTML = '<li><a href="#tag-' + articleTagArray + '">' + articleTagArray + '</a></li> ';
      console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
    }
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    tag.innerHTML = html;
    console.log('Tag zawarty w div o klasie post-tags ma postać:', tag.innerHTML);
  }
  /* END LOOP: for every article: */
}

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Pobrana wartość atrybutu klikniętego linku:', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ' ');
  console.log('Link po edycji replace:', tag);
  /* find all tag links with class active */
  const tagsLinksClassActive = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('Linki z klasą active:', tagsLinksClassActive);
  /* START LOOP: for each active tag link */
  for (let tagLinksClassActive of tagsLinksClassActive) {
    /* remove class active */
    tagLinksClassActive.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log('Wszystkie linki z tagu:', tagsLinks);
  /* START LOOP: for each found tag link */
  for (let tagsLink of tagsLinks) {
    /* add class active */
    tagsLink.classList.add('active');
    console.log('Wszystkie linki z tagu z klasą active:', tagsLink);
  }/* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log('Wywołanie funkcji generateTitleLinks');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  /*const href = '#tag-';
  const tagsLinks = document.querySelectorAll('a[href="' + href + '"]');
  const tagsLinks = document.querySelectorAll('.list-horizontal a');*/
  //const tagsLinks = document.querySelectorAll('.post-tags a');
  console.log('Pobrane linki to:', tagsLinks);
  /* START LOOP: for each link */
  for (let tagsLink of tagsLinks) {
    /* add tagClickHandler as event listener for that link */
    tagsLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

//Wywołanie funkcji
generateTitleLinks();
generateTags();
addClickListenersToTags();
//Listenery
const links = document.querySelectorAll('.titles a');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
