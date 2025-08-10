const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

delete process.env.NODE_ENV;

if (process.env.FRONTEND_PORT && !process.env.PORT) {
  process.env.PORT = process.env.FRONTEND_PORT;
}

require('child_process').spawn('craco', ['start'], {
  stdio: 'inherit',
  shell: true,
});
