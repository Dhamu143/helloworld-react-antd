<div>
  <form style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
    <TextField
      label="Email"
      id="username"
      autoComplete="current-username"
      margin="dense"
      value={username}
      error={!!error.username}
      helperText={error.username}
      onBlur={(event) => this.handleInputValidation(event.target.value, event.target.id, [$validate.required, $validate.email])
      }
      onChange={(event) => this.handleInputChange(event)}
    />

    <TextField
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      margin="dense"
      value={password}
      error={!!error.password}
      helperText={error.password}
      onBlur={(event) => this.handleInputValidation(event.target.value, event.target.id, [$validate.required, $validate.password])
      }
      onChange={(event) => this.handleInputChange(event)}
    />
  </form>

  <Button
    className="btn-accent -fill-width"
    style={{ marginTop: 8 }}
    disabled={processing}
    onClick={() => this.login()}
  >
    Login
  </Button>

  <div style={{ marginTop: 16 }}>
    <Button component={Link} to="/signup" className="text-white">
      Signup
    </Button>
    <Button component={Link} to="/reset" className="text-white">
      Reset
    </Button>
  </div>
</div>
