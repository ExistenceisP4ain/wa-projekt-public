<template>
  <div>
    <div class="row justify-content-center" style="margin: 20px;">
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Poslodavac</th>
            <th scope="col">Oib</th>
            <th scope="col">Email</th>
            <th scope="col">Grad</th>
            <th scope="col">Datum poc</th>
            <th scope="col">Kraj</th>
            <th scope="col">Satnica</th>
            <th scope="col">Tel</th>
            <th scope="col">Vrsta</th>
            <th scope="col">Detaljnije</th>
            <th scope="col">Datum prijave:</th>
            <th scope="col">Status:</th>
          </tr>
        </thead>
        <prijavenaoglas1
          :key="podaci.id"
          :ree="podaci"
          v-for="podaci in prijave1"
        />
      </table>
    </div>
    <div
      class="modal fade"
      id="commentModal2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="commentModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content modcont1">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModalLongTitle">Unesi napomenu</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h2>
              <br />
              <h6>ID: ({{aktivnikorisnik}})</h6>
            </h2><p>
            <br />
            Razlog zašto se prijavio korisnik na oglas
            <textarea
              placeholder="Opis kvara"
              rows="4"
              cols="50"
              v-model="prijava"
              disabled
            ></textarea>
            <br>Razlog zašto ćete prihvatit/odbit zahtjev:
            <textarea
              placeholder="Komentar"
              rows="4"
              cols="50"
              v-model="ocekivanje"
              name="opis"
            ></textarea>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="status1"
                type="radio"
                name="stanje"
                id="stanje"
                value="odobreno"
              />
              <label class="form-check-label" for="stanjeradio">
                <span class="badge badge-success">Odobreno</span>
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="status1"
                type="radio"
                name="stanje"
                id="stanjeradio2"
                value="odbijeno"
              />
              <label class="form-check-label" for="stanjeradio2">
                <span class="badge badge-danger">Odbijeno</span>
              </label>
            </div>
            <hr />
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
</template>
<style lang="scss">
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  tr {
    border: 1px solid #ccc;
  }
  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }
  td:before {
    position: absolute;
    top: -40px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }
}
</style>
<script>
import store from "@/store.js";
import prijavenaoglas1 from "@/components/prijavenaoglas1.vue";
export default {
  data() {
    return store;
  },
  components: {
    prijavenaoglas1
  },
  methods:{
      saveComment() {
      let id = this.aktivnikorisnik;
      if (!id) {
        alert("Fail");
        return;
      }
      db.collection("prijava")
        .doc(this.aktivnikorisnik)
        .update({
          ocekivanje: this.ocekivanje,
          status1: this.status1
        })
        .then(function() {
          $("#commentModal2").modal("hide");
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>