import * as DataManager from "./data/DataManager.js";
import { PostList, showPostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import { createEditForm } from "./feed/PostEdit.js";
import { LoginForm } from "../auth/LoginForm.js";
import { RegisterForm } from "../auth/RegisterForm.js";

const showPostEntry = () => {
	document.querySelector(".entry__form").innerHTML = PostEntry();
}

const showNavBar = () => {
	// Insert nav at beginning of giffygram element
	if (document.querySelector("nav")) {
		document.querySelector("nav").remove();
	}
	document.querySelector(".giffygram").insertAdjacentHTML('afterbegin', NavBar());
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

const checkForUser = () => {
	document.querySelector(".entry__form").innerHTML = '';
	if (sessionStorage.getItem("user")) {
		DataManager.setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startGiffyGram();
	} else {
		showLoginRegister();
		console.log("show login");
	}
}

const showLoginRegister = () => {
	showNavBar();
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = "";
}

const startGiffyGram = () => {
	document.querySelector("section.entryForm").innerHTML = '';
	showPostEntry();
	showPostList();
	showNavBar();
	showFooter();
}

const applicationElement = document.querySelector(".giffygram");
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		console.log("You clicked on logout");
	} else if (event.target.id === "directMessageIcon") {
		console.log("You clicked the fountain pen in the navbar");
	} else if (event.target.id === "peanutButterIcon") {
		console.log("You clicked the peanut butter icon");
	} else if (event.target.id.startsWith("edit")) {
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
applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		//clear the input fields
		document.querySelector("input[name='postTitle']").value = '';
		document.querySelector("input[name='postURL']").value = '';
		document.querySelector("textarea[name='postDescription']").value = '';
	}
})
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
		//collect the input values into an object to post to the DB
		const title = document.querySelector("input[name='postTitle']").value
		const url = document.querySelector("input[name='postURL']").value
		const description = document.querySelector("textarea[name='postDescription']").value
		//we have not created a user yet - for now, we will hard code `1`.
		//we can add the current time as well
		const postObject = {
			title: title,
			imageURL: url,
			description: description,
			userId: DataManager.getLoggedInUser().id,
			timestamp: Date.now()
		}

		// be sure to import from the DataManager
		DataManager.createPost(postObject)
			// Update current list of entries to show recently added entry
			.then(showPostList);
	} else if (event.target.id.startsWith("delete")) {
		let targetPostId = event.target.id.split("--")[1];
		console.log(`You want to delete post ${targetPostId}`)
		DataManager.deletePost(targetPostId)
			.then(showPostList);
	} else if (event.target.id.startsWith("edit")) {
		let targetPostId = event.target.id.split("--")[1];
		// Retrieve single post as JSON object
		DataManager.getSinglePost(targetPostId)
			.then(singlePostJSON => {
				// Generate the dialog element
				return createEditForm(singlePostJSON);
			})
			.then(() => {
				// Once loaded, show the edit form
				let tmp = document.querySelector("#postEditModal");
				console.log(tmp);
				tmp.showModal();
			})
	}
})
// Logout button clicked
applicationElement.addEventListener("click", (event) => {
	if (event.target.id === "logout") {
		DataManager.logoutUser();
		sessionStorage.removeItem("user");
		console.log(DataManager.getLoggedInUser());
		checkForUser();
	}
})

// Login button clicked
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		DataManager.loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startGiffyGram();
				} else {
					//got a false value - no user
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	}
})
// Register button clicked
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value
		}
		DataManager.registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startGiffyGram();
			})
	}
})


checkForUser();