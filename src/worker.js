export default {
  async fetch(request, env) {
    console.log("=== 1. Worker получил запрос ===");
    console.log("Метод:", request.method);

    // Telegram присылает только POST
    if (request.method !== 'POST') {
      console.log("=== Это не POST, выходим ===");
      return new Response('OK', { status: 200 });
    }

    try {
      const update = await request.json();
      console.log("=== 2. Прочитали JSON от Telegram ===");
      
      const message = update.message;
      
      // Если это текстовое сообщение
      if (message && message.text) {
        console.log("=== 3. Нашли текст в сообщении:", message.text);
        
        const chatId = message.chat.id;
        
        // Проверяем, подтянулся ли токен
        console.log("=== 4. Токен существует?:", !!env.BOT_TOKEN);

        // Отправляем ответ
        const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `Ты написал: ${message.text}`
          })
        });
        
        console.log("=== 5. Ответ от Telegram API:", response.status);
        console.log("=== 6. Тело ответа:", await response.text());
      } else {
        console.log("=== 3. Сообщение без текста или пустое ===");
      }

      return new Response('OK', { status: 200 });
    } catch (e) {
      console.error('=== ОШИБКА:', e.message);
      return new Response('Error', { status: 500 });
    }
  }
};