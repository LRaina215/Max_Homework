const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
// 托管静态文件（html, css, mp3, jpg）
app.use(express.static(path.join(__dirname, '')));

// 核心：处理聊天请求
app.post('/api/chat', async (req, res) => {
    // 你的 Key 填在这里
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
        if (!response.ok) throw new Error(data.error?.message || "DeepSeek API Error");
        res.json(data);
    } catch (error) {
        console.error("后端报错:", error);
        res.status(500).json({ error: "服务器连接 AI 失败" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));