<template lang="html">
  <section class="tabs">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-tabs>
              <b-tab title="Created Issue" active>
                <div data-v-19c9d02c="" class="card-body">
                  <div class="row mb-5">
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">All</button>
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">Waiting</button>
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">In Progress</button>
                    <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary">Resolved</button>
                    <i class="mdi mdi-account-search"></i>
                    <input data-v-a65342b6="" id="input1" type="text" placeholder="Search" class="col-2 mr-2 form-control">
                    <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary">Search</button>
                  </div>
                  <div class="table-responsive">
                    <b-table id="createdIssueTable" stripped hover :items="issueLists" :fields="fields" :per-page="perPage_created" :current-page="currentPage_created" @row-clicked="clickList()">
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
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">All</button>
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">Waiting</button>
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">In Progress</button>
                    <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary">Resolved</button>
                    <i class="mdi mdi-account-search"></i>
                    <input data-v-a65342b6="" id="input1" type="text" placeholder="Search" class="col-2 mr-2 form-control">
                    <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary">Search</button>
                  </div>
                  <div class="table-responsive">
                    <b-table id="assignedIssueTable" stripped hover :items="issueLists" :fields="fields" :per-page="perPage_assigned" :current-page="currentPage_assigned">
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
        file: null,
        perPage_created: 2,
        currentPage_created: 1,
        perPage_assigned: 2,
        currentPage_assigned: 1,
        fields: [
          'subject', 'version', 'priority', 'deadline', 'type', 'status'
          // 'id', 'first_name', 'last_name'
        ],
        issueLists: [],
        items: [
          { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        ],
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
      this.SelectIssue()
    },
    computed: {
      rows () {
        return this.items.length
      }
    },
    methods: {
      SelectIssue () {
        // var accountid = document.getElementById('1').valu
        axios.post('http://192.168.1.26:1337/issue/select_issue',
          {'accountid': '1'})
          .then(response => {
          // this.toDoItems = response.data.map(r => r.data)
            this.issueLists = JSON.parse(JSON.stringify(response.data.data_creat))
            // this.issueArray = JSON.stringify(response.data.data)
            console.log(this.issueLists)
            
            var idx = 0
            for (var issueList in this.issueLists){
              console.log(issueList)
              this.issueLists[idx].version = this.issueLists[idx].majorver + '.' + this.issueLists[idx++].minorver
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      clickList () {
        window.open("http://localhost:8080/ClickIssueDetail", "_self")
      },
      processFile (event) {
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
