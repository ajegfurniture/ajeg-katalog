# PM2 Setup untuk Ajeg Katalog

## Instalasi PM2
```bash
npm install -g pm2
```

## Build Aplikasi
```bash
npm run build
```

## Perintah PM2

### Start Aplikasi
```bash
pm2 start ecosystem.config.js
# atau
npm run pm2:start
```

### Stop Aplikasi
```bash
pm2 stop ajeg-katalog
# atau
npm run pm2:stop
```

### Restart Aplikasi
```bash
pm2 restart ajeg-katalog
# atau
npm run pm2:restart
```

### Reload Aplikasi (Zero Downtime)
```bash
pm2 reload ajeg-katalog
# atau
npm run pm2:reload
```

### Lihat Status
```bash
pm2 status
# atau
npm run pm2:status
```

### Lihat Logs
```bash
pm2 logs ajeg-katalog
# atau
npm run pm2:logs
```

### Monitoring
```bash
pm2 monit
# atau
npm run pm2:monit
```

### Hapus Aplikasi dari PM2
```bash
pm2 delete ajeg-katalog
# atau
npm run pm2:delete
```

## Auto Start saat Boot
```bash
pm2 startup
pm2 save
```

## Konfigurasi
- **File**: `ecosystem.config.js`
- **Logs**: `./logs/`
- **Port**: Menggunakan `NEXT_PORT` dari environment variable (default: 3000)
- **Memory Limit**: 1GB
- **Auto Restart**: Yes

## Environment Variables
Buat file `.env` dengan konfigurasi berikut:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Next.js Port
NEXT_PORT=4321

# PM2
NODE_ENV=production
```

## Monitoring
- PM2 akan otomatis restart jika aplikasi crash
- Memory usage dibatasi 1GB
- Logs tersimpan di folder `logs/`
- Monitoring real-time dengan `pm2 monit`
