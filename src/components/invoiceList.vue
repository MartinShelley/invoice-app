<template>
  <ul>
    <InvoiceListItem v-for="invoice in data" :key="invoice.id" :value="invoice" />
  </ul>
</template>

<script>
import InvoiceListItem from '@/components/invoiceListItem.vue';
import data from '@/data.json';
export default {
  data() {
    return {
      data: data
    }
  },
  components: { InvoiceListItem },
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  background-color: #fff;
  padding: 29px 32px;
}
</style>