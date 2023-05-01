<template>
  <div id="invoices-header">
    <div class="heading">
      <h1>Invoices</h1>
      <p class="invoice-number-label">No Invoices</p>
    </div>
    <div class="header-items">
      <div id="filter" @mouseover="mouseOver" @mouseleave="mouseleave">
        <span class="filter-label">Filter by status <img src="@/assets/icon-arrow-down.svg" /></span>
        <div id="filter-dropdown" v-show="this.filterHover">
          <span>
            <input type="checkbox" id="filter-draft" name="filter-draft" value="Draft" />
            <label for="filter-draft">Draft</label>
          </span>
          <span>
            <input type="checkbox" id="filter-pending" name="filter-pending" value="Pending" />
            <label for="filter-pending">Pending</label>
          </span>
          <span>
            <input type="checkbox" id="filter-paid" name="filter-paid" value="Paid" />
            <label for="filter-paid">Paid</label>
          </span>
        </div>
      </div>
      <button @click="showForm(true)">
        <svg height="32" width="32">
          <circle cx="16" cy="16" r="16" fill="white" />
          <image href="@/assets/icon-plus.svg" width="10" height="10" x="11" y="11" />
        </svg>
        New Invoice
      </button>
    </div>
  </div>
  <Transition name="slide">
    <InvoiceForm v-show="showFormToggle" @discard="showForm(false)" @closeForm="hideForm()"
      @submitInvoice="saveInvoice" />
  </Transition>
  <NoInvoices />
</template>

<script>

import NoInvoices from '@/components/NoInvoices.vue';
import InvoiceForm from '@/components/InvoiceForm.vue';
export default {
  data() {
    return {
      filterHover: false,
      showFormToggle: false
    }
  },
  methods: {
    mouseOver() {
      this.filterHover = true;
    },
    mouseleave() {
      this.filterHover = false;
    },
    hideForm() {
      this.showFormToggle = false;
    },
    showForm(val) {
      if (val == false) {
        this.showFormToggle = false;
      }
      else if (val == true) {
        this.showFormToggle = true;
      }
    },
    saveInvoice(data) {
      this.$store.dispatch('submitInvoiceForm', data);
    }
  },
  components: { NoInvoices, InvoiceForm }
}
</script>

<style lang="scss" scoped>
#invoices-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 72px auto 0;
  max-width: 730px;

  .invoice-number-label {
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    letter-spacing: -0.25px;
    color: #888EB0;
  }

  .header-items {
    display: flex;
    align-items: center;
    gap: 40px;

    #filter {
      position: relative;

      .filter-label {
        padding-bottom: 20px;
      }
    }

    #filter-dropdown {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 24px;
      width: 192px;
      border-radius: 8px;
      box-shadow: 0px 10px 20px 0px #48549F40;
      position: absolute;
      // top: 40px;
      margin-top: 20px;
      transform: translateX(-35px);
      z-index: 1;



      span {
        margin-bottom: 16px;

        input[type="checkbox"] {
          height: 16px;
          width: 16px;
          margin-right: 13px;
          accent-color: #7C5DFA;
          // background-color: #DFE3FA;
          border-radius: 2px;
        }

        label {
          font-weight: 700;
          color: #0C0E16;
          cursor: pointer;
        }
      }

    }

    span {
      cursor: pointer;
    }
  }
}

button {
  width: 150px;
  height: 48px;
  background-color: #7C5DFA;
  border-radius: 24px;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  line-height: 15px;

  &:hover {
    background-color: #9277ff;
  }
}

svg {
  margin-left: 8px;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-active,
.slide-enter-active {
  transition: transform 1.5s ease-in-out;
}
</style>