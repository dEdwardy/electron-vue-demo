import Mock from 'mockjs';
Mock.setup({
    timeout: 0 - 300
})
const Random = Mock.Random;

// Mock.mock('/api/users/checkUser', 'post', {
//     data: [],
//     success:true,
//     token:Random.string()
// })