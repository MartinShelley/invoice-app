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
      <div class="invoice-id">
        <h3><span>#</span>{{ invoiceDetails.id }}</h3>
        <p>{{ invoiceDetails.description }}</p>
      </div>
      <div class="sender-address-info">
        <p>{{ invoiceDetails.senderAddress.street }}</p>
        <p>{{ invoiceDetails.senderAddress.city }}</p>
        <p>{{ invoiceDetails.senderAddress.postCode }}</p>
        <p>{{ invoiceDetails.senderAddress.country }}</p>
      </div>
    </div>
    <div class="invoice-info">
      <div class="invoice-dates">
        <div>
          <p class="title">Invoice Date</p>
          <h4>{{ invoiceDetails.createdAt }}</h4>
        </div>
        <div>
          <p class="title">Payment Due</p>
          <h4>{{ invoiceDetails.paymentDue }}</h4>
        </div>
      </div>
      <div class="invoice-bill-to">
        <p class="title">Bill To</p>
        <h4>{{ invoiceDetails.clientName }}</h4>
        <p>{{ invoiceDetails.senderAddress.street }}</p>
        <p>{{ invoiceDetails.senderAddress.city }}</p>
        <p>{{ invoiceDetails.senderAddress.postCode }}</p>
        <p>{{ invoiceDetails.senderAddress.country }}</p>
      </div>
      <div class="invoice-client-email">
        <p class="title">Sent to</p>
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
          <td>£{{ item.price.toFixed(2) }}</td>
          <td>£{{ item.total.toFixed(2) }}</td>
        </tr>
      </table>
    </div>
    <div class="invoice-total">
      <p>Amount Due</p>
      <h3>£{{ invoiceDetails.total.toFixed(2) }}</h3>
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
  padding: 48px;

  p {
    font-size: 12px;
    color: #7E88C3;
    line-height: 15px;
    letter-spacing: -0.25px;
  }

  .invoice-heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 21px;


    h3 {
      color: #0C0E16;
    }

    span {
      color: #888EB0;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.8px;
    }

    .sender-address-info {
      text-align: right;

      p {
        font-size: 11px;
        letter-spacing: -0.23px;
        line-height: 18px;
      }
    }
  }

  .invoice-info {
    display: flex;
    gap: 100px;
    margin-bottom: 45px;

    .title {
      margin-bottom: 12px;
    }

    h4 {
      font-size: 15px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: -0.31px;
    }

    .invoice-dates {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .invoice-bill-to {
      h4 {
        margin-bottom: 8px;
      }
    }
  }

  .invoice-items {
    background-color: #F9FAFE;
    border-radius: 8px 8px 0px 0px;
    padding: 32px 32px 8px;

    table {
      width: 100%;

      th {
        font-size: 11px;
        line-height: 18px;
        letter-spacing: -0.23px;
        color: #7E88C3;
        padding-bottom: 32px;
      }

      th:first-child {
        text-align: left;
      }

      th:nth-child(2) {
        text-align: center;
      }

      th:nth-child(3),
      th:last-child {
        text-align: right;
      }

      td {
        font-size: 12px;
        font-weight: 700;
        line-height: 15px;
        letter-spacing: -0.25px;
        padding-bottom: 32px;
      }

      tr {
        td:nth-child(2) {
          text-align: center;
        }

        td:nth-child(3),
        td:last-child {
          text-align: right;
        }

      }


      td:nth-child(2),
      td:nth-child(3) {
        color: #7E88C3;

      }
    }
  }

  .invoice-total {
    display: flex;
    justify-content: space-between;
    background-color: #373B53;
    border-radius: 0px 0px 8px 8px;
    padding: 24px 32px;

    p,
    h3 {
      color: #fff;
    }

    p {
      font-size: 11px;
      letter-spacing: -0.23px;
      line-height: 18px;
    }
  }

}
</style>