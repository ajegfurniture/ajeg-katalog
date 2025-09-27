module.exports = {
  apps: [
    {
      name: 'ajeg-katalog',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.NEXT_PORT
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.NEXT_PORT 
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};
