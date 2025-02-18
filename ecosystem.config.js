module.exports = {
  apps: [
    {
      name: 'cyber-hacks-admin',
      exec_mode: 'cluster',
      instances: 1, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      max_memory_restart: '4096M',
    },
  ],
}
