<template lang="html">

  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item nav-profile">
          <div class="nav-link">
            <div style="margin-left:35%"><img src="../../assets/images/medit_logo.png" alt="logo"/> <span class="online-status online"></span></div>
            <div class="profile-name">
              <p class="userEmail">{{userEmail}}</p>
              <p class="designation">CheckIm</p>
              <div class="badge badge-teal mx-auto mt-3">Online</div>
            </div>
          </div>
        </li>
        <li class="nav-item" ><router-link class="nav-link" to="/dashboard" :active='$route.name =="dashboard"'><img class="menu-icon" src="../../assets/images/menu_icons/01.png" alt="menu icon"><span class="menu-title">Main Dashboard</span></router-link></li>
        <li class="nav-item" ><router-link class="nav-link" to="/issueList/" :active='$route.name =="issueList"'><img class="menu-icon" src="../../assets/images/menu_icons/02.png" alt="menu icon"><span class="menu-title">Issue List</span></router-link></li>
        <!-- <li class="nav-item">
          <span class="nav-link" v-b-toggle="'sample-pages'">
            <img class="menu-icon" src="../../assets/images/menu_icons/08.png" alt="menu icon"><span class="menu-title">Sample Pages</span><i class="menu-arrow"></i>
          </span>
          <b-collapse id="sample-pages">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item"><router-link class="nav-link" to="/login/">login</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/register/">register</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/404/">404</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/500/">500</router-link></li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'ui-components'">
            <img class="menu-icon" src="../../assets/images/menu_icons/03.png" alt="menu icon"><span class="menu-title">UI Components</span><i class="menu-arrow"></i>
          </span>
          <b-collapse id="ui-components">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item"><router-link class="nav-link" to="/alerts/">Alerts</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/buttons/">Button</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/badges/">Badges</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/breadcrumbs/">Breadcrumbs</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/carousel/">Carousel</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/dropdowns/">Dropdowns</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/typography/">Typography</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/paginations/">Paginations</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/tooltips/">Tooltips</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/progress/">Progress</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/tabs/">Tabs</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/modals/">Modals</router-link></li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item"><router-link class="nav-link" to="/tables/"><img class="menu-icon" src="../../assets/images/menu_icons/06.png" alt="menu icon"><span class="menu-title">Tables</span></router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/icons/"><img class="menu-icon" src="../../assets/images/menu_icons/07.png" alt="menu icon"><span class="menu-title">Icons</span></router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/forms/"><img class="menu-icon" src="../../assets/images/menu_icons/04.png" alt="menu icon"><span class="menu-title">Forms</span></router-link></li> -->
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
        userEmail: null
      }
    },
    created: function () {
      this.GetAccountData()
    },
    methods: {
      GetAccountData () {
        // localforage.length().then(function () {
        //   alert(localStorage.getItem('email'))
        //   localforage.getItem('email').then(function (value) {
        //     // alert(value)
        //     console.log(value)
        //     document.getElementById('userEmail').innerHTML = value
        //   }).catch(function (err) {
        //     // This code runs if there were any errors
        //     console.log(err)
        //   })
        // })
        this.userEmail = localStorage.getItem('email')
        // alert('userEmail ' + this.userEmail)
      }
    }
  }
</script>

<style scoped lang="scss">
.app-sidebar {
}
</style>
