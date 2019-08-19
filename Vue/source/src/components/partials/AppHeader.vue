<template lang="html">
  <b-navbar class="fixed-top" toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
      <!-- <img src="../../assets/images/medit.png" alt="logo"/> -->
      <a class="navbar-brand brand-logo-mini" href="/"><img src="../../assets/images/logo-mini.svg" alt="logo" /></a>
    </div>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="header-links">
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <div class="count-indicator">
              <a class="navbar-brand brand-logo-mini" href="/">
                <img class="img-xs rounded-circle" src="../../assets/images/faces/ananymous.png" alt="profile image" /></a>
            </div>
          </template>
          <div class="nav-link">
            <div style="margin-left:35%"><img class="img-xs rounded-circle" src="../../assets/images/faces/ananymous.png" alt="profile image" /> <span class="online-status online"></span></div>
            <div class="profile-name pl-4 mt-3" style="margin-left:12.5%;">
              <p class="userEmail ml-1" style="color:black">{{userEmail}}</p>
              <div class="badge badge-danger" @click="deleteAccountData()" style="cursor:pointer">Logout</div>
            </div>
          </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>


<script lang="js">
  // import localforage from 'localforage'

  export default {
    name: 'app-header',
    data () {
      return {
        checkAdmin: false,
        userEmail: null
      }
    },
    created: function () {
      this.GetAccountData()
    },
    methods: {
      deleteAccountData () {
        localStorage.removeItem('email')
        window.open("http://localhost:8080/", "_self")
      },
      GetAccountData () {
        this.userEmail = localStorage.getItem('email')
        // alert('userEmail ' + this.userEmail)
      }
    }
  }
</script>

<style scoped lang="scss">
.app-header {
}
</style>
