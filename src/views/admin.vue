<template>
  <div>
    <div v-if="hasNoUserDetails">
      <h1>jaaa</h1></div>
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
            <th scope="col">Oglas</th>
            <th scope="col">Slika</th>
            <th scope="col">Datum:</th>
            <th scope="col">Status:</th>
          </tr>
        </thead>
        <admintablica
          :key="userDetails.id"
          :tablica="userDetails"
          v-for="userDetails in korisnickipodaci"
        />
      </table>
      <div class="card text-center col-sm-6" style="margin-top:5px;" v-if="hasNoUserDetails">
        <div class="card-header">Nema korisnika</div>
        <div class="card-body">
          <p class="card-text">Nema podataka</p>
        </div>
      </div>
    </div>
    <div v-if="tipoglasa=='Plaćeni'"
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
            <h5 class="modal-title" id="commentModalLongTitle">Unesi napomenu</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h2>
              <br />
              <h6>ID: ({{aktivnikorisnik}})</h6>
            </h2>
            <br />
            Napomena od oglašivača:
            <textarea
              placeholder="Opis kvara"
              rows="4"
              cols="50"
              v-model="tekst"
              disabled
            ></textarea>
            Napomenaaaaaaaaa:
            <textarea
              placeholder="Komentar"
              rows="4"
              cols="50"
              v-model="napomena"
              name="opis"
            ></textarea>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="status"
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
                v-model="status"
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
    <div v-if="tipoglasa=='Normalni (30 dana)'"
    class="modal fade"
      id="commentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="commentModalTitle"
      aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content modcont1">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModalLongTitle">Unesi napomenu</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h1>Stop <i class="far fa-hand-paper"></i></h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="zatvori()">Zatvori</button>
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
import admintablica from "@/components/admintablica.vue";
export default {
  data() {
    return store;
  },
  components: {
    admintablica
  },
  computed: {
    hasNoUserDetails() {
      return this.korisnickipodaci.length == 0;
    }
  },
  methods: {
    saveComment() {
      let id = this.aktivnikorisnik;
      if (!id) {
        alert("Fail");
        return;
      }
      db.collection("noviobrazac2")
        .doc(this.aktivnikorisnik)
        .update({
          comment: this.napomena,
          status: this.status
        })
        .then(function() {
          $("#commentModal").modal("hide");
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    zatvori(){
      this.tipoglasa=''
    }
  }
};
</script>