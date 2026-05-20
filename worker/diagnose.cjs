// 诊断脚本 - 检查 Cloudinary API 返回的所有数据
const https = require('https');

const CLOUD_NAME = 'duejkhf4j';
const API_KEY = '785871784143326';
const API_SECRET = 'qisxRyAG97kSk9FqcMWQIyqjoqg';
const FOLDER = 'portfolio';

const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

const options = {
  hostname: 'api.cloudinary.com',
  path: `/v1_1/${CLOUD_NAME}/resources/image/upload?prefix=${FOLDER}/&max_results=100`,
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
      console.log('=== Cloudinary API 原始响应 ===\n');
      console.log(`总资源数: ${result.resources?.length || 0}`);
      console.log(`\n所有资源列表:`);
      
      if (result.resources) {
        result.resources.forEach((r, i) => {
          console.log(`\n[${i + 1}] public_id: ${r.public_id}`);
          console.log(`    格式: ${r.format}`);
          console.log(`    资源类型: ${r.resource_type}`);
          console.log(`    包含 "portfolio": ${r.public_id.includes(FOLDER)}`);
          console.log(`    以 "portfolio/" 开头: ${r.public_id.startsWith(FOLDER + '/')}`);
        });
      }
      
      // 显示过滤后的结果
      console.log('\n\n=== 过滤后结果 (使用 includes) ===');
      const filtered = result.resources?.filter(r => r.public_id && r.public_id.includes(FOLDER)) || [];
      console.log(`过滤后数量: ${filtered.length}`);
      filtered.forEach((r, i) => {
        console.log(`[${i + 1}] ${r.public_id}`);
      });
      
    } catch (e) {
      console.error('解析错误:', e.message);
      console.log('原始数据:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('请求错误:', e.message);
});

req.end();
