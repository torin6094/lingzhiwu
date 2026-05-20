// 诊断脚本 - 获取所有图片（不加 prefix 过滤）
const https = require('https');

const CLOUD_NAME = 'duejkhf4j';
const API_KEY = '785871784143326';
const API_SECRET = 'qisxRyAG97kSk9FqcMWQIyqjoqg';

const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

// 获取所有图片资源
const options = {
  hostname: 'api.cloudinary.com',
  path: `/v1_1/${CLOUD_NAME}/resources/image/upload?max_results=100`,
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
      console.log('=== Cloudinary 所有图片资源 ===\n');
      console.log(`总资源数: ${result.resources?.length || 0}`);
      
      if (result.resources) {
        console.log('\n资源列表:');
        result.resources.forEach((r, i) => {
          console.log(`[${i + 1}] ${r.public_id} (${r.format})`);
        });
        
        // 找出包含"猫"或"阳台"的图片
        console.log('\n\n=== 可能相关的图片 ===');
        const catImages = result.resources.filter(r => 
          r.public_id.includes('猫') || 
          r.public_id.includes('阳台') ||
          r.public_id.includes('cat') ||
          r.public_id.includes('balcony')
        );
        
        if (catImages.length > 0) {
          catImages.forEach((r, i) => {
            console.log(`[${i + 1}] ${r.public_id} (${r.format})`);
          });
        } else {
          console.log('未找到匹配的图片');
        }
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
