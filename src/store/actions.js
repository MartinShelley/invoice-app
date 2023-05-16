export default {
  async getInvoices({ commit }) {
    const response = await fetch('https://invoice-app-3517e-default-rtdb.europe-west1.firebasedatabase.app/invoices.json');
    const responseData = await response.json();
    commit('updateInvoices', responseData);
    console.log(responseData)
  },
  async submitInvoiceForm(context, payload) {
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

    // const response = await fetch('https://invoice-app-3517e-default-rtdb.europe-west1.firebasedatabase.app/invoices.json', {
    //   method: 'POST',
    //   body: JSON.stringify(invoiceData)
    // });

    // console.log(JSON.stringify(invoiceData));

    // const responseData = await response.json();

    // console.log(responseData);

    context.commit('addInvoice', {
      ...invoiceData,
      id: "123"
    });
  }
}