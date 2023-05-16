<template>
  <li>
    <router-link :to="invoiceDetailLink">
      <p id="invoice-id"><span>#</span>{{ value.id }}</p>
      <p class="invoice-text">Due {{ transformDate }}</p>
      <p class="invoice-text">{{ value.clientName }}</p>
      <h3 id="invoice-price">{{ formattingPrice }}</h3>
      <StatusIcon :statusValue="value.status" />
      <img src="@/assets/icon-arrow-right.svg" />
    </router-link>
  </li>
</template>

<script>
import StatusIcon from './UI/StatusIcon.vue';


export default {
  props: { value: Object },
  computed: {
    transformDate() {
      var date = new Date(this.value.paymentDue);
      var dateParts = date.toDateString().slice(4).split(" ");
      return `${dateParts[1]} ${dateParts[0]} ${dateParts[2]}`;
    },
    formattingPrice() {
      return this.value.total.toLocaleString("en-gb", {
        style: "currency",
        currency: "GBP"
      });
    },
    invoiceDetailLink() {
      return this.$route.path + "invoice/" + this.value.id;
    }
  },
  components: { StatusIcon }
}
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
  background-color: #fff;
  padding: 16px 32px;
  margin-bottom: 16px;
  border-radius: 8px;

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;


    #invoice-id {
      color: #0C0E16;
      font-weight: 700;
      letter-spacing: -0.25px;
      font-size: 12px;
      line-height: 15px;

      span {
        color: #7E88C3;
        font-weight: normal;
      }
    }

    .invoice-text {
      color: #888EB0;
      letter-spacing: -0.25px;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
    }

    #invoice-price {
      color: #000;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
    }
  }
}
</style>