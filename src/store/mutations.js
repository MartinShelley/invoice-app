export default {
  addInvoice(state, payload) {
    state.invoices.push(payload);
  },
  updateInvoices(state, payload) {
    state.invoices = Object.values(payload);
  },
  updateInvoice(state, payload) {
    console.log("update Invoice");
    const findExistingInvoice = state.invoices.findIndex(invoice => invoice.id === payload.id);
    state.invoices[findExistingInvoice] = payload;
    console.log(state.invoices);
  },
  toggleLightMode(state) {
    state.lightMode = !state.lightMode;
  },
  toggleShowForm(state, payload) {
    state.showFormToggle = payload;
  }
}