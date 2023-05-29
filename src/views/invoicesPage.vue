<template>
  <div id="invoices-header">
    <div class="heading">
      <h1>Invoices</h1>
      <p class="invoice-number-label" v-if="noOfInvoices">There are {{ noOfInvoices }} total invoices</p>
      <p class="invoice-number-label" v-else>No Invoices</p>
    </div>
    <div class="header-items">
      <div id="filter" @mouseover="mouseOver" @mouseleave="mouseleave">
        <span class="filter-label">Filter by status <img src="@/assets/icon-arrow-down.svg" /></span>
        <div id="filter-dropdown" v-show="this.filterHover">
          <span>
            <input type="checkbox" id="filter-draft" name="filter-draft" value="Draft" v-model="selectedFilters.draft" />
            <label for="filter-draft">Draft</label>
          </span>
          <span>
            <input type="checkbox" id="filter-pending" name="filter-pending" value="Pending"
              v-model="selectedFilters.pending" />
            <label for="filter-pending">Pending</label>
          </span>
          <span>
            <input type="checkbox" id="filter-paid" name="filter-paid" value="Paid" v-model="selectedFilters.paid" />
            <label for="filter-paid">Paid</label>
          </span>
        </div>
      </div>
      <button @click="showForm">
        <svg height="32" width="32">
          <circle cx="16" cy="16" r="16" fill="white" />
          <image href="@/assets/icon-plus.svg" width="10" height="10" x="11" y="11" />
        </svg>
        New Invoice
      </button>
    </div>
  </div>
  <div v-if="noOfInvoices" style="margin-top:65px;">
    <InvoiceList :filters="selectedFilters" />
  </div>
  <NoInvoices v-else />
  <div id="invoice-form-background" v-show="showFormToggle" @click="backgroundClick"></div>
  <Transition name="slide">
    <InvoiceForm v-show="showFormToggle" @hide-form="hideForm" />
  </Transition>
</template>

<script>

import NoInvoices from '@/components/NoInvoices.vue';
import InvoiceForm from '@/components/InvoiceForm.vue';
import InvoiceList from '@/components/invoiceList.vue';
export default {
  data() {
    return {
      filterHover: false,
      selectedFilters: {
        paid: false,
        pending: false,
        draft: false
      }
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
      this.$store.commit('toggleShowForm', false);
      document.body.style.overflow = "";
    },
    showForm() {
      this.$store.commit('toggleShowForm', true);
      document.body.style.overflow = "hidden";
    },
    backgroundClick() {
      this.$store.commit('toggleShowForm', false);
      document.body.style.overflow = "";
    }
  },
  computed: {
    noOfInvoices() {
      return this.$store.getters['getNumberOfInvoices'];
    },
    showFormToggle() {
      return this.$store.getters.getShowFormToggle;
    }
  },
  components: { NoInvoices, InvoiceForm, InvoiceList }
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
        padding-bottom: 30px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: -0.25px;
        line-height: 15px;

        img {
          margin-left: 16px;
        }
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
        display: flex;
        align-items: center;
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
          font-size: 12px;
          line-height: 15px;
          letter-spacing: -0.25px;
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
  font-size: 12px;
  line-height: 15px;
  padding: 0 8px;

  &:hover {
    background-color: #9277ff;
  }
}

#invoice-form-background {
  background-color: #000;
  opacity: 0.5;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
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
  transition: transform 0.75s ease-out;
}
</style>