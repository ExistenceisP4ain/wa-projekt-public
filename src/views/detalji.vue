<template>
  <div v-if="a">
    <oglasi69 :a="a" :showcomments="true"/>
  </div>
</template>

<script>
import oglasi69 from "@/components/oglasi69.vue";
import store from "@/store.js";

export default {
  props: ['id'],
  data() {
    return {
      a: null
    }
  },
  mounted() {
    console.log(this.id);
    db.collection("noviobrazac2")
      .doc(this.id).get().then(doc => {
        this.a = doc.data();
        this.a.id = doc.id;
      })
  },
  name: "post-detail",
  components: {
    oglasi69
  },
}
</script>

<style scoped>
  button {
    margin-bottom: 20px
  }
</style>