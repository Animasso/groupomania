<template>
<nav class="row-12 navbar navbar-expand-lg navbar-light mx-3 ">
            <div class="navbar-brand"><img src="../assets/icon-title.png" alt="titre"></div>
            
            <div class="collapse navbar-collapse d-flex" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link to="/perso" class="nav-link">Ma page </router-link>
                </li>
                 <li class="nav-item">
                    <router-link to="/wall" class="nav-link">Mur</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/profil" class="nav-link">Profil</router-link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" @click="logout()">Déconnection</a>
                </li>
              </ul> 
            </div>
          </nav> 
         <router-view/>
</template>


 

<script>
export default {
        name: 'navBar',
        methods:{
            logout(){
                sessionStorage.clear();
                this.$router.push('/')
            }
        }    
}
</script>


<style scoped> 

.navbar-brand img{
        width: 100px;
    }

.nav-item{
    font-size: large;
    font-weight: bolder;
    cursor: pointer;
}

</style>
