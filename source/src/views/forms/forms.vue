<template lang="html">

  <section class="forms">
    <div class="row">
         <!--
      <div class="col-md-6 d-flex align-items-stretch grid-margin">
        <div class="row flex-grow">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Default form</h4>
                <p class="card-description">
                  Basic form layout
                </p>
                <form class="forms-sample">
                  <b-form-group label="Email"  label-for="input1">
                    <b-form-input type="email" id="input1" placeholder="Email address"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Password"  label-for="input2">
                    <b-form-input type="password" id="input2" placeholder="Password"></b-form-input>
                  </b-form-group>
                  <b-button type="submit" variant="success" class="mr-2">Submit</b-button>
                  <b-button variant="light">Cancel</b-button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-12 stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Horizontal Form</h4>
                <p class="card-description">
                  Horizontal form layout
                </p>
                <form class="forms-sample">
                  <form class="forms-sample">
                    <b-form-group horizontal label="Email"  label-for="input3">
                      <b-form-input type="email" id="input3" placeholder="Email address"></b-form-input>
                    </b-form-group>
                    <b-form-group horizontal label="Password"  label-for="input4">
                      <b-form-input type="password" id="input4" placeholder="Password"></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="success" class="mr-2">Submit</b-button>
                    <b-button variant="light">Cancel</b-button>
                  </form>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
          -->
      <div class="col-md-6 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Create Issue</h4>
            <!--
            <p class="card-description">
              Basic form elements
            </p>
            -->
            <form class="forms-sample">
              <b-form-group label="Summary"  label-for="input1">
                <b-form-input type="text" id="input1" placeholder="Summary"></b-form-input>
              </b-form-group>
                <b-form-group horizontal label="Issue Type">
                    <b-form-select v-model="selected" :options="IssueType" placeholder="Select IssueType"/>
                  </b-form-group>
                <b-form-group horizontal label="Assignee">
                    <b-form-select v-model="selected" :options="Assignee" placeholder="Select Assignee"/>
                  </b-form-group>
              <b-form-group label="Attachment" label-for="input2">
                <b-form-file v-model="file" id="inpu2" :state="Boolean(file)" placeholder="Choose a file..." @change="processFile($event)"></b-form-file>
              </b-form-group>
              <b-form-group label="Description"  label-for="input3">
                <b-form-textarea id="input3" v-model="text" placeholder="Description" :rows="10" :max-rows="20"></b-form-textarea>
              </b-form-group>
                <b-form-group horizontal label="Priority">
                    <b-form-select v-model="selected" :options="Priority" placeholder="Select Priority"/>
                  </b-form-group>
                <b-form-group horizontal label="Priority">
                    <b-form-select v-model="selected" :options="Priority" placeholder="Select Priority"/>
                  </b-form-group>
              <b-button type="submit" variant="success" class="mr-2">Create</b-button>
              <b-button variant="light">Cancel</b-button>
            </form>
          </div>
        </div>
      </div>
      <!--
      <div class="col-md-5 d-flex align-items-stretch">
        <div class="row flex-grow">
          <div class="col-12 grid-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Basic input groups</h4>
                <p class="card-description">
                  Basic bootstrap input groups
                </p>
                <b-form-group>
                  <b-input-group prepend="@">
                    <b-form-input placeholder="Username"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group append="@">
                    <b-form-input placeholder="Username"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group prepend="$" append=".00">
                    <b-form-input></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-text slot="prepend">
                      <span>$</span>
                    </b-input-group-text>
                    <b-input-group-text slot="prepend">
                      <span>00.0</span>
                    </b-input-group-text>
                    <b-form-input type="text" placeholder="Enter Amount"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
            </div>
          </div>
          <div class="col-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Colored input groups</h4>
                <p class="card-description">
                  Input groups with colors
                </p>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-text slot="prepend" class="bg-info text-white">
                      <span>@</span>
                    </b-input-group-text>
                    <b-form-input placeholder="Username"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-form-input placeholder="Username"></b-form-input>
                    <b-input-group-text slot="append" class="bg-info text-white">
                      <span>@</span>
                    </b-input-group-text>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-text slot="prepend" class="bg-info text-white">
                      <span>$</span>
                    </b-input-group-text>
                    <b-form-input></b-form-input>
                    <b-input-group-text slot="append" class="bg-info text-white">
                      <span>.00</span>
                    </b-input-group-text>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-text slot="prepend" class="bg-secondary text-primary">
                      <span>$</span>
                    </b-input-group-text>
                    <b-input-group-text slot="prepend" class="bg-secondary text-primary">
                      <span>00.0</span>
                    </b-input-group-text>
                    <b-form-input type="text" placeholder="Enter Amount"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Input size</h4>
            <p class="card-description">
              This is the default bootstrap form layout
            </p>
            <b-form-group label="Large Input" label-for="input11">
              <b-form-input type="text" id="input11" placeholder="Username" size="lg"></b-form-input>
            </b-form-group>
            <b-form-group label="Default Input" label-for="input11">
              <b-form-input type="text" id="input11" placeholder="Username"></b-form-input>
            </b-form-group>
            <b-form-group label="Small Input" label-for="input11">
              <b-form-input type="text" id="input11" placeholder="Username" size="sm"></b-form-input>
            </b-form-group>
          </div>
          <div class="card-body">
            <h4 class="card-title">Selectize</h4>
            <b-form-group label="Small Input" label-for="input11">
              <b-form-select v-model="selected" :options="options" size="sm" />
            </b-form-group>
            <b-form-group label="Default Input" label-for="input11">
              <b-form-select v-model="selected" :options="options" />
            </b-form-group>
            <b-form-group label="Large Input" label-for="input11">
              <b-form-select v-model="selected" :options="options" size="lg" />
            </b-form-group>
          </div>
        </div>
      </div>
      -->
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Horizontal Two column</h4>
            <form class="form-sample">
              <p class="card-description">
                <strong>Personal info</strong>
              </p>
              <div class="row">
                <div class="col-md-6">
                  <b-form-group horizontal label="Name" description="First Name" label-for="input14">
                    <b-form-input type="text" id="input14"></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <b-form-group horizontal description="Last Name">
                    <b-form-input type="text"></b-form-input>
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <b-form-group horizontal label="Gender" description="Male,Female">
                    <b-form-select v-model="selected" :options="GenderSelect" placeholder="Select Gender"/>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <b-form-group horizontal label="Date of birth" description="DD/MM/YYYY">
                    <b-form-input></b-form-input>
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <b-form-group horizontal label="Category">
                    <b-form-select v-model="selected" :options="Category" placeholder="Select Gender"/>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <b-form-group horizontal label="Membership">
                    <b-form-radio-group id="radios2" v-model="selected" name="radioSubComponent">
                      <b-form-radio value="Free">Free</b-form-radio>
                      <b-form-radio value="Professional">Professional</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </div>
              </div>
              <p class="card-description">
                <strong>Address</strong>
              </p>
              <div class="row">
                <div class="col-md-6">
                  <b-form-group horizontal label="Address 1" label-for="input15">
                    <b-form-input type="text" id="input15"></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <b-form-group horizontal label="State" label-for="input16">
                    <b-form-input type="text" id="input16"></b-form-input>
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <b-form-group horizontal label="Address 2" label-for="input17">
                    <b-form-input type="text" id="input17"></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <b-form-group horizontal label="Pincode" label-for="input18">
                    <b-form-input type="text" id="input18"></b-form-input>
                  </b-form-group>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <b-form-group horizontal label="City" label-for="input19">
                    <b-form-input type="text" id="input19"></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <b-form-group horizontal label="Country">
                    <b-form-select v-model="selected" :options="countries"/>
                  </b-form-group>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="js">
  export default {
    // name: 'forms',
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
        ]
      }
    },
    methods: {
      processFile (event) {
        alert(event.target.files[0].name)
      }
    }

  }

  $(document).ready(function (){
    // console.log(file.name)
    // $(".resourceTab").css("visibility", "hidden")
    // alert($($(".Attachment").find("label")[1]))
  })
</script>

<style scoped lang="scss">
.forms {
}
</style>
