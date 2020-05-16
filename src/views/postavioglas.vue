<template>
  <div class="container obr11">
    <form @submit.prevent="obrazac">
      <div class="card row">
        <h4>Osobni podaci</h4>
        <div class="card-body">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="name">Poslodavac</label>
              <input v-model="poslodavac" type="name" class="form-control" placeholder="Poslodavac" required />
            </div>
            <div class="form-group col-md-4">
              <label for="lastname">OIB</label>
              <input
                v-model="oib"
                type="number"
                class="form-control"
                placeholder="oib"
                required
              />
            </div>
            <div class="form-group col-md-4">
                <label for="input">Tip oglasa</label>
                <select v-model="tipoglasa" class="form-control" required>
                  <option selected disabled>Izaberi</option>
                  <option>Normalni (30 dana)</option>
                  <option>Plaćeni</option>
                </select>
              </div>
            <!--<div class="form-group col-md-4">
              <label for="lastname">Email</label>
              <input v-model="store.userEmail" class="form-control" type="email" placeholder="Email" required />
            </div>-->
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="brtel">Broj telefona</label>
              <input
                v-model="brtel"
                type="number"
                class="form-control"
                id="brtel"
                placeholder="Br. tel"
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label for="brtel2">Vrsta posla</label>
              <input
                v-model="vrsta"
                type="text"
                class="form-control"
                id="vrsta"
                placeholder="Vrsta posla"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="City">Mjesto obavljanja</label>
              <input v-model="grad" type="text" class="form-control" id="City" required />
            </div>
            <div class="form-group col-md-3">
              <label for="Satnica">Satnica</label>
              <input v-model="satnica"  type="number" id="quantity" name="quantity" min="20" class="form-control" required />
            </div>
            <div class="form-group col-md-3">
              <label for="putni">Putni trošak</label>
              <input v-model="putni" type="text" class="form-control" min="0" id="inputZip" required />
            </div>
          </div>
        </div>
        <hr />
        <h4></h4>
        <div class="row" style="margin-left: 1px;">
          <div class="card-body col-6">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="Date">Početak rada</label>
                <input v-model="datum" type="date" class="form-control" required />
              </div>
              <div class="form-group col-md-6">
                <label for="Date">Kraj rada</label>
                <input v-model="datumk" type="date" class="form-control" required />
              </div>
            </div>
<br>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="terms" required />
              <label class="form-check-label" for="terms" required>
                Prihvaćam
                <a href data-toggle="modal" data-target="#termsmodal">pravila i uvjete</a> postavljanja oglasa
              </label>
            </div>
          </div>

          <div class="col-6" style="margin-top: 30px;">
            <h5>Opis oglasa</h5>
            <textarea v-model="tekst" class="form-control" id="comment" rows="5" cols="50" required></textarea>
          </div>
        </div>
        <!-- Modal -->
        <div
          class="modal fade"
          id="termsmodal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="termsmodalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="termsmodalLongTitle">Pravila i uvjeti korištenja</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h2>STEALING DATA</h2>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 col-sm-3">
            <h4 style="padding-top: 50px;">Logo tvrtke:</h4>
          </div>
          <div class="col-6 col-sm-3">
            <croppa :width="400" :height="400" v-model="imageData"></croppa>
          </div>
        </div>
      </div>
      <!-- card -->
      <div>
        <p>
          {{uploadValue.toFixed()+'%'}}
          <progress
            class="progress-bar progress-bar-striped progress-bar-animated"
            style="width:100%"
            id="progress"
            :value="uploadValue"
            max="100"
          ></progress>
        </p>
      </div>
      <button
        type="submit"
        class="btn btn-primary float-right"
        style="margin: 10px;"
        name="send-mail"
      >Pošalji</button>
    </form>
    <!-- Modal -->
    <div
      class="modal fade"
      id="successsendmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="successsendmodalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successsendmodalLabel">Uspiješno !</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            U slučaju da je plaćen oglas, biti će postavljen na vrhu nakon vidljive uplate dok će u međuvremenu biti postavljen kao običan oglas
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store.js'
export default {
    data(){
        return{
            poslodavac:'',
            oib:'',
            email:'',
            brtel:'',
            vrsta:'',
            grad:'',
            satnica:'',
            putni:'',
            datum:'',
            vrijeme:'',
            number:'',
            tekst:'',
            imageData:null,
            uploadValue:0,
            datumk:'',
            tipoglasa:'',
            store
        }
    },
    methods: {
    obrazac() {
      this.imageData.generateBlob(blobData => {
        if (blobData != null) {
          let imageName = this.userEmail + "/" + Date.now() + ".png";
          const storageRef = firebase
            .storage()
            .ref(imageName)
            .put(blobData);
          storageRef.on(`state_changed`, snapshot => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          });
          storageRef
            .then(result => {
              result.ref
                .getDownloadURL()
                .then(url => {
                  db.collection("noviobrazac2")
                    .add({
                      email: this.store.userEmail,
                      posted_at: Date.now(),
                      poslodavac:this.poslodavac,
                      oib:this.oib,
                      brtel:this.brtel,
                      vrsta:this.vrsta,
                      grad:this.grad,
                      satnica:this.satnica,
                      putni:this.putni,
                      datum:this.datum,
                      vrijeme:this.vrijeme,
                      number:this.number,
                      tekst:this.tekst,
                      uploadValue:this.uploadValue,
                      datumk:this.datumk,
                      tipoglasa:this.tipoglasa,
                      url:url
                    })
                    .then(docRef => {
                      console.log("Dokument(pic) | ID: ", docRef.id);
                      $("#successsendmodal").modal("show");
                      this.imageData = null;
                      (this.ime = ""),
                        (this.uploadValue = 0),
                        this.store.userEmail='',
                      this.posted_at='',
                      this.poslodavac='',
                      this.oib='',
                      this.brtel='',
                      this.vrsta='',
                      this.grad='',
                      this.satnica='',
                      this.putni='',
                      this.datum='',
                      this.vrijeme='',
                      this.number='',
                      this.tekst='',
                      this.datumk='',
                      this.tipoglasa=''
                     
                    })
                    .catch(e => {
                      console.error("Error: ", error);
                    });
                })
                .catch(e => {
                  console.error(e);
                });
            })
            .catch(e => {
              console.error(e);
            });
        }
        if (blobData == null) {
          db.collection("noviobrazac2")
            .add({
                email: this.store.userEmail,
                      posted_at: Date.now(),
                      poslodavac:this.poslodavac,
                      oib:this.oib,
                      brtel:this.brtel,
                      vrsta:this.vrsta,
                      grad:this.grad,
                      satnica:this.satnica,
                      putni:this.putni,
                      datum:this.datum,
                      vrijeme:this.vrijeme,
                      number:this.number,
                      tekst:this.tekst,
                      uploadValue:this.uploadValue,
                      datumk:this.datumk,
                      tipoglasa:this.tipoglasa,
            })
            .then(docRef => {
              console.log("Dokument(nopic) | ID: ", docRef.id);
              //alert("Uspiješno");
              $("#successsendmodal").modal("show");
                      (this.ime = ""),
                        (this.uploadValue = 0),
                        this.store.userEmail='',
                      this.posted_at='',
                      this.poslodavac='',
                      this.oib='',
                      this.brtel='',
                      this.vrsta='',
                      this.grad='',
                      this.satnica='',
                      this.putni='',
                      this.datum='',
                      this.vrijeme='',
                      this.number='',
                      this.tekst='',
                      this.datumk='',
                      this.tipoglasa=''
                      
            })
            .catch(e => {
              console.error("Error adding document: ", error);
            });
        }
      });
    }
  }
}
</script>