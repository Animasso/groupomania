<template>
    <navBar/>

      <div class="container mt-5 d-flex justify-content-center">
            <div class="card p-4 mt-3">
                <div class="first">
                    <h6 class="heading">Animasso Sidibé</h6>
                    <div class="time d-flex flex-row align-items-center justify-content-between mt-3">
                    </div>
                </div>
                <div class="second d-flex flex-row mt-2">
                    <div class="main">
                        <div class="d-flex flex-row mb-1"> <span>asidibe017@gmail.com</span>
                        </div>
                    </div>
                </div> 
                <hr class="line-color">
                <div class="password">
                  <p class="heading">Changer mon email</p>
                  <input v-model="email" type="email" class="changePassword" id="change" placeholder="nouveau email">
                  <div class="third mt-4"> <button class="btn btn-success btn-block"> Modifier</button></div>
                </div>
                <hr class="line-color">
                <div class="third mt-4"> <button class="btn btn-success btn-block"><i class="fas fa-trash"></i> Supprimer le compte</button>
                </div>
            </div>
        </div>
</template>



<script>
import navBar from '../components/navBar.vue'

export default {
  name:'profil',
  components:{
    navBar
  }
}
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
    background-color: rgb(224, 17, 17);
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
