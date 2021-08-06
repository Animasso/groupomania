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
                                <label for="postMsg">Postez votre message</label>
                                <textarea v-model="content" class="form-control" id="postMgs" rows="3" ></textarea>
                            </div>
                            <button class="btn btn-primary pull-right" type="text"  @click="postMessage()">Partager</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="card row-8 p-3 border-blue mt-3">  
            
                <div id="card">
                <allpost v-for="post in posts" v-bind:key="post.id" :post="post" />
                
                </div>
            
               
        </div>
   </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import Allpost from '../components/Allpost.vue'
import axios from'axios'

export default {
  name:'Perso',
  components:{
      navBar,
      Allpost
  },
  data(){
      return{
          user:[],
          posts:[],
          content:[],
          post: [],
          comment:[],
          createdAt:'',
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

         axios.get("http://localhost:3000/api/posts/"+ userId, {
            headers: {
               Authorization: "Bearer " + sessionStorage.token,
            },
         })
         .then((response)=>{ console.log(response) 
         this.posts =response.data})
         .catch(err => console.log(err));
    
        
      
    },
    

methods :{
postMessage(){
        axios
        .post("http://localhost:3000/api/posts/post",{content:this.content}, {
            headers: {
                  Authorization: "Bearer " + sessionStorage.token,
               },
            })
        .then(response=>{
            console.log(response);
            this.content = '';
            this.posts.unshift(response.data);
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
            .then((response)=>{console.log(response)
             this.$router.push("perso")})
            .catch((err) => console.log(err));
      },
  },
  
}
  
</script>


<style scoped>
h1{
    font-family: 'Comic Sans MS', cursive;
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