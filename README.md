# 🚀 แอปพลิเคชัน Full-Stack พร้อม Docker Compose

แอปพลิเคชัน Full-Stack แบบ Container ที่ประกอบด้วย React Frontend, Flask Backend, MongoDB Database และ Cloudflare Tunnel สำหรับการเข้าถึงจากภายนอกอย่างปลอดภัย

## 🏗️ สถาปัตยกรรมระบบ

- **Frontend**: แอปพลิเคชัน React ทำงานบนพอร์ต 80
- **Backend**: Flask API ทำงานบนพอร์ต 8000  
- **Database**: MongoDB 6.0 สำหรับจัดเก็บข้อมูล
- **Tunnel**: Cloudflare Tunnel สำหรับการเข้าถึงจากภายนอกอย่างปลอดภัย
- **Network**: Custom Bridge Network สำหรับการสื่อสารระหว่าง Service

## 📋 สิ่งที่ต้องเตรียม

- ติดตั้ง Docker และ Docker Compose แล้ว
- บัญชี Cloudflare พร้อม Tunnel Token (สำหรับการเข้าถึงจากภายนอก)
- ความรู้พื้นฐานเกี่ยวกับ Docker Container

## 🚀 เริ่มต้นใช้งาน

### 1. **โคลน Repository**
```bash
git clone https://github.com/nutthapong224/reactflaskapi
cd reactflaskapi
```

### 2. **ตั้งค่าตัวแปรสภาพแวดล้อม**
สร้างไฟล์ `.env` ในโฟลเดอร์หลัก:
```env
VITE_API_URL=http://localhost:8000
TUNNEL_TOKEN=your_cloudflare_tunnel_token_here
MONGO_INITDB_DATABASE=flaskdb
```

### 3. **ติดตั้ง Docker**
```bash 
# ติดตั้ง Dependencies
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# เพิ่ม Docker's Official GPG Key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# เพิ่ม Repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# ติดตั้ง Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# เปิดใช้งาน Service
sudo systemctl enable --now docker
```

### 4. **เริ่มต้นใช้งานแอปพลิเคชัน**
```bash
docker compose up -d
```

### 5. **เข้าถึงแอปพลิเคชัน**
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8000
- **Health Check**: http://localhost:8000/api/items

## 📁 โครงสร้างโปรเจค

```
project/
├── docker-compose.yml          # การกำหนดค่า Docker Compose
├── .env                        # ตัวแปรสภาพแวดล้อม
├── frontend-react/             # โฟลเดอร์ Frontend
│   ├── Dockerfile             # การ Build Frontend
│   └── nginx.conf             # การตั้งค่า Nginx
├── backend/                    # โฟลเดอร์ Backend
│   ├── Dockerfile             # การ Build Backend
│   └── ... (ไฟล์ Flask App)
└── mongo-init/                 # สคริปต์เริ่มต้น MongoDB
    └── ... (สคริปต์เริ่มต้นฐานข้อมูล)
```

## 🐳 รายละเอียด Services

### 🎨 Frontend React (`frontend-react`)
- **พอร์ต**: 80
- **Build Context**: `./frontend-react`
- **HTTPS และ Reverse Proxy**: กำหนดค่าใน `./frontend-react/nginx.conf`
- **Environment**: ใช้ `VITE_API_URL` จากไฟล์ .env
- **Dependencies**: ต้องรอ Backend Service ทำงานก่อน

### ⚙️ Backend Flask (`backend`)
- **พอร์ต**: 8000
- **Build Context**: `./backend`
- **Container Name**: `flask_api`
- **Health Check**: ตรวจสอบ Endpoint `/api/items`
- **Dependencies**: ต้องรอ MongoDB Service ทำงานก่อน

### 🗄️ MongoDB (`mongo_db`)
- **Image**: mongo:6.0
- **Container Name**: `mongo_db`
- **Database**: `flaskdb` (สร้างอัตโนมัติ)
- **Volume**: จัดเก็บข้อมูลถาวรด้วย `mongo_data`
- **Initialization**: ใช้สคริปต์จากโฟลเดอร์ `./mongo-init`

### 🌐 Cloudflare Tunnel (`cloudflared`)
- **Image**: cloudflare/cloudflared:latest
- **วัตถุประสงค์**: เข้าถึงจากภายนอกอย่างปลอดภัยโดยไม่ต้อง Port Forwarding
- **Token**: กำหนดผ่านตัวแปร `TUNNEL_TOKEN`

## 🔧 การกำหนดค่า

### ตัวแปรสภาพแวดล้อม

| ตัวแปร | คำอธิบาย | ตัวอย่าง |
|--------|----------|----------|
| `VITE_API_URL` | URL ของ API สำหรับ Frontend | `http://localhost:8000` |
| `TUNNEL_TOKEN` | Token ของ Cloudflare Tunnel | `your_tunnel_token_here` |
| `MONGO_INITDB_DATABASE` | ชื่อฐานข้อมูลเริ่มต้นของ MongoDB | `flaskdb` |

### การตรวจสอบสุขภาพระบบ

Backend Service มีการตรวจสอบสุขภาพที่:
- ทดสอบ Endpoint `/api/items` ทุก 30 วินาที
- Timeout หลัง 10 วินาที
- ลองใหม่สูงสุด 3 ครั้งก่อนถือว่าระบบมีปัญหา

## 📝 คำสั่งที่ใช้บ่อย

### 🚀 เริ่มต้น Services
```bash
docker compose up -d --build
```

### 📊 ดู Logs
```bash
# ทุก Services
docker compose logs -f

# Service เฉพาะ
docker compose logs -f backend
```

### ⏹️ หยุด Services
```bash
docker compose down
```

### 🔄 สร้างใหม่และเริ่มต้นใหม่
```bash
docker compose down
docker compose up --build -d
```

### 📈 ตรวจสอบสถานะ Service
```bash
docker compose ps
```

## 🔍 แก้ไขปัญหา

### ❌ Backend Health Check ล้มเหลว
- ตรวจสอบว่า Flask App ทำงานที่ `/api/items` หรือไม่
- ตรวจสอบการเชื่อมต่อ MongoDB
- ตรวจสอบ Logs ของ Backend: `docker-compose logs backend`

### 🔌 Frontend เชื่อมต่อ Backend ไม่ได้
- ตรวจสอบว่า `VITE_API_URL` ชี้ไปที่ Backend URL ที่ถูกต้อง
- ตรวจสอบว่า Backend Service ทำงานและมีสุขภาพดี
- ตรวจสอบการเชื่อมต่อเครือข่ายระหว่าง Container

### 🗄️ ปัญหาการเชื่อมต่อ MongoDB
- ตรวจสอบว่า MongoDB Container ทำงานอยู่
- ตรวจสอบว่าสคริปต์เริ่มต้นทำงานถูกต้อง
- ตรวจสอบข้อมูลประจำตัวและ Connection String

### 🌐 Cloudflare Tunnel ไม่ทำงาน
- ตรวจสอบ `TUNNEL_TOKEN` ในไฟล์ .env
- ตรวจสอบสถานะ Tunnel ใน Cloudflare Dashboard
- ตรวจสอบ Logs ของ Cloudflared: `docker-compose logs cloudflared`

## 🌐 nginx.conf และ Reverse Proxy Configuration

### 📖 ภาพรวมของ Configuration

ไฟล์ `nginx.conf` นี้กำหนดค่าให้ Nginx ทำหน้าที่เป็น **Reverse Proxy** และ **Static File Server** สำหรับแอปพลิเคชัน Full-Stack

```nginx
server {
    listen 80;
    server_name website.nutthapongkanna.com;
    
    client_max_body_size 50M;
    
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        send_timeout 60s;
    }
}
```

### 🔧 รายละเอียดการกำหนดค่า

#### 🏷️ **Server Block Configuration**

| คำสั่ง | ความหมาย |
|--------|-----------|
| `listen 80` | ฟังคำขอที่เข้ามาทางพอร์ต 80 (HTTP) |
| `server_name` | กำหนดโดเมนที่จะตอบสนอง |

#### 📁 **File Upload Configuration**
```nginx
client_max_body_size 50M;
```
- **วัตถุประสงค์**: จำกัดขนาดไฟล์ที่อัปโหลดได้สูงสุด 50 MB
- **ป้องกัน**: การโจมตี DoS ด้วยไฟล์ขนาดใหญ่

#### 🎯 **Location Block 1: Frontend Static Files**

| คำสั่ง | ความหมาย |
|--------|-----------|
| `location /` | จัดการคำขอทุกเส้นทางที่ไม่ตรงกับ location อื่น |
| `root` | กำหนดโฟลเดอร์รูทสำหรับไฟล์ static |
| `try_files` | ลำดับการค้นหาไฟล์ (สำคัญสำหรับ SPA) |

#### 🔄 **Location Block 2: API Reverse Proxy**

| คำสั่ง | ความหมาย |
|--------|-----------|
| `proxy_pass` | ส่งต่อคำขอไปยัง Backend Server |
| `proxy_set_header Host` | ส่งข้อมูล Host header ต้นฉบับ |
| `proxy_set_header X-Real-IP` | ส่ง IP Address จริงของ Client |

### 🔄 Reverse Proxy คืออะไร?

**Reverse Proxy** เป็น Server ที่รับคำขอจาก Client แล้วส่งต่อไปยัง Backend Server และส่งผลลัพธ์กลับมายัง Client

#### 🏗️ **สถาปัตยกรรม**
```
Client → Internet → Nginx (Reverse Proxy) → Backend Server
  ↑                         ↓                      ↓
  └─────── Response ←────────┴──────────────────────┘
```

#### ✅ **ประโยชน์ของ Reverse Proxy**

**🛡️ ความปลอดภัย:**
- ซ่อน Backend Server จาก Internet
- ป้องกันการเข้าถึง Backend โดยตรง
- กรองคำขอที่เป็นอันตราย

**⚡ ประสิทธิภาพ:**
- **Load Balancing**: กระจายโหลดไปหลาย Server
- **Caching**: เก็บข้อมูลที่ใช้บ่อยไว้ในหน่วยความจำ
- **Compression**: บีบอัดข้อมูลก่อนส่งให้ Client

**🔧 การจัดการ:**
- **SSL Termination**: จัดการ HTTPS ที่จุดเดียว
- **Centralized Logging**: รวบรวม Log ในที่เดียว
- **Request Routing**: ส่งคำขอไปยัง Service ที่เหมาะสม

### 🌐 การทำงานในโปรเจคนี้

#### 🔄 **ตัวอย่างการทำงาน**

**Request 1: หน้าแรกของเว็บไซต์**
```
Client: GET http://website.nutthapongkanna.com/
Nginx:  → Serve /usr/share/nginx/html/index.html
Result: แสดงหน้า React App
```

**Request 2: API Call**
```
Client: GET http://website.nutthapongkanna.com/api/items
Nginx:  → Proxy to http://backend:8000/api/items
Backend: Process request and return JSON
Nginx:  → Forward JSON response to client
```

**Request 3: React Router Path**
```
Client: GET http://website.nutthapongkanna.com/items/:id
Nginx:  → try_files: /profile (not found) → /profile/ (not found) → /index.html
Result: React Router จัดการการนำทางภายใน App
```

### 🚀 ข้อดีของ Configuration นี้

- **🎯 Single Entry Point**: Client เข้าถึงผ่าน URL เดียว
- **📱 SPA Support**: `try_files` รองรับ React Router
- **🔒 Security**: Backend ไม่เปิดให้เข้าถึงโดยตรง
- **⚡ Performance**: Nginx เร็วกว่าในการเสิร์ฟไฟล์ static

## 🛠️ การพัฒนา

### การตั้งค่าสำหรับการพัฒนาในเครื่อง
1. ตรวจสอบว่าทุก Service ทำงานด้วย `docker-compose up -d`
2. Frontend Hot-Reload จะทำงานอัตโนมัติ
3. การเปลี่ยนแปลง Backend ต้อง Rebuild Container: `docker-compose up --build backend`

### การจัดการฐานข้อมูล
- ข้อมูล MongoDB จัดเก็บใน Docker Volume `mongo_data`
- สคริปต์เริ่มต้นใน `./mongo-init/` จะทำงานเฉพาะครั้งแรกที่สร้าง Container
- การรีเซ็ตฐานข้อมูล: `docker-compose down -v` (⚠️ คำสั่งนี้จะลบข้อมูลทั้งหมด)

### การสื่อสารในเครือข่าย
ทุก Service สื่อสารผ่าน Bridge Network `flaskapi_network` ที่อนุญาต:
- Frontend เรียก Backend API
- Backend เชื่อมต่อกับ MongoDB
- Cloudflare Tunnel ทำหน้าที่ Proxy Request

## 📚 แหล่งข้อมูลเพิ่มเติม

- [เอกสาร Docker Compose](https://docs.docker.com/compose/)
- [การตั้งค่า Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)

## 🤝 การมีส่วนร่วม

1. Fork Repository นี้
2. สร้าง Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'เพิ่มฟีเจอร์ใหม่'`)
4. Push ไปยัง Branch (`git push origin feature/amazing-feature`)
5. เปิด Pull Request



