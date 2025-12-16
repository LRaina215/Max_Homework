// api/chat.js

export default async function handler(req, res) {
  // 1. 设置允许跨域的 Header (关键一步)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // ⚠️ 把你的 Key 填在这里！不要让它暴露在前端
  const API_KEY = "sk-67378a51c3634e38a618d01952693fb0"; 
  const API_URL = "https://api.deepseek.com/chat/completions";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "服务器转发失败" });
  }
}
