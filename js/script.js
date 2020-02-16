'use strict';
document.getElementById("test-button").addEventListener("click", function () {
    const links = document.querySelectorAll(".titles a");
    console.log("links", links);
    /*for (let link of links) {
        console.log("link:", link);
    }*/
    for (let i = 0; i < links.length; i++) {
        console.log(links[i]);
    }
});
const titleClickHandler = function (event) {
    console.log("Link został kliknięty!");
    console.log("Event:", event);
    /* remove class 'active' from all article links  */

    /* add class 'active' to the clicked link */

    /* remove class 'active' from all articles */

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
}
const links = document.querySelectorAll(".titles a");
for (let link of links) {
    link.addEventListener("click", titleClickHandler);
}