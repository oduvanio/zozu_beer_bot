import { sendMessage } from './telegramApi.js';
import { getBotReply } from './botLogic.js';
import { upsertUser, saveUserMessage, saveBotMessage } from './database.js';

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('OK', { status: 200 });
    }

    try {
      const update = await request.json();
      const message = update.message;

      if (message && message.text && message.from) {
        const chatId = message.chat.id;
        const user = message.from;
        const userText = message.text;

        // 1. Сохраняем/обновляем пользователя
        await upsertUser(env.SUPABASE_URL, env.SUPABASE_KEY, user);

        // 2. Сохраняем сообщение пользователя в историю
        await saveUserMessage(env.SUPABASE_URL, env.SUPABASE_KEY, user.id, userText);
        
        // 3. Генерируем ответ
        const replyText = getBotReply(message.text);

        // 4. Сохраняем ответ бота в историю
        await saveBotMessage(env.SUPABASE_URL, env.SUPABASE_KEY, user.id, replyText);
        
        // 5. Отправляем ответ в Telegram
        await sendMessage(env.BOT_TOKEN, chatId, replyText);
      }

      return new Response('OK', { status: 200 });
    } catch (e) {
      console.error('Ошибка:', e.message);
      return new Response('Error', { status: 500 });
    }
  }
};