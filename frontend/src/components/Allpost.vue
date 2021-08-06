<template>
    
                <div class="d-flex justify-content-between mt-2" data-aos="fade-right">
            <div class="d-flex flex-row">
                <div class="d-flex flex-column">
                    <h6 class="mb-0"> {{user.firstName}} {{user.lastName}} </h6> <span class="date"> {{posts.createdAt}} </span>
                </div>
            </div>
            </div>
                <p class="content">{{posts.content}} </p>
                <div class="mt-2 d-flex justify-content-end"> <button class="btn btn-primary btn-sm ms-1" @click.prevent="deletePost()">Supprimer</button> </div>
         <div class="card p-3 border-blue mt-3"> 
                    <div class="comment d-flex justify-content-between mt-2">
                        <div class="d-flex flex-row">
                            <h6 class="mb-0">Animasso Sidibé</h6> <span class="date">{{createdAt}} </span>
                        </div>
                        <div class="com">
                            <p class="content">{{comments.content}} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, odio in interdum tristique, erat arcu vestibulum leo, non condimentum eros risus quis tellus.</p>
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
          post: [],
     }    
    },
    props: {
            posts: {
                type: Object,
                required: true
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
         })
         .catch(err => console.log(err));
     axios.get("http://localhost:3000/api/comments/",{
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

</style>