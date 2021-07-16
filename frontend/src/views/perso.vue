<template>
   <div class ="container">
     <nav />
      <div class="container pb-cmnt-container">
      <h1>Bienvenue sur ton espace {{user.firstName}} {{user.lastName}} </h1>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    <div class="panel panel-info">
                        <div class="panel-body">
                            <textarea placeholder="Rédigez votre poste" class="pb-cmnt-textarea"></textarea>
                            <form class="form-inline">
                                <div class="btn-group">
                                    <button class="btn" type="button"><span class="fa fa-picture-o fa-lg"></span></button>
                                </div>
                                <button class="btn btn-primary pull-right" type="button">Partager</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between mt-2" v-for="post in posts" :key= "post.id">
            <div class="d-flex flex-row">
                <div class="d-flex flex-column">
                    <h2 class="mb-0">{{post.user.firstName}} {{post.user.lastName}} </h2> <span class="date">{{post.createAt}} </span>
                </div>
            </div>
        </div>
        <div class="content">{{post.user.content}}</div>
        <div class="form"> 
            <div class="mt-2 d-flex justify-content-end"> <button class="btn btn-outline-secondary btn-sm">supprimer</button> <button class="btn btn-primary btn-sm ms-1">modifier</button> </div>
        </div>
        

   </div>
</template>

<script>
import nav from '../components/nav.vue'
import axios from'axios'
export default {
  name:'perso',
  component:{
    nav
  },
  data(){
      return{
          posts:[],
          content:'',
          comments:[]
     }
  },
  methods :{
      findPostCom(){
          axios
          .get("http://localhost:3000/api/posts/:id/comments",
          {
              headers:{
                  'Content-Type': 'application.json',
                   Authorization: "Bearer ",
              }
          }
          )
          .then(response=>{
              this.posts=response.data;
          })
      }
  }
}
  
</script>


<style scoped>


</style> 
