<template>
  <fwb-button
    gradient="teal-lime"
    square
    class="px-4"
    v-if="!activatedBot"
    @click="activatedBot = true"
  >
    <template #prefix>
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path
          d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"
        />
      </svg>
    </template>
    CuisineBot
  </fwb-button>
  <fwb-card class="w-80 h-96 flex flex-col p-4 hover:bg-white" v-else>
    <div class="flex justify-between items-center my-2">
      <h2 class="text-2xl font-bold text-black">CuisineBot</h2>
      <fwb-button variant="icon" color="yellow" class="p-2" @click="activatedBot = false">
        <svg
          class="w-5 h-5 text-white dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10.707 10l4.147-4.146a.5.5 0 0 0-.708-.708L10 9.293 5.854 5.146a.5.5 0 1 0-.708.708L9.293 10l-4.147 4.146a.5.5 0 0 0 .708.708L10 10.707l4.146 4.147a.5.5 0 0 0 .708-.708L10.707 10Z"
          />
        </svg>
      </fwb-button>
    </div>
    <div class="h-64 overflow-y-scroll px-2" ref="chatBox">
      <div class="flex flex-col items-start gap-2.5">
        <div
          v-for="message in messages"
          :key="message.text"
          class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700"
          :class="message.from === 'bot' ? 'bg-orange-100' : 'bg-blue-100'"
        >
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">{{
              userTitle(message.from)
            }}</span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              {{
                message.time
                  ? message.time.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric'
                    })
                  : new Date().toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric'
                    })
              }}
            </span>
          </div>
          <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
            {{ message.text }}
          </p>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
        </div>
      </div>
    </div>
    <fwb-input
      :placeholder="!isSending ? 'Ask me anything' : 'CuisineBot is thinking...'"
      class="mb-2"
      v-model="message"
      @keyup.enter.stop="debouncedSendMessage"
      :disabled="isSending"
    >
      <template #suffix>
        <fwb-button variant="icon" color="yellow" @click.stop="debouncedSendMessage">
          <svg
            class="w-5 h-5 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 19 17"
          >
            <path
              d="M2.057 6.9a8.718 8.718 0 0 1 6.41-3.62v-1.2A2.064 2.064 0 0 1 9.626.2a1.979 1.979 0 0 1 2.1.23l5.481 4.308a2.107 2.107 0 0 1 0 3.3l-5.479 4.308a1.977 1.977 0 0 1-2.1.228 2.063 2.063 0 0 1-1.158-1.876v-.942c-5.32 1.284-6.2 5.25-6.238 5.44a1 1 0 0 1-.921.807h-.06a1 1 0 0 1-.953-.7A10.24 10.24 0 0 1 2.057 6.9Z"
            />
          </svg>
        </fwb-button>
      </template>
    </fwb-input>
  </fwb-card>
</template>

<script setup lang="ts">
import { FwbButton, FwbCard, FwbInput } from 'flowbite-vue'
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'

const { sendToChatBot } = useAppStore()

interface Message {
  time?: Date
  text: string
  from: 'bot' | 'user'
}

const activatedBot = ref<boolean>(false)

const chatBox = ref<HTMLDivElement | null>(null)
const isSending = ref<boolean>(false)

const messages = ref<Message[]>([])
const message = ref<string>('')

const debounce = (func: () => void, wait: number, immediate = false) => {
  let timeout: ReturnType<typeof setTimeout> | null
  return () => {
    const later = () => {
      timeout = null
      if (!immediate) func()
    }
    const callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func()
  }
}

const sendMessage = async () => {
  messages.value.push({
    time: new Date(),
    text: message.value,
    from: 'user'
  })
  message.value = ''
  await sendToChatBot(message.value)
    ?.then((res) => {
      messages.value.push({
        time: new Date(),
        text: res,
        from: 'bot'
      })
      setTimeout(() => {
        chatBox.value?.scrollTo({
          top: chatBox.value.scrollHeight,
          behavior: 'smooth'
        })
      }, 500)
    })
    ?.catch((err) => {
      messages.value.push({
        time: new Date(),
        text: err,
        from: 'bot'
      })
    })
  isSending.value = false
}

const debouncedSendMessage = () => {
  if (!message.value) return
  isSending.value = true
  debounce(sendMessage, 500)()
}

const userTitle = (from: 'bot' | 'user') => {
  return from === 'bot' ? 'CuisineBot' : 'You'
}

onMounted(() => {
  messages.value.push({
    text: 'Hi, I am CuisineBot. How can I help you?',
    from: 'bot'
  })
})
</script>
