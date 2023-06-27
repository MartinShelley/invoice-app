<template>
  <div class="action-bar">
    <div class="action-bar-status">
      <span>Status</span>
      <StatusIcon :statusValue="getStatusValue" />
    </div>
    <div class="action-bar-buttons" v-if="!isMobile">
      <button :class="['button button-edit', editClass]" @click="editInvoice">Edit</button>
      <button class="button button-delete" @click="deleteInvoice">Delete</button>
      <button :class="['button button-paid', paidClass]" @click="markAsPaid">Mark as Paid</button>
    </div>
    <div class="action-bar-buttons mobile-action-bar-buttons" v-else>
      <button :class="['button button-edit', editClass]" @click="editInvoice">Edit</button>
      <button class="button button-delete" @click="deleteInvoice">Delete</button>
      <button :class="['button button-paid', paidClass]" @click="markAsPaid">Mark as Paid</button>
    </div>
  </div>
</template>

<script>
import StatusIcon from './UI/StatusIcon.vue';


export default {
  components: { StatusIcon },
  emits: ['delete-dialog', 'edit-invoice', 'mark-paid'],
  props: ['isMobile'],
  computed: {
    getStatusValue() {
      return this.$store.getters.getInvoiceStatus(this.$route.params.id);
    },
    paidClass() {
      if (this.getStatusValue != "pending") {
        return "inactive";
      }
      else {
        return ""
      }
    },
    editClass() {
      if (this.getStatusValue == "draft") {
        return ""
      }
      else {
        return "inactive"
      }
    }
  },
  methods: {
    editInvoice() {
      this.$emit('edit-invoice');
    },
    deleteInvoice() {
      this.$emit('delete-dialog');
    },
    markAsPaid() {
      this.$emit('mark-paid');
    }
  }
}

</script>

<style lang="scss" scoped>
.action-bar {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  margin-top: 32px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;

  .action-bar-status {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      color: #858BB2;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.25px;
    }
  }

  .action-bar-buttons {
    display: flex;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: -0.25px;

    .button-edit {
      background-color: #F9FAFE;
      color: #7E88C3;
    }

    .button-delete {
      background-color: #EC5757;
      color: #fff;
    }

    .button-paid {
      background-color: #7C5DFA;
      color: #fff;
    }

    .inactive {
      opacity: 0.2;
      pointer-events: none;
    }
  }
}

@media screen and (max-width: 769px) {
  
    .action-bar {
      display: block;
      margin: 32px 0 0;

      .action-bar-status {
        gap: unset;
        justify-content: space-between;
      }

      .mobile-action-bar-buttons {
        background-color: #fff;
        padding: 22px 24px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        justify-content: center;

        .button-delete, .button-edit {
          width: 89px;
        }

        .button-paid {
          width: 149px;
        }
      }
    }
  }
</style>