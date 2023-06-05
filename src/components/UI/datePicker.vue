<template>
  <input type="date" readonly="readonly" @click="toggleDatePicker" v-model="selected.fullDate" />
  <div class="date-picker" v-show="showDatePicker">
    <div class="date-picker-header">
      <img src="@/assets/icon-arrow-left.svg" @click="prevMonth" />
      <span class="selected-month-year">{{ datePickerMonth }}</span>
      <img src="@/assets/icon-arrow-right.svg" @click="nextMonth" />
    </div>
    <div class="days">
      <div class="day" v-for="n in daysInMonth" :key="n" @click="selectedDay($event)">{{
        n }}</div>
    </div>
  </div>
</template>

<script>

export default {
  emits: ['saveInvoiceDate'],
  data() {
    return {
      current: {
        month: new Date().getMonth(), //0 indexed
        year: new Date().getFullYear()
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
      return new Date(this.current.year, this.current.month + 1, 0).getDate();
    }
  },
  methods: {
    isLeapYear(year) {
      return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    },
    nextMonth() {
      if (this.current.month == 11) {
        this.current.month = 0;
        this.current.year++
      }
      else {
        this.current.month++;
      }
    },
    prevMonth() {
      if (this.current.month == 0) {
        this.current.month = 11;
        this.current.year--
      }
      else {
        this.current.month--;
      }
    },
    selectedDay(event) {
      if (this.selected.month != null) {
        document.querySelector('.selected').classList.remove('selected');
      }

      this.selected.date = Number(event.target.innerText);
      this.selected.month = this.current.month;
      this.selected.year = this.current.year;
      this.selected.fullDate = new Date(`${this.selected.year}-${this.selected.month + 1}-${this.selected.date}`).toISOString().slice(0, 10);
      event.target.classList.add('selected');
      this.toggleDatePicker();
      this.$emit('saveInvoiceDate', this.selected.fullDate); //send date to form and output
    },
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  margin-bottom: 8px;
}

.date-picker {
  width: 240px;
  background: #FFFFFF;
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
      color: #0C0E16;
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
    }

    .selected {
      color: #9277FF;
    }
  }
}
</style>