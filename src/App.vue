<template>
  <MenuBar />
  <main>
    <RouterView />
  </main>
</template>

<script>
// console.log(invoicesStore);
import MenuBar from './components/UI/MenuBar.vue';
export default {
  components: {
    MenuBar
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: "League Spartan", sans-serif, Arial;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background-color: #f2f2f2;
}

input,
button,
textarea,
select {
  font: inherit;
}

#app {
  display: flex;
}

main {
  // width: calc(100vw - 103px);
  width: 730px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  line-height: 35.84px;
  letter-spacing: -1px;
}

h2 {
  font-size: 20px;
  font-weight: 700;
  line-height: 22.4px;
  letter-spacing: -0.63px;
}

h3 {
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.8px;
}

h4 {
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: -0.25px;
}

button {
  cursor: pointer;
}
</style>
