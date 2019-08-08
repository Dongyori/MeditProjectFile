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
                <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary" v-on:click="clickList()">All</button>
                <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">Waiting</button>
                <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">In Progress</button>
                <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary">Resolved</button>
                <i class="mdi mdi-account-search"></i>
                <input data-v-a65342b6="" id="input1" type="text" placeholder="Search" class="col-2 mr-2 form-control">
                <a data-v-35f42b37="" target="_self" href="#" class="btn btn-fw btn-link btn-rounded btn-secondary col-1 mr-5">Search</a>
                </div>
                <div class="table-responsive">
              <table class="table center-aligned-table" >
                <thead>
                  <tr>
                    <th class="border-bottom-0">Issue No</th>
                    <th class="border-bottom-0">Issue Name</th>
                    <th class="border-bottom-0">Issue Status</th>
                  </tr>
                </thead>
                <tbody style="cursor: pointer">
                  <tr v-on:click="clickList()">
                    <td>034</td>
                    <td>Iphone 7</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <!-- <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                    <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td> -->
                  </tr>
                  <tr>
                    <td>034</td>
                    <td>Iphone 7</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <!-- <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                    <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td> -->
                  </tr>
                  <tr>
                     <td>034</td>
                    <td>Iphone 7</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <!-- <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                    <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td> -->
                  </tr>
                  <tr>
                     <td>034</td>
                    <td>Iphone 7</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <!-- <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                    <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td> -->
                  </tr>
                  <tr>
                     <td>034</td>
                    <td>Iphone 7</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <!-- <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                    <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td> -->
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
              <div class="col-6 grid-margin" style="margin-left:30%;">
                <div class="card">
                  <div class="card-body">
                    <b-pagination :total-rows="100" v-model="currentPage" :per-page="5" @change="processFile($event)">
                    </b-pagination>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab title="Assigned Tab">
              <div data-v-19c9d02c="" class="card-body">
                <div class="row mb-5">
                <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">All</button>
                <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">Waiting</button>
                <button data-v-35f42b37="" type="button" class="col-1 btn btn-fw btn-inverse-light btn-secondary">In Progress</button>
                <button data-v-35f42b37="" type="button" class="col-1 mr-5 btn btn-fw btn-inverse-light btn-secondary">Resolved</button>
                <i class="mdi mdi-account-search"></i>
                <input data-v-a65342b6="" id="input1" type="text" placeholder="Search" class="col-2 mr-2 form-control">
                <a data-v-35f42b37="" target="_self" href="#" class="btn btn-fw btn-link btn-rounded btn-secondary col-1 mr-5">Search</a>
                </div>
                <div class="table-responsive">
              <table class="table center-aligned-table">
                <thead>
                  <tr>
                    <th class="border-bottom-0">Issue No</th>
                    <th class="border-bottom-0">Issue Name</th>
                    <th class="border-bottom-0">Issue Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="clickable-row">
                    <td>034</td>
                    <td>Iphone 7</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <!-- <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                    <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td> -->
                  </tr>
                  <tr>
                    <td>034</td>
                    <td>Iphone 7</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <!-- <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                    <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td> -->
                  </tr>
                  <tr>
                     <td>034</td>
                    <td>Iphone 7</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <!-- <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                    <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td> -->
                  </tr>
                  <tr>
                     <td>034</td>
                    <td>Iphone 7</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <!-- <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                    <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td> -->
                  </tr>
                  <tr>
                     <td>034</td>
                    <td>Iphone 7</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <!-- <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                    <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td> -->
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
              <div class="col-6 grid-margin" style="margin-left:30%;">
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
    <!-- <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Minimal Tab</h4>
          <b-tabs class="tab-minimal tab-minimal-success">
            <b-tab title="<i class='mdi mdi-home-outline'></i> Home" active>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </b-tab>
            <b-tab title="<i class='mdi mdi-account-outline'></i>Profile">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti eveniet, sapiente corrupti, vitae excepturi nulla soluta esse in ex, dignissimos velit rerum maiores asperiores!
            </b-tab>
            <b-tab title="<i class='mdi mdi-message-text-outline'></i>Contact">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quibusdam assumenda fugit velit quis hic nulla necessitatibus? Nulla, possimus rerum quia sapiente necessitatibus!
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Vertical Basic Tab</h4>
          <b-tabs class="vertical-tab">
            <b-tab title="Home" active>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </b-tab>
            <b-tab title="Profile">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti eveniet, sapiente corrupti, vitae excepturi nulla soluta esse in ex, dignissimos velit rerum maiores asperiores!
            </b-tab>
            <b-tab title="Contact">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quibusdam assumenda fugit velit quis hic nulla necessitatibus? Nulla, possimus rerum quia sapiente necessitatibus!
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Vertical Minimal Tab</h4>
          <b-tabs class="vertical-tab tab-minimal tab-minimal-success">
            <b-tab title="<i class='mdi mdi-home-outline'></i> Home" active>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </b-tab>
            <b-tab title="<i class='mdi mdi-account-outline'></i>Profile">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti eveniet, sapiente corrupti, vitae excepturi nulla soluta esse in ex, dignissimos velit rerum maiores asperiores!
            </b-tab>
            <b-tab title="<i class='mdi mdi-message-text-outline'></i>Contact">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quibusdam assumenda fugit velit quis hic nulla necessitatibus? Nulla, possimus rerum quia sapiente necessitatibus!
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Colored Tab</h4>
          <b-tabs class="tab-solid tab-solid-danger">
            <b-tab title="Home" active>
              <div class="row">
                <div class="col-md-4"><img class="img-fluid w-100" src="../../assets/images/samples/300x300/01.jpg" alt=""></div>
                <div class="col-md-8">
                  <h5 class="mb-3">Home Content</h5>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                </div>
              </div>
            </b-tab>
            <b-tab title="Profile">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti eveniet, sapiente corrupti, vitae excepturi nulla soluta esse in ex, dignissimos velit rerum maiores asperiores!
            </b-tab>
            <b-tab title="Contact">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quibusdam assumenda fugit velit quis hic nulla necessitatibus? Nulla, possimus rerum quia sapiente necessitatibus!
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Colored Tab With Icons</h4>
          <b-tabs class="tab-solid tab-solid-primary">
            <b-tab title="<i class='mdi mdi-home-outline'></i>Home" active>
              <div class="row">
                <div class="col-md-4"><img class="img-fluid w-100" src="../../assets/images/samples/300x300/01.jpg" alt=""></div>
                <div class="col-md-8">
                  <h5 class="mb-3">Home Content</h5>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                </div>
              </div>
            </b-tab>
            <b-tab title="<i class='mdi mdi-account-outline'></i>Profile">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti eveniet, sapiente corrupti, vitae excepturi nulla soluta esse in ex, dignissimos velit rerum maiores asperiores!
            </b-tab>
            <b-tab title="<i class='mdi mdi-message-text-outline'></i>Contact">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quibusdam assumenda fugit velit quis hic nulla necessitatibus? Nulla, possimus rerum quia sapiente necessitatibus!
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div> -->
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
      clickList () {
        window.open("http://localhost:8080/ClickIssueDetail")
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
</script>

<style scoped lang="scss">
.tabs {
}
</style>
