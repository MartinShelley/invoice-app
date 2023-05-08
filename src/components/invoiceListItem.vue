<template>
  <li>
    <p id="invoice-id"><span>#</span>{{ value.id }}</p>
    <p class="invoice-text">Due {{ transformDate }}</p>
    <p class="invoice-text">{{ value.clientName }}</p>
    <h3 id="invoice-price">{{ formattingPrice }}</h3>
    <div :class="['invoice-status', settingStatusClass]">
      <svg height="8" width="8">
        <circle cx="4" cy="4" r="4" />
      </svg>
      <p>{{ value.status }}</p>
    </div>
    <img src="@/assets/icon-arrow-right.svg" />
  </li>
</template>

<script>

export default {
  props: { value: Object },
  computed: {
    transformDate() {
      var date = new Date(this.value.paymentDue);
      var dateParts = date.toDateString().slice(4).split(' ');
      return `${dateParts[1]} ${dateParts[0]} ${dateParts[2]}`;
    },
    settingStatusClass() {
      return {
        "invoice-status-paid": this.value.status == "paid",
        "invoice-status-pending": this.value.status == "pending",
        "invoice-status-draft": this.value.status == "draft",
      }
    },
    formattingPrice() {
      return this.value.total.toLocaleString('en-gb', {
        style: 'currency',
        currency: 'GBP'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  background-color: #fff;
  padding: 16px 32px;
  margin-bottom: 16px;
  border-radius: 8px;

  #invoice-id {
    color: #0C0E16;
    font-weight: 700;
    letter-spacing: -0.25px;

    span {
      color: #7E88C3;
      font-weight: normal;
    }
  }

  .invoice-text {
    color: #888EB0;
    letter-spacing: -0.25px;
  }

  #invoice-price {}

  .invoice-status {
    width: 104px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-transform: capitalize;
    border-radius: 6px;
    padding: 13px 17px;
    text-align: center;
  }

  .invoice-status-paid {
    background-color: rgba(51, 214, 159, 0.06);

    circle {
      fill: #33D69F;
    }

    p {
      color: #33D69F;
    }
  }

  .invoice-status-pending {
    background-color: rgba(255, 143, 0, 0.06);

    circle {
      fill: #FF8F00;
    }

    p {
      color: #FF8F00;
    }
  }

  .invoice-status-draft {
    background-color: rgba(55, 59, 83, 0.06);

    circle {
      fill: #373B53;
    }

    p {
      color: #373B53;
    }
  }
}
</style>