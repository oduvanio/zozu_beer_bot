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
        const text = message.text;

        await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `Ты написал: ${text}`
          })
        });
      }

      return new Response('OK', { status: 200 });
    } catch (e) {
      return new Response('Error', { status: 500 });
    }
  }
};