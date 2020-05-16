<template>
<div >
  <div class="row">
      <div class="col"></div>
        <div class="col jumbotron" style="margin-top: 50px;" >
    <!--<div :key="c.id" v-for="c in profil">
    <p>email:</p>{{email}}
        </div>-->
        <profil  :key="a.id" :d="a" v-for="a in store.profil" />
        <div
      class="modal fade"
      id="commentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="commentModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content modcont1">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModalLongTitle">Unesi podatak koji želiš promjenit</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
    <!--<div class="col">
      Korisničko Ime: <br>
      Broj tel: <br>
      Zanimanje: <br>
      Županija: <br>
    </div>-->
    <div class="col" style="margin: 40px;">
      <input type="text" class="form-control" id="ime" v-model="ime" placeholder="Novo ime"><br>
      <input type="text" class="form-control" id="ime" v-model="prezime" placeholder="Novo prezime"><br>
      <input type="text" class="form-control" id="brtel" v-model="brtel" placeholder="Novi broj tel"><br>
      <input type="text" class="form-control" id="zanimanje" v-model="zanimanje" placeholder="Novo zanimanje"><br>
      <input type="text" class="form-control" id="zupanija" v-model="zupanija" placeholder="Promjena županije">
    </div>
            <!--  yyy
              <br>
            <input type="text" id="brtel" v-model="brtel"><br/>
            Ime:
            <input type="text" id="ime" v-model="ime"><br/>
            Prezime:
            <input type="text" id="prezime" v-model="prezime"><br/>
            Zanimanje:
            <input type="text" id="zanimanje" v-model="zanimanje"><br/>
            Županija:
            <input type="text" id="zupanija" v-model="zupanija"><br/>
            <hr /> -->
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
            <button
              @click="saveComment()"
              type="submit"
              class="btn btn-primary"
              name="send-mail"
            >Spremi</button>
          </div>
        </div>
      </div>
    </div>
</div>
      <div class="col"></div>
    </div>

        </div>
</template>
<script>
import store from '@/store.js'
import profil from '@/components/profil.vue'
export default {
    data(){
        return{
            brtel:'',
            ime:'',
            prezime:'',
            zanimanje:'',
            zupanija:'',
            store
        }
    },
    components: {
    profil
  },
    methods:{
        saveComment() {
      db.collection("korisnici")
        .doc(this.store.userEmail)
        .update({
          brtel:this.brtel,
          ime:this.ime,
          prezime:this.prezime,
          zanimanje:this.zanimanje,
          zupanija:this.zupanija
        })
        .then(function() {
          $("#commentModal").modal("hide");
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
    }
}
</script>