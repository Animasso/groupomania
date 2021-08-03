<template>
    
                <div class="d-flex justify-content-between mt-2">
            <div class="d-flex flex-row">
                <div class="d-flex flex-column">
                    <h6 class="mb-0"> {{user.firstName}} {{user.lastName}} </h6> <span class="date"> {{posts.createdAt}} </span>
                </div>
            </div>
            </div>
                <p class="content">{{posts.content}} </p>
                <div class="mt-2 d-flex justify-content-end"> <button class="btn btn-primary btn-sm ms-1" @click.prevent="deletePost()">Supprimer</button> </div>

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
}
}
</script>

<style scoped>

</style>