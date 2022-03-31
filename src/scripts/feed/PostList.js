import { Post } from "./Post.js";
import * as DataManager from "../data/DataManager.js"
import { generateLikesDiv } from "./Likes.js";

export const PostList = (allPosts) => {
	// Build an array of html strings
	let postPromiseArray = allPosts.map((element) => {
		// Post function returns html string based on a single post object
		return Post(element)
	});
	return postPromiseArray.join("");

}

export const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	DataManager.getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
		document.querySelector("#postCount").innerText = allPosts.length;
	})
}