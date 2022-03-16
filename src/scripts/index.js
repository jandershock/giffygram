import * as DataManager from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";


const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	DataManager.getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const startGiffyGram = () => {
    showPostList();
	showNavBar();
}

startGiffyGram();

DataManager.getPosts().then(data => {
    console.log("Data", data);
});

DataManager.getUsers().then(data => {
    console.log("Users", data);
});