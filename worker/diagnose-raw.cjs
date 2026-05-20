// 诊断脚本 - 检查 raw 类型资源
const https = require('https');

const CLOUD_NAME = 'duejkhf4j';
const API_KEY = '785871784143326';
const API_SECRET = 'qisxRyAG97kSk9FqcMWQIyqjoqg';

const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

// 检查 raw 类型资源
const options = {
  hostname: 'api.cloudinary.com',
  path: `/v1_1/${CLOUD_NAME}/resources/raw/upload?prefix=portfolio/&max_results=100`,
  method: 'GET',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('=== Cloudinary RAW 类型资源 ===\n');
      console.log(`总资源数: ${result.resources?.length || 0}`);
      
      if (result.resources && result.resources.length > 0) {
        console.log('\n资源列表:');
        result.resources.forEach((r, i) => {
          console.log(`\n[${i + 1}] public_id: ${r.public_id}`);
          console.log(`    格式: ${r.format || '无'}`);
        });
      }
      
    } catch (e) {
      console.error('解析错误:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error('请求错误:', e.message);
});

req.end();
