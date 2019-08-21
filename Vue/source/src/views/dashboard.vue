<template lang="html">
  <section class="dashboard">
    <div class="row">
      <div class="col-12 grid-margin" v-if="CheckAdmin === true">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Created Issue</h5>
            <div class="table-responsive">
              <table class="table center-aligned-table">
                <thead>
                  <tr>
                    <th class="border-bottom-0">SUBJECT</th>
                    <th class="border-bottom-0">VERSION</th>
                    <th class="border-bottom-0">PRIORITY</th>
                    <th class="border-bottom-0">DEADLINE</th>
                    <th class="border-bottom-0">ASSIGNOR</th>
                    <th class="border-bottom-0">TYPE</th>
                    <th class="border-bottom-0">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr data-v-19c9d02c="" v-for="p in createdIssueArray" :key="p.subject" v-if="p.status !== 2">
                    <td data-v-19c9d02c="">{{p.subject}}</td>
                    <td data-v-19c9d02c="">{{p.majorver+'.'+p.minorver}}</td>
                    <td data-v-19c9d02c="" v-if="p.priority === 0">
                      <b-badge variant="primary">Lowest</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.priority === 1">
                      <b-badge variant="warning">Middle</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.priority === 2">
                      <b-badge variant="danger">Highest</b-badge>
                    </td>
                    <td data-v-19c9d02c="">{{p.deadline}}</td>
                    <td data-v-19c9d02c="">{{p.email}}</td>
                    <td data-v-19c9d02c="" v-if="p.type === 0">Resource
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.type === 1">Contents
                    </td>
                    <td data-v-19c9d02c="" v-if="p.status === 0">
                      <b-badge variant="outline-danger">Waiting</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.status === 1">
                      <b-badge variant="outline-warning">In Progress</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.status === 2">
                      <b-badge variant="outline-success">Resolved</b-badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Assigned Issue</h5>
            <div class="table-responsive">
              <table class="table center-aligned-table">
                <thead>
                  <tr>
                    <th class="border-bottom-0">SUBJECT</th>
                    <th class="border-bottom-0">VERSION</th>
                    <th class="border-bottom-0">PRIORITY</th>
                    <th class="border-bottom-0">DEADLINE</th>
                    <th class="border-bottom-0">ASSIGNOR</th>
                    <th class="border-bottom-0">TYPE</th>
                    <th class="border-bottom-0">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr data-v-19c9d02c="" v-for="p in assignedIssueArray" :key="p.subject" v-if="p.status !== 2">
                    <td data-v-19c9d02c="">{{p.subject}}</td>
                    <td data-v-19c9d02c="">{{p.majorver+'.'+p.minorver}}</td>
                    <td data-v-19c9d02c="" v-if="p.priority === 0">
                      <b-badge variant="primary">Lowest</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.priority === 1">
                      <b-badge variant="warning">Middle</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.priority === 2">
                      <b-badge variant="danger">Highest</b-badge>
                    </td>
                    <td data-v-19c9d02c="">{{p.deadline}}</td>
                    <td data-v-19c9d02c="">{{p.email}}</td>
                    <td data-v-19c9d02c="" v-if="p.type === 0">Resource</td>
                    <td data-v-19c9d02c="" v-else-if="p.type === 1">Contents</td>
                    <td data-v-19c9d02c="" v-if="p.status === 0">
                      <b-badge variant="outline-danger">Waiting</b-badge>
                    </td>
                    <td data-v-19c9d02c="" v-else-if="p.status === 1">
                      <b-badge variant="outline-warning">In Progress</b-badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import axios from 'axios'
  import commonVariable from '../javascript/common.js'

  export default {
    name: 'dashboard',
    data () {
      return {
        DeadLine: null,
        createdIssueArray: {},
        assignedIssueArray: {},
        CheckAdmin: false
      }
    },
    created: function () {
      this.SelectIssue()
      this.GetAccountData()
    },
    methods: {
      GetAccountData () {
        if (localStorage.getItem('email') === "admin"){
          this.CheckAdmin = true
        }
        localStorage.setItem("checkAdmin", this.CheckAdmin)
      },
      SelectIssue () {
        var accountid = localStorage.getItem('accountid')
        console.log('accountid ' + localStorage.getItem('accountid'))
        axios.post(commonVariable.ipAddress + 'issue/select_issue',
                   {'accountid': accountid})
          .then(response => {
            // this.toDoItems = response.data.map(r => r.data)
            this.createdIssueArray = JSON.parse(JSON.stringify(response.data.data_create))
            for (var num in this.createdIssueArray){
              if (this.createdIssueArray[num].deadline !== null){
                this.createdIssueArray[num].deadline = this.createdIssueArray[num].deadline.split('T')[0]
              }
            }
            this.assignedIssueArray = JSON.parse(JSON.stringify(response.data.data_assign))
            // this.issueArray = JSON.stringify(response.data.data)
            console.log(this.issueArray)
          })
          .catch(e => {
            console.log('error : ', e)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
