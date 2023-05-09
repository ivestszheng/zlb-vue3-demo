<template>
  <nav>
    <router-link to="/">基础能力</router-link>
    <!-- <router-link to="/about">About</router-link> -->
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.block {
  padding: 12px 0;
  border: 1px solid #848689;
}

.block + .block {
  margin-top: 12px;
}

button + button {
  margin-left: 8px;
}
</style>
