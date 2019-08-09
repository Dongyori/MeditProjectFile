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
                      <b-form-input type="text" id="input1" placeholder="Summary"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Description" label-for="input3">
                      <b-form-textarea id="input3" v-model="text" placeholder="Description" :rows="10" :max-rows="20" style="height: 440px"></b-form-textarea>
                    </b-form-group>
                  </div>
                  <div class="col-md-4 grid-margin">
                    <b-form-group horizontal label="Project">
                      <b-form-select v-model="selected">
                          <option v-for="p in projectcombo" :key="p.projectid" v-bind:value="p.projectid">{{p.projectname}}</option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group horizontal label="Issue Type">
                      <b-form-select v-model="selected" :options="IssueType" placeholder="Select IssueType" />
                    </b-form-group>
                    <b-form-group horizontal label="Assignee">
                      <b-form-select v-model="selected">
                          <option v-for="p in getAccount" :key="p.accountid" v-bind:value="p.accountid">{{p.email}}</option>
                      </b-form-select>
                    </b-form-group>
                    <b-form-group horizontal label="Priority">
                      <b-form-select v-model="selected" :options="Priority" placeholder="Select Priority" />
                    </b-form-group>
                    <b-form-group horizontal label="Version">
                      <b-form-select v-model="selected">
                          <option v-for="p in getVersion" :key="p.versionid" v-bind:value="p.versionid">{{p.majorver+'.'+p.minorver}}</option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Attachment" label-for="input2">
                      <b-form-file class="Attachment" v-model="file" id="inpu2" :state="Boolean(file)" placeholder="Choose a file....." @change="processFile($event)"></b-form-file>
                    </b-form-group>
                    <b-form-group horizontal label="Reference">
                      <b-form-select v-model="selected">
                          <option v-for="p in getAccount" :key="p.accountid" v-bind:value="p.accountid">{{p.email}}</option>
                      </b-form-select>
                    </b-form-group>
                    <b-form-group horizontal label="Link">
                      <input data-v-7ea22626="" data-v-a65342b6="" id="input1" type="text" placeholder="URL.." class="form-control">
                    </b-form-group>
                    <b-form-group horizontal label="Deadline">
                      <datepicker id="datepicker" placeholder="Select Date" class="form-control"></datepicker>
                    </b-form-group>
                    <b-button type="submit" variant="success" class="mr-2" v-on:click="OpenTab()">Create</b-button>
                    <b-button variant="light">Cancel</b-button>
                  </div>
                </div>
              </form>
            </b-tab>
            <b-tab v-if="isFileSelected" title="Resource Tab">
              <div data-v-19c9d02c="" class="card-body">
                <h5 data-v-19c9d02c="" class="card-title mb-4">Resource Edit</h5>
                <div data-v-19c9d02c="" class="table-responsive">
                  <table data-v-19c9d02c="" class="table center-aligned-table">
                    <thead data-v-19c9d02c="">
                      <tr data-v-19c9d02c="">
                        <th data-v-19c9d02c="" class="border-bottom-0">Original</th>
                        <th data-v-19c9d02c="" class="border-bottom-0">Translation (Language)</th>
                      </tr>
                    </thead>
                    <tbody data-v-19c9d02c="">
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">Medit Translation Management System</td>
                        <td data-v-19c9d02c="">메디트 번역 관리 시스템</td>
                        <td data-v-19c9d02c="">
                        </td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">Medit Translation Management System</td>
                        <td data-v-19c9d02c="">메디트 번역 관리 시스템</td>
                        <td data-v-19c9d02c="">
                        </td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">034</td>
                        <td data-v-19c9d02c="">Iphone 7</td>
                        <td data-v-19c9d02c="">
                        </td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">034</td>
                        <td data-v-19c9d02c="">Iphone 7</td>
                        <td data-v-19c9d02c="">
                        </td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">034</td>
                        <td data-v-19c9d02c="">Iphone 7</td>
                        <td data-v-19c9d02c="">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-6 ml-12 grid-margin" style="margin-left:550px;">
                <div class="card">
                  <div class="card-body">
                    <b-pagination :total-rows="100" v-model="currentPage" :per-page="5" @change="processFile($event)">
                    </b-pagination>
                  </div>
                </div>
              </div>
              <div class="row" style="margin-left:350px;">
                <i class="mdi mdi-account-search"></i>
                <input data-v-a65342b6="" id="input1" type="text" placeholder="Search" class="col-4 mr-2 form-control">
                <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary mr-5">Search</button>
                <button data-v-186e931c="" type="submit" class="btn mr-3 btn-success">Succes</button>
                <button data-v-186e931c="" type="button" class="btn btn-light">Cancel</button>
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
  import Datepicker from 'vuejs-datepicker'
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
        Priority: [
          { value: '0', text: 'Lowest' },
          { value: '1', text: 'Middle' },
          { value: '2', text: 'Highest' }
        ],
        IssueType: [
          { value: '0', text: 'Resource' },
          { value: '1', text: 'Contents' }
        ],
        getVersion: {},
        getAccount: {},
        projectcombo: {},
        file: null,
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
        changedMonthLog: []
      }
    },
    created: function () {
      this.SelectProject()
      this.SelectAccount()
      this.SelectVersion()
    },
    methods: {
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
  $(document).ready(function (){
    $($(".autoTab").find("li")[1]).hide()
    $('#datepicker').css({'border': '1px solid white'})
  })

</script>

<style scoped lang="scss">
.tabs {
}
</style>
