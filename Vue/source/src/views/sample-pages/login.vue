<template lang="html">
  <section class="login">
    <div class="wrapper d-flex flex-row align-items-center auth login-full-bg" style="background-color: rgb(42, 119, 209)">
      <div class="container-fluid page-body-wrapper full-page-wrapper mt-5 row w-100 p-5">
        <div class="col-lg-6 mx-auto p-5">
          <div class="mt-5 auth-form-medit text-left p-5">
            <h1 style="vertical-align: center; font-size: 80px;">Medit</h1>
            <h3>Login</h3>
            <!-- <h4 class="font-weight-light">Hello! let's get started</h4> -->
            <form class="pt-5">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Username</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username">
                  <i class="mdi mdi-account"></i>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                  <i class="mdi mdi-eye"></i>
                </div>
                <div class="mt-5">
                  <a class="btn btn-block btn-warning btn-lg font-weight-medium" @click="LoginCheck()">Login</a>
                </div>
                <!-- <div class="mt-3 text-center">
                  <a href="#" class="auth-link text-white">Forgot password?</a>
                </div> -->
              </form>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="js">
  import axios from 'axios'

  export default {
    name: 'login',
    data: () => {
      return {
        toDoItems: []
      }
    },
    methods: {
      LoginCheck () {
        var email = document.getElementById('exampleInputEmail1').value
        var pw = document.getElementById('exampleInputPassword1').value
        axios.post('http://192.168.1.26:1337/login',
                   {'email': email, 'password': pw})
          .then(response => {
            this.toDoItems = response.data
            console.log(JSON.stringify(response.data))
            console.log(this.toDoItems.resultCode)
            if (this.toDoItems.resultCode === 0){
              window.open("http://localhost:8080/dashboard", "_self")
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
.login {
}
</style>
