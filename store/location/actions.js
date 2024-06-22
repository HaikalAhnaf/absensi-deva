import Swal from "sweetalert2"
export default {
  async renderPage({commit}, data) {
    const result = await this.$axios.$get(`get-location`)
    commit('renderSet', result)
  },
  async input({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    try {
      const result = await this.$axios.$post(`insert-location`, data)
      if (result) {
        Swal.fire({
          text: 'Added Successfully!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        commit('input', result)
      }
    } catch (error) {

      if (error.response && error.response.status === 500) {
        commit('btn')
        Swal.fire({
          text: error.response.data.name.replace(/(?=[A-Z])/g, " "),
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          text: error.message,
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  },
  async remove({ commit, state }, sk) {
    const i = state.location.findIndex((x) => x.SK === sk)
    const name = state.location[i].SK
    const result = await Swal.fire({
      title: name,
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await this.$axios.$delete(
        `delete-location?sk=${sk}`
      );
      commit('deleteItem', sk);
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  },
}
