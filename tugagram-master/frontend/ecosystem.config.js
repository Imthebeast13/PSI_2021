module.exports = {
  apps : [{
    script: 'ng serve --port 3014 --host 0.0.0.0 --disableHostCheck true',
    watch: '.'
  }, {
    script: 'ng serve --port 3014 --host 0.0.0.0 --disableHostCheck true',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
