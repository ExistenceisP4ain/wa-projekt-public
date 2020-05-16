<template>
  <div>
    <form @submit.prevent="signup">
      <hr />
      <div v-if="errorMessage" class="alert alert-danger">
        <strong>Ups!</strong>
        {{ errorMessage }}
      </div>
      <div class="row">
        <div class="col">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-user-o" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="ime"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Ime"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-user-o" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="prezime"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Prezime"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-address-card" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="zanimanje"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Zanimanje"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-phone" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="brtel"
              type="number"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Broj telefona"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <select v-model="store.tipKorisnika" class="form-control" id="exampleFormControlSelect1">
              <option :key="a.id" v-for="a in polje">{{a}}</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="UserName"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Korisničko ime"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Lozinka"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="password2"
              type="password"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Ponovljena lozinka"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-envelope-o" aria-hidden="true"></i>
              </div>
            </div>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Email"
            />
          </div>
          <br />
          <div class="input-group mb-2">
            <select v-model="zupanija" class="form-control" id="exampleFormControlSelect1">
              <option :key="k.id" v-for="k in zupanijelista">{{k}}</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      <button type="submit" class="btn btn-primary mt-5">Registriraj</button>
    </form>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  data() {
    return {
      errorMessage: "",
      email: "",
      password: "",
      password2: "",
      zupanijelista: [
        "ZAGREBAČKA",
        "KRAPINSKO-ZAGORSKA",
        "SISAČKO-MOSLAVAČKA",
        "KARLOVAČKA",
        "VARAŽDINSKA",
        "KOPRIVNIČKO-KRIŽEVAČKA",
        "BJELOVARSKO-BILOGORSKA",
        "PRIMORSKO-GORANSKA",
        "LIČKO-SENJSKA",
        "VIROVITIČKO-PODRAVSKA",
        "POŽEŠKO-SLAVONSKA",
        "BRODSKO-POSAVSKA",
        "ZADARSKA",
        "OSJEČKO-BARANJSKA",
        "ŠIBENSKO-KNINSKA",
        "VUKOVARSKO-SRIJEMSKA",
        "SPLITSKO-DALMATINSKA",
        "ISTARSKA",
        "DUBROVAČKO-NERETVANSKA",
        "MEĐIMURSKA",
        "GRAD ZAGREB"
      ],
      polje:['oglašivač', 'korisnik'],
      odabraniTipProfila: "",
      ime: "",
      prezime: "",
      zanimanje: "",
      brtel: "",
      zupanija: "",
      UserName: "",
      store
    };
  },
  mounted() {},
  methods: {
    signup() {
      if (
        this.password !== this.password2 ||
        this.password2 !== this.password
      ) {
        alert("Lozinke se ne podudaraju!");
        console.log(error);
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // postavi podatke o korisniku
          let id = this.email;
          // sada moramo spremiti te dodatne podatke
          db.collection("korisnici")
            .doc(id)
            .set({
              korisnickoime: this.UserName,
              ime: this.ime,
              prezime: this.prezime,
              brtel: this.brtel,
              email: this.email,
              zanimanje: this.zanimanje,
              zupanija: this.zupanija,
              tipkorisnika: this.store.tipKorisnika,
              datumRegistracije: Date.now()
            })
            .then(()=> {
              this.UserName='',
              this.ime='',
              this.prezime='',
              this.brtel='',
              this.email='',
              this.zanimanje='',
              this.zupanija='',
              this.store.tipKorisnika='',
              this.polje=''
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = error.message;
        });
    }
  }
};
</script>