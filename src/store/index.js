import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      invoices: [],
      lightMode: true
    }
  },
  mutations: {
    addInvoice(state, payload) {
      state.invoices.push(payload);
    },
    updateInvoices(state, payload) {
      state.invoices = payload
    }
  },
  actions: {
    async getInvoices({ commit }) {
      const response = await fetch('https://invoice-app-3517e-default-rtdb.europe-west1.firebasedatabase.app/invoices.json');
      const responseData = await response.json();
      commit('updateInvoices', responseData);
      console.log(responseData)
    },
    submitInvoiceForm(context, payload) {
      const invoiceData = {
        senderAddress: {
          address: payload.senderAddress.address,
          city: payload.senderAddress.city,
          postcode: payload.senderAddress.postcode,
          country: payload.senderAddress.country,
        },
        clientDetails: {
          clientName: payload.clientDetails.clientName,
          clientEmail: payload.clientDetails.clientEmail,
          clientAddress: payload.clientDetails.clientAddress,
          clientCity: payload.clientDetails.clientCity,
          clientPostcode: payload.clientDetails.clientPostcode,
          clientCountry: payload.clientDetails.clientCountry,
        },
        invoiceDate: payload.invoiceDate,
        paymentTerms: payload.paymentTerms,
        projectDesc: payload.projectDesc,
        itemListData: payload.itemListData
      }

      context.commit('addInvoice', {
        ...invoiceData,
        id: "123"
      });
    }
  },
  getters: {
    getAllInvoices(state) {
      return state.invoices;
    }
  }
})

export default store;