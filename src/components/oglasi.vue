<template>
<div>
<div  >
      <div class="card text-white bg-info mb-3 text-left" style="margin-top:15px;">
  <div class="card-header text-center">{{a.poslodavac }}</div>
  <div class="card-body">
    <h5 class="card-title">{{a.vrsta}}</h5>
    <p class="card-text">Objavljeno: {{a.posted_at | formatTime}}<br>
      Grad: {{a.grad}}<br>
      Pocetak rada: {{a.datump}}<br>
      Kraj rada: {{a.datumk}}<br>
      Satnica: {{a.satnica}}<br>
      Putni trošak: {{a.putni}}<br>
      Brtel: {{a.brtel}}<br>
      Email: {{a.email}}<br>
      Oib: {{a.oib}}<br>
      {{a.napomena}}
    </p>
    <img :src="a.url" @click="prikazSlikeUsr(a);" width="100px" />
  </div>
</div></div>
<!--<div v-else>
<div class="card bg-light  text-center" style="margin-top:15px;" >
  <div class="card-header">{{a.posted_at | formatTime }}</div>
  <div class="card-body">
    <h5 class="card-title">{{a.poslodavac}}</h5>
    <p class="card-text">{{a.vrsta}}
      Grad:{{a.grad}}<br>
      Pocetak rada:{{a.datump}}<br>
      Kraj rada:{{a.datumk}}<br>
      Satnica:{{a.satnica}}<br>
      Putni:{{a.putni}}<br>
      Brtel:{{a.brtel}}<br>
      Email:{{a.email}}<br>
      Oib:{{a.oib}}
    </p>
    <img :src="a.url" @click="prikazSlikeUsr(a);" width="100px" />
  </div>
</div></div>--></div>

</template>
<script>
import store from "@/store.js";
import moment from "moment";
export default {
  props: ["a"],
  data() {
    return store;
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  methods:{
      prikazSlikeUsr(a) {
      $("#picusrModal").modal("show");
      this.url = a.url;
    }
  }
};
</script>