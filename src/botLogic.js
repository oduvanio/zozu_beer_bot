export function getBotReply(messageText) {
  const text = messageText.toLowerCase();

  if (text === '/start' || text === 'привет') {
    return 'Привет! Я бот, который поможет тебе в варке пива или приготовлении самогона. Выбирай свой путь и мы по шагам пройдем с тобой и всё рассчитаем.';
  }
  
  if (text === 'кто ты') {
    return 'Я работаю на Cloudflare Workers и написан на JavaScript.';
  }

  // По умолчанию — эхо
  return `Ты написал: ${messageText}`;
}