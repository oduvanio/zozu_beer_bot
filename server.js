import Fasify from 'fastify';

const app = Fasify( {logger: true });

app.get('/health', async () => {
    return { ok: true, service: 'telegram-bot' }
});

app.post('/telegram/webhook', async (request,reply) => {
    const update = request.body;
    console.log('Пришло обновление от Telegram', JSON.stringify(update, null, 2));
    return { ok: true }
});

const port = Number(process.env.PORT ?? 3000);

await app.listen({ port, host: '0.0.0.0' });