<template>
  <div id="invoice-form">
    <div id="invoice-form-background"></div>
    <form id="invoice-form-overlay">
      <div class="form-top-section">
        <h2>New Invoice</h2>
        <section id="bill-from-section">
          <fieldset>
            <legend>Bill Form</legend>
            <div id="address-container" class="input-container">
              <label for="address">Street Address</label>
              <input type="text" id="address" />
            </div>
            <div class="col-3-wrapper">
              <div class="input-container">
                <label for="city">City</label>
                <input type="text" id="city" />
              </div>
              <div class="input-container">
                <label for="postcode">Postcode</label>
                <input type="text" id="postcode" />
              </div>
              <div class="input-container">
                <label for="country">Country</label>
                <input type="text" id="country" />
              </div>
            </div>
          </fieldset>
        </section>
        <section id="bill-to-section">
          <fieldset>
            <legend>Bill To</legend>
            <div class="input-container">
              <label>Client's Name</label>
              <input type="text" />
            </div>
            <div class="input-container">
              <label>Client's Email</label>
              <input type="email" placeholder="e.g. email@example.com" />
            </div>
            <div class="input-container">
              <label>Street Address</label>
              <input type="text" />
            </div>
            <div class="col-3-wrapper">
              <div class="input-container">
                <label>City</label>
                <input type="text" />
              </div>
              <div class="input-container">
                <label>Postcode</label>
                <input type="text" />
              </div>
              <div class="input-container">
                <label>Country</label>
                <input type="text" />
              </div>
            </div>
            <div class="col-2-wrapper">
              <div class="input-container">
                <label>Invoice Date</label>
                <input type="date" />
              </div>
              <div class="input-container">
                <label>Payment Terms</label>
                <select>
                  <option value="1 Day">Net 1 Day</option>
                  <option value="7 Days">Net 7 Days</option>
                  <option value="14 Days">Net 14 Days</option>
                  <option value="30 Days" selected>Net 30 Days</option>
                </select>
              </div>
            </div>
            <div class="input-container">
              <label>Project Description</label>
              <input type="text" placeholder="e.g. Graphic Design Service" />
            </div>
          </fieldset>
        </section>
        <section id="item-list">
          <h3>Item List</h3>
          <table>
            <tr>
              <th>Item Name</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
            <!-- eslint-disable-next-line -->
            <tr v-for="(index, rows) in rowData" :key="index">
              <td><input type="text" /></td>
              <td><input type="number" class="tb-qty" /></td>
              <td><input type="number" class="tb-price" /></td>
              <td class="tb-total">156.00</td>
              <td class="tb-delete"><img src="@/assets/icon-delete.svg" /></td>
            </tr>
            <tr>
              <td colspan="5"><button type="button" @click="addTableRow()">+ Add New Item</button></td>
            </tr>
          </table>
        </section>
      </div>
      <section id="form-actions">
        <div>
          <button id="discard" type="button" @click="discardForm()">Discard</button>
        </div>
        <div>
          <button id="save-draft" type="button">Save as Draft</button>
          <button id="save">Save & Send</button>
        </div>
      </section>
    </form>
  </div>
  <!-- <dialog id="discard-confirmation">
    <h2>Are you sure?</h2>
    <p>You will lose your progress if you continue</p>
    <button>Discard</button>
    <button>Cancel</button>
  </dialog> -->
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      //tableRowCounter: 0,
      rowData: []
    }
  },
  methods: {
    addTableRow() {
      //this.tableRowCounter++;
      this.rowData.push({});
    },
    discardForm() {
      console.log("discardForm")
      this.$emit('discard', false);
    }
  }
}
</script>

<style lang="scss" scoped>
#invoice-form {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}

#invoice-form-overlay {
  height: 100%;
  width: 719px;
  position: absolute;
  left: 0;
  background-color: #fff;
  border-radius: 0px 20px 20px 0px;
  overflow-y: auto;
  // background-color: #979797;

  .form-top-section {
    padding: 56px 56px 32px 159px;


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
  }

  table {
    width: 100%;

    th {
      text-align: left;
      padding: 0 16px 16px 0;
    }

    tr td:first-child,
    tr input[type="text"] {
      width: 214px;
      padding: 0 16px 16px 0;
    }

    tr td:nth-child(2),
    .tb-qty {
      width: 46px;
      padding: 0 16px 16px 0;
    }

    tr td:nth-child(3),
    .tb-price {
      width: 100px;
      padding: 0 16px 16px 0;
    }

    .tb-total {
      padding: 0 38px 16px 0;
      font-size: 12px;
    }

    .tb-delete {
      padding: 0 16px 16px 0;
    }

    button {
      width: 100%;
      background-color: #F9FAFE;
      color: #7E88C3;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.25px;
      font-weight: 700;
      border: 0;
      border-radius: 24px;
      height: 48px;
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
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;

        label {
          margin-bottom: 10px;
          color: #7E88C3;
          font-size: 12px;
          font-weight: 500;
          line-height: 15px;
        }
      }
    }
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
  margin-bottom: 48px;
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

input {
  height: 48px;
  border: 1px solid #DFE3FA;
  border-radius: 4px;
  padding: 0 16px 0 20px;
  font-weight: 700;
  background-color: transparent;
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
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #fff;
}

::-webkit-scrollbar-thumb {
  background: #DFE3FA;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7C5DFA;
}
</style>