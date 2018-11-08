<div className="-x-fit">
  <AppBar position="static">
    <Toolbar>
      <IconButton style={styles.menuButton} color="inherit" onClick={this.toggleDrawer(true)}>
        <Icon>menu</Icon>
      </IconButton>

      <Typography variant="title" color="inherit">
        Home
      </Typography>
    </Toolbar>
  </AppBar>

  <SwipeableDrawer
    open={swipeableDrawerCallapsed}
    onClose={this.toggleDrawer(false)}
    onOpen={this.toggleDrawer(true)}
    disableBackdropTransition={!iOS}
    disableDiscovery={iOS}
    style={styles.swipeableDrawerPaper}
  >
    <div tabIndex={0} role="button" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
      <ListItem style={styles.listItem}>
        <Avatar alt={user.name} src={user.picture} />
        <ListItemText primary={user.name} secondary={user.email} />
      </ListItem>

      <Divider />

      {navigationMenuItems.map((navigationMenuItem) => (
        <Link to={navigationMenuItem.route} key={navigationMenuItem.title}>
          <ListItem dense button i-key={navigationMenuItem.title}>
            <ListItemIcon>
              <Icon>{navigationMenuItem.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={navigationMenuItem.title} />
          </ListItem>
        </Link>
      ))}

      <ListItem dense button onClick={() => logout()}>
        <ListItemIcon>
          <Icon>exit_to_app</Icon>
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItem>
    </div>
  </SwipeableDrawer>

  <main className="-fill-height -x-relative">
    <Switch>
      <Route exact path="/home" component={HomeView} />
      <Route exact path="/profile" component={ProfileView} />
      <Redirect exact from="/*" to="/home" />
    </Switch>
  </main>
</div>
