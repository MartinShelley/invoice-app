export default {
  addInvoice(state, payload) {
    state.invoices.push(payload);
  },
  updateInvoices(state, payload) {
    state.invoices = payload
  }
}