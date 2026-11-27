import { sendMessage } from './telegramApi.js';
import { getBotReply } from './botLogic.js';

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('OK', { status: 200 });
    }

    try {
      const update = await request.json();
      const message = update.message;

      if (message && message.text) {
        const chatId = message.chat.id;
        
        // 1. Получаем ответ от бизнес-логики
        const replyText = getBotReply(message.text);
        
        // 2. Отправляем его через клиент Telegram
        await sendMessage(env.BOT_TOKEN, chatId, replyText);
      }

      return new Response('OK', { status: 200 });
    } catch (e) {
      console.error('Ошибка:', e.message);
      return new Response('Error', { status: 500 });
    }
  }
};