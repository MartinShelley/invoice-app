<template>
  <div :class="['invoice-status', settingStatusClass]">
    <svg height="8" width="8">
      <circle cx="4" cy="4" r="4" />
    </svg>
    <p>{{ statusValue }}</p>
  </div>
</template>

<script>
export default {
  props: { statusValue: String },
  computed: {
    settingStatusClass() {
      return {
        "invoice-status-paid": this.statusValue == "paid",
        "invoice-status-pending": this.statusValue == "pending",
        "invoice-status-draft": this.statusValue == "draft",
      }
    },
    lightMode() {
      return this.$store.getters['getLightModeToggle'];
    }
  }
}
</script>

<style lang="scss" scoped>
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
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
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

.dark-mode {
  .invoice-status-draft {
    background-color: rgba(223, 227, 250, 0.05);

    circle {
      fill: #DFE3FA;
    }

    p {
      color: #DFE3FA;
    }
  }
}
</style>