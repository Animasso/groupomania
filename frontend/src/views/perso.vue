<template>
<navBar />
   <div class ="container">
      <div class="container pb-cmnt-container">
      <h1>Bienvenue sur ton espace {{}} {{}} </h1>
            <div class="row">
                <div class="col-md-9 col-md-offset-3">
                    <div class="panel panel-info">
                        <div class="panel-body">
                            <div class="form-group green-border-focus">
                                <label for="exampleFormControlTextarea5">Postez votre message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea5" rows="3"></textarea>
                            </div>
                            <button class="btn btn-primary pull-right" type="submit" @click="postMessage">Partager</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="card row-8 p-3 border-blue mt-3"> 
                            <div class="d-flex justify-content-between mt-2">
                                <div class="d-flex flex-row">
                                    <div class="d-flex flex-column">
                                        <h6 class="mb-0">Animasso Sidibé</h6> <span class="date">Nov 30, 2020 at 10:40</span>
                                    </div>
                                </div>
                                
                            </div>
                             <div class="form">
                                 <p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, odio in interdum tristique, erat arcu vestibulum leo, non condimentum eros risus quis tellus.</p>
                                 <div class="mt-2 d-flex justify-content-end"> <button class="btn btn-primary btn-sm ms-1">Supprimer</button> </div>
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
          posts:[],
          content:'',
          comments:[]
     }
  },
  create(){
     axios
      .get("http://localhost:3000/api/post/posts",{headers: {
                'authorization': 'bearer ' + sessionStorage.getItem('token')
                }})
      .then(response=>this.posts=response.content)
      .catch(() => {
              { 
                  this.message ="erreur"
              }
          }) 
  },
  methods :{
      findPostCom(){
          axios
          .get("http://localhost:3000/api/posts/:id/comments",
         
          )
          .then(response=>{
              this.posts=response.data;
            
          })
      }
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
