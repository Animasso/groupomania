<template>
  <main>
    <div class="d-flex justify-content-between mt-2">
      <div class="d-flex flex-row">
        <div class="d-flex flex-column">
          <h6 class="mb-0">
            {{ post.user.firstName }} {{ post.user.lastName }}
          </h6>
          <span class="date"> {{ formatDate(post.createdAt) }} </span>
        </div>
      </div>
    </div>
    <div class="titleCon">
      <p class="title">{{ post.title }}</p>
      <p class="content">{{ post.content }}</p>
    </div>
    <div class="mt-2 d-flex justify-content-end">
      <button
        class="btn btn-primary btn-sm ms-1"
        v-if="post.userId === user.id || user.admin === true"
        @click="deletePostEvent"
      >
        Supprimer
      </button>
    </div>

    <div class="card p-3 mt-3">
      <h2>Commentaires</h2>
      <div
        class="d-flex flex-column mt-2"
        v-for="comment in comments"
        v-bind:key="comment.id"
        :comment="comment"
      >
        <div class="d-flex flex-column">
          <div class="d-flex flex-column">
            <h6 class="mb-0">
              {{ comment.user.firstName }} {{ comment.user.lastName }}
            </h6>
            <span class="date">{{ formatDate(comment.createdAt) }}</span>
          </div>
        </div>
        <div class="com d-flex justify-content-between">
          <p class="content">{{ comment.comment }}</p>
          <button
            class="btn btn-outline-secondary btn-sm"
            v-if="comment.userId === user.id || user.admin === true"
            @click.prevent="deleteCom(comment)"
          >
            <span class="trash"><i class="fas fa-trash"></i></span>
          </button>
        </div>
      </div>
      <div class="form">
        <input
          class="form-control"
          v-model="comment"
          placeholder="Ecrire un commentaire..."
        />
        <div class="mgs">{{ message }}</div>

        <div class="mt-2 d-flex justify-content-end">
          <button
            class="btn btn-outline-secondary btn-sm"
            @click.prevent="createCom(post)"
          >
            Poster
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
export default {
  name: "Post",

  data() {
    return {
      user: [],
      comments: [],
      createdAt: "",
      comment: [],
      firstName: "",
      lastName: "",
      title: "",
      message: "",
      content:'',
      posts:[],
      
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
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
      .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.comments = response.data;
      })
      .catch((err) => console.log(err));
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },

    deletePostEvent() {
      this.$emit("deletePostEvent", this.post);
    },

    createCom(post) {
      if (this.comment == "") {
        this.message = "Ne pas poster avec un champs vide";
      } else {
        axios
          .post(
            "http://localhost:3000/api/auth/comments/",
            { comment: this.comment, postId: post.id },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.comment = "";
            axios
              .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
                headers: {
                  Authorization: "Bearer " + sessionStorage.token,
                },
              })
              .then((response) => {
                console.log(response);
                this.comments = response.data;
                this.message = "";
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    },

    deleteCom(comment) {
      axios
        .delete("http://localhost:3000/api/auth/comments/" + comment.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        })
        .then((response) => {
          console.log(response);
          axios
            .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            })
            .then((response) => {
              console.log(response);
              this.comments = response.data;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    
  },
};
</script>

<style scoped>

h1 {
  font-family: "Comic Sans MS", cursive;
  color: red;
}
h2 {
  font-size: smaller;
}
.card {
  border: 1px solid red;
  box-shadow: 2px 3px 3px red;
  background-color: antiquewhite;
}
.form {
  margin-top: 30px;
}
.trash {
  color: red;
}
.titleCon {
  margin-top: 20px;
}
.title {
  font-weight: bolder;
}
.mgs {
  color: red;
}
</style>