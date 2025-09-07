
# Deploy Vite+ nodejs + MariaDB  with Docker Compose on Ubuntu 24.04

## รายละเอียดโปรเจกต์
- ใช้ MariaDB (Bitnami) เป็นฐานข้อมูล  
- ใช้ Vite react สำหรับจัดการฐานข้อมูลผ่านเว็บ  
- ใช้ Node   


---

## ขั้นตอนติดตั้งและรันบน Ubuntu 24.04
### 1. ssh เข้าไป ใน server ให้ ทำตัวเองอยู่ใน สิทธิ์ root แล้วกรอก password
```bash
sudo -i
```
### 2. ติดตั้ง Docker และ Docker Compose (ถ้ายังไม่ได้ติดตั้ง)

```bash
# ติดตั้ง dependencies
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# เพิ่ม Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# เพิ่ม repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# ติดตั้ง Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# เปิดใช้งาน
sudo systemctl enable --now docker

```

ตรวจสอบเวอร์ชัน Docker และ Compose:

```bash
docker --v

```

---

### 3. clone project ลงมา 

สมมติโฟลเดอร์โปรเจกต์ชื่อ `cloudfaretest2`

```bash
git clone https://github.com/nutthapong224/cloudfaretest2.git
```
---
### 4. เข้าไปยัง โปรเจค 
```bash
 cd cloudfaretest2
```
### 4. เข้าไปยัง แก้ไฟล์ โปรเจค ให้ใช้คำสั่ง nano ในการแก้ไข
```bash
 nano .env
```
### 4.1 ให้แก้ config  VITE_API_URL คือ api ที่ใช้ connect backend ตัวอย่างเช่น api 192.168.1.200 ให้เขียนว่า 192.168.1.200:5000/api ดังภาพที่ 1
![](images/2025-08-11-20-12-11.png)

### 4.2 FONTEND1,FONTEND2 คือการ อนุญาติ ให้ FRONTEND สามารถเข้าสู cors ได้เช่น   ดังภาพที่ 2
![](images/2025-08-11-20-18-51.png)

### 4.3 ให้ใส่ token ที่ได้ จาก cloduflare tunnel ลงใน .env ดังภาพที่3 เพื่อให้ใช้งาน cloudflare tunnel
![](images/2025-08-11-20-15-35.png)
### 4.3 เมื่อแก้ไขสำเร็จให้กด ctrl+s แล้วกด ctrl+x

### 5. เราสามารถแก้ไข nginx.config เพื่อสามารถ รองรับการ host ของชื่อ domain ของเรา ได้ จาก folder frontendgame แล้ว nano เพื่อแก้ไข

```bash
cd frontendgame
```
```bash
nano nginx.conf
```
### ให้แก้ บรรทัดนี้ เป็นชื่อ โดเมนที่เราต้องการที่จะใช้งาน
![](images/2025-08-11-20-22-58.png)
### เมื่อแก้ไขสำเร็จให้กด ctrl+s แล้วกด ctrl+x

### 5. รัน Docker Compose

```bash
docker compose up -d --build
```

คำสั่งนี้จะดาวน์โหลดอิมเมจที่จำเป็น สร้าง container และรันใน background

---

### 6. ตรวจสอบสถานะ container

```bash
docker compose ps
```

### 7. การหยุดและลบ container

```bash
docker compose down
```