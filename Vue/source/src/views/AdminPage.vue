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
                                    <b-form-select id="createtype" v-model="selected" :options="SelectAutorty" />
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
                                    <b-form-select id="updatetype" v-model="selected" :options="SelectAutorty">
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
              <!-- <b-tab title="Resource">
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
              </b-tab> -->
              <b-tab title="Project">
                <div class="row" style="margin-left: 2.5%; margin-bottom:2%">
                <div class="text-center">
                    <b-btn class="btn btn-fw btn-inverse-light btn-secondary" v-b-modal.modalAddProject>Add Project</b-btn>
                    <b-modal id="modalAddProject" ok-only ok-title="Cancel">
                      <section class="register ml-3">
                        <div class="row w-100">
                          <div class="col-lg-12 mx-auto">
                            <div class="auth-form-light text-left p-5">
                              <h2>Add Project</h2>
                              <form class="pt-4">
                                <form>
                                  <div class="form-group">
                                    <label for="projectNameInput">Project Name</label>
                                    <input class="form-control" id="Projectname" placeholder="Project Name">
                                  </div>
                                  <div class="mt-5">
                                    <a class="btn btn-block btn-primary btn-lg font-weight-medium" @click="CreateProject()" style="color: white">Register</a>
                                  </div>
                                </form>
                              </form>
                            </div>
                          </div>
                        </div>
                      </section>
                    </b-modal>
                    <b-btn class="btn btn-fw btn-inverse-light btn-secondary" v-b-modal.modalAddVersion @click="ClearText()">Add Version</b-btn>
                    <b-modal id="modalAddVersion" ok-only ok-title="Cancel">
                      <section class="register ml-3">
                        <div class="row w-100">
                          <div class="col-lg-12 mx-auto">
                            <div class="auth-form-light text-left p-5">
                              <h2>Add Version</h2>
                              <form class="pt-4">
                                <form>
                                  <div class="form-group">
                                    <label for="exampleInputAuthority" class="mb-2">Project</label>
                                    <b-form-select id="updatetype" v-model="selectProject" :options="projectName">
                                    </b-form-select>
                                  </div>
                                  <div class="form-group">
                                    <label for="projectNameInput">Version</label>
                                    <input class="form-control" v-model="selectVersion" id="projectName" placeholder="Version">
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputAuthority" class="mb-2">Type</label>
                                    <b-form-select id="updatetype" v-model="selectTypes" :options="SelectType">
                                    </b-form-select>
                                  </div>
                                  <b-form-group label="Resource" label-for="input2">
                                    <b-form-file class="Attachment" v-model="file" id="ex_filename" :state="Boolean(file)" placeholder="Choose a file....." @change="readData()"></b-form-file>
                                    <textarea id="content" style="width:500; height:500px; visibility:hidden; position: fixed"></textarea>
                                  </b-form-group>
                                  <div class="mt-5">
                                    <a class="btn btn-block btn-primary btn-lg font-weight-medium" @click="SendData()" style="color: white">Register</a>
                                  </div>
                                </form>
                              </form>
                            </div>
                          </div>
                        </div>
                      </section>
                    </b-modal>
                    <b-btn class="btn btn-fw btn-inverse-light btn-secondary" v-b-modal.modalAddLanguage @click="$root.$emit('bv::show::modal'); ClearText()">Add Language</b-btn>
                    <b-modal id="modalAddLanguage" ok-only ok-title="Cancel">
                      <section class="register ml-3">
                        <div class="row w-100">
                          <div class="col-lg-12 mx-auto">
                            <div class="auth-form-light text-left p-5">
                              <h2>Add Language</h2>
                              <form class="pt-4">
                                <form>
                                  <div class="form-group">
                                    <label for="exampleInputAuthority" class="mb-2">Project</label>
                                    <b-form-select id="updatetype" v-model="selectProjectLanguage" :options="projectName" @change="GetVersion()">
                                    </b-form-select>
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputAuthority" class="mb-2">Version</label>
                                    <b-form-select id="updatetype" v-model="selectVersionLanguage" :options="projectVersion">
                                    </b-form-select>
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputAuthority" class="mb-2">Type</label>
                                    <b-form-select id="updatetype" v-model="selectTypesLanguage" :options="SelectType">
                                    </b-form-select>
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputAuthority" class="mb-2">Language</label>
                                    <multiselect v-model="selectedLanguage" :options="getLanguage" :multiple="false" placeholder="Type to search" track-by="text" label="text"></multiselect>
                                  </div>
                                  <div class="mt-5">
                                    <a class="btn btn-block btn-primary btn-lg font-weight-medium" @click="AddLang()" style="color: white">Register</a>
                                  </div>
                                </form>
                              </form>
                            </div>
                          </div>
                        </div>
                      </section>
                    </b-modal>
                    <b-btn class="btn btn-fw btn-inverse-light btn-secondary">Download</b-btn>
                  </div>
                <div class="row">
                  <i class="mdi mdi-account-search ml-5"></i>
                  <input data-v-a65342b6="" id="projectSearch" type="text" placeholder="Search" class="col-5 mr-2 form-control">
                  <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary mr-5" @click="SearchProject()">Search</button>
                </div>
                </div>
                <div data-v-19c9d02c="" class="card-body">
                  <div>
                    <b-table id="projectListTable" stripped hover :items="projectNameList" :fields="projectFields" :per-page="perPage_project" :current-page="currentPage_project" @row-clicked="onRowClicked">
                    </b-table>
                  </div>
                  <div class="col-6 grid-margin" style="margin-left:30%;">
                    <div class="card">
                      <div class="card-body">
                        <b-pagination :total-rows="projectRows" v-model="currentPage_project" :per-page="perPage_project" aira-controls="projectListTable">
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
    computed: {
      accountRows () {
        return this.accountLists.length
      },
      issueRows () {
        return this.issueLists.length
      },
      resourceRows () {
        return this.resourceLists.length
      },
      projectRows () {
        return this.projectNameList.length
      }
    },
    data () {
      return {
        selectVersion: null,
        selectTypes: null,
        selectProject: null,
        selectVersionLanguage: null,
        selectTypesLanguage: null,
        selectProjectLanguage: null,
        selected: null,
        text: null,
        file: null,
        perPage_project: 10,
        currentPage_project: 1,
        perPage_account: 10,
        currentPage_account: 1,
        perPage_created: 10,
        currentPage_created: 1,
        perPage_assigned: 10,
        currentPage_assigned: 1,
        perPage_resource: 10,
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
        projectFields: [
          'projectname'
        ],
        SelectAutorty: [
          { value: '0', text: 'Admin' },
          { value: '1', text: 'User' }
        ],
        SelectType: [
          { value: 'web', text: 'Web' },
          { value: 'app', text: 'App' }
        ],
        getLanguage: [
          { value: 'Chinese', text: 'Chinese' },
          { value: 'Spanish', text: 'Spanish' },
          { value: 'English', text: 'English' },
          { value: 'Hindi', text: 'Hindi' },
          { value: 'Arabic', text: 'Arabic' },
          { value: 'Portuguese', text: 'Portuguese' },
          { value: 'Bengali', text: 'Bengali' },
          { value: 'Russian', text: 'Russian' }
        ],
        selectedLanguage: [],
        projectVersionAll: [],
        projectVersion: [],
        projectNameList: [],
        projectName: [],
        projectListAll: [],
        projectLists: [],
        accountListAll: [],
        accountLists: [],
        resourceLists: [],
        issueListAll: [],
        issueLists: [],
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
      this.SelectProject()
      this.SelectProjectName()
    },
    methods: {
      ClearText () {
        this.selectProjectLanguage = ""
        this.selectVersionLanguage = ""
        this.selectTypesLanguage = ""
        this.projectVersion.splice(0)
        this.selectProject = ""
        this.selectVersion = ""
        this.selectTypes = ""
      },
      CreateProject () {
        var Projectname = document.getElementById('Projectname').value
        axios.post(commonVariable.ipAddress + 'project/create_project',
                   {'projectname': Projectname})
          .then(response => {
            console.log(JSON.stringify(response.data))
            if (response.data.resultCode === 0) {
              this.SelectProjectName()
              alert("프로젝트 생성이 완료되었습니다.")
              this.$root.$emit('bv::hide::modal', 'modalAddProject')
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      AddLang () {
        var type = this.selectTypesLanguage
        var projectId = this.selectProjectLanguage
        for (var projectNum in this.projectNameList){
          if (this.selectProjectLanguage === this.projectNameList[projectNum].projectname) {
            projectId = this.projectNameList[projectNum].projectid
          }
        }
        var version = this.selectVersionLanguage.split('.')
        var language = this.selectedLanguage
        console.log(projectId)
        console.log(type)
        console.log(version[0])
        console.log(version[1])
        console.log(language.text)
        axios.post(commonVariable.ipAddress + 'projectver/create_projectver',
                   {'projectid': projectId, 'majorver': version[0], 'minorver': version[1], 'language': language.text, 'resourcetype': type})
          .then(response => {
            console.log(JSON.stringify(response.data))
            if (response.data.resultCode === 0) {
              this.SelectProjectName()
              alert("버전 추가가 완료되었습니다.")
              this.$root.$emit('bv::hide::modal', 'modalAddLanguage')
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
        axios.post(commonVariable.ipAddress + 'translate/add_data',
                   {'projectid': projectId, 'type': type, 'majorver': version[0], 'minorver': version[1], 'language': language.text})
          .then(response => {
            console.log(JSON.stringify(response.data))
            if (response.data.resultCode === 0) {
              this.SelectProjectName()
              alert("언어 추가가 완료되었습니다.")
              this.$root.$emit('bv::hide::modal', 'modalAddLanguage')
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      readData () {
        var file = document.getElementById('ex_filename').files[0]
        var reader = new FileReader()
        reader.onload = function () {
          var display = document.getElementById('content')
          display.textContent = reader.result
        }
        reader.onerror = function (evt) {
          var errcode = evt.target.error.code
          if (errcode === 1) {
            alert('File을 찾지 못하였습니다')
          } else if (errcode === 2) {
            alert('안전하지 못하거나 File에 변경이 있습니다')
          } else if (errcode === 3) {
            alert('읽기가 중지되었습니다')
          } else if (errcode === 4) {
            alert('접근권한 문제로 파일을 읽지 못하였습니다')
          } else if (errcode === 5) {
            alert('URL 길이 제한문제')
          }
        }
        var encoding = 'UTF-8'
        reader.readAsText(file, encoding)
      },
      onRowClicked (item, index, event) {
        this.clickedIndex = item.accountid
        this.clickedEmail = item.email
        this.clickedPosition = item.position
      },
      clickList () {
        window.open("http://localhost:8080/ClickIssueDetail", "_self")
      },
      SelectProject () {
        // var accountid = localStorage.getItem('accountid')
        axios.post(commonVariable.ipAddress + 'projectver/select_projectver',
                   {'projectid': '1'})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            this.projectListAll = JSON.parse(JSON.stringify(response.data.data2))
            // this.issueArray = JSON.stringify(response.data.data)
            // var idx = 0
            for (var projectNum in this.projectListAll){
              this.projectListAll[projectNum].version = this.projectListAll[projectNum].majorver + '.' + this.projectListAll[projectNum].minorver
              this.projectLists.push(this.projectListAll[projectNum])
              console.log(this.projectLists[projectNum])
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      GetVersion () {
        // var accountid = localStorage.getItem('accountid')
        this.SelectProjectName()
        var projectId = null
        for (var projectNum in this.projectNameList){
          if (this.selectProjectLanguage === this.projectNameList[projectNum].projectname) {
            projectId = this.projectNameList[projectNum].projectid
          }
        }
        axios.post(commonVariable.ipAddress + 'projectver/select_projectver',
                   {'projectid': projectId})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            this.projectVersionAll = JSON.parse(JSON.stringify(response.data.data))
            this.projectVersion.splice(0)
            // this.issueArray = JSON.stringify(response.data.data)
            // var idx = 0
            for (var projectNum in this.projectVersionAll){
              this.projectVersionAll[projectNum].version = this.projectVersionAll[projectNum].majorver + '.' + this.projectVersionAll[projectNum].minorver
              this.projectVersion.push(this.projectVersionAll[projectNum].version)
              this.projectVersion = [...new Set(this.projectVersion)]
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      SearchProject () {
        var projectNameCheck = document.getElementById('projectSearch').value
        var projectNum = 0
        this.projectNameList.splice(0)
        for (projectNum in this.projectcombo){
          if (projectNameCheck === this.projectcombo[projectNum].projectname) {
            this.projectNameList.push(this.projectcombo[projectNum])
          }
        }
        if (this.projectNameList.length === 0){
          alert("검색 결과가 없습니다.")
          for (projectNum in this.projectcombo){
            this.projectNameList.push(this.projectcombo[projectNum])
          }
          document.getElementById("projectSearch").value = ""
        }
      },
      SelectProjectName () {
        axios.post(commonVariable.ipAddress + 'project/select_project',
                   {'request': 'SelectPName'})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            // alert(JSON.stringify(response.data.data))
            this.projectcombo = JSON.parse(JSON.stringify(response.data.data))
            console.log(this.projectcombo)
            this.projectNameList.splice(0)
            this.projectName.splice(0)
            for (var projectNum in this.projectcombo){
              this.projectNameList.push(this.projectcombo[projectNum])
              this.projectName.push(this.projectcombo[projectNum].projectname)
              console.log(this.projectNameList[projectNum])
            }
          })
          .catch(e => {
            console.log('error : ', e)
          })
      },
      SelectIssue () {
        var accountid = localStorage.getItem('accountid')
        axios.post(commonVariable.ipAddress + 'issue/select_issue',
                   {'accountid': accountid})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            this.issueListAll = JSON.parse(JSON.stringify(response.data.data_create))
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
        axios.post(commonVariable.ipAddress + 'account/select_account',
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
        axios.post(commonVariable.ipAddress + 'account/select_account',
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
      SendData () {
        var projectId = this.selectProject
        for (var projectNum in this.projectcombo){
          console.log(projectNum + ' ' + this.projectcombo[projectNum].projectname)
          if (this.selectProject === this.projectcombo[projectNum].projectname) {
            projectId = this.projectcombo[projectNum].projectid
          }
        }
        console.log(projectId)
        var type = this.selectTypes
        var version = this.selectVersion.split('.')
        var str = document.getElementById('content').value
        if (type === 'app'){
          axios.post(commonVariable.ipAddress + 'projectver/create_projectver',
                     {'projectid': projectId, 'majorver': version[0], 'minorver': version[1], 'language': 'english', 'resourcetype': 'app'})
            .then(response => {
              console.log(JSON.stringify(response.data))
              if (response.data.resultCode === 0) {
                this.SelectProjectName()
                alert("버전 추가가 완료되었습니다.")
                this.$root.$emit('bv::hide::modal', 'modalAddVersion')
              }
            })
            .catch(e => {
              console.log('error : ', e)
            })
          axios.post(commonVariable.ipAddress + 'translate/import_data',
                     {'projectid': projectId, 'type': 'app', 'majorver': version[0], 'minorver': version[1], 'language': 'english', 'data': str})
            .then(response => {
              console.log(JSON.stringify(response.data))
            })
            .catch(e => {
              console.log('error : ', e)
            })
        } else if (type === 'web') {
          var temp = str.split('enUSMessages')
          var temp1 = temp[1].substring(3, temp[1].length)
          var temp2 = temp1.replace(/"/gi, '\\"\\"')
          var temp3 = temp2.replace(/'/gi, '"')
          var JsonData = JSON.parse(temp3)
          axios.post(commonVariable.ipAddress + 'projectver/create_projectver',
                     {'projectid': projectId, 'majorver': version[0], 'minorver': version[1], 'language': 'english', 'resourcetype': 'web'})
            .then(response => {
              console.log(JSON.stringify(response.data))
              if (response.data.resultCode === 0) {
                this.SelectProjectName()
                alert("버전 추가가 완료되었습니다.")
                this.$root.$emit('bv::hide::modal', 'modalAddVersion')
              }
            })
            .catch(e => {
              console.log('error : ', e)
            })
          axios.post(commonVariable.ipAddress + 'translate/import_data',
                     {'projectid': projectId, 'type': 'web', 'majorver': version[0], 'minorver': version[1], 'language': 'english', 'data': JsonData})
            .then(response => {
              console.log(JSON.stringify(response.data))
            })
            .catch(e => {
              console.log('error : ', e)
            })
        }
      },
      UpdateAccount () {
        var email = document.getElementById('updateemail').value
        var pw = document.getElementById('updatepassword').value
        var position = document.getElementById('updatetype')
        var pdata = position.options[position.selectedIndex].value
        var resultData = null
        var request = {'accountid': this.clickedIndex, 'email': email, 'password': pw, 'position': pdata}
        console.log(pdata)
        axios.post(commonVariable.ipAddress + 'account/update_account', request)
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            console.log(JSON.stringify(response.data))
            resultData = JSON.parse(JSON.stringify(response.data))
            if (resultData.resultCode === 0){
              alert("계정이 업데이트되었습니다.")
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
        var request = {'email': email, 'password': pw, 'position': pdata}
        console.log(pdata)
        axios.post(commonVariable.ipAddress + 'account/create_account', request)
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
        axios.post(commonVariable.ipAddress + 'account/delete_account',
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
