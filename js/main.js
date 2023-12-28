const openModelBtn = document.querySelector("#openModelLogin");
const registerBtn = document.querySelector("#openModelRegister");
const logoutBtn = document.querySelector("#logoutBtn");
const loginBtn = document.querySelector("#loginBtn");
const boxModel = document.querySelector("#boxModel");
const closeBtn = document.querySelector("#closeBtn");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const btnAddPost = document.querySelector("#btnAddPost");
const userInfo = document.querySelector("#userInfo");
let token = "";
let user = "";
// BAse Url
const baseUrl = `https://tarmeezacademy.com/api/v1`;
// events
closeBtn.addEventListener("click", closeModel);
loginBtn.addEventListener("click", userLogin);
logoutBtn.addEventListener("click", logout);
// Functions
// Close Model
function closeModel() {
  boxModel.style.display = "none";
}
// Open Model
openModelBtn.addEventListener("click", function () {
  boxModel.style.display = "block";
});

// FUNCTIONS

// Login
async function userLogin(e) {
  e.preventDefault();

  const params = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  const { data } = await axios.post(`${baseUrl}/login`, params);
  storge(data);
  closeModel();
  setupUi();
}

// LogOut

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setupUi();
}

// Save local Storage
function storge(data) {
  console.log(data);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

// Get Posts
getPosts();
async function getPosts() {
  try {
    const { data } = await axios.get(`${baseUrl}/posts?limit=5`);
    console.log(data.data);
    displayPosts(data.data);
  } catch (err) {
    console.log(err);
  }
}
// Display Posts
function displayPosts(data) {
  let content = "";
  data.forEach((post) => {
    content += `<div class="post mt-3">
            <!-- Head -->
            <div class="post-head d-flex align-items-center">
              <div class="post-head-img">
                <img
                  src="${post.author.profile_image}"
                  alt="user image"f
                  class="avater"
                />
              </div>
              <h4 class="profile-name my-0 ms-2">${post.author.username}</h4>
            </div>
            <!-- // Head -->
            <!-- Post Image -->
            <div class="post-img my-2">
              <img class="w-100" src="${post.image}" alt="" />
            </div>
            <!-- // Post Image -->
            <!-- Post Descripion -->
            <div class="desc">
              <span class="date"> ${post.created_at} </span>
              <p class="post-desc m-0">
                ${post.body}
              </p>
            </div>
            <!-- Post Descripion -->
            <div class="mt-2 d-flex flex-wrap align-items-center gap-3">
              <div class="comments">
                <i class="fa-solid fa-comment"></i>
                <span>(${post.comments_count}) Comments</span>
              </div>
              <div class="tags d-flex">
                <span>Lorem.</span>
                <span>Lorem.</span>
                <span>Lorem.</span>
              </div>
            </div>
          </div>`;
  });
  document.querySelector(".posts-wrapper").innerHTML = content;
}

// Function setupUi

setupUi();
function setupUi() {
  token = localStorage.getItem("token");
  user = JSON.parse(localStorage.getItem("user"));
  if (token !== null && user !== null) {
    registerBtn.style.display = "none";
    openModelBtn.style.display = "none";
    btnAddPost.style.display = "block";
    logoutBtn.style.display = "block";
  } else {
    registerBtn.style.display = "block";
    openModelBtn.style.display = "block";
    btnAddPost.style.display = "none";
    logoutBtn.style.display = "none";
  }
  displayUserLogin();
}
// Display User
displayUserLogin();
function displayUserLogin() {
  const userImage = document.querySelector(".user-image");
  const username = document.querySelector("#userName");

  if (token !== null) {
    userImage.style.display = "block";
    username.style.display = "block";
  } else {
    userImage.style.display = "none";
    username.style.display = "none";
  }

  if (user !== null && typeof user.profile_image == "string") {
    userImage.src = user.profile_image;
    username.innerHTML = user.username;
  } else {
    userImage.src = "images/blank-profile-picture-973460__340.webp";
    username.innerHTML = "user";
  }
}
