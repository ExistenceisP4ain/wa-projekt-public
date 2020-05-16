<template>
  <tbody>
    <tr>
      <th scope="row">{{ree.poslodavac}}</th>
      <td>{{ree.oib}}</td>
      <td>{{ree.emailposlodavca}}</td>
      <td>{{ree.grad}}</td>
      <td>{{ree.datum}}</td>
      <td>{{ree.datumk}}</td>
      <td>{{ree.satnica}}</td>
      <td>{{ree.brtel}}</td>
      <td>{{ree.vrsta}}</td>
      <td>{{ree.tipoglasa}}</td>
      <td>{{ ree.posted_at | formatTime }}</td>  
      <button 
        @click="editComment(ree);"
        type="button"
        style="margin: 12px;"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#commentModal2"
      >
        <i class="fas fa-comment-medical"></i>
      </button>   
      <td v-if="ree.status1=='odobreno'">
        <span class="badge badge-success">Odobreno</span>
      </td>
      <td v-else-if="ree.status1=='odbijeno'">
        <span class="badge badge-danger">Odbijeno</span>
      </td>
      <td v-else>
        <span class="badge badge-info">Nerješeno</span>
      </td>
      <div
        class="modal fade"
        id="picModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="picModalLabel"
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
    </tr>
  </tbody>
</template>
  <script>
import store from "@/store.js";
import moment from "moment";
export default {
  data() {
    return store;
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  methods:{
      editComment(ree) {
      $("#commentModal").modal("show");
      this.aktivnikorisnik = ree.id;
      this.prijava=ree.prijava;
      this.ocekivanje=ree.ocekivanje;
      this.status1=ree.status1;
    },
  },
  props: ["ree"]
};
</script>