export default {
  addInvoice(state, payload) {
    state.invoices.push(payload);
  },
  updateInvoices(state, payload) {
    state.invoices = payload;
  },
  toggleLightMode(state) {
    state.lightMode = !state.lightMode;
  }
}