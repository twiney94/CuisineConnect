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
    const response = await fetch('http://104.248.129.234:3000/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data: ChatBotResponse = await response.json()
    console.log('data: ', data)
    // Replace the \n in the answer by a real line break
    // Replace the " by nothing
    const formattedAnswer = data.answer.replace(/\\n/g, '\n').replace(/"/g, '')

    return formattedAnswer
  }

  return { isDarkMode, language, sendToChatBot, setLanguage }
})
