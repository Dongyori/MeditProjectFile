<template lang="html">
  <div id="app">
    <!--  style="background-color: rgb(42, 119, 209)"
    <div v-if="isLoginPage">
      <app-login/>
      </div> -->
    <div class="container-scroller">
      <app-header v-if="isNotLoginPage"/>
      <div class="container-fluid page-body-wrapper">
        <app-sidebar v-if="isNotLoginPage"/>
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view></router-view>
          </div>
          <!-- content wrapper ends -->
          <!-- <app-footer/> -->
        </div>
        <!-- main panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </div>
</template>

<script lang="js">
  import AppHeader from '../src/components/partials/AppHeader'
  import AppSidebar from '../src/components/partials/AppSidebar'
  import AppLogin from '../src/views/sample-pages/login.vue'

  var data = {isNotLoginPage: false}
  export default{
    name: 'main',
    components: {
      AppHeader,
      AppSidebar,
      AppLogin
    },
    data () {
      return data
    },
    mounted: function () {
      // if($router.name)
      if (this.$route.name !== 'login') {
        this.isNotLoginPage = true
      }
    }
    // ,
    // beforeUpdate: function () {
    //   console.log(this.$route.name)
    // },
    // computed: {
    //   logingPage: {
    //     // getter
    //     get: function () {
    //       return this.isNotLoginPage
    //     },
    //     // setter
    //     set: function (newValue) {
    //       this.isNotLoginPage = newValue
    //     }
    //   }
    // }
    // methods () {
    //   getIsLoginPage () {
    //     return isLoginPage
    //   },
    //   setIsLoginPage (data) {
    //     isLoginPage = data
    //   }
    // }
  }
  // $(document).ready(function (){
  //   if ($route.name !=="login") {
  //     this.isLoginPage = false
  //   }
  //   // if($('.autoTab label').value == Attachment)
  //   //   alert("hh");
  //   // $('.autoTab li:hidden').show()
  //   // $('.autoTab attachment').click(function () {
  //   //   $('.autoTab li:hidden').show()
  //   // })
  //   // $(".resourceTab").css("visibility", "hidden")
  // })

</script>

<style>
@import "../node_modules/mdi/css/materialdesignicons.min.css";
@import "../node_modules/flag-icon-css/css/flag-icon.min.css";
@import "../node_modules/font-awesome/css/font-awesome.min.css";
</style>

<style lang="scss">
@import "./assets/scss/style";
</style>
