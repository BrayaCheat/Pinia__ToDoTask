<template>
    <form @submit.prevent="handleSubmit" class="py-3 flex items-center gap-3">
        <input
         type="text"
         placeholder="I need to..."
         v-model="newTask"
         class="bg-gray-100 px-4 py-2 rounded shadow-md focus:ring-0 border-0 outline-none w-full"
         >
         <button type="submit" class="px-4 py-2 bg-green-600 hover:bg-green-700 font-medium rounded shadow-md text-white">Add</button>
    </form>
</template>

<script setup>
    import {ref} from 'vue'
    import { useTaskStore } from '@/stores/store';

    const taskStore = useTaskStore()

    const newTask = ref('') 

    const handleSubmit = () => {
        if(newTask.value.length > 0){
            taskStore.addTask({
                title: newTask.value,
                isFav: false,
                id: (Math.floor(Math.random() * 10000)).toString()
            })
            newTask.value = ''
        }
    }
</script>
