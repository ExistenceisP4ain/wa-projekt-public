<template>
  <div class="row" align="center">
    <div class="container">
      <div
        id="loginbox"
        style="margin-top:50px;"
        class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
      >
        <div class="panel panel-info">
          <div class="panel-heading">
            <div class="panel-title">
              <b>PRIJAVA</b>
            </div>
          </div>
          <div style="padding-top:30px" class="panel-body">
            <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>
            <form @submit.prevent="login">
              <div style="margin-bottom: 25px" class="input-group">
                <span class="input-group-addon">
                  <i class="glyphicon glyphicon-user"></i>
                </span>
                <input
                  v-model="email"
                  id="login-username"
                  type="email"
                  class="form-control"
                  name="username"
                  value
                  placeholder="Email"
                />
              </div>
              <div style="margin-bottom: 25px" class="input-group">
                <span class="input-group-addon">
                  <i class="glyphicon glyphicon-lock"></i>
                </span>
                <input
                  v-model="password"
                  id="login-password"
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Lozinka"
                />
              </div>
              <div style="margin-top:10px" class="form-group">
                <!-- Button -->
                <div class="col-sm-12 controls">
                  <div class="row">
                    <div class="col">
                      <button
                        type="submit"
                        class="btn btn-success"
                        name="login_user"
                        style="width: 120%;"
                      >Login</button>
                    </div>
                    <div class="col">
                      <a
                        id="btn-fblogin"
                        style="width: 100px; float:right;"
                        href="#"
                        onclick="$('#loginbox').hide(); $('#signupbox').show()"
                        class="btn btn-primary"
                      >Registracija</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        id="signupbox"
        style="display:none; margin-top:50px"
        class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
      >
        <div class="panel panel-info">
          <div class="panel-heading">
            <div class="panel-title">
              <b>Registracija</b>
            </div>
            <div style="float:right; font-size: 85%; position: relative; top:-10px">
              <a
                id="signinlink"
                href="#"
                onclick="$('#signupbox').hide(); $('#loginbox').show()"
              >Prijava</a>
            </div>
          </div>
          <br />
          <div class="panel-body">
            <Signup />
          </div>
        </div>
      </div><hr>
    </div>
	<table class="table">
  <thead>
    <tr>
      <th scope="col">Podaci za prijavu</th>
      <th scope="col">email</th>
      <th scope="col">lozinka</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Korisnik</th>
      <td>a@a.com</td>
      <td>bbbbbbbb</td>
    </tr>
    <tr>
      <th scope="row">Oglašivač</th>
      <td>ff@ff.com</td>
      <td>bbbbbbbb</td>
    </tr>
	<tr>
      <th scope="row">Admin</th>
      <td>uwu@uwu.com</td>
      <td>aaaaaaaa</td>
    </tr>
  </tbody>
</table>
  </div>
</template>
<script>
import Signup from "@/views/Signup.vue";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  components: {
    Signup
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
