import * as DataManager from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";


const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	DataManager.getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
		document.querySelector("#postCount").innerText = allPosts.length;
	})
}

const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showFooter = () => {
	const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
}

const showFilteredPosts = (year) => {
	//get a copy of the post collection
	const epoch = Date.parse(`01/01/${year}`);
	//filter the data
	const filteredData = DataManager.usePostCollection().filter(singlePost => {
	  if (Date.parse(singlePost.timestamp) >= epoch) {
		return true;
	  }
	})
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = PostList(filteredData);
	//Update post count number in footer
	document.querySelector("#postCount").innerText = filteredData.length;
}

const startGiffyGram = () => {
    showPostList();
	showNavBar();
	showFooter();

	const applicationElement = document.querySelector(".giffygram");
	applicationElement.addEventListener("click", event => {
		if (event.target.id === "logout"){
			console.log("You clicked on logout");
		} else if (event.target.id === "directMessageIcon") {
			console.log("You clicked the fountain pen in the navbar");
		} else if (event.target.id === "peanutButterIcon") {
			console.log("You clicked the peanut butter icon");
		} else if (event.target.id.startsWith("edit")){
			console.log("post clicked", event.target.id.split("--"))
			console.log("the id is", event.target.id.split("--")[1])
		}
	})
	applicationElement.addEventListener("change", event => {
		if (event.target.id === "yearSelection") {
		  const yearAsNumber = parseInt(event.target.value)
		  console.log(`User wants to see posts since ${yearAsNumber}`)
		  //invoke a filter function passing the year as an argument
		  showFilteredPosts(yearAsNumber);
		}
	})
	
}

startGiffyGram();