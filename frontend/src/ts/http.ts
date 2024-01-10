interface Method {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export const performHttpCall = async (endpoint: string, method: Method, body: object) => {
  const response = await fetch(`http://104.248.129.234:3000/${endpoint}`, {
    method: method.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const data = await response.json()
  return data
}