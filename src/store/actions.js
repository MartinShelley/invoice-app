export default {
  async getInvoices({ commit }) {
    const response = await fetch(`https://invoice-app-3517e-default-rtdb.europe-west1.firebasedatabase.app/invoices.json`);
    const responseData = await response.json();
    await commit('updateInvoices', responseData);
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

    const response = await fetch(`https://invoice-app-3517e-default-rtdb.europe-west1.firebasedatabase.app/invoices/${payload.id}.json`, {
      method: 'PUT',
      body: JSON.stringify(invoiceData)
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request.')
      throw error;
    }

    context.commit('addInvoice', invoiceData);
  },
  //eslint-disable-next-line
  async deleteInvoice({ _, dispatch }, payload) {
    await fetch(`https://invoice-app-3517e-default-rtdb.europe-west1.firebasedatabase.app/invoices/${payload.id}.json`, {
      method: 'DELETE'
    });
    await dispatch('getInvoices');
  },
  //eslint-disable-next-line
  async markAsPaid(context, payload) {
    await fetch(`https://invoice-app-3517e-default-rtdb.europe-west1.firebasedatabase.app/invoices/${payload.id}.json`, {
      method: "PATCH",
      body: JSON.stringify({
        ...payload,
        status: "paid"
      })
    })

      .then(response => response.json())
      .then(data => context.commit('updateInvoice', data));
  }
}