<template>
    
                <div class="d-flex justify-content-between mt-2" data-aos="fade-right">
            <div class="d-flex flex-row">
                <div class="d-flex flex-column">
                    <h6 class="mb-0"> {{user.firstName}} {{user.lastName}} </h6> <span class="date"> {{post.createdAt}} </span>
                </div>
            </div>
            </div>
                <p class="content">{{post.content}} </p>
                <div class="mt-2 d-flex justify-content-end"> <button class="btn btn-primary btn-sm ms-1" @click.prevent="deletePost()">Supprimer</button> </div>
        
         <div class="card p-3 mt-3"  > 
                    <div class="d-flex flex-column mt-2" v-for="comment in comments" v-bind:key="comment.id" :comment="comment" >
                        <div class="d-flex flex-column">
                            <div class="d-flex flex-column">
                                <h6 class="mb-0">{{comment.user.firstName}} {{comment.user.lastName}} </h6> <span class="date">{{comment.createdAt}} </span>
                            </div>
                        </div>

                        <div  class="com"  >
                            <p class="content">{{comment.comment}}</p>
                        </div>
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
        
     }    
    },
    props: {
            post: {
                type: Object,
                required: true
            }
        },
    mounted(){
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