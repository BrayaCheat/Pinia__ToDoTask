<template>
  <div>

    <!-- heading -->
    <header class="p-9 bg-gray-100 shadow-md flex items-center justify-center gap-9">
      <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo" class="w-16">
      <h1 class="text-4xl text-green-500 font-bold">{{ Store.name }}</h1>
    </header>

    <div v-for="api in Store.api" :key="api.id">
      {{ api.title }}
    </div>

    <!-- new task form -->
    <div class="new-task-form container mx-auto lg:px-80 grid">
      <TaskForm/>
    </div>

    <!-- filter -->
    <nav class="filter container mx-auto lg:px-80 flex items-center gap-9 py-6">
      <button class="px-4 py-2 rounded shadow-md active:bg-green-600 active:text-white font-bold" @click="filter = 'all'">All Task</button>
      <button class="px-4 py-2 rounded shadow-md active:bg-green-600 active:text-white font-bold" @click="filter = 'favs'">Fav Task</button>
    </nav>

    <!-- loading -->
    <div class="loading container mx-auto px-80 py-6 font-medium text-xl animate-pulse" v-if="Store.Loading">
      Loading task...
    </div>

    <!-- task-list -->
    <div class="TaskList grid gap-6 container mx-auto lg:px-80 py-6" v-if="filter === 'all'">
      <p class="font-medium">You have <span class="font-bold">{{ Store.totalCount }}</span> tasks left to do</p>
      <div v-for="task in Store.Tasks" :key="task.id">
        <TaskCard :task="task"/>
      </div>
    </div>

    <!-- task-list -->
    <div class="TaskList grid gap-6 container mx-auto lg:px-80 py-6" v-if="filter === 'favs'">
      <p class="font-medium">You have <span class="font-bold">{{ Store.favCount }}</span> tasks left to do</p>
      <div v-for="task in Store.favs" :key="task.id">
        <TaskCard :task="task"/>
      </div>
    </div>

    <!-- reset--btn -->
    <div class="container mx-auto lg:px-80 py-9">
      <button @click="Store.$reset" class="bg-red-600 text-white font-medium px-4 py-2 rounded shadow-md shadow-red-300">Reset State</button>
    </div>
    

  </div>
</template>

<script setup>
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/store";
import TaskCard from "./components/TaskCard.vue";
import {ref} from 'vue'

const Store = useTaskStore();
const filter = ref('all')

Store.fetchTask()
</script>
