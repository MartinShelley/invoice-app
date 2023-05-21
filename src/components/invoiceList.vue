<template>
  <ul>
    <InvoiceListItem v-for="invoice in filteredList" :key="invoice.id" :value="invoice" />
  </ul>
</template>

<script>
import InvoiceListItem from '@/components/invoiceListItem.vue';
import { mapGetters } from 'vuex';
export default {
  props: {
    filters: Object
  },
  computed: {
    ...mapGetters({
      allInvoices: 'getAllInvoices'
    }),
    filteredList() {
      const allInvoices = this.allInvoices;
      const filters = [];
      for (const key of Object.keys(this.filters)) {
        if (this.filters[key] === true) {
          filters.push(key);
        }
      }
      if (filters.length == 0) {
        return allInvoices;
      }
      else {
        const fileredList = allInvoices.filter((invoice) => {
          return filters.includes(invoice.status)
        });
        return fileredList;
      }
    }
  },
  watch: {
    allInvoices() {

    }
  },
  components: { InvoiceListItem },
}
</script>

<style lang="scss" scoped></style>