import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const isDarkMode = false
  const language = sessionStorage.getItem('language') || 'english'

  interface ChatBotResponse {
    answer: string
  }

  const setLanguage = (sessionLanguage: string) => {
    sessionStorage.setItem('language', sessionLanguage)
  }

  const sendToChatBot = async (message: string) => {
    console.log('Sending message: ' + message)
    const response = await fetch('http://localhost:3000/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data: ChatBotResponse = await response.json()
    console.log('data: ', data)
    const formattedAnswer = data.answer.replace(/"/g, '').replace(/\n/g, '\n\n')

    return formattedAnswer
  }

  return { isDarkMode, language, sendToChatBot, setLanguage }
})
