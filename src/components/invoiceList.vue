<template>
  <ul>
    <InvoiceListItem v-for="invoice in allInvoices" :key="invoice.id" :value="invoice" />
  </ul>
</template>

<script>
import InvoiceListItem from '@/components/invoiceListItem.vue';
export default {
  computed: {
    allInvoices() {
      return this.$store.getters['getAllInvoices'];
    }
  },
  components: { InvoiceListItem },
}
</script>

<style lang="scss" scoped></style>