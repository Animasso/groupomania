<template>
    <navBar/>
     <h1> Les membres de Groupomania</h1>
      <div class="container mt-5 d-flex justify-content-center">
            <div class="card p-4 mt-3" v-for="user in users"  v-bind:key="user.id">
                <div class="first">
                    <h6 class="heading">{{user.firstName}} <br/>{{user.lastName}} </h6>
                    <div class="time d-flex flex-row align-items-center justify-content-between mt-3">
                    </div>
                </div>
                <div class="second d-flex flex-row mt-2">
                    <div class="main">
                        <div class="d-flex flex-row mb-1"> <span> {{user.email}} </span></div>   
                    </div>
                </div> 
                
            </div>
        </div>
</template>



<script>
import navBar from '../components/navBar.vue'
import axios from 'axios'
export default {
  name:'profil',
  components:{
    navBar
  },
  data(){
      return{
          users:[],
          email:"",
     } 
  },
created(){
  axios.get("http://localhost:3000/api/users", {
      headers: {
          Authorization: "Bearer " + sessionStorage.token,
      },
    })
    .then((response)=> {console.log(response)
    this.users = response.data})
    
    .catch((err) => console.log(err));
},
methods:{
    deleteOneUser() {
              const userId= sessionStorage.getItem('user')
               axios.delete("http://localhost:3000/api/users/" + userId, {
                    headers: { Authorization: "Bearer " + localStorage.token },
               })
                    .then((response) => console.log(response))
                    .catch((err) => console.log(err));
                    sessionStorage.clear();
                    this.$router.push("/")
              
          },
}

}
</script>

<style scoped>
#app{
   font-family
   :Comic Sans MS, cursive;
  background-color: #cccce2;

 
}
body {
    background-color: #eee;
}
.card {
    background-color: #d0cde2;
    width: 350px;
    border-radius: 20px;
    -webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.card:hover{
    -webkit-transform: scale(1.2);
	transform: scale(1.2);
}
.container{
    flex-wrap: wrap;
}
.heading {
    font-weight: 700
}
h1{
    display: flex;
    justify-content: center;
    color: #f11f1f;
    font-family: 'Comic Sans MS', cursive;
    margin-left: 10px;
}
.line-color {
    color: rgb(224, 17, 17);
    height: 3px
}

</style>