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
            :class="{ invalid: !formErrorHandling.senderAddressStreet }">
            <label for="address">Street Address</label>
            <p class="error" v-if="!formErrorHandling.senderAddressStreet">can't be empty</p>
            <input type="text" id="address" v-model="formData.senderAddress.street"
              @blur="clearErrors('senderAddressStreet')" />
          </div>
          <div :class="{ 'col-3-wrapper': !isMobile, 'col-2-wrapper': isMobile }">
            <div class="input-container" :class="{ invalid: !formErrorHandling.senderAddressCity }">
              <label for="city">City</label>
              <p class="error" v-if="!formErrorHandling.senderAddressCity">can't be empty</p>
              <input type="text" id="city" v-model="formData.senderAddress.city"
                @blur="clearErrors('senderAddressCity')" />
            </div>
            <div class="input-container" :class="{ invalid: !formErrorHandling.senderAddressPostCode }">
              <label for="postcode">Postcode</label>
              <p class="error" v-if="!formErrorHandling.senderAddressPostCode">can't be empty</p>
              <input type="text" id="postcode" v-model="formData.senderAddress.postCode"
                @blur="clearErrors('senderAddressPostCode')" />
            </div>
            <div class="input-container" :class="{ invalid: !formErrorHandling.senderAddressCountry }">
              <label for="country">Country</label>
              <p class="error" v-if="!formErrorHandling.senderAddressCountry">can't be empty</p>
              <input type="text" id="country" v-model="formData.senderAddress.country"
                @blur="clearErrors('senderAddressCountry')" />
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
            <input type="text" v-model="formData.clientName" @blur="clearErrors('clientName')" />
          </div>
          <div class="input-container"
            :class="{ invalid: !formErrorHandling.clientEmail || !formErrorHandling.clientEmailValid }">
            <label>Client's Email</label>
            <p class="error" v-if="!formErrorHandling.clientEmail">can't be empty</p>
            <p class="error" v-if="!formErrorHandling.clientEmailValid">enter valid email</p>
            <input type="email" placeholder="e.g. email@example.com" v-model="formData.clientEmail"
              @blur="clearErrors('clientEmail')" @keyup="validatedEmailInput($event)" />
          </div>
          <div class="input-container" :class="{ invalid: !formErrorHandling.clientAddressStreet }">
            <label>Street Address</label>
            <p class="error" v-if="!formErrorHandling.clientAddressStreet">can't be empty</p>
            <input type="text" v-model="formData.clientAddress.street" @blur="clearErrors('clientAddressStreet')" />
          </div>
          <div :class="{ 'col-3-wrapper': !isMobile, 'col-2-wrapper': isMobile }">
            <div class="input-container" :class="{ invalid: !formErrorHandling.clientAddressCity }">
              <label>City</label>
              <p class="error" v-if="!formErrorHandling.clientAddressCity">can't be empty</p>
              <input type="text" v-model="formData.clientAddress.city" @blur="clearErrors('clientAddressCity')" />
            </div>
            <div class="input-container" :class="{ invalid: !formErrorHandling.clientAddressPostCode }">
              <label>Postcode</label>
              <p class="error" v-if="!formErrorHandling.clientAddressPostCode">can't be empty</p>
              <input type="text" v-model="formData.clientAddress.postCode" @blur="clearErrors('clientAddressPostCode')" />
            </div>
            <div class="input-container" :class="{ invalid: !formErrorHandling.clientAddressCountry }">
              <label>Country</label>
              <p class="error" v-if="!formErrorHandling.clientAddressCountry">can't be empty</p>
              <input type="text" v-model="formData.clientAddress.country" @blur="clearErrors('clientAddressCountry')" />
            </div>
          </div>
          <div :class="{ 'col-2-wrapper': !isMobile }">
            <datePicker @clearDatePickerError="clearErrors('createdAt')" @saveInvoiceDate="updateInvoiceDate"
              :invalid-element="!formErrorHandling.createdAt" />
            <selectDropdown @clearSelectDropdownError="clearErrors('paymentTerms')"
              @paymentTermSelected="updatePaymentTerm" :invalid-element="!formErrorHandling.paymentTerms" />
          </div>
          <div class="input-container" :class="{ invalid: !formErrorHandling.description }">
            <label>Project Description</label>
            <p class="error" v-if="!formErrorHandling.description">can't be empty</p>
            <input type="text" placeholder="e.g. Graphic Design Service" v-model="formData.description"
              @blur="clearErrors('description')" />
          </div>
        </fieldset>
      </section>
      <section id="item-list" :class="{ invalid: !formErrorHandling.items }">
        <h3>Item List</h3>
        <table>
          <tr v-if=!isMobile>
            <th>Item Name</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          <tr v-for="(_, index) in formData.items" :key="index">
            <td class="tb-name"><label v-if=isMobile>Item Name</label><input type="text"
                v-model="formData.items[index].name" @blur="checkItems" /></td>
            <td class="tb-quantity"><label v-if=isMobile>Qty.</label><input type="number" class="tb-qty" min="1"
                v-model="formData.items[index].quantity" @input="updateListItemTotal(index)" @blur="checkItems" /></td>
            <td class="tb-price"><label v-if=isMobile>Price</label><input type="number" class="tb-price"
                v-model="formData.items[index].price" @input="updateListItemTotal(index)" @blur="checkItems" /></td>
            <td class="tb-total"><label v-if=isMobile>Total</label>{{ formData.items[index].total }}</td>
            <td class="tb-delete"><img src="@/assets/icon-delete.svg" @click="deleteTableRow(index)" /></td>
          </tr>
        </table>
        <div class="button-container"><button type="button" @click="addTableRow()">+ Add New Item</button></div>
      </section>
      <div class="errors-description">
        <p v-if="!formIsValid">- All fields must be added</p>
        <p v-if="!formErrorHandling.items">- An item must be added</p>
      </div>
    </div>
    <section class="form-actions" v-if=!editingForm>
      <div>
        <button id="discard" type="button" @click="discardForm">Discard</button>
      </div>
      <div>
        <button id="save-draft" type="button" @click="submitForm('draft')">Save as Draft</button>
        <button id="save" type="button" @click="submitForm('pending')">Save & Send</button>
      </div>
    </section>
    <section class="form-actions" id="form-actions-editing" v-else>
      <div>
        <button id="discard" type="button" @click="discardForm">Cancel</button>
        <button id="save" type="button" @click="submitForm('draft')">Save Changes</button>
      </div>
    </section>
  </form>
</template>

<script>
import datePicker from './UI/datePicker.vue';
import selectDropdown from './UI/selectDropdown.vue';
export default {
  props: {
    editingForm: {
      type: Boolean,
      required: false
    },

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
      },
      formErrorHandling: {
        senderAddressStreet: true,
        senderAddressCity: true,
        senderAddressPostCode: true,
        senderAddressCountry: true,
        clientAddressStreet: true,
        clientAddressCity: true,
        clientAddressPostCode: true,
        clientAddressCountry: true,
        clientName: true,
        clientEmail: true,
        clientEmailValid: true,
        createdAt: true,
        paymentDue: true,
        paymentTerms: true,
        description: true,
        items: true,
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
    },
    isMobile() {
      return this.$store.getters.getIsMobile;
    },
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
    checkItems() {
      this.formData.items.forEach((item) => {
        if (item.name === '' || item.total === 0) {
          this.formErrorHandling.items = false;
        }
        else {
          this.formErrorHandling.items = true;
        }
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
    validatedEmailInput(event) {
      if (event.key == '@' || event.keyCode == 192) {
        this.formErrorHandling.clientEmailValid = true;
      }
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
      this.clearErrors('all');
      this.formIsValid = true;
    },
    submitForm(status) {
      if (status == 'pending') {
        this.validateForm();
        if (!this.formIsValid) {
          return;
        }
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
        for (var j = 0; j < number_length; j++) {
          var rnum2 = Math.floor(Math.random() * numbers.length);
          randomstring += numbers[rnum2];
        }
        return randomstring;
      }

      if (this.formData.createdAt == '') {
        this.formData.createdAt = this.getTodaysDate;
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
      this.discardForm();
    },
    clearErrors(label) {
      Object.entries(this.formErrorHandling).forEach((input) => {
        if (input[0] == label || label == 'all') {
          this.formErrorHandling[input[0]] = true;
        }
      })
      this.formIsValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      this.clearErrors('all');
      if (this.formData.senderAddress.street === '') {
        this.formErrorHandling.senderAddressStreet = false;
        this.formIsValid = false;
      }
      if (this.formData.senderAddress.city === '') {
        this.formErrorHandling.senderAddressCity = false;
        this.formIsValid = false;
      }
      if (this.formData.senderAddress.postCode === '') {
        this.formErrorHandling.senderAddressPostCode = false;
        this.formIsValid = false;
      }
      if (this.formData.senderAddress.country === '') {
        this.formErrorHandling.senderAddressCountry = false;
        this.formIsValid = false;
      }
      if (this.formData.clientAddress.street === '') {
        this.formErrorHandling.clientAddressStreet = false;
        this.formIsValid = false;
      }
      if (this.formData.clientAddress.city === '') {
        this.formErrorHandling.clientAddressCity = false;
        this.formIsValid = false;
      }
      if (this.formData.clientAddress.postCode === '') {
        this.formErrorHandling.clientAddressPostCode = false;
        this.formIsValid = false;
      }
      if (this.formData.clientAddress.country === '') {
        this.formErrorHandling.clientAddressCountry = false;
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
      if (!this.formData.clientEmail.includes('@')) {
        this.formErrorHandling.clientEmailValid = false;
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
      if (this.formData.items.length > 0) {
        this.checkItems();
      }
    },
    updateInvoiceDate(payload) {
      this.formData.createdAt = payload;
    },
  },

  async created() {
    if (this.editingForm == true) {
      this.originalData = JSON.parse(JSON.stringify(this.$store.getters.getInvoice(this.$route.params.id)));
      this.formData = JSON.parse(JSON.stringify(this.originalData));
    }
  },
  mounted() {
    document.querySelector('#invoice-form-overlay').scroll(0, 0);
  },
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
  overflow-y: hidden;
  z-index: 2;
  border-radius: 0 20px 20px 0;

  .form-heading {
    padding: 56px 56px 48px 159px;
    position: sticky;
    top: 0;
    z-index: 2;

    h2 {
      color: var(--main-font-color);
    }
  }

  .form-top-section {
    padding: 0 56px 100px 159px;
    height: 80%;
    overflow-y: scroll;


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
      margin-bottom: 50px;

      h3 {
        font-size: 18px;
        font-weight: 700;
        line-height: 32px;
        letter-spacing: -0.38px;
        color: #777F98;
        margin-bottom: 16px;
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
      color: var(--grey-font-color);
    }

    td {
      padding-bottom: 18px;
    }

    th:first-child,
    tr .tb-name,
    tr .tb-name input {
      width: 214px;
      padding-right: 16px;
    }

    th:nth-child(2) {
      width: 62px;
    }

    tr .tb-quantity {
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
    tr .tb-price,
    tr .tb-price input {
      width: 100px;
      padding-right: 16px;
    }

    th:nth-child(4),
    .tb-total {
      width: 56px;
    }

    .tb-total {
      font-size: 12px;
      color: var(--grey-font-color);
    }

    th:nth-child(5),
    .tb-delete {
      width: 39px;
    }

    .tb-delete img {
      padding-left: 27px;
      cursor: pointer;
    }
  }

  .button-container button {
    width: 100%;
    background-color: var(--invoice-detail-items-background);
    color: var(--invoice-detail-font-color);

    &:hover {
      background-color: #DFE3FA;
      color: #7E88C3;
    }
  }

  .form-actions {
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

      &:hover {
        background-color: #DFE3FA;
      }
    }

    #save-draft {
      background-color: #373B53;
      color: #888EB0;

      &:hover {
        background-color: #0C0E16;
      }
    }

    #save {
      background-color: #7C5DFA;
      color: #fff;
      margin-left: 8px;

      &:hover {
        background-color: #9277FF;
      }
    }
  }

  #form-actions-editing {
    justify-content: flex-end;
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
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 0.5fr 1fr;
        margin-bottom: 24px;
        position: relative;

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

  label {
    margin-bottom: 10px;
    color: var(--invoice-detail-font-color);
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
  }
}

.dark-mode {

  #invoice-form-overlay,
  #invoice-form-overlay .form-actions {
    background-color: #141625;
  }

  #invoice-form-overlay .form-actions {
    border-top: unset;

    #save-draft {
      &:hover {
        background-color: #1E2139;
        color: #DFE3FA;
      }
    }

    #discard {
      color: #DFE3FA;
      background-color: #252945;

      &:hover {
        background-color: #F9FAFE;
        color: #7E88C3;
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
  margin-bottom: 80px;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--form-scrollbar-thumb);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7C5DFA;
}


@media screen and (max-width: 1024px) {
  #invoice-form-overlay {
    top: 80px;

    .form-heading {
      padding: 56px 56px 48px;
    }

    .form-top-section {
      padding: 0 56px;
    }
  }
}

@media screen and (max-width: 1024px) and (min-width: 768px) {
  #invoice-form-overlay {
    width: 616px;

    section fieldset .col-2-wrapper {
      margin-top: 24px;
    }

    .form-top-section {
      height: calc(100vh - 216px - 110px);

      #item-list {
        margin-bottom: unset;
      }
    }

    .form-actions {
      padding: 31px 56px;
    }
  }
}

@media screen and (max-width: 767px) {
  #invoice-form-overlay {
    width: 100%;
    border-radius: unset;
    overflow: auto;

    .form-heading {
      padding: 32px 24px 24px;
    }

    .form-top-section {
      padding: 0 24px 150px;
      height: unset;
      overflow-y: unset;

      #bill-from-section {
        margin-bottom: 40px;
      }
    }

    section fieldset .col-2-wrapper {

      grid-template-columns: repeat(2, 1fr);

      .input-container:last-child {
        grid-column: 1 / 3;
      }
    }

    #bill-from-section fieldset .col-2-wrapper .input-container:last-child {
      margin-bottom: 0;
    }

    table {
      width: 100%;
      min-width: unset;

      tr {
        display: grid;
        grid-template-areas: "name name name name"
          "Quantity Price Total Delete";
        margin-bottom: 24px;

        .tb-name,
        .tb-total {
          display: flex;
          flex-direction: column;
        }

        .tb-quantity,
        .tb-price {
          display: flex;
          flex-direction: column;
        }

        .tb-name {
          grid-area: name;
          width: 100%;

          input {
            width: unset;
          }
        }

        .tb-quantity {
          grid-area: Quantity;
        }

        .tb-price {
          grid-area: Price;
        }

        .tb-total {
          grid-area: Total;
          font-size: 14px;
          font-weight: 700;
          color: #888EB0;
          gap: 14px;
        }

        .tb-delete {
          grid-area: Delete;
          margin: auto;
          padding-bottom: unset;
        }
      }
    }

    .form-actions {
      position: fixed;
      height: 91px;
      padding: 21px 24px;
    }
  }
}
</style>