<template lang="html">
  <section class="tabs">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-tabs>
              <b-tab title="Created Issue" v-if="CheckAdmin === true" active>
                <div data-v-19c9d02c="" class="card-body">
                  <div class="row mb-5">
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary" value="0" @click="ChangeIssueType">All</button>
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary" value="1" @click="ChangeIssueType">Waiting</button>
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary" value="2" @click="ChangeIssueType">In Progress</button>
                    <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary" value="3" @click="ChangeIssueType">Resolved</button>
                    <i class="mdi mdi-account-search"></i>
                    <input data-v-a65342b6="" id="SearchIssue" type="text" placeholder="Search" class="col-2 mr-2 form-control" @keyup.enter="SelectIssueSearch()">
                    <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary" @click="SelectIssueSearch()">Search</button>
                  </div>
                  <div class="table-responsive" >
                    <b-table id="createdIssueTable" stripped hover :items="issueLists" :fields="fields" :per-page="perPage_created" :current-page="currentPage_created" @row-clicked="onRowClicked" style="cursor:pointer">
                      <template slot="priority" slot-scope="row">
                        <div v-if="row.value === 0">
                          <b-badge variant="primary" >Lowest</b-badge>
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
                        <b-pagination :total-rows="rows" v-model="currentPage_created" :per-page="perPage_created" @change="processFile($event)" aira-controls="createdIssueTable">
                        </b-pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Assigned Issue">
                <div data-v-19c9d02c="" class="card-body">
                  <div class="row mb-5">
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary" value="0" @click="ChangeIssueType">All</button>
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary" value="1" @click="ChangeIssueType">Waiting</button>
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary" value="2" @click="ChangeIssueType">In Progress</button>
                    <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary" value="3" @click="ChangeIssueType">Resolved</button>
                    <i class="mdi mdi-account-search"></i>
                    <input data-v-a65342b6="" id="SearchAssignedIssue" type="text" placeholder="Search" class="col-2 mr-2 form-control" @keyup.enter="SelectAssignedIssueSearch()">
                    <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary" @click="SelectAssignedIssueSearch()">Search</button>
                  </div>
                  <div class="table-responsive">
                    <b-table id="assignedIssueTable" stripped hover :items="issueLists" :fields="fields" :per-page="perPage_assigned" :current-page="currentPage_assigned" style="cursor:pointer" @row-clicked="onRowClicked">
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
                        <b-pagination :total-rows="rows" v-model="currentPage_assigned" :per-page="perPage_assigned" @change="processFile($event)" aira-controls="assignedIssueTable">
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
  import axios from 'axios'
  export default {
    name: 'tabs',
    data () {
      return {
        CheckAdmin: false,
        file: null,
        perPage_created: 100,
        currentPage_created: 1,
        perPage_assigned: 2,
        currentPage_assigned: 1,
        fields: [
          'subject', 'version', 'priority', 'deadline', 'type', 'status'
          // 'id', 'first_name', 'last_name'
        ],
        issueLists: [],
        issueListAll: [],
        clickedIssue: []
      }
    },
    created: function () {
      this.SelectIssue()
      this.GetAccountData()
    },
    computed: {
      rows () {
        return this.issueLists.length
      }
    },
    methods: {
      GetAccountData () {
        if (localStorage.getItem('email') === "admin"){
          this.CheckAdmin = true
        }
        localStorage.setItem("checkAdmin", this.CheckAdmin)
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
      SelectAssignedIssueSearch () {
        var issueNum = 0
        // var accountid = document.getElementById('1').valu
        axios.post('http://192.168.1.26:1337/issue/select_issue',
                   {'accountid': '1'})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            this.issueListAll = JSON.parse(JSON.stringify(response.data.data_creat))
            // this.issueArray = JSON.stringify(response.data.data)
            var SearchIssue = document.getElementById("SearchAssignedIssue").value
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
              document.getElementById("SearchAssignedIssue").value = ""
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      SelectIssue () {
        console.log('accountid ' + localStorage.getItem('accountid'))
        axios.post('http://192.168.1.26:1337/issue/select_issue',
                   {'accountid': '1'})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            this.issueListAll = JSON.parse(JSON.stringify(response.data.data_creat))
            // this.issueArray = JSON.stringify(response.data.data)
            console.log(this.issueListAll)
            for (var issueNum in this.issueListAll){
              this.issueListAll[issueNum].version = this.issueListAll[issueNum].majorver + '.' + this.issueListAll[issueNum].minorver
              this.issueLists.push(this.issueListAll[issueNum])
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
      onRowClicked (item, index, event) {
        this.clickedIssue = item
        localStorage.setItem('clickedListItem', JSON.stringify(this.clickedIssue))
        let routeData = this.$router.resolve({name: 'ClickIssueDetail'})
        window.open(routeData.href, "_self")
      },
      processFile (event) {
        this.scrollToTop()
      },
      scrollToTop () {
        window.scrollTo(0, 0)
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
  $(document).ready(function (){
    $('#datepicker').css({'border': '1px solid white'})
  })
</script>

<style scoped lang="scss">
.tabs {
}
</style>
