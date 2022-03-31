import { getLoggedInUser, getUserLikesByPostId } from "../data/DataManager.js"
const likeButton = (postId) => {
  getUserLikesByPostId(postId)
    .then(likes => {
      const userLikedPost = likes.find(element => {
        return element.userId === getLoggedInUser().id
      })
      if (userLikedPost){
        document.querySelector(`#postLikeButtonDiv__${postId}`).innerHTML = `<button type="button" id='unlikeButton__${postId}'>Unlike Post</button>`;
      } else {
        document.querySelector(`#postLikeButtonDiv__${postId}`).innerHTML = `<button type="button" id='likeButton__${postId}'>Like Post</button>`;
      }
    })
}

const getNumberOfLikes = (postId) => {
  getUserLikesByPostId(postId)
    .then(response => {
      document.querySelector(`#likes__${postId}`).innerHTML = `Number of likes: 👍 ${response.length}`
    })
}
export const Post = (postObject) => {
  return `
  <section class="post">
    <header>
        <h2 class="post__title">${postObject.title}</h2>
        <h3 class="post__author">${postObject.user.name}
    </header>
    <img class="post__image" src="${postObject.imageURL}" />
    ${getLoggedInUser().id === postObject.user.id ?
      `<div><button id="edit--${postObject.id}">Edit</button></div>
      <div><button id="delete--${postObject.id}">Delete</button></div>`
      : ``
    }
    <div id="postLikeButtonDiv__${postObject.id}">${likeButton(postObject.id)}</div>
    <p id="likes__${postObject.id}">Number of likes: 👍 ${getNumberOfLikes(postObject.id)}
  </section>
`
  
}