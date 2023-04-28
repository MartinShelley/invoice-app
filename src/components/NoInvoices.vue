<template>
  <section class="no-invoices">
    <img src="../assets/illustration-empty.svg" />
    <div class="no-invoices-message">
      <h2>There is nothing here</h2>
      <p>Create an invoice by clicking the
        <span><strong>New Invoice</strong> button and get started</span>
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.no-invoices {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: auto;

  img {
    margin-bottom: 64px;
  }

  .no-invoices-message {
    text-align: center;

    h2 {
      margin-bottom: 24px;
      color: #0C0E16;
    }

    p {
      color: #888EB0;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.25px;

      span {
        display: block;
      }

    }
  }
}
</style>
