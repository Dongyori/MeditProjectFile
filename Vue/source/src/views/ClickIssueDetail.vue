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
                        <button id="startIssueButton" v-bind:disabled="isStatusStarted" data-v-35f42b37="" type="button" class="btn btn-fw btn-secondary" v-bind:class="{'btn-inverse': isStatusStarted, 'btn-inverse-light': !isStatusStarted}" value='start' @click="ChangeStatus">{{startButtonText}}</button>
                        <button id="resolveIssueButton" v-bind:disabled="!isStatusStarted" data-v-35f42b37="" type="button" class="btn btn-fw btn-secondary"   v-bind:class="{'btn-inverse': !isStatusStarted, 'btn-inverse-light': isStatusStarted}" value='resolve' @click="ChangeStatus">Resolve Issue</button>
                        <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary" value='export' @click="ChangeStatus">ExportBtn</button>
                        <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary" value='delete' @click="ChangeStatus">Delete Issue</button>
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
                        <b-form-select v-model="selectedVersion" @change="SelectLanguage()">
                          <option v-for="(p, i) in getVersion" :key="i" v-bind:value="p.majorver+'.'+p.minorver">{{p.majorver+'.'+p.minorver}}</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group horizontal label="Resource Type" id="ResourceType">
                        <b-form-select v-model="selectedResourceType" :options="ResourceType" placeholder="Select Resource Type" />
                      </b-form-group>
                      <b-form-group horizontal label="Language">
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
                        <input data-v-7ea22626="" data-v-a65342b6="" id="input1" type="text" placeholder="URL.." class="form-control">
                      </b-form-group>
                      <b-form-group horizontal label="Deadline">
                        <datepicker v-model="selectedDeadline" id="datepicker" placeholder="Select Date" class="form-control" format="yyyy-MM-dd"></datepicker>
                      </b-form-group>
                      <b-button type="submit" variant="success" class="mr-2" v-on:click="UpdateIssue()">Update</b-button>
                      <b-button variant="light" @click="ReturnToIssueTable()">Cancel</b-button>
                    </div>
                  </div>
                </form>
              </b-tab>
              <b-tab title="Resource Tab">
                <div data-v-19c9d02c="" class="card-body">
                  <h5 data-v-19c9d02c="" class="card-title mb-4">Resource Edit</h5>
                  <div class="table-responsive">
                    <b-table ref="resourceTable" id="resourceTable" stripped hover fixed :items="resourceLists" :fields="resourceFields" :per-page="perPage_resource" :current-page="currentPage_resource">
                      <!-- <template slot="translation" slot-scope="row">
                        <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
                      </template> -->
                      <template slot="translation" slot-scope="data">
                        <b-form-textarea
                          id="textarea-rows"
                          rows="2"
                          style="min-width: 600px; max-width: 700px"
                          v-model="data.item.translation" @input="GetRowData(data.index, data.item)"/>
                      </template>
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
                  <button data-v-186e931c="" type="submit" class="btn mr-3 btn-success" @click="UpdateTranslatedData()">Save</button>
                  <!-- <button data-v-186e931c="" type="button" class="btn btn-light" @click="ReturnToIssueTable()">Cancel</button> -->
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
  import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js"
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
    data () {
      return {
        file: null,
        selectedIssueID: null,
        selectedSubject: null,
        selectedDescription: null,
        isFileSelected: false,
        selectedProject: null,
        selectedType: null,
        selectedAccount: null,
        selectedPriority: null,
        selectedVersion: null,
        selectedLanguage: null,
        selectedReference: [],
        selectedResourceType: null,
        selectedDeadline: null,
        selectedStatus: null,
        getLanguage: null,
        text: null,
        currentPage: 1,
        perPage_resource: 50,
        currentPage_resource: 1,
        isStatusStarted: true,
        startButtonText: 'Start Issue',
        getVersion: {},
        getAccount: [],
        projectcombo: {},
        resourceLists: [],
        requestData: [],
        resourceFields: [
          'original', 'translation'
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
        ResourceType: [
          { value: 'app', text: 'app' },
          { value: 'web', text: 'Web' }
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
        changedMonthLog: [],
        types: ['app', 'web']
      }
    },
    created: function () {
      var listItems = JSON.parse(localStorage.getItem('clickedListItem'))
      for (var item in listItems) {
        console.log(item + '\n')
      }
      console.log(listItems.type + ' ' + listItems.assignor)
      this.selectedIssueID = listItems.issueid
      this.selectedSubject = listItems.subject
      this.selectedDescription = listItems.description
      this.selectedProject = listItems.projectid
      this.selectedType = listItems.type
      this.selectedAccount = listItems.assignor
      this.selectedPriority = listItems.priority
      this.selectedVersion = listItems.version
      this.selectedLanguage = listItems.language
      this.selectedResourceType = listItems.resourcetype
      this.selectedStatus = listItems.status
      if (this.selectedStatus === 0) { // waiting, resolved 상태 // start버튼 활성화, resolve 버튼 비활성화
        this.isStatusStarted = false
        this.startButtonText = 'Start Issue'
      } else if (this.selectedStatus === 1) { // start 상태 // start버튼 비활성화, resolve 버튼 활성화
        this.isStatusStarted = true
        this.startButtonText = 'Start Issue'
      }
      if (this.selectedStatus === 2) {
        this.isStatusStarted = false
        this.startButtonText = 'ReOpen Issue'
      }
      // alert(this.selectedStatus + ' ' + this.isStatusStarted)
      console.log(this.selectedResourceType)
      if (listItems.deadline !== null) {
        var deadline = listItems.deadline.split('T')
        this.selectedDeadline = deadline[0]
        // document.getElementById('datepicker').value = deadline[0]
      }
      // this.selectedResourceType = listItems.resourcetype
      this.SelectProject()
      this.SelectAccount()
      this.SelectVersion()
      this.SelectLanguage()
      this.SelectResourceData()
      // this.selectedReference = listItems
    },
    computed: {
      rows () {
        return this.resourceLists.length
      }
    },
    methods: {
      UpdateIssue () {
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
        axios.post(commonVariable.ipAddress + 'issue/update_issue', request)
          .then(response => {
            responseFromServer = response.data
            if (responseFromServer.resultCode === 0) {
              alert("Issue가 변경되었습니다.")
              let routeData = this.$router.resolve({name: 'issueList'})
              window.open(routeData.href, "_self")
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      UpdateTranslatedData () {
        // alert("개발 중입니다.")
        var selectedVersion = this.selectedVersion.split('.')
        this.requestData.splice(0)
        var request = ""
        var item = 0
        if (this.selectedResourceType === 'web'){
          for (item in this.resourceLists) {
            this.requestData.push({transkey: this.resourceLists[item].transkey, translation: this.resourceLists[item].translation})
          }
          request = {'projectid': this.selectedProject, 'type': this.selectedResourceType, 'language': this.selectedLanguage, 'majorver': selectedVersion[0], 'minorver': selectedVersion[1], 'data': JSON.stringify(this.requestData)}
          console.log('UpdateTranslatedData ' + JSON.stringify(request))
          axios.post(commonVariable.ipAddress + 'translate/update_data', request)
            .then(response => {
              // this.toDoItems = response.data.map(r => r.data)
              console.log('UpdateTranslatedData')
              console.log(JSON.stringify(response.data))
              // this.resourceLists = JSON.parse(JSON.stringify(response.data.data))
            })
            .catch(e => {
              console.log('error : ', e)
            })
        } else if (this.selectedResourceType === 'app'){
          for (item in this.resourceLists) {
            this.requestData.push({translation: this.resourceLists[item].translation})
          }
          request = {'projectid': this.selectedProject, 'type': this.selectedResourceType, 'data': JSON.stringify(this.requestData)}
          console.log('UpdateTranslatedData ' + JSON.stringify(request))
          axios.post(commonVariable.ipAddress + 'translate/update_data', request)
            .then(response => {
              // this.toDoItems = response.data.map(r => r.data)
              console.log('UpdateTranslatedData')
              console.log(JSON.stringify(response.data))
              // this.resourceLists = JSON.parse(JSON.stringify(response.data.data))
            })
            .catch(e => {
              console.log('error : ', e)
            })
        }
      },
      GetRowData (index, item) {
        console.log(index + ' item ' + JSON.stringify(item))
        console.log(JSON.stringify(this.resourceLists[index]))
        // this.requestData.push({transid: this.resourceLists[index].transid, translation: this.resourceLists[index].translation})
      },
      MoveToIssueList () {
        let routeData = this.$router.resolve({name: 'issueList'})
        window.open(routeData.href, "_self")
      },
      ChangeStatus (index) {
        if (index.target.value === 'start' || index.target.value === 'resolve') {
          var connectServer = commonVariable.ipAddress + 'issue/' + index.target.value + '_issue'
          axios.post(connectServer, {'issueid': this.selectedIssueID})
            .then(response => {
              // this.toDoItems = response.data.map(r => r.data)
              console.log(JSON.stringify(response.data))
              this.MoveToIssueList()
            })
            .catch(e => {
              console.log('error : ', e)
            })
        }
      },
      // info(item, index, button) {
      //   this.infoModal.title = `Row index: ${index}`
      //   this.infoModal.content = JSON.stringify(item, null, 2)
      //   this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      // }
      ReturnToIssueTable () {
        let routeData = this.$router.resolve({name: 'issueList'})
        window.open(routeData.href, "_self")
      },
      SelectResourceData () {
        var selectedVersion = this.selectedVersion.split('.')
        var request
        if (this.selectedResourceType === 'web'){
          request = {'projectid': this.selectedProject, 'majorver': selectedVersion[0], 'minorver': selectedVersion[1], 'type': this.selectedResourceType, 'language': 'english'}
        } else {
          request = {'projectid': this.selectedProject, 'majorver': selectedVersion[0], 'minorver': selectedVersion[1], 'type': this.selectedResourceType, 'language': this.selectedLanguage}
        }
        // var resultList = []
        axios.post(commonVariable.ipAddress + 'translate/select_data', request)
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            this.resourceLists = JSON.parse(JSON.stringify(response.data.data))
            if (this.selectedResourceType === 'web'){
              for (var num in this.resourceLists) {
                this.resourceLists[num].original = this.resourceLists[num].translation
                this.resourceLists[num].translation = null
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
    $('.vdp-datepicker__calendar').css({'top': '-282px'})
  })
</script>

<style scoped lang="scss">
.tabs {
}
</style>
