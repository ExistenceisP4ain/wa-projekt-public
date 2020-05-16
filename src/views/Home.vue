<template>
<div class="Home">
  <div v-if="authenticated==true && tipKorisnika=='korisnik'">
    <router-view/>
  </div>
  <div v-else-if="authenticated==true && tipKorisnika=='oglašivač'">
    <router-view/>
    </div>
    <div v-else-if="authenticated==true && tipKorisnika=='admin'">
    <admin/>
    </div>
    <div v-else-if="authenticated==false">
      <pregledoglasa/>
      </div>
    <div v-else>
      <Login/>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Signup from '@/views/Signup.vue'
import store from '@/store.js'
import postavioglas from '@/views/postavioglas.vue'
import pregledoglasa from '@/views/pregledoglasa.vue' 
import ulogiranioglasi from '@/views/ulogiranioglasi.vue'
import admin from '@/views/admin.vue'
import Login from '@/views/Login.vue'
export default {
  name: 'Home',
  components: {
    Signup,
    postavioglas,
    Login,
    pregledoglasa,
    ulogiranioglasi,
    admin
  },
  data(){
    return store
  }
}
</script>
