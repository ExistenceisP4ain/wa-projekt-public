<template>
    <div class="card text-white bg-info mb-3 text-center" style="margin-top:15px;">
  <div class="card-header">{{a.poslodavac }}</div>
  <div class="card-body">
    <h5 class="card-title">{{a.vrsta}}</h5>
    <p class="card-text">Objavljeno: {{a.posted_at | formatTime}}<br>
      Grad: {{a.grad}}<br>
      Pocetak rada: {{a.datum}}<br>
      Kraj rada: {{a.datumk}}<br>
      Satnica: {{a.satnica}}<br>
      Putni: {{a.putni}}<br>
      Brtel: {{a.brtel}}<br>
      Email: {{a.email}}<br>
      Oib: {{a.oib}}<br>
      {{a.napomena}}
    </p>
    <button 
        @click="editComment(a);"
        type="button"
        style="margin: 12px;"
        class="btn btn-outline-dark"
        data-toggle="modal"
        data-target="#commentModal1"
      >
        Prijavi se na oglas
      </button>
      <br>
    <img :src="a.url" @click="prikazSlikeUsr(a);" width="100px" /></div>
    <div v-if="showcomments">
            <div class="comments list-group">
              <a :key="c.posted_at" v-for="c in comments" href="#" class="animate list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <small> by {{ c.email }} </small>
                </div>
                <small>{{ c.comment }}</small>
              </a>
            </div><br>

            <form @submit.prevent="postComment" class="form-inline mb-5">
              <div class="form-group">
                <input v-model="newComment" type="text" class="form-control" id="imageUrl" placeholder="Any comment?">
              </div>
              <button type="submit" class="btn btn-primary ml-2">Post</button>
            </form>
          </div>
  
</div>
</template>
<script>
import store from "@/store.js";
import moment from "moment";
export default {
  props: ["a","showcomments"],
  data() {
    return {
      store,
      comments:[],
    newComment:''
    }
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("Do MMMM YYYY");
    }
  },
  mounted() {
    if (this.showcomments) {
     db.collection("noviobrazac2").doc(this.a.id).collection("comments").orderBy("posted_at").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            let comment = change.doc.data();
            comment.isNew = true;
            console.log(comment);
            this.comments.push(comment)
          }
        })
     })
    }
  },
  methods:{
    editComment(a) {
      $("#commentModal1").modal("show");
      this.store.aktivnikorisnik = a.id;
      this.store.satnica=a.satnica;
      this.store.email=a.email;
      this.store.brtel=a.brtel;
      this.store.datumk=a.datumk;
      this.store.datum=a.datum;
      this.store.grad=a.grad;
      this.store.napomena=a.napomena;
      this.store.oib=a.oib;
      this.store.poslodavac=a.poslodavac;
      this.store.putni=a.putni;
      this.store.vrsta=a.vrsta;
    },
      prikazSlikeUsr(a) {
      $("#picusrModal").modal("show");
      this.url = a.url;
    },
    otvorioglas(a) {
      this.$router.push({path: `post/${a.id}`})
    },
    postComment() {
      if (this.newComment) {
        db.collection("noviobrazac2")
          .doc(this.a.id)
            .collection("comments")
            .add({ email: this.store.userEmail, comment: this.newComment, posted_at: Date.now() })
              .then(result => {
                console.log(result)
                this.newComment = "";
              })
              .catch(e => {
                console.error(e)
              })
      }
    }
  }
};
</script>
<style>
  @-webkit-keyframes fade-in-fwd{0%{-webkit-transform:translateZ(-80px);transform:translateZ(-80px);opacity:0}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}@keyframes fade-in-fwd{0%{-webkit-transform:translateZ(-80px);transform:translateZ(-80px);opacity:0}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}
  .animate{-webkit-animation:fade-in-fwd 1s cubic-bezier(.39,.575,.565,1.000) both;animation:fade-in-fwd 1s cubic-bezier(.39,.575,.565,1.000) both}
</style>