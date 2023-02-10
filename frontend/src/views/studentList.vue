<template>
  <div class="home">
    <div class="container" style="max-width: 30%;">
      <!-- <label>{{ className }}</label><br><br> -->
      <div v-for="student in classDetail.list" v-bind:key="student.enrolmentNo">
        <div class="card shadow p-1 mb-2 mt-4 bg-body rounded">
          <div class="card-body">
            <input type="checkbox" 
                  class="form-check-input" 
                  :value="student.isPresent" 
                  :checked="student.isPresent"
                  v-model="student.isPresent">
            <label :for="student.enrolmentNo" class="ms-2">{{student.enrolmentNo}}</label>
          </div>
        </div>
      </div>

      <div class="text-center mt-3">
        <button @click="onSubmit" class="btn btn-outline-success">Submit</button>
      </div>
      <br>

      <!-- <label>{{ classDetail }}</label><br><br> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:"studentList",
    props:{
        className :{
            type: String,
            reuired : true,
        },
    },
    data(){
        return{
          classDetail:{},

        }
    },
    methods:{
        //Get Students
        async getClassDetail() {
          let endpoint = "http://localhost:4000/classes/"+this.className;
          try {
              const response = await axios.get(endpoint);
              this.classDetail=response.data;
            } catch (error) {
              console.log(error);
              //alert(error);
            }
        },

        // on submit
        async onSubmit() {
          //console.log("submit");
          let endpoint = "http://localhost:4000/classes/"+this.className;
          try {
            let newDetail = this.classDetail;
            console.log(newDetail);
            await axios.put(endpoint,newDetail);
          } catch (error) {
            console.log(error);
          }
          alert("DB updated."); 
        }
    },
    created(){
        document.title = this.className,
        this.getClassDetail();
    }
}

</script>