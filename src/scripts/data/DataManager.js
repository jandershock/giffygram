let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}

export const getUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        return parsedResponse;
    })
}

export const getPosts = () => {
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("data with user", parsedResponse)
      postCollection = parsedResponse
      return parsedResponse;
    })
}

let loggedInUser = {}

export const getLoggedInUser = () => {
	return loggedInUser;
}

export const setLoggedInUser = (user) => {
  loggedInUser = user;
}

export const loginUser = (userObj) => {
  return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
  .then(response => {
    let tmp = response.json();
    console.log(response, tmp);
    return tmp;
  })
  .then(parsedUser => {
    //is there a user?
    console.log("parsedUser", parsedUser) //data is returned as an array
    if (parsedUser.length > 0){
      setLoggedInUser(parsedUser[0]);
      return getLoggedInUser();
    }else {
      //no user
      return false;
    }
  })
}

export const registerUser = (userObj) => {
  return fetch(`http://localhost:8088/users`, {
    method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
  })
  .then(response => response.json())
  .then(parsedUser => {
    setLoggedInUser(parsedUser);
    return getLoggedInUser();
  })
}

export const logoutUser = () => {
  loggedInUser = {};
}

export const createPost = postObj => {
  return fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)

  })
      .then(response => response.json())
}

export const deletePost = postId => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
}

export const getSinglePost = postId => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
}

export const updatePost = (postId, postObj) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
}

export const getUserLikesByPostId = (postId) => {
  return fetch(`http://localhost:8088/userLikes?postId=${postId}`)
    .then(data => data.json())
}

export const createUserLike = (userLikeObj) => {
  return fetch("http://localhost:8088/userLikes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userLikeObj)
  })
    .then(response => response.json())
}