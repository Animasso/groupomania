<template>
    
            <div class="d-flex justify-content-between mt-2">
            <div class="d-flex flex-row">
                <div class="d-flex flex-column">
                    <h6 class="mb-0"> {{post.user.firstName}} {{post.user.lastName}} </h6> <span class="date"> {{formatDate(post.createdAt)}} </span>
                </div>
            </div>
            </div>
                <p class="content">{{post.content}} </p>
                <div class="mt-2 d-flex justify-content-end"> <button class="btn btn-primary btn-sm ms-1" v-if="post.userId===user.id" @click.prevent="deletePost()">Supprimer</button> </div>
              
         <div class="card p-3 mt-3"  > 
               <h2>Commentaires</h2>
                    <div class="d-flex flex-column mt-2" v-for="comment in comments" v-bind:key="comment.id" :comment="comment" >
                        <div class="d-flex flex-column">
                            <div class="d-flex flex-column">
                                <h6 class="mb-0">{{comment.user.firstName}} {{comment.user.lastName}} </h6> <span class="date">{{ formatDate(post.createdAt) }}</span>
                            </div>
                        </div>
                        <div  class="com d-flex justify-content-between"  >
                            <p class="content">{{comment.comment}}</p>
                             <button class="btn btn-outline-secondary btn-sm" v-if="comment.userId===user.id || user.admin=== true" @click.prevent="deleteCom(comment)"><span class="trash"><i class="fas fa-trash"></i></span></button>
                        </div>
 
                    </div>
                     <div class="form"> <input class="form-control" v-model="comment" placeholder="Ecrire un commentaire...">
                        <div class="mt-2 d-flex justify-content-end"> <button class="btn btn-outline-secondary btn-sm" @click.prevent="createCom(post)">Poster</button></div>
                    </div>
        </div> 

        
</template>
<script>
import axios from 'axios'
export default {
    name:'post',
    
    data() {
        return{
          user:[], 
          comments:[],
          createdAt:'',
          comment:[],
        
     }    
    },
    props: {
            post: {
                type: Object,
                required: true
            }
        },
    created(){
        const userId= sessionStorage.getItem('user')
        axios.get("http://localhost:3000/api/users/"+ userId, {
            headers: {
               Authorization: "Bearer " + sessionStorage.token,
            },
         })
         .then((response)=> 
         (this.user = response.data))
         .catch((err) => console.log(err));

        axios.get("http://localhost:3000/api/auth/comments/"+this.post.id,{
        headers: {
               Authorization: "Bearer " + sessionStorage.token,
            },
        })
        .then((response)=>{console.log(response)
         this.comments =response.data})
        .catch(err=>console.log(err))
        
    },
    methods:{
        formatDate(date) {
            return new Date(date).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour:"numeric",
            minute:"numeric"
            });
         },

         deletePost() {
         axios
            .delete("http://localhost:3000/api/auth/posts/"+ this.post.id, {
               headers: {
                  Authorization: "Bearer " + sessionStorage.token,
               },
            })
            .then((response)=>{console.log(response)
              this.$router.push("/wall")
             })
            .catch((err) => console.log(err));
        },

        createCom(post){
            axios
         .post("http://localhost:3000/api/auth/comments/",{comment:this.comment,postId:post.id},{
             headers: {
                  Authorization: "Bearer " + sessionStorage.token,
               },
         })
         .then((response)=>{console.log(response)
         this.comment = ''; 
         window.location.reload();
         })
        },

         deleteCom(comment){
             axios
             .delete("http://localhost:3000/api/auth/comments/" + comment.id,{
                 headers: {
                     Authorization: "Bearer " + sessionStorage.token,
                 },
             })
             .then((response)=>{console.log(response)
             window.location.reload()})
         }
        

    }
    
   }
</script>

<style scoped>
h1{
    font-family: 'Comic Sans MS', cursive;
   color: red;
}
h2{
    font-size: smaller;
}
.card{
   border: 1px solid red;
   box-shadow: 5px 5px 5px red;
}
.form{
    margin-top: 30px;
}
.trash{
    color: red;
}
</style>