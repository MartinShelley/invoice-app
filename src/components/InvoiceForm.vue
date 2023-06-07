<template>
  <form id="invoice-form-overlay">
    <div class="form-heading">
      <h2 v-if="formData.id">Edit #{{ formData.id }}</h2>
      <h2 v-else>New Invoice</h2>
    </div>
    <div class="form-top-section">
      <section id="bill-from-section">
        <fieldset>
          <legend>Bill Form</legend>
          <div id="address-container" class="input-container"
            :class="{ invalid: !formErrorHandling.senderAddress.street }">
            <label for="address">Street Address</label>
            <p class="error" v-if="!formErrorHandling.senderAddress.street">can't be empty</p>
            <input type="text" id="address" v-model="formData.senderAddress.street"
              @blur="clearError(this.formErrorHandling.senderAddress.street)" />
          </div>
          <div class="col-3-wrapper">
            <div class="input-container" :class="{ invalid: !formErrorHandling.senderAddress.city }">
              <label for="city">City</label>
              <p class="error" v-if="!formErrorHandling.senderAddress.city">can't be empty</p>
              <input type="text" id="city" v-model="formData.senderAddress.city" />
            </div>
            <div class="input-container" :class="{ invalid: !formErrorHandling.senderAddress.postCode }">
              <label for="postcode">Postcode</label>
              <p class="error" v-if="!formErrorHandling.senderAddress.postCode">can't be empty</p>
              <input type="text" id="postcode" v-model="formData.senderAddress.postCode" />
            </div>
            <div class="input-container" :class="{ invalid: !formErrorHandling.senderAddress.country }">
              <label for="country">Country</label>
              <p class="error" v-if="!formErrorHandling.senderAddress.country">can't be empty</p>
              <input type="text" id="country" v-model="formData.senderAddress.country" />
            </div>
          </div>
        </fieldset>
      </section>
      <section id="bill-to-section">
        <fieldset>
          <legend>Bill To</legend>
          <div class="input-container" :class="{ invalid: !formErrorHandling.clientName }">
            <label>Client's Name</label>
            <p class="error" v-if="!formErrorHandling.clientName">can't be empty</p>
            <input type="text" v-model="formData.clientName" />
          </div>
          <div class="input-container" :class="{ invalid: !formErrorHandling.clientEmail }">
            <label>Client's Email</label>
            <p class="error" v-if="!formErrorHandling.clientEmail">can't be empty</p>
            <input type="email" placeholder="e.g. email@example.com" v-model="formData.clientEmail" />
          </div>
          <div class="input-container" :class="{ invalid: !formErrorHandling.clientAddress.street }">
            <label>Street Address</label>
            <p class="error" v-if="!formErrorHandling.clientAddress.street">can't be empty</p>
            <input type="text" v-model="formData.clientAddress.street" />
          </div>
          <div class="col-3-wrapper">
            <div class="input-container" :class="{ invalid: !formErrorHandling.clientAddress.city }">
              <label>City</label>
              <p class="error" v-if="!formErrorHandling.clientAddress.city">can't be empty</p>
              <input type="text" v-model="formData.clientAddress.city" />
            </div>
            <div class="input-container" :class="{ invalid: !formErrorHandling.clientAddress.postCode }">
              <label>Postcode</label>
              <p class="error" v-if="!formErrorHandling.clientAddress.postCode">can't be empty</p>
              <input type="text" v-model="formData.clientAddress.postCode" />
            </div>
            <div class="input-container" :class="{ invalid: !formErrorHandling.clientAddress.country }">
              <label>Country</label>
              <p class="error" v-if="!formErrorHandling.clientAddress.country">can't be empty</p>
              <input type="text" v-model="formData.clientAddress.country" />
            </div>
          </div>
          <div class="col-2-wrapper">
            <datePicker @saveInvoiceDate="updateInvoiceDate" :invalid-element="!formErrorHandling.createdAt" />
            <selectDropdown @paymentTermSelected="updatePaymentTerm" :invalid-element="!formErrorHandling.paymentTerms" />
          </div>
          <div class="input-container" :class="{ invalid: !formErrorHandling.description }">
            <label>Project Description</label>
            <p class="error" v-if="!formErrorHandling.description">can't be empty</p>
            <input type="text" placeholder="e.g. Graphic Design Service" v-model="formData.description" />
          </div>
        </fieldset>
      </section>
      <section id="item-list" :class="{ invalid: !formErrorHandling.items }">
        <h3>Item List</h3>
        <table>
          <tr>
            <th>Item Name</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          <tr v-for="(_, index) in formData.items" :key="index">
            <td><input type="text" v-model="formData.items[index].name" /></td>
            <td><input type="number" class="tb-qty" min="1" v-model="formData.items[index].quantity"
                @input="updateListItemTotal(index)" /></td>
            <td><input type="number" class="tb-price" v-model="formData.items[index].price"
                @input="updateListItemTotal(index)" /></td>
            <td class="tb-total">{{ formData.items[index].total }}</td>
            <td class="tb-delete"><img src="@/assets/icon-delete.svg" @click="deleteTableRow(index)" /></td>
          </tr>
          <tr>
            <td colspan="5"><button type="button" @click="addTableRow()">+ Add New Item</button></td>
          </tr>
        </table>
      </section>
      <div class="errors-description">
        <p v-if="!formIsValid">- All fields must be added</p>
        <p v-if="!formErrorHandling.items">- An item must be added</p>
      </div>
    </div>
    <section id="form-actions">
      <div>
        <button id="discard" type="button" @click="discardForm">Discard</button>
      </div>
      <div>
        <button id="save-draft" type="button" @click="submitForm('draft')">Save as Draft</button>
        <button id="save" type="button" @click="submitForm('pending')">Save & Send</button>
      </div>
    </section>
  </form>
</template>

<script>
import datePicker from './UI/datePicker.vue';
import selectDropdown from './UI/selectDropdown.vue';
/* eslint-disable */
export default {
  props: {
    editingForm: {
      type: Boolean,
      required: false
    }
  },
  emits: ['hideForm'],
  components: {
    datePicker,
    selectDropdown
  },
  data() {
    return {
      originalData: {},
      formData: {
        senderAddress: {
          street: '',
          city: '',
          postCode: '',
          country: ''
        },
        clientAddress: {
          street: '',
          city: '',
          postCode: '',
          country: '',
        },
        clientName: '',
        clientEmail: '',
        createdAt: '',
        paymentDue: '',
        paymentTerms: null,
        description: '',
        items: [],
        total: 0,
      },
      formErrorHandling: {
        senderAddress: {
          street: true,
          city: true,
          postCode: true,
          country: true
        },
        clientAddress: {
          street: true,
          city: true,
          postCode: true,
          country: true,
        },
        clientName: true,
        clientEmail: true,
        createdAt: true,
        paymentDue: true,
        paymentTerms: true,
        description: true,
        items: true,
        total: true,
      },
      formIsValid: true
    }
  },
  computed: {
    getTodaysDate() {
      return new Date().toISOString().slice(0, 10);
    },
    calculatingPaymentDate() {
      const paymentTerms = this.formData.paymentTerms;
      const invoiceDate = new Date(this.formData.createdAt);
      const paymentDate = new Date(invoiceDate.setDate(invoiceDate.getDate() + Number(paymentTerms))).toISOString().slice(0, 10);
      if (paymentTerms == null) {
        return ''
      }
      else {
        return paymentDate;
      }
    }
  },
  methods: {
    addTableRow() {
      this.formData.items.push({
        name: '',
        quantity: 0,
        price: 0,
        total: 0
      });
    },
    deleteTableRow(number) {
      this.formData.items.splice(number, 1);
    },
    updateListItemTotal(index) {
      this.formData.items[index].total = this.formData.items[index].price * this.formData.items[index].quantity;
    },
    updatePaymentTerm(payload) {
      this.formData.paymentTerms = payload;
    },
    discardForm() {
      this.$emit('hideForm');
      if (this.editingForm == false) {
        this.formData = {
          senderAddress: {
            street: '',
            city: '',
            postCode: '',
            country: ''
          },
          clientAddress: {
            street: '',
            city: '',
            postCode: '',
            country: '',
          },
          clientName: '',
          clientEmail: '',
          createdAt: '',
          paymentDue: '',
          paymentTerms: null,
          description: '',
          items: [],
          total: 0,
        }
      }
      else if (this.editingForm == true) {
        this.formData = JSON.parse(JSON.stringify(this.originalData));
      }
    },
    submitForm(status) {
      if (status == 'pending') {
        this.validateForm();
      }

      if (!this.formIsValid) {
        return;
      }


      let newInvoice;
      let total = 0;
      if (this.formData.items != null) {
        this.formData.items.forEach((item) => {
          total += item.total
        });
      }

      function randomIDString() {
        newInvoice = true;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        const numbers = "0123456789";
        const letter_length = 2;
        const number_length = 4;
        var randomstring = '';
        for (var i = 0; i < letter_length; i++) {
          var rnum = Math.floor(Math.random() * letters.length);
          randomstring += letters[rnum];
        }
        for (var i = 0; i < number_length; i++) {
          var rnum = Math.floor(Math.random() * numbers.length);
          randomstring += numbers[rnum];
        }
        return randomstring;
      }

      if (this.formData.createdAt == '') {
        this.formData.createdAt = this.getTodaysDate;
        console.log(this.getTodaysDate);
      }

      const submitData = {
        senderAddress: {
          street: this.formData.senderAddress.street,
          city: this.formData.senderAddress.city,
          postCode: this.formData.senderAddress.postCode,
          country: this.formData.senderAddress.country,
        },
        clientName: this.formData.clientName,
        clientEmail: this.formData.clientEmail,
        clientAddress: {
          street: this.formData.clientAddress.street,
          city: this.formData.clientAddress.city,
          postCode: this.formData.clientAddress.postCode,
          country: this.formData.clientAddress.country,
        },
        createdAt: this.formData.createdAt,
        paymentDue: this.calculatingPaymentDate,
        paymentTerms: this.formData.paymentTerms,
        description: this.formData.description,
        total: total,
        items: this.formData.items,
        status: status,
        id: this.formData.id || randomIDString(),
        newInvoice: newInvoice || ''
      }

      this.$emit('hideForm');
      this.$store.dispatch('invoiceSaved', submitData);
    },
    validateForm() {
      this.formIsValid = true;
      if (this.formData.senderAddress.street === '') {
        this.formErrorHandling.senderAddress.street = false;
        this.formIsValid = false;
      }
      if (this.formData.senderAddress.city === '') {
        this.formErrorHandling.senderAddress.city = false;
        this.formIsValid = false;
      }
      if (this.formData.senderAddress.postCode === '') {
        this.formErrorHandling.senderAddress.postCode = false;
        this.formIsValid = false;
      }
      if (this.formData.senderAddress.country === '') {
        this.formErrorHandling.senderAddress.country = false;
        this.formIsValid = false;
      }
      if (this.formData.clientAddress.street === '') {
        this.formErrorHandling.clientAddress.street = false;
        this.formIsValid = false;
      }
      if (this.formData.clientAddress.city === '') {
        this.formErrorHandling.clientAddress.city = false;
        this.formIsValid = false;
      }
      if (this.formData.clientAddress.postCode === '') {
        this.formErrorHandling.clientAddress.postCode = false;
        this.formIsValid = false;
      }
      if (this.formData.clientAddress.country === '') {
        this.formErrorHandling.clientAddress.country = false;
        this.formIsValid = false;
      }
      if (this.formData.clientName === '') {
        this.formErrorHandling.clientName = false;
        this.formIsValid = false;
      }
      if (this.formData.clientEmail === '') {
        this.formErrorHandling.clientEmail = false;
        this.formIsValid = false;
      }
      if (this.formData.createdAt === '') {
        this.formErrorHandling.createdAt = false;
        this.formIsValid = false;
      }
      if (this.formData.paymentTerms === null) {
        this.formErrorHandling.paymentTerms = false;
        this.formIsValid = false;
      }
      if (this.formData.description === '') {
        this.formErrorHandling.description = false;
        this.formIsValid = false;
      }
      if (this.formData.items.length === 0) {
        this.formErrorHandling.items = false;
        this.formIsValid = false;
      }
      if (this.formData.total === 0) {
        this.formErrorHandling.total = false;
        this.formIsValid = false;
      }
    },
    updateInvoiceDate(payload) {
      this.formData.createdAt = payload;
    }
  },

  async created() {
    if (this.editingForm == true) {
      this.originalData = JSON.parse(JSON.stringify(this.$store.getters.getInvoice(this.$route.params.id)));
      this.formData = JSON.parse(JSON.stringify(this.originalData));
    }
  },
  mounted() {
    document.querySelector('#invoice-form-overlay').scroll(0, 0);
  }
}
</script>

<style lang="scss" scoped>
#invoice-form-overlay {
  height: 100%;
  width: 719px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-y: auto;
  z-index: 2;

  .form-heading {
    padding: 56px 56px 48px 159px;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 2;
  }

  .form-top-section {
    padding: 0 56px 32px 159px;


    #bill-from-section {
      margin-bottom: 48px;

      .col-3-wrapper {
        .input-container {
          margin-bottom: 0;
        }
      }
    }

    #bill-to-section {
      margin-bottom: 32px;
    }

    #item-list {
      h3 {
        font-size: 18px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.38px;
        color: #777F98;
      }
    }

    .errors-description {
      p {
        color: #EC5757;
        font-size: 13px;
        margin-bottom: 0;
        font-weight: 600;
      }
    }
  }

  table {
    min-width: 504px;

    th {
      text-align: left;
      padding-bottom: 16px;
    }

    td {
      padding-bottom: 18px;
    }

    th:first-child,
    tr td:first-child,
    tr td:first-child input {
      width: 214px;
      padding-right: 16px;
    }

    th:nth-child(2) {
      width: 62px;
    }

    tr td:nth-child(2) {
      width: 46px;
      padding-right: 16px;
    }

    .tb-qty {
      width: 46px;
      padding-left: 16px;
    }

    .tb-qty::-webkit-outer-spin-button,
    .tb-qty::-webkit-inner-spin-button,
    .tb-price::-webkit-outer-spin-button,
    .tb-price::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    th:nth-child(3),
    tr td:nth-child(3),
    tr td:nth-child(3) input {
      width: 100px;
      padding-right: 16px;
    }

    th:nth-child(4),
    .tb-total {
      width: 56px;
    }

    .tb-total {
      font-size: 12px;
    }

    th:nth-child(5),
    .tb-delete {
      width: 39px;
    }

    .tb-delete img {
      padding-left: 27px;
      cursor: pointer;
    }

    button {
      width: 100%;
      background-color: #F9FAFE;
      color: #7E88C3;
    }
  }



  #form-actions {
    display: flex;
    justify-content: space-between;
    position: sticky;
    left: 0;
    bottom: 0;
    height: 110px;
    background-color: #fff;
    border-top-right-radius: 20px;
    width: 100%;
    border-top: 1px solid #EFEFEF;
    padding: 31px 56px 31px 159px;

    button {
      height: 48px;
      font-size: 12px;
      line-height: 15px;
      font-weight: 700;
      letter-spacing: -0.25px;
      border-radius: 24px;
      padding: 17px 24px;
      border: 0;
    }

    #discard {
      color: #7E88C3;
      background-color: #F9FAFE;
    }

    #save-draft {
      background-color: #373B53;
      color: #888EB0;
    }

    #save {
      background-color: #7C5DFA;
      color: #fff;
      margin-left: 8px;
    }
  }

  section {
    fieldset {
      border: 0;

      legend {
        margin-bottom: 24px;
        color: #7C5DFA;

      }

      .col-3-wrapper {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: repeat(3, 152px);
        column-gap: 24px;
      }

      .col-2-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 240px);
        grid-template-rows: 1fr;
        column-gap: 24px;
      }

      .input-container {
        // display: flex;
        // flex-direction: column;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 0.5fr 1fr;
        margin-bottom: 24px;
        position: relative;

        label {
          // margin-bottom: 10px;
          color: #7E88C3;
          font-size: 12px;
          font-weight: 500;
          line-height: 15px;
        }

        .error {
          font-size: 10px;
          color: #EC5757;
          text-align: right;
          font-weight: 600;
          margin-bottom: 0;
        }

        input {
          grid-column: 1 / 3;
        }
      }
    }
  }
}

.invalid {

  label,
  h3 {
    color: #EC5757 !important;
  }

  input {
    border-color: #EC5757 !important;
  }
}

#discard-confirmation {
  display: block;
  position: absolute;
  left: 50%;
  width: 400px;
  z-index: 500;
  height: 200px;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;

  h2 {
    margin-bottom: 24px;
  }
}

h2 {
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.5px;
  // margin-bottom: 48px;
}

select {
  height: 48px;
  padding-left: 20px;
  -moz-appearance: none;
  /* Firefox */
  -webkit-appearance: none;
  /* Safari and Chrome */
  appearance: none;
  background: transparent;
  background-image: url("@/assets/icon-arrow-down.svg");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 50%;
  font-weight: 700;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -moz-appearance: none;
  /* Firefox */
  -webkit-appearance: none;
  /* Safari and Chrome */
  appearance: none;
}

input[type="date"] {
  background-image: url("@/assets/icon-calendar.svg");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 50%;
}

p {
  margin-bottom: 24px;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #fff;
  // padding-right: 8px;
}

::-webkit-scrollbar-thumb {
  background: #DFE3FA;
  border-radius: 4px;
  // background-clip: padding-box;
  // border-right: 10px solid white;
}

::-webkit-scrollbar-thumb:hover {
  background: #7C5DFA;
}
</style>