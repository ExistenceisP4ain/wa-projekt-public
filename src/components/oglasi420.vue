<template>
    <div class="card bg-light text-center" style="margin-top:15px;">
  <div class="card-header">
<p style="text-align:left;">
    {{b.poslodavac}} 
    <span style="float:right;">
        {{b.posted_at | formatTime }}
    </span>
</p>
  </div>
  <div class="card-body">
    <h5 class="card-title">{{b.vrsta}}</h5>
    <p class="card-text jumbotron">
      Grad:{{b.grad}}<br>
      Pocetak rada:{{b.datum}}<br>
      Kraj rada:{{b.datumk}}<br>
      Satnica:{{b.satnica}}<br>
      Putni:{{b.putni}}<br>
      Brtel:{{b.brtel}}<br>
      Email:{{b.email}}<br>
      Oib:{{b.oib}}<br>
      <p class="jumbotron">
      {{b.napomena}}</p>
    </p>
    <img :src="b.url" @click="prikazSlikeUsr(b);" width="100px" /><br>
    <button 
        @click="editComment(b);"
        type="button"
        style="margin: 12px;"
        class="btn btn-outline-primary"
        data-toggle="modal"
        data-target="#commentModal1"
      >
        Prijavi se na oglas
      </button>
      <button 
        @click="otvorioglas(b);"
        type="button"
        style="margin: 12px;"
        class="btn btn-outline-primary"
      >
        Detalji oglasa
      </button>
      <br>
    </div>
    <div v-if="showcomments1">
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
  props: ["b","showcomments1"],
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
    if (this.showcomments1) {
     db.collection("noviobrazac2").doc(this.b.id).collection("comments").orderBy("posted_at").onSnapshot(snapshot => {
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
    editComment(b) {
      $("#commentModal1").modal("show");
      this.store.aktivnikorisnik = b.id;
      this.store.satnica=b.satnica;
      this.store.email=b.email;
      this.store.brtel=b.brtel;
      this.store.datumk=b.datumk;
      this.store.datum=b.datum;
      this.store.grad=b.grad;
      this.store.napomena=b.napomena;
      this.store.oib=b.oib;
      this.store.poslodavac=b.poslodavac;
      this.store.putni=b.putni;
      this.store.vrsta=b.vrsta;
    },
      prikazSlikeUsr(b) {
      $("#picusrModal").modal("show");
      this.store.url = b.url;
    },
    otvorioglas(b) {
      this.$router.push({path: `post/${b.id}`})
    },
    postComment() {
      if (this.newComment) {
        db.collection("noviobrazac2")
          .doc(this.b.id)
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