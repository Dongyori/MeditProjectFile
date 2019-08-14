<template lang="html">

  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav" style="margin-top:-11%">
        <li class="nav-item nav-profile">
          <div class="nav-link">
            <div style="margin-left:35%"><img src="../../assets/images/medit_logo.png" alt="logo"/> <span class="online-status online"></span></div>
            <div class="profile-name">
              <p class="userEmail">{{userEmail}}</p>
              <div class="badge badge-teal mx-auto">Online</div>
            </div>
          </div>
        </li>
        <li class="nav-item" ><router-link class="nav-link" to="/dashboard" :active='$route.name =="dashboard"'><img class="menu-icon" src="../../assets/images/menu_icons/01.png" alt="menu icon"><span class="menu-title">Main Dashboard</span></router-link></li>
        <li class="nav-item" style="cursor:pointer">
          <span class="nav-link" v-b-toggle="'issue-pages'">
            <img class="menu-icon" src="../../assets/images/menu_icons/02.png" alt="menu icon"><span class="menu-title" >Issue</span><i class="menu-arrow"></i>
          </span>
          <b-collapse id="issue-pages">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item"><router-link class="nav-link" to="/issueList/" :active='$route.name =="issueList"'>Issue List</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/createIssue/" :active='$route.name =="createIssue"'>Create Issue</router-link></li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item" v-if="checkAdmin === true"><router-link class="nav-link" to="/adminPage/" :active='$route.name =="adminPage"'><img class="menu-icon" src="../../assets/images/menu_icons/08.png" alt="menu icon"><span class="menu-title">Admin Page</span></router-link></li>
      </ul>
    </nav>
  </section>

</template>

<script lang="js">
  // import localforage from 'localforage'

  export default {
    name: 'app-sidebar',
    data (){
      return {
        userEmail: null,
        checkAdmin: false
      }
    },
    created: function () {
      this.GetAccountData()
    },
    methods: {
      GetAccountData () {
        this.userEmail = localStorage.getItem('email')
        if (this.userEmail === "admin"){
          this.checkAdmin = true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.app-sidebar {
}
</style>
