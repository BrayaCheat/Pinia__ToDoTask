<template>
  <div class="task bg-gray-100 p-9 flex items-center justify-between shadow-md">
    <h1 class="font-bold">{{ task.title }}</h1>
    <div class="flex items-center gap-6 text-zinc-500">
      <span
      @click="taskStore.toggleFav(task.id)"
      :class="{active: task.isFav}"
      class="material-icons cursor-pointer"> favorite </span>
      <span
      @click="taskStore.deleteTask(task.id)"
      class="material-icons cursor-pointer "> delete </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["task"]);
import { useTaskStore } from '@/stores/store';

const taskStore = useTaskStore()
</script>

<style>
  .active {
    color: red
  }
</style>
