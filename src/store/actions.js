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
        street: payload.senderAddress.street,
        city: payload.senderAddress.city,
        postCode: payload.senderAddress.postCode,
        country: payload.senderAddress.country,
      },
      clientName: payload.clientName,
      clientEmail: payload.clientEmail,
      clientAddress: {
        street: payload.clientAddress.street,
        city: payload.clientAddress.city,
        postCode: payload.clientAddress.postCode,
        country: payload.clientAddress.country,
      },
      paymentDue: payload.paymentDue,
      paymentTerms: payload.paymentTerms,
      description: payload.description,
      items: payload.items,
      status: payload.status,
      total: payload.total,
      id: payload.id
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
      //id: "123"
    });
  }
}