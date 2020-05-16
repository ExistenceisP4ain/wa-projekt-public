<template>
  <tbody>
    <tr>
      <th scope="row">{{haha.poslodavac}}</th>
      <td>{{haha.oib}}</td>
      <td>{{haha.emailposlodavca}}</td>
      <td>{{haha.grad}}</td>
      <td>{{haha.datum}}</td>
      <td>{{haha.datumk}}</td>
      <td>{{haha.satnica}}</td>
      <td>{{haha.brtel}}</td>
      <td>{{haha.vrsta}}</td>
      <td>{{haha.ocekivanje}}</td>
      <td>{{ haha.posted_at | formatTime }}</td>     
      <td v-if="haha.status1=='odobreno'">
        <span class="badge badge-success">Odobreno</span>
      </td>
      <td v-else-if="haha.status1=='odbijeno'">
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
  props: ["haha"]
};
</script>