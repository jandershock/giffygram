import { updatePost } from "../data/DataManager.js";
import { showPostList } from "./PostList.js";

export const createEditForm = (postObj) => {
    return fetch(`./partials/editForm.html`)
        .then(data => data.text())
        .then((formString) => {
            // The main element
            document.querySelector(".giffygram").insertAdjacentHTML("beforeend", formString)
            // The newly inserted modal
            let editFormEl = document.querySelector(".giffygram .editPost");
            // Load post values into edit form input fields
            [
                editFormEl.querySelector("div input[name='postTitle']").value,
                editFormEl.querySelector("div input[name='postURL']").value,
                editFormEl.querySelector("textarea[name='postDescription']").value
            ] = [postObj.title, postObj.imageURL, postObj.description];

            // Set update button event listener
            editFormEl.querySelector("#post__update").addEventListener("click", () => {
                // Update post
                [postObj.title, postObj.imageURL, postObj.description] = [
                    editFormEl.querySelector("div input[name='postTitle']").value,
                    editFormEl.querySelector("div input[name='postURL']").value,
                    editFormEl.querySelector("textarea[name='postDescription']").value
                ];
                updatePost(postObj.id, postObj)
                    .then(() => {
                        // Refresh post list to show updated post
                        showPostList();
                        // Close modal
                        editFormEl.close();
                        // Delete dialog element from DOM
                        editFormEl.remove();
                    })
            })
            
            // Set cancel button event listener
            editFormEl.querySelector("#post__cancel").addEventListener("click", () => {
                editFormEl.close();
                editFormEl.remove();
            })

            return formString;
    })
}