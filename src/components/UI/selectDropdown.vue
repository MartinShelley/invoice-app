<template>
  <div class="custom-select">
    <select>
      <option value=1>Net 1 Day</option>
      <option value=7>Net 7 Days</option>
      <option value=14>Net 14 Days</option>
      <option value=30>Net 30 Days</option>
    </select>
    <div class="custom-select-dropdown" @click="toggleDropdown">
      {{ selectedOption }}
      <img class="arrow" src="@/assets/icon-arrow-down.svg" />
    </div>
    <div class="custom-select-items" v-if="showDropdown">
      <div class="custom-select-item" v-for="(option, index) in options" :data-value="values[index]" :key="index"
        @click="optionSelected(option, values[index])">{{
          option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['paymentTermSelected'],
  data() {
    return {
      options: ['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days'],
      values: [1, 7, 14, 30],
      selectedOption: '',
      showDropdown: false
    }
  },
  methods: {
    optionSelected(option, value) {
      this.selectedOption = option;
      this.$emit('paymentTermSelected', value);
      this.toggleDropdown();
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown == true) {
        document.querySelector('.arrow').classList.add('rotate');
      }
      else {
        document.querySelector('.arrow').classList.remove('rotate');
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.custom-select {
  width: 100%;
  position: relative;
  height: 48px;
  border: 1px solid #DFE3FA;
  border-radius: 4px;
  font-weight: 700;
  background-color: transparent;

  &:hover {
    border-color: #7C5DFA;
  }

  select {
    display: none;
  }

  .custom-select-dropdown {
    height: 48px;
    padding: 17px 0 0 20px;
    -moz-appearance: none;
    /* Firefox */
    -webkit-appearance: none;
    /* Safari and Chrome */
    appearance: none;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;

    .arrow {
      position: absolute;
      content: "";
      top: 21px;
      right: 22px;
      width: 10px;
      height: 8px;
      transition-duration: 0.5s;
      transition-property: transform;
    }

    .rotate {
      transform: rotate(180deg);
    }
  }

  .custom-select-items {
    position: absolute;
    top: 56px;
    left: 0;
    z-index: 2;
    width: 100%;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);

    .custom-select-item {
      padding: 15px 0px 15px 24px;
      font-size: 14px;

      &:not(:last-child) {
        border-bottom: 1px solid #DFE3FA;
      }

      &:hover {
        color: #7C5DFA;
        cursor: pointer;
      }
    }
  }

}
</style>