<template>
  <div class="all">
    <div class="container">
      <div class="media mx-auto">
        <div class="row">
          <div class="col-12">
            <Header />
            <DataKaryawanModalEdit />
            <DataKaryawanModalView />
          </div>
        </div>
        <DataKaryawan />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store }){
    await store.dispatch('datakaryawan/getallkaryawan')

  }
};
</script>

<style scoped></style>
