<template>
  <div class="home">
    <div class="container" style="max-width: 30%;">
      <div v-for="student in students" v-bind:key="student._id">
        <div class="card shadow p-1 mb-2 mt-4 bg-body rounded">
          <div class="card-body">
            <input type="checkbox" 
                  class="form-check-input" 
                  :value="student.isPresent" 
                  :checked="student.isPresent"
                  v-model="student.isPresent">
            <label :for="student.enrolmentNo" class="ms-2">{{ student.enrolmentNo }}</label>
          </div>
        </div>
      </div>
      <!-- <label>{{ students }}</label><br> -->
      <div class="text-center mt-3">
        <button @click="onSubmit" class="btn btn-outline-success">Submit</button>
      </div>
    </div>
  </div>


</template>





<script>
import axios from 'axios';

export default {
  name: 'HomeView',

  data() {
    return {
      name: "hello",
      students: [],
    }
  },
  methods: {
    async getStudents() {
      let endpoint = "http://localhost:4000/students";
      try {
          const response = await axios.get(endpoint);
          this.students=response.data;
        } catch (error) {
          console.log(error.response);
          alert(error.response);
        }
    },
    async onSubmit() {
      let endpoint = "http://localhost:4000/students/";
      this.students.forEach(async function(student){
        let enrolmentNo = student.enrolmentNo;
        let data = "isPresent="+student.isPresent;
        try{
          await axios.patch(endpoint+enrolmentNo,data);
        } catch (error) {
          console.log(error.response);
          alert(error.response);
        } 
      })
      
      alert("DB updated!!");
      
    }
  },
  created() {
    document.title = "Attandance System",
      this.getStudents();
  }
}
//let data = "isPresent="+this.students[0].isPresent;
//await axios.patch(endpoint + '20SOECE11080',data);
</script>

  