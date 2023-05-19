<script lang="ts">
  import Button from "$/components/Shared/Button.svelte";
  import type { Login } from "$/lib/types/AuthTypes";
  let form: HTMLFormElement;
  let login: Login = {
    username: "",
    password: "",
  };
  const handleLogin = () => {
    form.reportValidity();
    console.log(login);
  };

  const handlekeydown = (ev: KeyboardEvent) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      handleLogin();
    }
  };
</script>

<svelte:window on:keydown={handlekeydown} />
<div class="login-container">
  <div>
    <h1>Login</h1>
    <form action="" bind:this={form}>
      <div class="form-body">
        <div class="input-container">
          <label for="username-login">Username *</label>
          <input
            type="text"
            placeholder="username"
            required
            bind:value={login.username}
          />
        </div>
        <div class="input-container">
          <label for="password-login">Password *</label>
          <input
            type="password"
            placeholder="password"
            required
            bind:value={login.password}
          />
        </div>
      </div>
      <div class="form-footer">
        <Button text="Login" on:click={handleLogin} />
      </div>
    </form>
    <!-- <p>
      Don't have an account?
      <a href="/auth/signup">Sign up</a>
    </p> -->
  </div>
</div>

<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .form-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .form-footer {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: end;
  }
  h1 {
    text-align: center;
  }
</style>
