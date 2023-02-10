<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light my-navbar">
        <div class="container">
            <router-link class="navbar-brand" :to="{name:'classList'}"> 
               <div class="text-centre">Attandance System</div> 
            </router-link>
        </div>
    </nav>
</template>




<script>
export default {
    name: "NavbarComponent",
    data(){
        return{

        }
    }
}

</script>




<style>
.my-navbar{
    border-bottom: 1px solid #dddddd;
}

.navbar-brand{
    font-weight:bold;
    font-size: 150%
}
.navbar-brand:hover{
    color: #736c6c !important;
}
</style>