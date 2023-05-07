<template>
  <section id="menu-bar">
    <div>
      <img src="@/assets/logo.svg" alt="Invoice App Logo" />
    </div>
    <div class="menu-items">
      <div class="light-mode" @click="toggleColourMode">
        <img src="@/assets/icon-moon.svg" alt="Dark Mode" v-if="this.lightMode" />
        <img src="@/assets/icon-sun.svg" alt="Light Mode" v-else />
      </div>
      <div class="account-icon">
        <img src="@/assets/account-icon.svg" alt="Account Icon" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      lightMode: true
    }
  },
  methods: {
    toggleColourMode() {
      this.lightMode = !this.lightMode;
    }
  }
}
</script>


<style lang="scss" scoped>
#menu-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 103px;
  background-color: #1E2139;
  border-radius: 0 20px 20px 0;
  z-index: 10;
  position: sticky;
  top: 0;

  .menu-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 24px;
    gap: 24px;

    .light-mode {
      border-bottom: 1px solid #494E6E;
      width: 100%;
      display: flex;
      justify-content: center;
      padding-bottom: 24px;
      cursor: pointer;
    }
  }
}
</style>