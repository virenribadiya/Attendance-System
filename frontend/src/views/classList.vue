<template>
  <div class="home">
    <div class="container" style="max-width: 30%;">
      <div v-for="element in classes" v-bind:key="element._id">
        <div class="card shadow p-1 mb-2 mt-4 bg-body rounded">
          <div class="card-body">
            <router-link :to="{name:'studentList', params:{className:element.class }}">
              <label class="ms-2 label1">{{element.class}}</label>
            </router-link>
          </div>
        </div>
      </div>
      <!-- <label>{{ classes }}</label><br> -->
      
    </div>
  </div>


</template>





<script>
import axios from 'axios';

export default {
  name: 'classList',

  data() {
    return {
      name: "hello",
      classes:null
    }
  },
  methods: {
    async getClasses(){
      let endpoint = "http://localhost:4000/classes";
      try {
        const response = await axios.get(endpoint);
        this.classes = response.data;
        console.log(this.classes);
      } catch (error) {
        console.log(error.response);
        alert(error.response);
      }
    }
  },
  created() {
    document.title = "Attandance System",   
    this.getClasses();
  }
}
</script>

<style scoped>
.label1{
  text-decoration: none;
  color: black;
  font-size: larger;
}
</style>
  