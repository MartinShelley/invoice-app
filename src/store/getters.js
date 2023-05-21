export default {
  getAllInvoices(state) {
    return state.invoices;
  },
  getInvoice: (state) => (id) => {
    return state.invoices.find(invoice => invoice.id === id);
  },
  getInvoiceStatus: (state) => (id) => {
    const invoice = state.invoices.find(invoice => invoice.id === id);
    return invoice.status;
  },
  getLightModeToggle(state) {
    return state.lightMode;
  }
}