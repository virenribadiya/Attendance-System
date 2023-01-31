<template>
  <NavbarComponent /> 
  <router-view/>
</template>

<script >
import NavbarComponent from "@/components/Navbar.vue";

export default{
  name:"App",
  components: {
    NavbarComponent,
}
}
</script>
