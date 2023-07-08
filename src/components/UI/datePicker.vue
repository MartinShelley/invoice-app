<template>
  <div class="input-container" :class="{ invalid: invalidElement }">
    <label>Invoice Date</label>
    <p class="error" v-if="invalidElement">must pick a date</p>
    <input type="date" readonly="readonly" @click="toggleDatePicker" v-model="selected.fullDate"
      :class="{ invalid: invalidElement }" />
    <div class="date-picker" v-show="showDatePicker">
      <div class="date-picker-header">
        <img src="@/assets/icon-arrow-left.svg" @click="prevMonth" />
        <span class="selected-month-year">{{ datePickerMonth }}</span>
        <img src="@/assets/icon-arrow-right.svg" @click="nextMonth" />
      </div>
      <div class="days">
        <div class="day" :data-value="n" v-for="n in daysInMonth" :key="n" @click="selectedDay($event)">{{
          n }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  emits: ['clearDatePickerError', 'saveInvoiceDate'],
  props: ['invalidElement'],
  data() {
    return {
      current: {
        month: new Date().getMonth(), //0 indexed
        year: new Date().getFullYear(),
        leapYear: false
      },
      selected: {
        date: null,
        month: null,
        year: null,
        fullDate: null,
      },
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      showDatePicker: false
    }
  },
  computed: {
    datePickerMonth() {
      return this.months[this.current.month] + ' ' + this.current.year;
    },
    daysInMonth() {
      this.isLeapYear(this.current.year);
      if (this.current.leapYear == true && this.current.month == 1) {
        return 29;
      }
      else {
        return new Date(this.current.year, this.current.month + 1, 0).getDate();
      }
    }
  },
  methods: {
    addMonth() {
      if (this.current.month == 11) {
        this.current.month = 0;
        this.current.year++
      }
      else {
        this.current.month++;
      }
    },
    checkForSelectedDate() {
      if (this.selected.month == null) {
        return;
      }
      else if (this.current.month !== this.selected.month && document.querySelector('.selected') !== null) {
        document.querySelector('.selected').classList.remove('selected');

      }
      else if (this.current.month == this.selected.month) {
        document.querySelector(`.day[data-value="${this.selected.date}"]`).classList.add('selected');
      }
    },
    clearError() {
      this.$emit('clearDatePickerError');
    },
    decreaseMonth() {
      if (this.current.month == 0) {
        this.current.month = 11;
        this.current.year--
      }
      else {
        this.current.month--;
      }
    },
    isLeapYear(year) {
      if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
        this.leapYear = true;
      }
      else {
        this.leapYear = false;
      }
    },
    nextMonth() {
      this.addMonth();
      this.checkForSelectedDate();
    },
    prevMonth() {
      this.decreaseMonth();
      this.checkForSelectedDate();
    },
    selectedDay(event) {
      if (this.selected.month != null) {
        document.querySelector('.selected').classList.remove('selected');
      }

      this.selected.date = Number(event.target.innerText);
      this.selected.month = this.current.month;
      this.selected.year = this.current.year;
      this.selected.fullDate = new Date(`${this.selected.year}-${this.selected.month + 1}-${this.selected.date}`).toLocaleDateString().split('/').reverse().join('-');
      event.target.classList.add('selected');
      this.toggleDatePicker();
      this.$emit('saveInvoiceDate', this.selected.fullDate); //send date to form for form submission
    },
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
      this.$emit('clearDatePickerError', 'createdAt');
    }
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

  input {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
  }
}

input {
  margin-bottom: 8px;
}

.date-picker {
  width: 240px;
  background: var(--date-picker-background-color);
  box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
  border-radius: 8px;
  position: absolute;
  top: 81px;
  z-index: 2;

  .date-picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    margin-top: 25px;

    img {
      cursor: pointer;
    }

    span {
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.25px;
      font-weight: 700;
      color: var(--main-font-color);
    }
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    column-gap: 15px;
    margin-top: 32px;
    padding: 0 24px 32px;
    row-gap: 16px;

    .day {
      font-size: 12px;
      line-height: 15px;
      font-weight: 700;
      letter-spacing: -0.25px;
      cursor: pointer;
      color: var(--main-font-color);
    }

    .selected {
      color: #9277FF;
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

  input {
    border-color: #EC5757 !important;
  }
}
</style>