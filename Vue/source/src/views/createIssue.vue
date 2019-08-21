<template lang="html">
  <section class="tabs">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-tabs class="autoTab">
              <b-tab title="Create Issue" active>
                <form class="forms-sample">
                  <div class="row">
                    <div class="col-md-8 grid-margin">
                      <b-form-group label="Summary" label-for="input1">
                        <b-form-input type="text" id="input1" placeholder="Summary" v-model="issueSubject"></b-form-input>
                      </b-form-group>
                      <b-form-group label="Description" label-for="input3">
                        <b-form-textarea id="input3" v-model="issueDescription" placeholder="Description" :rows="10" :max-rows="20" style="height: 490px"></b-form-textarea>
                      </b-form-group>
                    </div>
                    <div class="col-md-4 grid-margin">
                      <b-form-group horizontal label="* Project" id="Project">
                        <b-form-select v-model="selectedProject" @change="SelectVersion()">
                          <option v-for="p in projectcombo" :key="p.projectid" v-bind:value="p.projectid">{{p.projectname}}</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group horizontal label="Issue Type">
                        <b-form-select v-model="selectedType" :options="IssueType" placeholder="Select IssueType" />
                      </b-form-group>
                      <b-form-group horizontal label="Assignee">
                        <b-form-select v-model="selectedAssignor">
                          <option v-for="p in getAccount" :key="p.accountid" v-bind:value="p.accountid">{{p.email}}</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group horizontal label="Priority">
                        <b-form-select v-model="selectedPriority" :options="Priority" placeholder="Select Priority" />
                      </b-form-group>
                      <b-form-group horizontal label="* Version" id="Version">
                        <b-form-select v-model="selectedVersion" @change="SelectLanguage()">
                          <option v-for="(p, i) in getVersion" :key="i" v-bind:value="p.majorver+'.'+p.minorver">{{p.majorver+'.'+p.minorver}}</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group horizontal label="* Resource Type" id="ResourceType">
                        <b-form-select v-model="selectedResourceType" :options="ResourceType" placeholder="Select Resource Type" />
                      </b-form-group>
                      <b-form-group horizontal label="* Language" id="Language">
                        <b-form-select v-model="selectedLanguage">
                          <option v-for="p in getLanguage" :key="p.language" v-bind:value="p.language">{{p.language}}</option>
                        </b-form-select>
                      </b-form-group>
                      <!-- <b-form-group label="Attachment" label-for="input2">
                      <b-form-file class="Attachment" v-model="file" id="inpu2" :state="Boolean(file)" placeholder="Choose a file....." @change="processFile($event)"></b-form-file>
                    </b-form-group> -->
                      <b-form-group horizontal label="Reference">
                        <!-- <b-form-select v-model="selectedReference">
                          <option v-for="p in getAccount" :key="p.accountid" v-bind:value="p.accountid">{{p.email}}</option>
                        </b-form-select> -->
                        <multiselect v-model="selectedReference" :options="getAccount" :multiple="true" placeholder="Type to search" track-by="email" label="email"><span slot="noResult">Oops! No elements found. Consider changing the search query.</span></multiselect>
                      </b-form-group>
                      <b-form-group horizontal label="Link">
                        <input data-v-7ea22626="" data-v-a65342b6="" id="input1" v-model="selectedLink" type="text" placeholder="URL.." class="form-control">
                      </b-form-group>
                      <b-form-group horizontal label="Deadline">
                        <datepicker id="datepicker" v-model="selectedDeadline" placeholder="Select Date" class="form-control" format="yyyy-MM-dd"></datepicker>
                      </b-form-group>
                      <b-button type="button" variant="success" class="mr-2" v-on:click="CreateIssue()" style="margin-left: 31%">Create</b-button>
                      <b-button variant="light" class="mr-2">Cancel</b-button>
                      <b-button class="btn-fw btn-inverse-primary" @click="processFile()">Preview</b-button>
                    </div>
                  </div>
                </form>
              </b-tab>
              <b-tab v-if="isFileSelected" title="Resource Tab">
                <div data-v-19c9d02c="" class="card-body">
                  <h5 data-v-19c9d02c="" class="card-title mb-4">Resource Edit</h5>
                  <div data-v-19c9d02c="" class="card-body">
                    <h5 data-v-19c9d02c="" class="card-title mb-4">Resource Edit</h5>
                    <div class="table-responsive">
                      <b-table id="resourceTable" stripped hover :items="resourceLists" :fields="resourceFields" :per-page="perPage_resource" :current-page="currentPage_resource" @row-clicked="clickList()">
                      </b-table>
                    </div>
                    <div class="col-6 grid-margin" style="margin-left:550px; margin-top:50px;">
                      <div class="card">
                        <div class="card-body">
                          <b-pagination :total-rows="rows" v-model="currentPage_resource" :per-page="perPage_resource" aira-controls="resourceTable">
                          </b-pagination>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="row" style="margin-left:350px;">
                    <i class="mdi mdi-account-search"></i>
                    <input data-v-a65342b6="" id="input1" type="text" placeholder="Search" class="col-4 mr-2 form-control">
                    <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary mr-5">Search</button>
                    <button data-v-186e931c="" type="submit" class="btn mr-3 btn-success">Succes</button>
                    <button data-v-186e931c="" type="button" class="btn btn-light">Cancel</button>
                  </div> -->
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script lang="js">
  import Datepicker from 'vuejs-datepicker'
  import * as lang from "vuejs-datepicker/src/locale"
  import axios from 'axios'
  import commonVariable from '../javascript/common.js'
  import Multiselect from 'vue-multiselect'

  const state = {
    date1: new Date()
  }
  export default {
    name: 'tabs',
    components: {
      Datepicker,
      Multiselect
    },
    computed: {
      rows () {
        return this.resourceLists.length
      }
    },
    data () {
      return {
        value: [],
        options: [
          {
            language: 'Javascript',
            libs: [
              { name: 'Vue.js', category: 'Front-end' },
              { name: 'Adonis', category: 'Backend' }
            ]
          }
        ],
        Priority: [
          { value: '0', text: 'Lowest' },
          { value: '1', text: 'Middle' },
          { value: '2', text: 'Highest' }
        ],
        IssueType: [
          { value: '0', text: 'Resource' }
          // ,
          // { value: '1', text: 'Contents' }
        ],
        ResourceType: [
          { value: 'app', text: 'app' },
          { value: 'web', text: 'Web' }
        ],
        resourceFields: [
          'original'
        ],
        issueSubject: null,
        issueDescription: null,
        selectedResourceType: null,
        selectedProject: null,
        selectedType: null,
        selectedAssignor: null,
        selectedPriority: null,
        selectedVersion: null,
        selectedLanguage: null,
        selectedReference: [],
        selectedLink: null,
        selectedDeadline: null,
        text: null,
        resourceLists: [],
        getVersion: {},
        getLanguage: {},
        getAccount: [],
        projectcombo: {},
        file: null,
        isFileSelected: false,
        perPage_resource: 50,
        currentPage_resource: 1,
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
    },
    methods: {
      // ShowSelectedReference () {
      //   console.log(this.selectedReference)
      // },
      SelectResourceData () {
        var selectedVersion = this.selectedVersion.split('.')
        var request = {'projectid': this.selectedProject, 'majorver': selectedVersion[0], 'minorver': selectedVersion[1], 'type': this.selectedResourceType, 'language': this.selectedLanguage}
        console.log(request)
        axios.post(commonVariable.ipAddress + 'translate/select_data', request)
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            console.log('SelectResourceData')
            console.log(JSON.stringify(response.data))
            this.resourceLists = JSON.parse(JSON.stringify(response.data.data))
            if (this.selectedResourceType === 'web'){
              for (var num in this.resourceLists) {
                this.resourceLists[num].original = this.resourceLists[num].translation
                this.resourceLists[num].translation = ""
              }
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      SelectVersion () {
        axios.post(commonVariable.ipAddress + 'projectver/select_projectver',
                   {'projectid': this.selectedProject})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            console.log(JSON.stringify(response.data))
            this.getVersion = JSON.parse(JSON.stringify(response.data.data))
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      SelectLanguage () {
        var selectedVersion = this.selectedVersion.split('.')
        axios.post(commonVariable.ipAddress + 'projectlang/select_projectlang',
                   {'projectid': this.selectedProject, 'majorver': selectedVersion[0], 'minorver': selectedVersion[1]})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            console.log(JSON.stringify(response.data))
            this.getLanguage = JSON.parse(JSON.stringify(response.data.data))
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      SelectAccount () {
        axios.post(commonVariable.ipAddress + 'account/select_account',
                   {'request': 'SelectPName'})
          .then(response => {
            // this.pageArray = JSON.stringify(response.data.data)
            this.getAccount = JSON.parse(JSON.stringify(response.data.data))
            this.options = JSON.parse(JSON.stringify(response.data.data))
            console.log(this.getAccount)
            // this.pageArray = JSON.parse(JSON.stringify(response.data.data))
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      SelectProject () {
        axios.post(commonVariable.ipAddress + 'project/select_project',
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
      CreateIssue () {
        var selectedVersion = this.selectedVersion.split('.')
        var accountid = localStorage.getItem('accountid')
        var responseFromServer = null
        // console.log(this.selectedDeadline)
        this.selectedDeadline = document.getElementById('datepicker').value
        // selectedReference도 추가되어야 함.
        if (accountid === null || this.issueSubject === null || this.selectedAssignor === null || this.selectedPriority === null || this.selectedType === null || selectedVersion[0] === null || selectedVersion[1] === null || this.selectedResourceType === null || this.selectedLink === null || this.selectedDeadline === null) {
          alert("항목을 모두 선택해주세요.")
          return
        }
        var request = {'email': accountid, 'subject': this.issueSubject, 'assignor': this.selectedAssignor, 'projectid': this.selectedProject, 'type': this.selectedType, 'majorver': selectedVersion[0], 'minorver': selectedVersion[1], 'resourcetype': this.selectedResourceType, 'link': this.selectedLink, 'description': this.issueDescription, 'priority': this.selectedPriority, 'accountid': accountid, 'deadline': this.selectedDeadline, 'language': this.selectedLanguage}
        axios.post(commonVariable.ipAddress + 'issue/create_issue', request)
          .then(response => {
            responseFromServer = response.data
            if (responseFromServer.resultCode === 0) {
              alert("Issue가 등록되었습니다.")
              let routeData = this.$router.resolve({name: 'issueList'})
              window.open(routeData.href, "_self")
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      processFile (event) {
        if (this.selectedProject === null || this.selectedVersion === null || this.selectedResourceType === null || this.selectedLanguage === null){
          alert("* 표시된 필수입력 항목을 체크하세요.")
          document.getElementById('Project').style.color = "red"
          document.getElementById('Version').style.color = "red"
          document.getElementById('ResourceType').style.color = "red"
          document.getElementById('Language').style.color = "red"
        } else {
          this.isFileSelected = true
          alert("Resouce Tab에 리소스가 로드되었습니다.")
          document.getElementById('Project').style.color = "black"
          document.getElementById('Version').style.color = "black"
          document.getElementById('ResourceType').style.color = "black"
          document.getElementById('Language').style.color = "black"
          this.SelectResourceData()
        }
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
    $($(".autoTab").find("li")[1]).hide()
    // $('#datepicker').css({'border': '1px solid white;', 'top': '-282px'})
    $('datepicker').css({'border': '1px solid white'})
    $('.vdp-datepicker__calendar').css({'top': '-282px'})
  })

</script>

<style scoped lang="scss">
.tabs {
}
</style>
