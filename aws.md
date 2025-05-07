
# 🚀 Task Tracker Deployment Guide (NGINX + PM2 on AWS EC2)

This guide explains how to deploy the Task Tracker application on an AWS EC2 Ubuntu instance using **NGINX** for the frontend and **PM2** for the backend Node.js server.

---

## ✅ Project Structure

```
Tasktracker/
├── backend/     # Node.js + Express backend
├── frontend/    # React + Vite frontend
```

---

## 🖥️ Backend Setup (Node.js + PM2)

### 1. Connect to EC2
```bash
ssh -i your-key.pem ubuntu@<your-ec2-ip>
```

### 2. Navigate to backend
```bash
cd ~/Tasktracker/backend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the server using PM2
```bash
pm2 start server.js --name tasktracker-backend
```

### 5. (Optional) Enable watch mode for live dev tracking
```bash
pm2 start server.js --name tasktracker-backend --watch
```

### 6. Save PM2 process list and enable on reboot
```bash
pm2 save
pm2 startup
```

---

## 🌐 Frontend Setup (React + NGINX)

### 1. Navigate to frontend and build
```bash
cd ~/Tasktracker/frontend
npm install
npm run build
```

### 2. Copy the built files to the NGINX web root
```bash
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html
```

---

## ⚙️ NGINX Configuration

### 1. Open the default NGINX config
```bash
sudo nano /etc/nginx/sites-available/default
```

### 2. Replace with the following content:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Test and reload NGINX
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔍 PM2 Logs & Monitoring

### View real-time logs
```bash
pm2 logs tasktracker-backend
```

### Restart backend
```bash
pm2 restart tasktracker-backend
```

### View PM2 status
```bash
pm2 status
```

---

## 🔁 Rebuilding Frontend in Future

If you make changes and want to redeploy:

```bash
# Rebuild frontend
cd ~/Tasktracker/frontend
npm run build

# Update NGINX files
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html

# Reload NGINX
sudo systemctl reload nginx
```

---

## ✅ Summary

- Frontend: React + Vite → served via **NGINX**
- Backend: Node.js + Express → managed by **PM2**
- PM2 ensures backend resilience & auto-restart
- NGINX handles routing and serves static files
