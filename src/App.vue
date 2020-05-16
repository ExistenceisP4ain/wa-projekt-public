<template>
  <div id="app">
    <div class="bg-white">
      <div class="container">
        <div class="row">
          <div class="col">
            <!--<router-link-->
            <nav class="navbar navbar-expand-lg navbar-light mb-2" >
                <router-link v-if="!(authenticated=='false') " :to="{name: 'ulogiranioglasi'}"><img src="/images/fipu_logo.png" width="140" /></router-link>
               <!--rip <router-link v-if="tipKorisnika=='oglašivač'" to="/ulogiranioglasi"><img src="/images/fipu_logo.png" width="140" /></router-link>-->
               <!-- <router-link v-if="tipKorisnika==''" :to="{name: 'pregledoglasa'}"><img src="/images/fipu_logo.png" width="140" /></router-link>-->
                <!--<router-link v-if="tipKorisnika==''" to="/pregledoglasa"><img src="/images/fipu_logo.png" width="140" /></router-link>-->
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="form-inline my-2 my-lg-0 mr-auto ml-5">
                  <input v-model="searchTerm" class="form-control mr-sm-2" type="search" placeholder="Tražilica" aria-label="Search" />
                </form>
                <router-link v-if="!authenticated" class="btn btn-info my-2 my-sm-0 mr-2" to="/login" >Prijava</router-link >
                <span v-if="authenticated">
                  <span class="my-2 my-sm-0 mr-2">Welcome back, {{userEmail}}</span>
                  <router-link class="btn btn-info my-2 my-sm-0 mr-2" to="/profil"  >Profil </router-link>
                  <router-link class="btn btn-info my-2 my-sm-0 mr-2" to="/promjenalozinke"  >Promjena lozinke</router-link>
                  <router-link v-if="tipKorisnika=='korisnik'" class="btn btn-info my-2 my-sm-0 mr-2" to="/prijave" >Prijave</router-link>

                


                  <!--<router-link v-if="tipKorisnika=='oglašivač'" class="btn btn-info my-2 my-sm-0 mr-2" to="/prijaveoglasivac" >Prijave na oglas</router-link>
                  <router-link v-if="tipKorisnika=='oglašivač'" class="btn btn-info my-2 my-sm-0 mr-2" to="/postavioglas" >Dodaj oglas</router-link>
                  <router-link v-if="tipKorisnika=='oglašivač'" class="btn btn-info my-2 my-sm-0 mr-2" to="/oglasiposlodavac" >Moji oglasi</router-link> -->
                  
                  <a @click.prevent="logout" class="btn btn-danger my-2 my-sm-0 mr-2" href="#">Logout</a>
                  <div v-if="tipKorisnika=='oglašivač'" class="dropdown my-2 my-sm-0 mr-2">
  <button v-if="tipKorisnika=='oglašivač'" class="btn btn-secondary dropdown-toggle my-2 my-sm-0 mr-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Oglašivač
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <router-link v-if="tipKorisnika=='oglašivač'" class="dropdown-item" to="/postavioglas" >Dodaj oglas</router-link>
    <router-link v-if="tipKorisnika=='oglašivač'" class="dropdown-item" to="/prijaveoglasivac" >Prijave na oglas</router-link>
    <router-link v-if="tipKorisnika=='oglašivač'" class="dropdown-item" to="/oglasiposlodavac" >Moji oglasi</router-link>
  </div>
</div>
                </span>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <router-view />
    </div>

    <div id="footer" class="text-center mt-5" style="">Zarada + (c) 2020</div>
  </div>
</template>
<script>
import store from '@/store.js'
import postavioglas from '@/views/postavioglas.vue'
import home from '@/views/Home.vue'
import profil from '@/views/profil.vue'
export default {
  data(){
    return store
  },
  methods: {
    logout() {
     firebase.auth().signOut().then(function() {
       location.reload();
      console.log("Odjavljen!");
        })
    }  
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
 if (user) {
   this.authenticated=true
   this.userEmail=user.email
   db.collection("korisnici")
          .doc(this.userEmail)
          .get()
          .then(doc => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              this.tipKorisnika = doc.data().tipkorisnika;
            if (this.$route.name !== 'ulogiranioglasi')
          this.$router.push({name: 'ulogiranioglasi'}).catch(err => console.log(err))
            } 
          });

db.collection("korisnici").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added" && change.doc.data().email==this.userEmail) {
              const data = change.doc.data()
              const id=change.doc.id
              console.log("aaa",data)
              this.profil.push(data);
              /*this.profil.push(Object.assign({}, data, {
            id: id
          }));*/
            }
        });
    });

db.collection("noviobrazac2").orderBy("posted_at").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added" && change.doc.data().email==this.userEmail) {
              const data = change.doc.data()
              console.log("aaa",data)
              this.mojipodaci.push({
                id:change.doc.id,
                poslodavac:data.poslodavac,
                vrsta:data.vrsta,
                satnica:data.satnica,
                putni:data.putni,
                oib:data.oib,
                brtel:data.brtel,
                datump:data.datum,
                datumk:data.datumk,
                email:data.email,
                napomena:data.tekst,
                grad:data.grad,
                posted_at:data.posted_at,
                url:data.url,
                tipoglasa:data.tipoglasa,
                status:data.status,
                comment:data.comment
              })
            }
        });
    });
 db.collection("noviobrazac2").orderBy("posted_at","desc").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          var d = new Date();
            d.setMonth(d.getMonth() - 1);
            if (change.type === "added" && change.doc.data().tipoglasa=='Plaćeni' && change.doc.data().status=='odobreno' && change.doc.data().posted_at>d.getTime()) {
              const data = change.doc.data()
              console.log("aaa",data)
              this.owo.push({
                id:change.doc.id,
                poslodavac:data.poslodavac,
                vrsta:data.vrsta,
                satnica:data.satnica,
                putni:data.putni,
                oib:data.oib,
                brtel:data.brtel,
                datum:data.datum,
                datumk:data.datumk,
                email:data.email,
                napomena:data.tekst,
                grad:data.grad,
                posted_at:data.posted_at,
                url:data.url
              })
            }
        });
    });
     db.collection("noviobrazac2").orderBy("posted_at","desc").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          var d = new Date();
            d.setMonth(d.getMonth() - 1);
            if (change.type === "added" && !(change.doc.data().tipoglasa=='Plaćeni' && change.doc.data().status=='odobreno') && change.doc.data().posted_at>d.getTime()) {
              const data = change.doc.data()
              console.log("aaa",data)
              this.uwu.push({
                id:change.doc.id,
                poslodavac:data.poslodavac,
                vrsta:data.vrsta,
                satnica:data.satnica,
                putni:data.putni,
                oib:data.oib,
                brtel:data.brtel,
                datum:data.datum,
                datumk:data.datumk,
                email:data.email,
                napomena:data.tekst,
                grad:data.grad,
                posted_at:data.posted_at,
                url:data.url
              })
            }
        });
    });
    db.collection("noviobrazac2").orderBy("posted_at").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              const data = change.doc.data()
          if(!(data.status=="odobreno" && data.status=="odbijeno") || data.status==""){
                this.korisnickipodaci.unshift(Object.assign({}, data, {
            id: change.doc.id
          }));
            console.log("Ucitan obrazac2-added");
              }
            }
            if (change.type === "modified") {

              for (let [i, k] of this.korisnickipodaci.entries()) {
                if (k.id == change.doc.id) {
                  k.comment = change.doc.data().comment;
                  k.status=change.doc.data().status;
                  break;
                }
              }
      } 
        });
    });
    db.collection("prijava").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added" && change.doc.data().emailkorisnika==this.userEmail) {
              const data = change.doc.data()
              const id=change.doc.id
              console.log("aaa",data)
              this.prijave.push(data);
              /*this.profil.push(Object.assign({}, data, {
            id: id
          }));*/
            }
        });
    });
    db.collection("prijava").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added" && change.doc.data().emailposlodavca==this.userEmail) {
                this.prijave1.unshift(Object.assign({}, change.doc.data(), {
            id: change.doc.id
          }));
              }
              if (change.type === "modified") {

              for (let [i, k] of this.prijave1.entries()) {
                if (k.id == change.doc.id) {
                  k.ocekivanje = change.doc.data().ocekivanje;
                  k.status1=change.doc.data().status1;
                  break;
                }
              }
      } 
        });
    });
  }  
 else {
 this.authenticated=false
 if (this.$route.name !== 'pregledoglasa')
          this.$router.push({name: 'pregledoglasa'})
          db.collection("noviobrazac2").orderBy("posted_at","asc").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          var d = new Date();
            d.setMonth(d.getMonth() - 1);
            if (change.type === "added" && change.doc.data().tipoglasa=='Plaćeni' && change.doc.data().status=='odobreno' && change.doc.data().posted_at>d.getTime()) {
              const data = change.doc.data()
              console.log("aaa",data)
              this.podaci.push({
                id:change.doc.id,
                poslodavac:data.poslodavac,
                vrsta:data.vrsta,
                satnica:data.satnica,
                putni:data.putni,
                oib:data.oib,
                brtel:data.brtel,
                datump:data.datum,
                datumk:data.datumk,
                email:data.email,
                napomena:data.tekst,
                grad:data.grad,
                posted_at:data.posted_at,
                url:data.url,
                tipoglasa:data.tipoglasa,
                status:data.status
              })
            }
        });
    });
    db.collection("noviobrazac2").orderBy("posted_at","desc").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          var d = new Date();
            d.setMonth(d.getMonth() - 1);
            if (change.type === "added" && !(change.doc.data().tipoglasa=='Plaćeni' && change.doc.data().status=='odobreno') && change.doc.data().posted_at>d.getTime()) {
              const data = change.doc.data()
              console.log("aaa",data)
              this.podaci1.push({
                id:change.doc.id,
                poslodavac:data.poslodavac,
                vrsta:data.vrsta,
                satnica:data.satnica,
                putni:data.putni,
                oib:data.oib,
                brtel:data.brtel,
                datump:data.datum,
                datumk:data.datumk,
                email:data.email,
                napomena:data.tekst,
                grad:data.grad,
                posted_at:data.posted_at,
                url:data.url,
                tipoglasa:data.tipoglasa,
                status:data.status
              })
            }
        });
    });
 console.log("Nema korisnika");
 }
});
  }
}
</script>
<style lang="scss">
body {
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
}

.bg-white {
  background-color: white;
  border-bottom: #ccc 1px solid;
  margin-bottom: 20px;
  padding: 10px;
}

nav.navbar {
  background-color: white;

  a {
    svg {
      border-right: #aaa 1px solid;
      margin-right: 10px;
      padding-right: 10px;
    }

    img {
      position: relative;
      top: 3px;
    }
  }
}


</style>

