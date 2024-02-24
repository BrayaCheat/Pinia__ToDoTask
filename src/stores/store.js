import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useTaskStore = defineStore("TaskStore", {
  state: () => ({
    Tasks: [],
    Loading: false,
    name: "Learning Pinia Vue3",
  }),

  getters: {
    favs() {
      return this.Tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.Tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount: (state) => state.Tasks.length,
  },

  actions: {
    async fetchTask() {
      this.Loading = true;
      const response = await axios.get("http://localhost:3000/Tasks");
      const data = await response.data;
      this.Tasks = data;
      this.Loading = false;
    },

    async addTask(task) {
      this.Tasks.push(task);
      await axios
        .post("http://localhost:3000/Tasks", task)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Adding Successful!",
          });
        })
        .catch((error) => console.log(error));
    },

    async deleteTask(id) {
      this.Tasks = this.Tasks.filter((t) => {
        return t.id !== id;
      });
      await axios
        .delete("http://localhost:3000/Tasks/" + id)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Delete Successful!",
          });
        })
        .catch((error) => console.log(error));
    },

    async toggleFav(id) {
      const task = this.Tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;

      await axios
        .patch("http://localhost:3000/Tasks/" + id, task)
        .then(() => {
          task.isFav
            ? Swal.fire({
                icon: "success",
                title: "Add to favourite!",
              })
            : Swal.fire({
                icon: "success",
                title: "Remove from favourite!",
              });
        })
        .catch((error) => console.log(error));
    },
  },
});
