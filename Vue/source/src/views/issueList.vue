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
                    <input data-v-a65342b6="" id="SearchIssue" type="text" placeholder="Search" class="col-2 mr-2 form-control">
                    <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary" value="createdIssue" @click="SelectIssueSearch">Search</button>
                  </div>
                  <div class="table-responsive" >
                    <b-table id="createdIssueTable" stripped hover :items="createdIssueArray" :fields="fields" :per-page="perPage_created" :current-page="currentPage_created" @row-clicked="onRowClicked" style="cursor:pointer">
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
                        <b-pagination :total-rows="createdIssueRows" v-model="currentPage_created" :per-page="perPage_created" @change="processFile($event)" aira-controls="createdIssueTable">
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
                    <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary" value="assignedIssue" @click="SelectIssueSearch">Search</button>
                  </div>
                  <div class="table-responsive">
                    <b-table id="assignedIssueTable" stripped hover :items="assignedIssueArray" :fields="fields" :per-page="perPage_assigned" :current-page="currentPage_assigned" style="cursor:pointer" @row-clicked="onRowClicked">
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
                        <b-pagination :total-rows="assignedIssueRows" v-model="currentPage_assigned" :per-page="perPage_assigned" @change="processFile($event)" aira-controls="assignedIssueTable">
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
        clickedIssue: [],
        createdIssueArrayAll: {},
        createdIssueArray: [],
        assignedIssueArrayAll: {},
        assignedIssueArray: []
      }
    },
    created: function () {
      this.SelectIssue()
      this.GetAccountData()
    },
    computed: {
      createdIssueRows () {
        return this.createdIssueArray.length
      },
      assignedIssueRows () {
        return this.assignedIssueArray.length
      }
    },
    methods: {
      GetAccountData () {
        if (localStorage.getItem('email') === "admin"){
          this.CheckAdmin = true
        }
        localStorage.setItem("checkAdmin", this.CheckAdmin)
      },
      SelectIssueSearch (index) {
        var issueNum = 0
        var issueNumAssigne = 0
        if (index.target.value === "createdIssue") {
          this.createdIssueArray.splice(0)
          for (issueNum in this.createdIssueArrayAll){
            if (document.getElementById('SearchIssue').value === this.createdIssueArrayAll[issueNum].subject) {
              this.createdIssueArrayAll[issueNum].version = this.createdIssueArrayAll[issueNum].majorver + '.' + this.createdIssueArrayAll[issueNum].minorver
              this.createdIssueArray.push(this.createdIssueArrayAll[issueNum])
            }
          }
          if (this.createdIssueArray.length === 0) {
            alert("검색 결과가 없습니다")
            for (issueNum in this.createdIssueArrayAll){
              this.createdIssueArrayAll[issueNum].version = this.createdIssueArrayAll[issueNum].majorver + '.' + this.createdIssueArrayAll[issueNum].minorver
              this.createdIssueArray.push(this.createdIssueArrayAll[issueNum])
            }
          }
        } else if (index.target.value === "assignedIssue") {
          this.assignedIssueArray.splice(0)
          for (issueNumAssigne in this.assignedIssueArrayAll){
            if (document.getElementById('SearchAssignedIssue').value === this.assignedIssueArrayAll[issueNumAssigne].subject) {
              this.assignedIssueArrayAll[issueNumAssigne].version = this.assignedIssueArrayAll[issueNumAssigne].majorver + '.' + this.assignedIssueArrayAll[issueNumAssigne].minorver
              this.assignedIssueArray.push(this.assignedIssueArrayAll[issueNumAssigne])
            }
          }
          if (this.assignedIssueArray.length === 0) {
            alert("검색 결과가 없습니다")
            for (issueNumAssigne in this.assignedIssueArrayAll){
              this.assignedIssueArrayAll[issueNumAssigne].version = this.assignedIssueArrayAll[issueNumAssigne].majorver + '.' + this.assignedIssueArrayAll[issueNumAssigne].minorver
              this.assignedIssueArray.push(this.assignedIssueArrayAll[issueNumAssigne])
            }
          }
        }
      },
      SelectIssue () {
        var accountid = localStorage.getItem('accountid')
        console.log('accountid ' + localStorage.getItem('accountid'))
        axios.post('http://192.168.1.26:1337/issue/select_issue',
                   {'accountid': accountid})
          .then(response => {
            if (accountid === '1'){
              this.createdIssueArrayAll = JSON.parse(JSON.stringify(response.data.data_create))
              for (var issueNum in this.createdIssueArrayAll){
                this.createdIssueArrayAll[issueNum].version = this.createdIssueArrayAll[issueNum].majorver + '.' + this.createdIssueArrayAll[issueNum].minorver
                this.createdIssueArray.push(this.createdIssueArrayAll[issueNum])
              }
            }
            this.assignedIssueArrayAll = JSON.parse(JSON.stringify(response.data.data_assign))
            for (var issueNumAssigne in this.assignedIssueArrayAll){
              this.assignedIssueArrayAll[issueNumAssigne].version = this.assignedIssueArrayAll[issueNumAssigne].majorver + '.' + this.assignedIssueArrayAll[issueNumAssigne].minorver
              this.assignedIssueArray.push(this.assignedIssueArrayAll[issueNumAssigne])
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      ChangeIssueType (index) {
        var issueNum = 0
        this.createdIssueArray.splice(0)
        this.assignedIssueArray.splice(0)
        var statusType = parseInt(index.target.value, 10)
        for (issueNum in this.createdIssueArrayAll){
          if (statusType === 0) {
            this.createdIssueArray.push(this.createdIssueArrayAll[issueNum])
          } else if ((this.createdIssueArrayAll[issueNum]).status === statusType - 1){
            this.createdIssueArray.push(this.createdIssueArrayAll[issueNum])
          }
        }
        for (issueNum in this.assignedIssueArrayAll){
          if (statusType === 0) {
            this.assignedIssueArray.push(this.assignedIssueArrayAll[issueNum])
          } else if ((this.assignedIssueArrayAll[issueNum]).status === statusType - 1){
            this.assignedIssueArray.push(this.assignedIssueArrayAll[issueNum])
          }
        }
      },
      onRowClicked (item, index, event) {
        this.clickedIssue = item
        localStorage.setItem('clickedListItem', JSON.stringify(this.clickedIssue))
        let routeData = this.$router.resolve({name: 'clickIssueDetail'})
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
