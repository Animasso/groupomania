<template>
<navBar />
   <div class ="container">
      <div class="container pb-cmnt-container">
      <h1>Bienvenue sur ton espace {{user.firstName}} {{user.lastName}} </h1>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    <div class="panel panel-info">
                        <div class="panel-body">
                            <div class="form-group green-border-focus">
                                <label for="exampleFormControlTextarea5">Postez votre message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea5" rows="3"></textarea>
                            </div>
                            <button class="btn btn-primary pull-right"  @click="postMessage()">Partager</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="card row-8 p-3 border-blue mt-3">  
                    <div v-for="posts in posts" v-bind:key="posts.id" class="post">
                        <div class="d-flex justify-content-between mt-2">
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column">
                            <h6 class="mb-0"> {{posts.user.firstName}}{{posts.user.lastName}} </h6> <span class="date">Nov 30, 2020 at 10:40</span>
                        </div>
                    </div>
                    </div>
                        <p class="content">{{content}} </p>
                        <div class="mt-2 d-flex justify-content-end"> <button class="btn btn-primary btn-sm ms-1" type="submit" @click.prevent="deletePost(post)">Supprimer</button> </div>
                    </div>
            
            <div class="card p-3 border-blue mt-3"> 
                <div class="d-flex justify-content-between mt-2">
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column">
                            <h6 class="mb-0">Animasso Sidibé</h6> <span class="date">Nov 30, 2020 at 10:40</span>
                        </div>
                    </div>
                </div>
                <div class="comments">
                <p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, odio in interdum tristique, erat arcu vestibulum leo, non condimentum eros risus quis tellus.</p>
                </div>
            </div>
        </div>
        
            
        
        

   </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import axios from'axios'
export default {
  name:'Perso',
  components:{
    navBar
  },
  data(){
      return{
          user:[],
          posts:[],
          content:'',
          comments:[]
     }
  },
   created(){
        const userId= sessionStorage.getItem('user')
        axios.get("http://localhost:3000/api/users/"+ userId , {
            headers: {
               Authorization: "Bearer " + sessionStorage.token,
            },
         })
         .then((response)=> 
         (this.user = response.data))
         .catch((err) => console.log(err));


         axios.get("http://localhost:3000/api/posts/:id/"+comments, {
            headers: {
               Authorization: "Bearer " + sessionStorage.token,
            },
         })
         .then((response)=> 
         console.log(response))
          
         .catch(err => console.log(err))
    },

methods :{
postMessage(){
    const userId= sessionStorage.getItem('user')
        axios
        .post("http://localhost:3000/api/posts/post/" + userId)
        .then(response=>{
            this.posts=response.data;
            this.$router.push("perso")
        }) 
    },
    deletePost() {
        const userId= sessionStorage.getItem('user')
         axios
            .delete("http://localhost:3000/api/posts/"+ userId, {
               headers: {
                  Authorization: "Bearer " + sessionStorage.token,
               },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
            this.$router.push("perso")
      },
  },
  

}
  
</script>


<style scoped>
h1{
   color: red;
}
.card{
   border: 3px solid red;
   box-shadow: 5px 5px 5px red;
}
.form{
    margin-top: 30px;
}
</style> 
