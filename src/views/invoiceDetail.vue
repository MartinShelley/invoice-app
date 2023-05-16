<template>
  <div class="invoice-header">
    <router-link class="go-back" to="/">
      <img src="@/assets/icon-arrow-left.svg" />
      <span>Go back</span>
    </router-link>
    <InvoiceActionBar />
  </div>
  <div class="invoice-main">
    <div class="invoice-heading">
      <div>
        <h3>#{{ invoiceDetails.id }}</h3>
        <p>{{ invoiceDetails.description }}</p>
      </div>
      <div>
        <p>{{ invoiceDetails.senderAddress.street }}</p>
        <p>{{ invoiceDetails.senderAddress.city }}</p>
        <p>{{ invoiceDetails.senderAddress.postCode }}</p>
        <p>{{ invoiceDetails.senderAddress.country }}</p>
      </div>
    </div>
    <div class="invoice-info">
      <div class="invoice-dates">
        <div>
          <p>Invoice Date</p>
          <h4>{{ invoiceDetails.createdAt }}</h4>
        </div>
        <div>
          <p>Payment Due</p>
          <h4>{{ invoiceDetails.paymentDue }}</h4>
        </div>
      </div>
      <div class="invoice-bill-to">
        <p>Bill To</p>
        <h4>{{ invoiceDetails.clientName }}</h4>
        <p>{{ invoiceDetails.senderAddress.street }}</p>
        <p>{{ invoiceDetails.senderAddress.city }}</p>
        <p>{{ invoiceDetails.senderAddress.postCode }}</p>
        <p>{{ invoiceDetails.senderAddress.country }}</p>
      </div>
      <div class="invoice-client-email">
        <p>Sent to</p>
        <h4>{{ invoiceDetails.clientEmail }}</h4>
      </div>
    </div>
    <div class="invoice-items">
      <table>
        <tr>
          <th>Item Name</th>
          <th>QTY.</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        <tr v-for="(item, index) in invoiceDetails.items" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>£{{ item.price }}</td>
          <td>£{{ item.total }}</td>
        </tr>
      </table>
    </div>
    <div class="invoice-total">
      <p>Amount Due</p>
      <h3>£{{ invoiceDetails.total }}</h3>
    </div>
  </div>
</template>

<script>
import InvoiceActionBar from '@/components/InvoiceActionBar.vue';
export default {
  components: {
    InvoiceActionBar
  },
  computed: {
    invoiceDetails() {
      return this.$store.getters.getInvoice(this.$route.params.id);
    }
  }
}

</script>

<style lang="scss" scoped>
.invoice-header {
  margin: 64px auto 0;
  max-width: 730px;

  .go-back {
    text-decoration: none;
    color: #0C0E16;
    font-size: 12px;
    line-height: 15px;
    font-weight: 700;
    letter-spacing: -0.25px;

    // margin-bottom: 32px;

    img {
      margin-right: 23px;
    }
  }
}

.invoice-main {
  background-color: #fff;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;
  margin-top: 24px;
  padding: 48px 48px 48px 24px;

  .invoice-heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 21px;
  }

  .invoice-info {
    display: flex;
    gap: 100px;
    margin-bottom: 45px;
  }
}
</style>