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
  optArticleTagsSelector = '.post-tags .list',
  optAuthorTagSelector = '.post-author',
  optTagsListSelector = '.list.tags',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  /* 1 remove class 'active' from all article links- usunięcie klasy active ze wszystkich linków */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* 2 add class 'active' to the clicked link- dodanie klasy active dla klikniętego linka*/
  clickedElement.classList.add('active');
  /* 3 remove class 'active' from all articles- usunięcie klasy active ze wszystkich artykułów*/
  const activeArticles = document.querySelectorAll('article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
    console.log('link z klasą active dla articles:', activeArticle);
  }
  /* get 'href' attribute from the clicked link- pobranie atrybutu klikniętego linku */
  const articleSelector = clickedElement.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute)- wyszukanie właściwego artykułu*/
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article- dodanie klasy active do znalezionego artykułu */
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = '') {
  //const generateTitleLinks = function (customSelector = '') {
  /* remove contents of titleList- usunięcie listy linków w lewej kolumnie */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article- dla każdego artykułu*/
  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {
    /* get the article id- pobranie id artykułu */
    const articleId = article.getAttribute('id');
    /* find the title element- znalezienie tytułu */
    const postTitle = article.querySelector(optTitleSelector);
    /* get the title from the title element */
    const articleTitle = postTitle.innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* insert link into titleList- wstawienie linkówHTML do listy*/
    //titleList.insertAdjacentHTML("beforeend", linkHTML);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}
/*zadaniem funkcji jest znalezienie max i min liczby wystąpień tagów w poszczególnych atykulach*/
function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999, };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    /*if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    } lub
    params.max = tags[tag] > params.max ? tags[tag] : params.max;
    params.min = tags[tag] < params.min ? tags[tag] : params.min;*/
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  console.log('classNumber: ', classNumber);
  return (optCloudClassPrefix + classNumber);
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array
  let allTags = [];*/
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* make html variable with empty string */
  let html = '';
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper with class .post-tags .list */
    const tag = article.querySelector(optArticleTagsSelector);
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let articleTagArray of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + articleTagArray + '">' + articleTagArray + '</a></li> ';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags
      if (allTags.indexOf(linkHTML) == -1) {
        console.log('Czy tablica ma jakieś elementy?:', allTags.indexOf(linkHTML));
        /* [NEW] add generated code to allTags array
        allTags.push(linkHTML);//const array = allTags.push(linkHTML);
        console.log('Puszowanie do tablicy:', allTags);
      }
      END LOOP: for each tag */
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[articleTagArray]) {
        /* [NEW] add tag to allTags object */
        allTags[articleTagArray] = 1;
      } else {
        allTags[articleTagArray]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tag.innerHTML = html;
    /* END LOOP: for every article: */
    /* [NEW] add html from allTags to tagList
  tagList.innerHTML = allTags.join(' ');
  console.log('Zawartość obiektu:', allTags);
  console.log('Tekst utworzony z tablicy:', tagList);*/
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '"' + 'class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
  console.log(allTags);
}

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  let activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant*/
  const allTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (const tag of allTags) {
    /* add class active */
    tag.classList.add('active');
    /* END LOOP: for each found tag link */
  }
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

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper with class .post-author */
    const tag = article.querySelector(optAuthorTagSelector);
    /* get tags from data-author attribute */
    const authorTags = article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTML = '<a href="#' + authorTags + '">' + authorTags + '</a>';
    /* make html variable with empty string */
    let html = '';
    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the tags wrapper */
    tag.innerHTML = html;
    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[authorTags]) {
      allAuthors[authorTags] = 1;
    } else {
      allAuthors[authorTags]++;
    }
    /* END LOOP: for every article: */
  }
  /* [NEW] START LOOP: for each tag in allAuthors: */
  for (let Author in allAuthors) {
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a href="#' + Author + '"><span class="author-name">' + Author + '(' + allAuthors[Author] + ')</span></a></li>';
    /* [NEW] END LOOP: for each tag in allAuthors: */
  }
  /* [NEW] find list of authors in right column */
  const AuthorList = document.querySelector(optAuthorsListSelector);
  /*[NEW] add HTML from allAuthorsHTML to AuthorList */
  AuthorList.innerHTML = allAuthorsHTML;
}

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#', '');
  /* make a new constant "tag" and extract tag from the "href" constant */
  /* find all tag links with class active */
  let activeTags = document.querySelectorAll('a.active[href^="#by "]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant*/
  const allTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (const tag of allTags) {
    /* add class active */
    tag.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

const addClickListenersToAuthors = function () {
  /* find all links to tags author */
  const tagsLinks = document.querySelectorAll('a[href^="#by "]');
  /* START LOOP: for each link */
  for (let tagsLink of tagsLinks) {
    /* add tagClickHandler as event listener for that link */
    tagsLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
};
//Wywołanie funkcji
generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
//Listenery
const links = document.querySelectorAll('.titles a');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
