// 引入react核心库
import React from 'react';
// 引入reactDom
import ReactDOM from 'react-dom';
// 
import { BrowserRouter } from 'react-router-dom';
// import './index.css';
// 引入App组件
import App from './App';

// import store from './redux/store'

// import reportWebVitals from './reportWebVitals';

// 渲染App到页面
// //方式一：
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// //方式二：
// store.subscribe(()=>{
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root'))
// })
    // store.subscribe(()=>{
    //     ReactDOM.render(<App/>,document.getElementById('root'))
    // })
// reportWebVitals();
