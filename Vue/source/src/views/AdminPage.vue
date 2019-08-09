<template lang="html">

  <section class="tabs">
  <div class="row">
    <div class="col-md-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <b-tabs>
            <b-tab title="Account">
              <div class="row">
              <div class="text-center">
                <b-btn class="btn btn-fw btn-inverse-light btn-secondary ml-5" v-b-modal.modalmd variant="primary">Create Account</b-btn>
              <b-modal id="modalmd" ok-only ok-title="Cancel">
                  <section class="register ml-3">
                      <div class="wrapper d-flex align-items-center auth register-full-bg">
                        <div class="row w-100">
                          <div class="col-lg-12 mx-auto">
                            <div class="auth-form-light text-left p-5">
                              <h2>Register Account</h2>
                              <form class="pt-4">
                                <form>
                                  <div class="form-group">
                                    <label for="exampleInputEmail1">Username</label>
                                    <input type="email" class="form-control" id="createemail" aria-describedby="emailHelp" placeholder="Username">
                                    <i class="mdi mdi-account"></i>
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="createpassword" placeholder="Password">
                                    <i class="mdi mdi-eye"></i>
                                  </div>
                                  <div class="form-group">
                                  <label for="exampleInputAuthority" class="mb-2">Authority</label>
                                  <b-form-select id="createtype" v-model="selected" :options="SelectType"  />
                                  </div>
                                  <div class="mt-5">
                                    <a class="btn btn-block btn-primary btn-lg font-weight-medium" @click="CreateAccount()" style="color: white">Register</a>
                                  </div>
                                </form>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
              </b-modal>
              </div>
              <b-btn class="btn btn-fw btn-inverse-light btn-secondary" v-b-modal.modalUpdate>Edit Account</b-btn>
              <b-modal id="modalUpdate" ok-only ok-title="Cancel">
                  <section class="register ml-3">
                      <div class="wrapper d-flex align-items-center auth register-full-bg">
                        <div class="row w-100">
                          <div class="col-lg-12 mx-auto">
                            <div class="auth-form-light text-left p-5">
                              <h2>Update Account</h2>
                              <form class="pt-4">
                                <form>
                                  <div class="form-group">
                                    <label for="exampleInputEmail1">Username</label>
                                    <input type="email" class="form-control" id="updateemail" aria-describedby="emailHelp" placeholder="Username">
                                    <i class="mdi mdi-account"></i>
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="updatepassword" placeholder="Password">
                                    <i class="mdi mdi-eye"></i>
                                  </div>
                                  <div class="form-group">
                                  <label for="exampleInputAuthority" class="mb-2">Authority</label>
                                  <b-form-select id="updatetype" v-model="selected" :options="SelectType"  />
                                  </div>
                                  <div class="mt-5">
                                    <a class="btn btn-block btn-primary btn-lg font-weight-medium" @click="UpdateAccount()" style="color: white">Update</a>
                                  </div>
                                </form>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
              </b-modal>
              <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary">Delete Account</button>
                <i class="mdi mdi-account-search ml-5"></i>
                <input data-v-a65342b6="" id="input1" type="text" placeholder="Search" class="col-4 mr-2 form-control">
                <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary mr-5">Search</button>
              </div>
              <div data-v-19c9d02c="" class="card-body">
                <div data-v-19c9d02c="" class="table-responsive">
                  <table data-v-19c9d02c="" class="table center-aligned-table">
                    <thead data-v-19c9d02c="">
                      <tr data-v-19c9d02c="">
                        <th data-v-19c9d02c="" class="border-bottom-0">Account No</th>
                        <th data-v-19c9d02c="" class="border-bottom-0">Account Email</th>
                        <th data-v-19c9d02c="" class="border-bottom-0">Account Type</th>
                      </tr>
                    </thead>
                    <tbody data-v-19c9d02c="">
                      <tr data-v-19c9d02c="" v-for="p in pageArray" :key="p.accountid">
                        <td data-v-19c9d02c="">{{p.accountid}}</td>
                        <td data-v-19c9d02c="">{{p.email}}</td>
                        <td data-v-19c9d02c="">{{p.position}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-6 ml-12 grid-margin" style="margin-left:550px; margin-top:50px;">
                <div class="card">
                  <div class="card-body">
                    <b-pagination :total-rows="100" v-model="currentPage" :per-page="5" @change="processFile($event)">
                    </b-pagination>
                  </div>
                </div>
              </div>
              <!-- <div class="btn-cover">
                <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
                  이전
                </button>
                <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
                <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
                  다음
                </button>
              </div> -->
            </b-tab>
            <b-tab title="Issue">
              <div class="row">
              <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary ml-5">All</button>
              <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary">Waiting</button>
              <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary">In progress</button>
              <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary">Resolved</button>
                <i class="mdi mdi-account-search ml-5"></i>
                <input data-v-a65342b6="" id="input1" type="text" placeholder="Search" class="col-4 mr-2 form-control">
                <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary mr-5">Search</button>
              </div>
              <div data-v-19c9d02c="" class="card-body">
                <div data-v-19c9d02c="" class="table-responsive">
                  <table class="table center-aligned-table">
                <thead>
                  <tr>
                    <th class="border-bottom-0">SUBJECT</th>
                    <th class="border-bottom-0">VERSION</th>
                    <th class="border-bottom-0">PRIORITY</th>
                    <th class="border-bottom-0">DEADLINE</th>
                    <th class="border-bottom-0">ASSIGNOR</th>
                    <th class="border-bottom-0">TYPE</th>
                    <th class="border-bottom-0">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr data-v-19c9d02c="" v-for="p in issueArray" :key="p.subject">
                    <td data-v-19c9d02c="">{{p.subject}}</td>
                    <td data-v-19c9d02c="">{{p.majorver+'.'+p.minorver}}</td>
                    <td data-v-19c9d02c="" v-if="p.priority === 0">
                      <b-badge variant="primary">Lowest</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.priority === 1">
                      <b-badge variant="warning">Middle</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.priority === 2">
                      <b-badge variant="danger">Highest</b-badge>
                    </td>
                    <td data-v-19c9d02c="">{{p.deadline}}</td>
                    <td data-v-19c9d02c="">{{p.assignor}}</td>
                    <td data-v-19c9d02c="">{{p.type}}</td>
                    <td data-v-19c9d02c="" v-if="p.status === 0">
                      <b-badge variant="outline-danger">Waiting</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.status === 1">
                      <b-badge variant="outline-warning">In Progress</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.status === 2">
                      <b-badge variant="outline-success">Resolved</b-badge>
                    </td>
                  </tr>
                </tbody>
              </table>
                </div>
              </div>
              <div class="col-6 ml-12 grid-margin" style="margin-left:550px; margin-top:50px;">
                <div class="card">
                  <div class="card-body">
                    <b-pagination :total-rows="100" v-model="currentPage" :per-page="5" @change="processFile($event)">
                    </b-pagination>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab title="Resource">
              <div class="row">
              <button id="ddown8__BV_toggle_" aria-haspopup="true" aria-expanded="false" type="button" class="btn dropdown-toggle btn-outline-secondary ml-5">Version</button>
              <button id="ddown8__BV_toggle_" aria-haspopup="true" aria-expanded="false" type="button" class="btn dropdown-toggle btn-outline-secondary ml-2">Language</button>
              <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary ml-5">조회</button>
              <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary">다운로드</button>
                <i class="mdi mdi-account-search ml-5"></i>
                <input data-v-a65342b6="" id="input1" type="text" placeholder="Search" class="col-4 mr-2 form-control">
                <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary mr-5">Search</button>
              </div>
              <div data-v-19c9d02c="" class="card-body">
                <div data-v-19c9d02c="" class="table-responsive">
                  <table data-v-19c9d02c="" class="table center-aligned-table">
                    <thead data-v-19c9d02c="">
                      <tr data-v-19c9d02c="">
                        <th data-v-19c9d02c="" class="border-bottom-0">Original</th>
                        <th data-v-19c9d02c="" class="border-bottom-0">Translation</th>
                      </tr>
                    </thead>
                    <tbody data-v-19c9d02c="" v-on:click="clickList()">
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">Original1</td>
                        <td data-v-19c9d02c="">Translation1</td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">Original1</td>
                        <td data-v-19c9d02c="">Translation1</td>
                      </tr>
                      <tr data-v-19c9d02c="" class="clickable-row">
                        <td data-v-19c9d02c="">Original1</td>
                        <td data-v-19c9d02c="">Translation1</td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">Original1</td>
                        <td data-v-19c9d02c="">Translation1</td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">Original1</td>
                        <td data-v-19c9d02c="">Translation1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-6 ml-12 grid-margin" style="margin-left:550px; margin-top:50px;">
                <div class="card">
                  <div class="card-body">
                    <b-pagination :total-rows="100" v-model="currentPage" :per-page="5" @change="processFile($event)">
                    </b-pagination>
                  </div>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
  </section>

</template>

<script lang="js">
  import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js"
  import * as lang from "vuejs-datepicker/src/locale"
  import axios from 'axios'

  const state = {
    date1: new Date()
  }
  export default {
    name: 'tabs',
    components: {
      Datepicker
    },
    data () {
      return {
        issueArray: {},
        pageArray: {},
        file: null,
        isFileSelected: false,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: {'C': '3PO'}, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ],
        Assignee: [
          { value: 'admin', text: 'admin' },
          { value: 'snety0@gmail.com', text: 'snety0@gmail.com' },
          { value: 'ssheko93@gmail.com', text: 'ssheko93@gmail.com' },
          { value: 'mime32@gmail.com', text: 'mime32@gmail.com' },
          { value: 'sdy9192@naver.com', text: 'sdy9192@naver.com' }
        ],
        SelectType: [
          { value: '1', text: 'Admin' },
          { value: '2', text: 'User' }
        ],
        IssueType: [
          { value: 'a', text: 'Bug' },
          { value: 'b', text: 'Web' },
          { value: 'c', text: 'App' }
        ],
        Priority: [
          { value: '1', text: '1' },
          { value: '2', text: '2' },
          { value: '3', text: '3' },
          { value: '4', text: '4' },
          { value: '5', text: '5' }
        ],
        Version: [
          { value: '2.0', text: '2.0' },
          { value: '2.1', text: '2.1' }
        ],
        format: "d MMMM yyyy",
        disabledDates: {},
        disabledFn: {
          customPredictor (date) {
            if (date.getDate() % 3 === 0) {
              return true
            }
          }
        },
        highlightedFn: {
          customPredictor (date) {
            if (date.getDate() % 4 === 0) {
              return true
            }
          }
        },
        highlighted: {},
        eventMsg: null,
        state: state,
        language: "en",
        languages: lang,
        vModelExample: null,
        changedMonthLog: []
      }
    },
    created: function () {
      this.SelectAccount()
      this.SelectIssue()
    },
    methods: {
      SelectIssue () {
      // var accountid = document.getElementById('1').valu
      axios.post('http://192.168.1.26:1337/issue/select_issue',
        {'accountid': '1'})
        .then(response => {
        // this.toDoItems = response.data.map(r => r.data)
          this.issueArray = JSON.parse(JSON.stringify(response.data.data_creat))
          // this.issueArray = JSON.stringify(response.data.data)
          console.log(this.issueArray)
        })
        .catch(e => {
          console.log('error : ', e)
        })
    },
      SelectAccount () {
      axios.post('http://192.168.1.26:1337/account/select_account',
        {'request': 'SelectPName'})
        .then(response => {
          // this.pageArray = JSON.stringify(response.data.data)
          this.pageArray = JSON.parse(JSON.stringify(response.data.data))
          console.log(this.pageArray)
          // this.pageArray = JSON.parse(JSON.stringify(response.data.data))
        })
        .catch(e => {
          console.log('error : ', e)
        })
      },
      UpdateAccount () {
      var id = document.getElementById('updateid').value
      var email = document.getElementById('updateemail').value
      var pw = document.getElementById('updatepassword').value
      var position = document.getElementById('updatetype')
      var pdata = position.options[position.selectedIndex].value
      console.log(pdata)
      axios.post('http://192.168.1.26:1337/account/update_account',
        {'accountid': id, 'email': email, 'password': pw, 'position': pdata})
        .then(response => {
        // this.toDoItems = response.data.map(r => r.data)
          console.log(JSON.stringify(response.data))
        })
        .catch(e => {
          console.log('error : ', e)
        })
    },
      CreateAccount () {
      var email = document.getElementById('createemail').value
      var pw = document.getElementById('createpassword').value
      var position = document.getElementById('createtype')
      var pdata = position.options[position.selectedIndex].value
      console.log(pdata)
      axios.post('http://192.168.1.26:1337/account/create_account',
        {'email': email, 'password': pw, 'position': pdata})
        .then(response => {
        // this.toDoItems = response.data.map(r => r.data)
          console.log(JSON.stringify(response.data))
        })
        .catch(e => {
          console.log('error : ', e)
        })
      },
      processFile (event) {
        this.isFileSelected = true
        // $($(".autoTab").find("li")[1]).show()
        alert("Resouce Tab에 리소스가 로드되었습니다.")
      },
      highlightTo (val) {
        if (typeof this.highlighted.to === "undefined") {
          this.highlighted = {
            to: null,
            daysOfMonth: this.highlighted.daysOfMonth,
            from: this.highlighted.from
          }
        }
        this.highlighted.to = val
      },
      highlightFrom (val) {
        if (typeof this.highlighted.from === "undefined") {
          this.highlighted = {
            to: this.highlighted.to,
            daysOfMonth: this.highlighted.daysOfMonth,
            from: null
          }
        }
        this.highlighted.from = val
      },
      setHighlightedDays (elem) {
        if (elem.target.value === "undefined") {
          return
        }
        let highlightedDays = elem.target.value
          .split(",")
          .map(day => parseInt(day))
        this.highlighted = {
          from: this.highlighted.from,
          to: this.highlighted.to,
          daysOfMonth: highlightedDays
        }
      },
      setDisabledDays (elem) {
        if (elem.target.value === "undefined") {
          return
        }
        let disabledDays = elem.target.value.split(",").map(day => parseInt(day))
        this.disabledDates = {
          from: this.disabledDates.from,
          to: this.disabledDates.to,
          daysOfMonth: disabledDays
        }
      },
      disableTo (val) {
        if (typeof this.disabled.to === "undefined") {
          this.disabledDates = {
            to: null,
            daysOfMonth: this.disabledDates.daysOfMonth,
            from: this.disabled.from
          }
        }
        this.disabledDates.to = val
      },
      disableFrom (val) {
        if (typeof this.disabledDates.from === "undefined") {
          this.disabled = {
            to: this.disabledDates.to,
            daysOfMonth: this.disabled.daysOfMonth,
            from: null
          }
        }
        this.disabledDates.from = val
      },
      openPicker () {
        this.$refs.programaticOpen.showCalendar()
      },
      logChangedMonth (date) {
        this.changedMonthLog.push(date)
      }
    }
  }

  // $(document).ready(function (){
  //   this.SelectAccount()
  //   // if($('.autoTab label').value == Attachment)
  //   //   alert("hh");
  //   // $('.autoTab li:hidden').show()
  //   // $('.autoTab attachment').click(function () {
  //   //   $('.autoTab li:hidden').show()
  //   // })
  //   // $(".resourceTab").css("visibility", "hidden")
  // })
</script>

<style scoped lang="scss">
.tabs {
}
</style>
