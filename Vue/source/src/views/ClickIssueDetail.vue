<template lang="html">
  <section class="tabs">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-tabs>
              <b-tab title="Issue Detail" active>
                <form class="forms-sample">
                  <div class="row">
                    <div class="col-md-8 grid-margin">
                      <b-form-group label="Issue Name" label-for="input1">
                        <b-form-input type="text" id="input1" placeholder="Issue Name" v-model="selectedSubject"></b-form-input>
                      </b-form-group>
                      <div class="mb-3">
                        <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary">Start Issue</button>
                        <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary">Resolved Issue</button>
                        <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary">ExportBtn</button>
                        <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary">Delete Issue</button>
                      </div>
                      <b-form-group label="Description" label-for="input3">
                        <b-form-textarea id="input3" v-model="selectedDescription" placeholder="Description" :rows="10" :max-rows="20" style="height: 340px"></b-form-textarea>
                      </b-form-group>
                      <div class="row">
                        <input data-v-186e931c="" id="input1" type="text" placeholder="Comment" class="form-control col-9 mr-4 ml-2">
                        <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary col-2">Send</button>
                      </div>
                    </div>
                    <div class="col-md-4 grid-margin">
                      <b-form-group horizontal label="Project">
                        <b-form-select v-model="selectedProject">
                          <option v-for="p in projectcombo" :key="p.projectid" v-bind:value="p.projectid">{{p.projectname}}</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group horizontal label="Issue Type">
                        <b-form-select v-model="selectedType" :options="IssueType" placeholder="Select IssueType" />
                      </b-form-group>
                      <b-form-group horizontal label="Assignee">
                        <b-form-select v-model="selectedAccount">
                          <option v-for="p in getAccount" :key="p.accountid" v-bind:value="p.accountid">{{p.email}}</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group horizontal label="Priority">
                        <b-form-select v-model="selectedPriority" :options="Priority" placeholder="Select Priority" />
                      </b-form-group>
                      <b-form-group horizontal label="Version">
                        <b-form-select v-model="selectedVersion">
                          <option v-for="p in getVersion" :key="p.versionid" v-bind:value="p.versionid">{{p.majorver+'.'+p.minorver}}</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group horizontal label="Language">
                        <b-form-select v-model="selectedLanguage" :options="Language" placeholder="Select Language" />
                      </b-form-group>
                      <b-form-group label="Attachment" label-for="input2">
                        <b-form-file class="Attachment" v-model="file" id="inpu2" :state="Boolean(file)" placeholder="Choose a file....." @change="processFile($event)"></b-form-file>
                      </b-form-group>
                      <b-form-group horizontal label="Reference">
                        <b-form-select v-model="selectedReference">
                          <option v-for="p in getAccount" :key="p.accountid" v-bind:value="p.accountid">{{p.email}}</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group horizontal label="Link">
                        <input data-v-7ea22626="" data-v-a65342b6="" id="input1" type="text" placeholder="URL.." class="form-control">
                      </b-form-group>
                      <b-form-group horizontal label="Deadline">
                        <datepicker id="datepicker" placeholder="Select Date" class="form-control"></datepicker>
                      </b-form-group>
                      <b-button type="submit" variant="success" class="mr-2" v-on:click="OpenTab()">Update</b-button>
                      <b-button variant="light" @click="ReturnToIssueTable()">Cancel</b-button>
                    </div>
                  </div>
                </form>
              </b-tab>
              <b-tab title="Resource Tab">
                <div data-v-19c9d02c="" class="card-body">
                  <h5 data-v-19c9d02c="" class="card-title mb-4">Resource Edit</h5>
                  <div class="table-responsive">
                    <b-table id="resourceTable" stripped hover :items="resourceLists" :fields="resourceFields" :per-page="perPage_resource" :current-page="currentPage_resource" @row-clicked="clickList()">
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
                  <div class="col-6 grid-margin" style="margin-left:550px; margin-top:50px;">
                    <div class="card">
                      <div class="card-body">
                        <b-pagination :total-rows="rows" v-model="currentPage_resource" :per-page="perPage_resource" @change="processFile($event)" aira-controls="resourceTable">
                        </b-pagination>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row" style="margin-left: 150px;">
                  <i class="mdi mdi-account-search"></i>
                  <input data-v-a65342b6="" id="input1" type="text" placeholder="Search" class="col-4 mr-2 form-control">
                  <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary mr-5">Search</button>
                  <button data-v-186e931c="" type="submit" class="btn mr-3 btn-success">Save</button>
                  <button data-v-186e931c="" type="button" class="btn btn-light" @click="ReturnToIssueTable()">Cancel</button>
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
        selectedSubject: null,
        selectedDescription: null,
        isFileSelected: false,
        selectedProject: null,
        selectedType: null,
        selectedAccount: null,
        selectedPriority: null,
        selectedVersion: null,
        selectedLanguage: null,
        selectedReference: null,
        text: null,
        currentPage: 1,
        perPage_resource: 2,
        currentPage_resource: 1,
        getVersion: {},
        getAccount: {},
        projectcombo: {},
        resourceLists: [],
        resourceFields: [
          'Original', 'Translation'
        ],
        IssueType: [
          { value: 'a', text: 'Bug' },
          { value: 'b', text: 'Web' },
          { value: 'c', text: 'App' }
        ],
        Priority: [
          { value: '0', text: 'Lowest' },
          { value: '1', text: 'Middle' },
          { value: '2', text: 'Highest' }
        ],
        Version: [
          { value: '2.0', text: '2.0' },
          { value: '2.1', text: '2.1' }
        ],
        Language: [
          { value: '0', text: 'English' },
          { value: '1', text: 'Korean' }
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
      this.SelectProject()
      this.SelectAccount()
      this.SelectVersion()
      var listItems = JSON.parse(localStorage.getItem('clickedListItem'))
      for (var item in listItems) {
        console.log(item + '\n')
      }
      console.log(listItems.type + ' ' + listItems.assignor)
      this.selectedSubject = listItems.subject
      this.selectedDescription = listItems.description
      this.selectedProject = listItems.projectid
      this.selectedType = listItems.type
      this.selectedAccount = listItems.assignor
      this.selectedPriority = listItems.priority
      this.selectedVersion = listItems.version
      // this.selectedLanguage = listItems.language
      // this.selectedReference = listItems
    },
    computed: {
      rows () {
        return this.resourceLists.length
      }
    },
    methods: {
      ReturnToIssueTable () {
        let routeData = this.$router.resolve({name: 'issueList'})
        window.open(routeData.href, "_self")
      },
      SelectVersion () {
        axios.post('http://192.168.1.26:1337/projectver/select_projectver',
                   {'reqeust': 'SelectVersion'})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            console.log(JSON.stringify(response.data))
            this.getVersion = JSON.parse(JSON.stringify(response.data.data))
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
            this.getAccount = JSON.parse(JSON.stringify(response.data.data))
            console.log(this.getAccount)
            // this.pageArray = JSON.parse(JSON.stringify(response.data.data))
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      SelectProject () {
        axios.post('http://192.168.1.26:1337/project/select_project',
                   {'request': 'SelectPName'})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            // alert(JSON.stringify(response.data.data))
            this.projectcombo = JSON.parse(JSON.stringify(response.data.data))
            console.log(this.projectcombo)
          })
          .catch(e => {
            console.log('error : ', e)
          })
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
