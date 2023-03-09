import axios from 'axios';

//api非同步用async/await

const baseUrl = 'http://localhost:3001';
export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};

export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    //發送post請求給server的資料（title,isDone)
    //非同步的方式-> await去獲得回傳的結果(const res)
    const res = await axios.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });
    //回傳server回傳的結果
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]: ', error);
  }
};

const patchTodo = () => {};
const deleteTodo = () => {};
