<template>
<div>
  <!--<div class="table-margin">
    <table class="table-bordered table-dark">
      <thead>
        <tr>
          <th scope="col">Poslodavac</th>
          <th scope="col">Vrsta</th>
          <th scope="col">Grad</th>
          <th scope="col">Datum pocetka</th>
          <th scope="col">Datum kraja</th>
          <th scope="col">Satnica</th>
          <th scope="col">Putni trošak</th>
          <th scope="col">Tel</th>
          <th scope="col">Email</th>
          <th scope="col">Oib</th>
          <th scope="col">Postavljeno</th>
          <th scope="col">Napomena</th>
          <th scope="col">Tip oglasa</th>
          <th scope="col">Status</th>
          <th scope="col">Razlog (plaćeni)</th>
          <th scope="col">Slika
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
    </div>
          </th>
        </tr>
      </thead>
      <oglasip />
    </table>
  </div><br>-->
  <!-- Modal -->
<div class="modal fade" id="adeditmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Uredjivanje oglasa</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="row">
    <div class="col">
      <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">Satnica</span>
  </div>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
</div>

</div>
    <div class="col">
      
      <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">Putni</span>
  </div>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
</div></div>
    <div class="w-100"></div>
    <div class="col"><div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">Br. Tel:</span>
  </div>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
</div>

</div>
    <div class="col">
      
      <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">Email:</span>
  </div>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
</div></div>

  </div>
  Opis oglasa:
  <textarea class="form-control" aria-label="With textarea"></textarea><br>
  <div class="row">
    <div class="col">
                <label for="Date">Početak rada</label>
                <input v-model="datum" type="date" class="form-control" />
              </div>
    <div class="col"><label for="Date">Kraj rada</label>
                <input v-model="datumk" type="date" class="form-control" required />
              </div>
  </div>
  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Odustani</button>
        <button type="button" class="btn btn-success">Spremi promjene</button>
      </div>
    </div>
  </div>
</div>
<!-- adedit Modal -->

<div class="container">
  <div class="card mb-3 " style="max-width: 840px;" :key="b.id" v-for="b in mojipodaci">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="https://lh3.googleusercontent.com/proxy/8rOYKA0xneHyH_UGG-RJsz-tBEKK8Oxe_Axld89ilREBi3xAzKr6jL3w6-UqtjYU1m7J0xhDRAu1MH4FoidMafx8j9O36-0DiJaS2ruWxOmtxcMwzBsLG1XoQXSe" class="card-img" alt="">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{b.poslodavac}} - {{b.vrsta}} <span style="color: #538b01">[ {{b.tipoglasa}} ] </span></h5>
        <p class="card-text">{{b.email}}<br>Grad: {{b.grad}}<br>Vrijeme rada od: {{b.datump}} do: {{b.datumk}}
                <br>Satnica: [ {{b.satnica}} ] | Putni trošak: [ {{b.putni}} ]<br>
                Telefon: {{b.brtel}} | Oib: {{b.oib}}<br>
                Razlog (plaćeni): {{b.comment}}  {{b.status}}<br>
                Opis oglasa:<br>
                <textarea disabled wrap="off" class="form-control" rows="3" cols="50">{{b.napomena}}</textarea>
                
                tip: {{b.tipoglasa}}<br>
                <div>
                <button @click="editad(ad11);" data-toggle="modal" data-target="#adeditmodal" style="margin-right: 10px;" type="button" class="btn btn-warning btn-sm">Uredi  </button>
                <button style="margin-right: 10px;" type="button" class="btn btn-danger btn-sm">Deaktiviraj</button>
                <button type="button" class="btn btn-primary btn-sm">Boostaj</button>
                </div>

        </p>
        <p class="card-text"><small class="text-muted">{{b.posted_at | formatTime}}</small></p>
      </div>
    </div>
  </div>
</div>
 </div>
 
  
  </div>
</template>
<script>
import store from "@/store.js";
import oglasip from '@/components/oglasip.vue'
import moment from "moment";
export default {
  props: ["b"],
  data() {
    return store;
  },
  components: {
    oglasip
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  methods: {
    editad(ad11){
      $("#adeditmodal").modal("show");
    }
  },
  computed: {
    nemaData() {
      return this.mojipodaci.length == 0;
    }
  }
};
</script>