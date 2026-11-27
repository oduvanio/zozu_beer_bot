// Функция для создания или обновления пользователя
export async function upsertUser(supabaseUrl, supabaseKey, user) {
  // Мы используем нативный fetch к REST API Supabase
  const url = `${supabaseUrl}/rest/v1/users`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      // 'resolution=merge-duplicates' означает "если такой id есть, обнови его"
      'Prefer': 'resolution=merge-duplicates' 
    },
    body: JSON.stringify({
      id: user.id,
      username: user.username || null,
      first_name: user.first_name || 'Аноним'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Ошибка базы данных:', errorText);
  } else {
    console.log('Пользователь сохранен в БД:', user.id);
  }
}