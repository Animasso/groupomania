<template>
  <navBar />
  <div class="container">
    <div class="container pb-cmnt-container">
      <h1>Bienvenue sur ton espace {{ user.firstName }} {{ user.lastName }}</h1>
      <div class="row">
        <div class="col-md-9 col-md-offset-3">
          <div class="panel panel-info">
            <div class="panel-body">
              <div class="form-group green-border-focus">
                <label for="title">Sujet</label><br />
                <input type="text" v-model="title" class="form-control" /><br />
                <label for="postMsg">Exprimez vous</label>
                <textarea
                  v-model="content"
                  class="form-control"
                  id="postMgs"
                  rows="3"
                ></textarea>
                <div class="mgs">{{ message }}</div>
              </div>
              <button
                class="btn btn-primary pull-right"
                type="text"
                @click="postMessage()"
              >
                Partager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card row-8 p-3 border-blue mt-3">
      <div id="card">
        <Post v-for="post in posts" v-bind:key="post.id" :post="post" @deletePostEvent="deletePost"/>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import Post from "../components/Post";
import axios from "axios";

export default {
  name: "Perso",
  components: {
    navBar,
    Post,
  },
  data() {
    return {
      user: [],
      posts: [],
      users: [],
      content: "",
      post: [],
      comment: [],
      createdAt: "",
      title: "",
      message: "",
      image: null,
    };
  },
  created() {
    const userId = sessionStorage.getItem("user");
    axios
      .get("http://localhost:3000/api/users/" + userId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => (this.user = response.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response), (this.users = response.data);
      })

      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/api/auth/posts/" + userId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.posts = response.data;
      })
      .catch((err) => console.log(err));
  },

  methods: {
    postMessage() {
      axios
        .post(
          "http://localhost:3000/api/auth/posts/post",
          { content: this.content, title: this.title },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.content = "";
          this.title = "";
          const userId = sessionStorage.getItem("user");
          axios
            .get("http://localhost:3000/api/auth/posts/" + userId, {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            })
            .then((response) => {
              console.log(response);
              this.posts = response.data;
              this.message = "";
            })
            .catch((err) => console.log(err));
        });
    },
    deletePost(post) {
      axios
        .delete("http://localhost:3000/api/auth/posts/" +post.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.posts = this.posts.filter((post) => post.id != this.post.id);
          
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>


<style scoped>
.container {
  font-family: "Comic Sans MS", cursive;
}
h1 {
  font-family: "Comic Sans MS", cursive;
  color: red;
}
.card {
  border: 1px solid red;
  box-shadow: 2px 3px 3px red;
  background-color: rgb(218, 212, 212);
}
.form {
  margin-top: 30px;
}

.form-control {
  border-radius: 20px;
}
.form-group {
  margin-top: 30px;
}
label {
  font-family: "Comic Sans MS", cursive;
  color: rgb(48, 48, 172);
}
.row {
  margin-bottom: 50px;
  margin-top: 50px;
  background-color: rgb(216, 212, 206);
}
.mgs {
  color: red;
}
</style> 