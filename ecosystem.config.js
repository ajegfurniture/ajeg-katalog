module.exports = {
  apps: [
    {
      name: "ajeg-katalog",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4321",
      cwd: "/webdata/apps/ajeg-katalog",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
    },
  ],
};
