const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Gelen JSON verileri okuyabilmek için
app.use(bodyParser.json());
app.use(cors());

// Örnek kullanıcı verileri (gerçek projede veritabanı kullanmalısın)
const users = [
  {
    id: "user1",
    password: "password123", // Gerçek projede şifreleri hashle!
    mac: "00:1A:2B:3C:4D:5E"
  }
];

// Login endpoint
app.post('/login', (req, res) => {
  const { id, password, mac } = req.body;

  if (!id || !password || !mac) {
    return res.status(400).json({ message: "Eksik parametreler" });
  }

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(401).json({ message: "Kullanıcı bulunamadı" });
  }

  // Şifre kontrolü
  if (password !== user.password) {
    return res.status(401).json({ message: "Yanlış şifre" });
  }

  // MAC adresi kontrolü
  if (mac !== user.mac) {
    return res.status(401).json({ message: "MAC adresi uyuşmuyor" });
  }

  return res.json({ message: "Giriş başarılı" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
