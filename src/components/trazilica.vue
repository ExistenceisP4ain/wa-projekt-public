<template>
    <div>
        <div class="container jumbotron" style="margin-top:15px;">
        <!-- Search form -->
<div class="md-form mt-0">
  <input v-model="store.searchTerm" class="form-control" type="text" placeholder="Traži . . . ." aria-label="Search">
</div>
<br>

<div class="form-group">
    <select class="form-control" id="exampleFormControlSelect1">
      <option :key="k.id" v-for="k in zupanijelista">{{k}}</option>
    </select>
  </div>


<div class="md-form mt-0 ">Satnica
  <input class="form-control" type="number" placeholder="min" aria-label="Search">
</div>



</div>
    </div>
</template>

<script>
import store from "@/store.js";
export default {
  data() {
    return {
      store,
      zupanijelista: [
        "SVE",
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
      ]
    };
  }/*,
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
  }*/
};
  </script>