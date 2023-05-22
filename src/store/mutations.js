export default {
  addInvoice(state, payload) {
    state.invoices.push(payload);
  },
  updateInvoices(state, payload) {
    console.log(Object.values(payload));
    state.invoices = Object.values(payload);
  },
  toggleLightMode(state) {
    state.lightMode = !state.lightMode;
  }
}