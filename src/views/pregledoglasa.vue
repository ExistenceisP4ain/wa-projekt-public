<template>
     <div class="row">
      <div @click="aaaa" class="col-4">
      <!--<trazilica /> -->
      <oglasi :a="a" v-for="a in podacii" :key="a.id" />
    </div>
    <div class="col">
      <div @click="aaaa" >
      <oglasii :a="a" v-for="a in podaciii" :key="a.id" />
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
  </div></div><notifications group="obavj" /></div>
  
</template>
<script>
import store from "@/store.js";
import oglasi from "@/components/oglasi.vue";
import oglasii from "@/components/oglasii.vue";
import trazilica from "@/components/trazilica.vue";
import moment from "moment";
export default {
  data() {
    return store;
  },
  components: {
    oglasi,
    oglasii,
    trazilica
  },
  name:"pregledoglasa",
  computed: {
    nemaData() {
      return this.podaci.length == 0;
    },
    podacii(){
      return this.podaci.filter(card=>
      card.poslodavac.includes(this.searchTerm));
    },
    podaciii(){
      return this.podaci1.filter(card=>
      card.poslodavac.includes(this.searchTerm));
    }
  },
methods:{
    aaaa(){
       //$(".el").notify("I am a notification popup");
       this.$notify({
         'group':'obavj',
         'title':'Upozorenje!',
         'text':'Trebate se prijaviti za pregledavanje oglasa!'
       })
    }
}
};
</script>
