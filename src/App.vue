<template>
  <div id="nav">
    <router-link to="/">甘特图</router-link> |
    <router-link to="/gantt">Gantt Demo</router-link>
    <router-link :to="{ name: 'GanttBasic' }">基础甘特图</router-link>
    <router-link :to="{ name: 'GanttMarker' }">甘特图 marker</router-link>
  </div>
  <router-view />
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
