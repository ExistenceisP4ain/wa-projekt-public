<template>
  <div>
    <div class="row">
      <div class="col-4">
      <!--<trazilica />-->
      <oglasi69 :a="a" v-for="a in podacii" :key="a.id" />
    </div>
     <div class="col">
     
      <div  v-for="b in podaciii" :key="b.id" >
      <oglasi420 :b="b" />
      
      <!--<button @click="komentar1(b)">Detalji</button>--></div>
    <!-- Modal reportad -->
<div class="modal fade" id="reportadmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="reportadmodal">Prijava oglasa</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h3>Razlog prijave oglasa </h3>
       <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
        <button type="button" class="btn btn-primary">Pošalji</button>
      </div>
    </div>
  </div>
</div>



      <div 
      class="modal fade"
      id="commentModal1"
      tabindex="-1"
      role="dialog"
      aria-labelledby="commentModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content modcont1">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModalLongTitle">Prijava na oglas</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h2>
              <br />
              <h6>ID: ({{aktivnikorisnik}})</h6>
            </h2>
            <p>Satnica:{{satnica}}<br>Email:{{email}}<br>Dautm kraja:{{datumk}}<br>Datum početka:{{datum}}<br>Grad:{{grad}}<br>Napomena:{{napomena}}<br>Oib:{{oib}}<br>Poslodavac:{{poslodavac}}<br>Putni:{{putni}}<br>Vrsta:{{vrsta}}</p>
            <input type="text" class="form-control" id="ime" v-model="prijava" placeholder="Zašto se prijavljuješ?"><br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="zatvori()">Zatvori</button>
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
      <div
      class="modal fade"
      id="picusrModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="picusrModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="display:inline-block;">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <img class="modal-content" :src="url" />
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
          </div>
        </div>
      </div>
  </div></div>
  </div>
<br>
  <nav aria-label="Page navigation example" style="position: absolute;
  right: 200px;
  padding: 10px;"><small>ovo napravi da dela bre</small>
  <ul class="pagination" >
    <li class="page-item" >
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
  
  
  </div>
</template>
<script>
import store from "@/store.js";
import oglasi69 from "@/components/oglasi69.vue";
import oglasi420 from "@/components/oglasi420.vue";
import trazilica from "@/components/trazilica.vue";
import moment from "moment";
export default {
  data() {
    return store;
  },
  components: {
    oglasi69,
    oglasi420,
    trazilica
  },
  computed: {
    nemaData() {
      return this.podaci.length == 0;
    },
    podacii(){
      return this.owo.filter(card => card.poslodavac.includes(this.searchTerm));
    },
    podaciii(){
      return this.uwu.filter(card => card.poslodavac.includes(this.searchTerm));
    }
  },
  name:"ulogiranioglasi",
  methods:{
      komentar(a) {
      this.$router.push({path: `post/${a.id}`})
    },
    komentar1(b) {
      this.$router.push({path: `post/${b.id}`})
    },
    reportad(a) {
      this.$router.push({path: `post/${b.id}`})
    },
    reportad1(b) {
      this.$router.push({path: `post/${b.id}`})
    },
    zatvori(){
      this.prijava=''
    },
    saveComment(){
       db.collection("prijava")
                    .add({
                      emailkorisnika: this.userEmail,
                      datumprijave: Date.now(),
                      poslodavac:this.poslodavac,
                      oib:this.oib,
                      brtel:this.brtel,
                      vrsta:this.vrsta,
                      grad:this.grad,
                      satnica:this.satnica,
                      putni:this.putni,
                      datum:this.datum,
                      tekst:this.tekst,
                      datumk:this.datumk,
                      prijava:this.prijava,
                      emailposlodavca:this.email
                    })
                    .then(docRef => {
                      console.log("Dokument(pic) | ID: ", docRef.id);
                      $("#successsendmodal").modal("show");
                      (this.ime = ""),
                        this.userEmail='',
                      this.posted_at='',
                      this.poslodavac='',
                      this.oib='',
                      this.brtel='',
                      this.vrsta='',
                      this.grad='',
                      this.satnica='',
                      this.putni='',
                      this.datum='',
                      this.tekst='',
                      this.datumk='',
                      this.prijava='',
                      this.email=''
                     $("#commentModal1").modal("hide");
                    })
                    .catch(e => {
                      console.error("Error: ", error);
                    });
    }
  }
};
</script>
