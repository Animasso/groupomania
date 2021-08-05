<template>
<navBar/>
<div class="container">
    <h1>Mur de conversation</h1>
        <div class="card row-8 p-3 border-blue mt-3" data-aos="fade-right" v-for="posts in posts"  v-bind:key="posts.id"> 
            <div class="d-flex justify-content-between mt-2">
                <div class="d-flex flex-row">
                    <div class="d-flex flex-column">
                        <h6 class="mb-0">{{posts.user.firstName}} {{posts.user.lastName}} </h6> <span class="date">{{posts.createdAt}} </span>
                    </div>
                </div>  
            </div>
            <div class="form">
                <p class="content">{{posts.content}} </p>
                <div class="mt-2 d-flex justify-content-end"> 
                <button class="btn btn-primary btn-sm ms-1" v-if="userId===postId || user.admin === true">Supprimer</button> 
                </div>
            </div>
                        
            <div class="card p-3 border-blue mt-3"> 
                <div class="d-flex justify-content-between mt-2">
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column">
                            <h6 class="mb-0">Animasso Sidibé</h6> <span class="date">Nov 30, 2020 10:40</span>
                        </div>
                    </div>
                </div>
                <div class="comments">
                    <p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, odio in interdum tristique, erat arcu vestibulum leo, non condimentum eros risus quis tellus.</p>
                    <div class="mt-2 d-flex justify-content-end"> <button class="btn btn-primary btn-sm ms-1" >Supprimer</button></div>
                </div>
            </div>
            <div class="form"> <input class="form-control" placeholder="Ecrire un commentaire...">
                    <div class="mt-2 d-flex justify-content-end"> <button class="btn btn-outline-secondary btn-sm">Poster</button></div>
            </div> 
        </div>
</div>
</template>

<script>
import navBar from '../components/navBar.vue'
import axios from 'axios'

export default {
  name:'Wall',
  components:{
    navBar
  },
  data(){
      return{
          user:[],
          posts:[],
          content:'',
          comments:[],
          createdAt:'',
          postId: '',
          userId: '',
     }
  },
   created(){
        axios.get("http://localhost:3000/api/users" , {
            headers: {
               Authorization: "Bearer " + sessionStorage.token,
            },
         })
         .then((response)=> 
         (this.user = response.data))
         .catch((err) => console.log(err));

         axios.get("http://localhost:3000/api/posts", {
             headers: {
                 Authorization: "Bearer " + sessionStorage.token,
             },
         })
         .then((response)=>{console.log(response),
         this.posts= response.data})
         .catch((err) => console.log(err));
   },
   
   
  }





</script>



<style scoped>
h1{
    color:red;
}
.card{
   border: 3px solid red;
   box-shadow: 5px 5px 5px red;
}
.form{
    margin-top: 30px;
}
</style>