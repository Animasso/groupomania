<template>
    <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 d-flex justify-content-center">
                    <img src="/images/icon-title.png" class="w-40 img-fluide" alt="titre">
                </div>
            </div>
    
            <fieldset>
                <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
                <h1 class="card__title" v-else>Inscription</h1>

                <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
                <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
                
                <div class="row d-flex align-items-center flex-column">
                
                <div class="form-floating justify-content-center">
                    <input v-model="firstName" type="text" class="form-control" v-if="mode == 'create'" id="floatingName" placeholder="Nom">
                    <label for="floatingName">Nom</label>
                </div>

                <div class="form-floating justify-content-center">
                    <input v-model="lastName" type="text" class="form-control" v-if="mode == 'create'" id="floatingLastname" placeholder="Prénom">
                    <label for="floatingPassword">Prénom</label>
                </div>

                <div class="form-floating mb-3 justify-content-center">
                    <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Adresse Mail</label>
                </div>
                <div class="form-floating justify-content-center">
                    <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Mot de passe</label>
                </div>

                <button type="button" class=" btn btn-primary w-auto justify-content-center" v-if="mode == 'login'">Se connecter</button>
                <button type="button" class=" btn btn-primary w-auto justify-content-center" v-else>Inscription</button>
            </div>
            </fieldset>
    </div>
    
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      mode: 'login',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      
    }
  },
  methods:{
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
