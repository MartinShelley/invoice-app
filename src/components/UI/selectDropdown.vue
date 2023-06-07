<template>
  <div class="input-container" :class="{ invalid: invalidElement }">
    <label>Payment Terms</label>
    <p class="error" v-if="invalidElement">can't be empty</p>
    <div class="custom-select" :class="{ invalid: invalidElement }">
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
  </div>
</template>

<script>
export default {
  emits: ['paymentTermSelected'],
  props: ['invalidElement'],
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
.input-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 0.5fr 1fr;
  margin-bottom: 24px;
  position: relative;

  label {
    color: #7E88C3;
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
  }
}

.custom-select {
  width: 100%;
  position: relative;
  height: 48px;
  border: 1px solid #DFE3FA;
  border-radius: 4px;
  font-weight: 700;
  background-color: transparent;
  grid-row: 2 / 3;
  grid-column: 1 / 3;

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

.invalid {
  label {
    color: #EC5757 !important;
  }

  .error {
    font-size: 10px;
    color: #EC5757;
    text-align: right;
    font-weight: 600;
    margin-bottom: 0;
  }

  .custom-select {
    border-color: #EC5757 !important;
  }
}
</style>