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
                        <div class="row w-100">
                          <div class="col-lg-12 mx-auto">
                            <div class="auth-form-light text-left p-5">
                              <h2>Register Account</h2>
                              <form class="pt-4">
                                <form>
                                  <div class="form-group">
                                    <label for="exampleInputEmail1">Username</label>
                                    <input type="email" class="form-control" id="createemail" aria-describedby="emailHelp" placeholder="Username">
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="createpassword" placeholder="Password">
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputAuthority" class="mb-2">Authority</label>
                                    <b-form-select id="createtype" v-model="selected" :options="SelectType" />
                                  </div>
                                  <div class="mt-5">
                                    <a class="btn btn-block btn-primary btn-lg font-weight-medium" @click="CreateAccount()" style="color: white">Register</a>
                                  </div>
                                </form>
                              </form>
                            </div>
                          </div>
                        </div>
                      </section>
                    </b-modal>
                  </div>
                  <b-btn class="btn btn-fw btn-inverse-light btn-secondary" v-b-modal.modalUpdate @click="GetAccountInfo()">Edit Account</b-btn>
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
                                    <input type="email" class="form-control" id="updateemail" aria-describedby="emailHelp" placeholder="Username" v-bind:value="clickedEmail">
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="updatepassword" placeholder="Password">
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputAuthority" class="mb-2">Authority</label>
                                    <b-form-select id="updatetype" v-model="selected" :options="SelectType">
                                    </b-form-select>
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
                  <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary" @click="DeleteAccount()">Delete Account</button>
                  <i class="mdi mdi-account-search ml-5"></i>
                  <input data-v-a65342b6="" id="SearchAccount" type="text" placeholder="Search" class="col-4 mr-2 form-control">
                  <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary mr-5" @click="SelectAccountSearch()">Search</button>
                </div>
                <div data-v-19c9d02c="" class="card-body">
                  <div>
                    <b-table id="accountListTable" stripped hover :items="accountLists" :fields="accountFields" :per-page="perPage_account" :current-page="currentPage_account" @row-clicked="onRowClicked">
                      <template slot="position" slot-scope="row">
                        <div v-if="row.value === 0">Admin
                        </div>
                        <div v-else-if="row.value === 1">User
                        </div>
                      </template>
                    </b-table>
                  </div>
                  <div class="col-6 grid-margin" style="margin-left:30%;">
                    <div class="card">
                      <div class="card-body">
                        <b-pagination :total-rows="accountRows" v-model="currentPage_account" :per-page="perPage_account" aira-controls="accountListTable">
                        </b-pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Issue">
                <div class="row mb-5">
                  <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary ml-4" value="0" @click="ChangeIssueType">All</button>
                  <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary" value="1" @click="ChangeIssueType">Waiting</button>
                  <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary" value="2" @click="ChangeIssueType">In progress</button>
                  <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary" value="3" @click="ChangeIssueType">Resolved</button>
                  <i class="mdi mdi-account-search ml-5"></i>
                  <input data-v-a65342b6="" id="SearchIssue" type="text" placeholder="Search" class="col-4 mr-2 form-control" @keyup.enter="SelectIssueSearch()">
                  <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary mr-5" @click="SelectIssueSearch()">Search</button>
                </div>
                <div class="table-responsive" style="cursor:pointer">
                  <b-table id="createdIssueTable" stripped hover :items="issueLists" :fields="fields" :per-page="perPage_created" :current-page="currentPage_created" @row-clicked="clickList()">
                    <template slot="priority" slot-scope="row">
  <div v-if="row.value === 0">
    <b-badge variant="primary">Lowest</b-badge>
  </div>
  <div v-else-if="row.value === 1">
    <b-badge variant="warning">Middle</b-badge>
  </div>
  <div v-else-if="row.value === 2">
    <b-badge variant="danger">Highest</b-badge>
  </div>
</template>
                    <template slot="status" slot-scope="row">
  <div v-if="row.value === 0">
    <b-badge variant="outline-danger">Waiting</b-badge>
  </div>
  <div v-else-if="row.value === 1">
    <b-badge variant="outline-warning">In Progress</b-badge>
  </div>
  <div v-else-if="row.value === 2">
    <b-badge variant="outline-success">Resolved</b-badge>
  </div>
</template>
                    <template slot="type" slot-scope="row">
  <div v-if="row.value === 0">Resource</div>
  <div v-else-if="row.value === 1">Contents</div>
</template>
                  </b-table>
                </div>
                <div class="col-6 grid-margin" style="margin-left:30%;">
                  <div class="card">
                    <div class="card-body">
                      <b-pagination :total-rows="issueRows" v-model="currentPage_created" :per-page="perPage_created" aira-controls="createdIssueTable">
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
                  <div class="table-responsive">
                    <b-table id="resourceTable" stripped hover :items="resourceLists" :fields="resourceFields" :per-page="perPage_resource" :current-page="currentPage_resource">
                      <!-- <template slot="status" slot-scope="row">
                        <div v-if="row.value === 0">
                          <b-badge variant="outline-danger">Waiting</b-badge>
                        </div>
                        <div v-else-if="row.value === 1">
                          <b-badge variant="outline-warning">In Progress</b-badge>
                        </div>
                        <div v-else-if="row.value === 2">
                          <b-badge variant="outline-success">Resolved</b-badge>
                        </div>
                      </template> -->
                    </b-table>
                  </div>
                  <div class="col-6 grid-margin" style="margin-left:30%;">
                    <div class="card">
                      <div class="card-body">
                        <b-pagination :total-rows="resourceRows" v-model="currentPage_resource" :per-page="perPage_resource" aira-controls="resourceTable">
                        </b-pagination>
                      </div>
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
    computed: {
      accountRows () {
        return this.accountLists.length
      },
      issueRows () {
        return this.issueLists.length
      },
      resourceRows () {
        return this.resourceLists.length
      }
    },
    data () {
      return {
        selected: null,
        text: null,
        file: null,
        perPage_account: 3,
        currentPage_account: 1,
        perPage_created: 2,
        currentPage_created: 1,
        perPage_assigned: 2,
        currentPage_assigned: 1,
        perPage_resource: 2,
        currentPage_resource: 1,
        fields: [
          'subject', 'version', 'priority', 'deadline', 'type', 'status'
          // 'id', 'first_name', 'last_name'
        ],
        accountFields: [
          'accountid', 'email', 'position'
        ],
        resourceFields: [
          'Original', 'Translation'
        ],
        SelectType: [
          { value: '0', text: 'Admin' },
          { value: '1', text: 'User' }
        ],
        accountListAll: [],
        accountLists: [],
        resourceLists: [],
        issueLists: [],
        issueListAll: [],
        isFileSelected: false,
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
        changedMonthLog: [],
        clickedIndex: 0,
        clickedEmail: null,
        clickedPosition: 0
      }
    },
    created: function () {
      this.SelectAccount()
      this.SelectIssue()
    },
    methods: {
      onRowClicked (item, index, event) {
        this.clickedIndex = item.accountid
        this.clickedEmail = item.email
        this.clickedPosition = item.position
      },
      clickList () {
        window.open("http://localhost:8080/ClickIssueDetail", "_self")
      },
      SelectIssue () {
        // var accountid = document.getElementById('1').valu
        axios.post('http://192.168.1.26:1337/issue/select_issue',
                   {'accountid': '1'})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            this.issueListAll = JSON.parse(JSON.stringify(response.data.data_creat))
            // this.issueArray = JSON.stringify(response.data.data)
            console.log(this.issueListAll)
            // var idx = 0
            for (var issueNum in this.issueListAll){
              this.issueListAll[issueNum].version = this.issueListAll[issueNum].majorver + '.' + this.issueListAll[issueNum].minorver
              this.issueLists.push(this.issueListAll[issueNum])
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      SelectIssueSearch () {
        var issueNum = 0
        // var accountid = document.getElementById('1').valu
        axios.post('http://192.168.1.26:1337/issue/select_issue',
                   {'accountid': '1'})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            this.issueListAll = JSON.parse(JSON.stringify(response.data.data_creat))
            // this.issueArray = JSON.stringify(response.data.data)
            var SearchIssue = document.getElementById("SearchIssue").value
            // var idx = 0
            this.issueLists.splice(0)
            for (issueNum in this.issueListAll){
              if (SearchIssue === this.issueListAll[issueNum].subject){
                this.issueListAll[issueNum].version = this.issueListAll[issueNum].majorver + '.' + this.issueListAll[issueNum].minorver
                this.issueLists.push(this.issueListAll[issueNum])
              }
            }
            if (this.issueLists.length === 0){
              alert("검색 결과가 없습니다.")
              for (issueNum in this.issueListAll){
                this.issueListAll[issueNum].version = this.issueListAll[issueNum].majorver + '.' + this.issueListAll[issueNum].minorver
                this.issueLists.push(this.issueListAll[issueNum])
              }
              document.getElementById("SearchIssue").value = ""
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      ChangeIssueType (index) {
        this.issueLists.splice(0)
        var issueNum = 0
        if (index.target.value === "0"){
          for (issueNum in this.issueListAll){
            this.issueLists.push(this.issueListAll[issueNum])
          }
        } else if (index.target.value === "1") {
          for (issueNum in this.issueListAll){
            if (this.issueListAll[issueNum].status === 0){
              this.issueLists.push(this.issueListAll[issueNum])
            }
          }
        } else if (index.target.value === "2") {
          for (issueNum in this.issueListAll){
            if ((this.issueListAll[issueNum]).status === 1){
              this.issueLists.push(this.issueListAll[issueNum])
            }
          }
        } else if (index.target.value === "3") {
          for (issueNum in this.issueListAll){
            if (this.issueListAll[issueNum].status === 2){
              this.issueLists.push(this.issueListAll[issueNum])
            }
          }
        }
      },
      SelectAccount () {
        axios.post('http://192.168.1.26:1337/account/select_account',
                   {'request': 'SelectPName'})
          .then(response => {
            this.accountListAll = JSON.parse(JSON.stringify(response.data.data))
            console.log(this.accountListAll)
            for (var AccNum in this.accountListAll){
              this.accountLists.push(this.accountListAll[AccNum])
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      SelectAccountSearch () {
        this.accountLists.splice(0)
        axios.post('http://192.168.1.26:1337/account/select_account',
                   {'request': 'SelectPName'})
          .then(response => {
            var SelectAccount = document.getElementById("SearchAccount").value
            var AccNum
            // var target = JSON.parse(JSON.stringify(response.data.data))
            var target = response.data
            for (AccNum in this.accountListAll){
              if (SelectAccount === target.data[AccNum].email){
                this.accountLists.push(target.data[AccNum])
              }
            }
            if (this.accountLists.length === 0){
              alert("검색 결과가 없습니다.")
              for (AccNum in this.accountListAll){
                this.accountLists.push(this.accountListAll[AccNum])
              }
              document.getElementById("SearchAccount").value = ""
            }
            console.log(this.accountLists)
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      GetAccountInfo () {
        this.selected = this.clickedPosition
      },
      UpdateAccount () {
        var email = document.getElementById('updateemail').value
        var pw = document.getElementById('updatepassword').value
        var position = document.getElementById('updatetype')
        var pdata = position.options[position.selectedIndex].value
        var resultData = null
        console.log(pdata)
        axios.post('http://192.168.1.26:1337/account/update_account',
                   {'accountid': this.clickedIndex, 'email': email, 'password': pw, 'position': pdata})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            console.log(JSON.stringify(response.data))
            resultData = JSON.parse(JSON.stringify(response.data))
            if (resultData.resultCode === 0){
              alert("계정이 생성되었습니다.")
              this.$router.go(this.$router.currentRoute)
            }
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
        var resultData = null
        console.log(pdata)
        axios.post('http://192.168.1.26:1337/account/create_account',
                   {'email': email, 'password': pw, 'position': pdata})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            console.log(JSON.stringify(response.data))
            resultData = JSON.parse(JSON.stringify(response.data))
            if (resultData.resultCode === 0){
              alert("계정이 생성되었습니다.")
              this.$router.go(this.$router.currentRoute)
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      DeleteAccount () {
        var resultData = null
        axios.post('http://192.168.1.26:1337/account/delete_account',
                   {'accountid': this.clickedIndex})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            resultData = JSON.parse(JSON.stringify(response.data))
            if (resultData.resultCode === 0){
              alert("계정이 삭제되었습니다.")
              this.$router.go(this.$router.currentRoute)
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
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
</script>

<style scoped lang="scss">
.tabs {
}
</style>
