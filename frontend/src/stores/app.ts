import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const isDarkMode = false

  interface ChatBotResponse {
    answer: string
  }

  const sendToChatBot = async (message: string) => {
    const response = await fetch('http://localhost:3000/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log('data: ', data)
    return data.answer.replace(/"/g, '')
  }

  return { isDarkMode, sendToChatBot }
})
