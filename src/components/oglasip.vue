<template>
<tbody>
     <tr :key="b.id" v-for="b in mojipodaci" >
      <td>{{b.poslodavac}}</td>
      <td>{{b.vrsta}}</td>
      <td>{{b.grad}}</td>
      <td>{{b.datump}}</td>
      <td>{{b.datumk}}</td>
      <td>{{b.satnica}}</td>
      <td>{{b.putni}}</td>
      <td>{{b.brtel}}</td>
      <td>{{b.email}}</td>
      <td>{{b.oib}}</td>
      <td>{{b.posted_at | formatTime }}</td>
      <td style="font-family:verdana; ">{{b.napomena}}</td>
      <td>{{b.tipoglasa}}</td>
      <td>{{b.status}}</td>
      <td>{{b.comment}}</td>
      <td><center>
            <!-- <button v-if="stpodaci.url >= '1'" @click="prikazSlikeUsr(stpodaci);" type="button" class="btn btn-primary btn-lg">Prikaži sliku</button> -->
            <img :src="b.url" @click="prikazSlikeUsr(b);" width="100px" />
          </center></td>
    </tr>
  </tbody>
</template>
<script>
import store from "@/store.js";
import moment from "moment";
export default {
  props: ["b"],
  data() {
    return store;
  },
  components: {
    
  },
  filters: {
    formatTime: function(value) {
      return moment(value).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  computed: {
    nemaData() {
      return this.mojipodaci.length == 0;
    }
  },
  methods:{
    prikazSlikeUsr(b) {
      $("#picusrModal").modal("show");
      this.url = b.url;
    }
  }
};
</script>