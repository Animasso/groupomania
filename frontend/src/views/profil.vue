<template>
    <navBar/>

      <div class="container mt-5 d-flex justify-content-center">
            <div class="card p-4 mt-3">
                <div class="first">
                    <h6 class="heading">{{user.firstName}} {{user.lastName}} </h6>
                    <div class="time d-flex flex-row align-items-center justify-content-between mt-3">
                    </div>
                </div>
                <div class="second d-flex flex-row mt-2">
                    <div class="main">
                        <div class="d-flex flex-row mb-1"> <span>{{user.email}} </span>
                        </div>
                    </div>
                </div> 
                <hr class="line-color">
                <div class="password">
                  <p class="heading">Changer mon email</p>
                  <input v-model="email" type="email" class="changePassword" id="change" placeholder="nouveau email">
                  <div class="third mt-4"> <button class="btn btn-success btn-block" @click.prevent="modifyProfil(user)"> Modifier</button></div>
                </div>
                <hr class="line-color">
                <div class="third mt-4"> <button class="btn btn-success btn-block" @click.prevent="deleteUser()"><i class="fas fa-trash"></i> Supprimer le compte</button>
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
          user:"",
          email:"",
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
},
methods:{
  modifyProfil(user){
   
    axios.put('http://localhost:3000/api/users/'+ user.id,{
     email: user.email},
      {headers: {
                Authorization: "Bearer " + localStorage.token,
            },
      })
    .then((response)=> console.log(response))
    .catch((err)=> console.log(err))
  },
   deleteUser() {
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
};


</script>
<style scoped>
body {
    background-color: #eee;
    font-family: 'Roboto', sans-serif
}
.card {
    background-color: #f19c9c;
    width: 350px;
    border-radius: 20px
}
.heading {
    font-weight: 700
}
.btn {
    border-radius: 15px !important;
    color: black;
    background-color:  rgb(139, 139, 146);
}
.line-color {
    color: rgb(224, 17, 17);
    height: 3px
}
.password p{
  font-size: bolder;
}
input[type=email] {
  border: none;
  border-bottom: 2px solid red;
}
</style>
