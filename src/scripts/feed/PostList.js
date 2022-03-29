import { Post } from "./Post.js";
import * as DataManager from "../data/DataManager.js"

export const PostList = (allPosts) => {
	let postHTML = "";
		//Loop over the array of posts and for each one, invoke the Post component which returns HTML representation
		for (const postObject of allPosts) {
			//what is a postObject?
			postHTML += Post(postObject)
		}
		return postHTML;
	
}

export const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	DataManager.getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
		document.querySelector("#postCount").innerText = allPosts.length;
	})
}