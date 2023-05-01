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
    }
  },
  actions: {
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
  getters: {}
})

export default store;