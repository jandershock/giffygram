import * as DataManager from "./data/DataManager.js";

/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/


const startGiffyGram = () => {
    const postElement = document.querySelector(".postList");
	postElement.innerHTML = "Hello Cohort 47"
}
// Are you defining the function here or invoking it?
startGiffyGram();

DataManager.getPosts().then(data => {
    console.log("Data", data);
});

DataManager.getUsers().then(data => {
    console.log("Users", data);
});