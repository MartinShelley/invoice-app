<template>
  <li>
    <router-link :to="invoiceDetailLink">
      <div class="invoice-item-left-container">
        <p id="invoice-id"><span>#</span>{{ value.id }}</p>
        <p id="invoice-date" class="invoice-text">{{ transformDate }}</p>
        <p id="invoice-client" class="invoice-text">{{ value.clientName }}</p>
      </div>
      <div class="invoice-item-right-container">
        <h3 id="invoice-price">{{ formattingPrice }}</h3>
        <StatusIcon :statusValue="value.status" />
        <img src="@/assets/icon-arrow-right.svg" />
      </div>
    </router-link>
  </li>
</template>

<script>
import StatusIcon from './UI/StatusIcon.vue';

export default {
  props: { value: Object },
  computed: {
    transformDate() {
      if (this.value.paymentDue != "") {
        var date = new Date(this.value.paymentDue);
        var dateParts = date.toDateString().slice(4).split(" ");
        return `Due ${dateParts[1]} ${dateParts[0]} ${dateParts[2]}`;
      }
      else {
        return ''
      }
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
  components: { StatusIcon },
}
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
  background-color: var(--background-second-color);
  padding: 16px 32px;
  margin-bottom: 16px;
  border-radius: 8px;

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    gap: 73px;

    .invoice-item-left-container {
      display: flex;
      gap: 43px;

      #invoice-id {
        color: var(--main-font-color);
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
    }

    .invoice-item-right-container {
      display: flex;
      // column-gap: 40px;
      align-items: center;

      #invoice-price {
        color: var(--main-font-color);
        font-size: 16px;
        line-height: 24px;
        font-weight: 700;
        margin-right: 40px;
      }

      img {
        margin-left: 20px;
      }
    }

  }

  &:hover {
    border: 1px solid #7C5DFA;
    cursor: pointer;
  }
}

@media screen and (max-width: 1024px) and (min-width: 768px) {
  li {
    a {
      gap: 27px;

      .invoice-item-left-container {

        #invoice-id {
          width: 50px;
        }

        .invoice-text {
          width: 100px;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  li {
    padding: 24px;

    a {
      display: unset;

      .invoice-item-left-container {
        display: grid;
        grid-template-areas: "id name"
          "date .";
        row-gap: 24px;

        #invoice-id {
          grid-area: id;
        }

        #invoice-date {
          grid-area: date;
          margin-bottom: 8px;
        }

        #invoice-client {
          grid-area: name;
          text-align: right;
        }
      }

      .invoice-item-right-container {
        display: grid;
        grid-template-areas: "price label"
          ". label";
        position: relative;

        #invoice-price {
          margin-right: 0;
          grid-area: price;
        }

        .invoice-status {
          grid-area: label;
          position: absolute;
          bottom: 0;
          right: 0;
        }

        img {
          display: none;
        }
      }
    }
  }
}
</style>
