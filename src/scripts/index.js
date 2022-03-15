import * as DataManager from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js"


const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	DataManager.getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const startGiffyGram = () => {
    showPostList();
}

startGiffyGram();

DataManager.getPosts().then(data => {
    console.log("Data", data);
});

DataManager.getUsers().then(data => {
    console.log("Users", data);
});