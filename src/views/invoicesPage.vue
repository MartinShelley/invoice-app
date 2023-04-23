<template>
    <div id="invoices-header">
      <div class="heading">
        <h1>Invoices</h1>
        <p>No Invoices</p>
      </div>
      <div class="header-items">
        <span>Filter by status <img src="@/assets/icon-arrow-down.svg" /></span>
        <button>
          <svg height="32" width="32">
            <circle cx="16" cy="16" r="16" fill="white" />
            <image href="@/assets/icon-plus.svg" width="10" height="10" x="11" y="10"/>
          </svg>
          New Invoice
        </button>
      </div>
    </div>
    <NoInvoices />
</template>

<script>
import NoInvoices from '@/components/NoInvoices.vue';

export default {
  components: { NoInvoices }
}
</script>

<style lang="scss" scoped>
#invoices-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 72px auto 0;
  max-width: 730px;

  .header-items {
    display: flex;
    align-items: center;
    gap: 40px;
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
}
svg {
  margin-left: 8px;
}
</style>