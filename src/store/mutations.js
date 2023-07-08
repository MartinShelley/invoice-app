export default {
  addInvoice(state, payload) {
    state.invoices.push(payload);
  },
  updateInvoices(state, payload) {
    state.invoices = Object.values(payload);
  },
  updateInvoice(state, payload) {
    const findExistingInvoice = state.invoices.findIndex(invoice => invoice.id === payload.id);
    state.invoices[findExistingInvoice] = payload;
  },
  toggleIsMobile(state, payload) {
    state.isMobile = payload;
  },
  toggleLightMode(state) {
    state.lightMode = !state.lightMode;
  },
  toggleShowForm(state, payload) {
    state.showFormToggle = payload;
  }
}