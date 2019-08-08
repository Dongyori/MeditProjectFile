<template lang="html">

  <section class="tabs">
  <div class="row">
    <div class="col-md-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <b-tabs>
            <b-tab title="Account">
              <div class="row">
              <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary ml-5">Create Account</button>
              <button data-v-35f42b37="" type="button" class="btn btn-fw btn-inverse-light btn-secondary">Edit Account</button>
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
                        <th data-v-19c9d02c="" class="border-bottom-0">Account Name</th>
                      </tr>
                    </thead>
                    <tbody data-v-19c9d02c="" v-on:click="clickList()">
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">0</td>
                        <td data-v-19c9d02c="">Admin</td>
                        <td data-v-19c9d02c="">Admin</td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">0</td>
                        <td data-v-19c9d02c="">Admin</td>
                        <td data-v-19c9d02c="">Admin</td>
                      </tr>
                      <tr data-v-19c9d02c="" class="clickable-row">
                        <td data-v-19c9d02c="">0</td>
                        <td data-v-19c9d02c="">Admin</td>
                        <td data-v-19c9d02c="">Admin</td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">0</td>
                        <td data-v-19c9d02c="">Admin</td>
                        <td data-v-19c9d02c="">Admin</td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">0</td>
                        <td data-v-19c9d02c="">Admin</td>
                        <td data-v-19c9d02c="">Admin</td>
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
                  <table data-v-19c9d02c="" class="table center-aligned-table">
                    <thead data-v-19c9d02c="">
                      <tr data-v-19c9d02c="">
                        <th data-v-19c9d02c="" class="border-bottom-0">Issue No</th>
                        <th data-v-19c9d02c="" class="border-bottom-0">Issue Name</th>
                        <th data-v-19c9d02c="" class="border-bottom-0">Issue Status</th>
                      </tr>
                    </thead>
                    <tbody data-v-19c9d02c="" v-on:click="clickList()">
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">1</td>
                        <td data-v-19c9d02c="">Issue 1</td>
                        <td><label class="badge badge-teal">Approved</label></td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">1</td>
                        <td data-v-19c9d02c="">Issue 1</td>
                        <td><label class="badge badge-teal">Approved</label></td>
                      </tr>
                      <tr data-v-19c9d02c="" class="clickable-row">
                        <td data-v-19c9d02c="">1</td>
                        <td data-v-19c9d02c="">Issue 1</td>
                        <td><label class="badge badge-teal">Approved</label></td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">1</td>
                        <td data-v-19c9d02c="">Issue 1</td>
                        <td><label class="badge badge-teal">Approved</label></td>
                      </tr>
                      <tr data-v-19c9d02c="">
                        <td data-v-19c9d02c="">1</td>
                        <td data-v-19c9d02c="">Issue 1</td>
                        <td><label class="badge badge-teal">Approved</label></td>
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
    methods: {
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
    this.$parent.isLoginPage = false
  })

</script>

<style scoped lang="scss">
.tabs {
}
</style>
