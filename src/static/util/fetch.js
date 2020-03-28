import {message} from 'antd';
import {createHashHistory} from "history";

export function fetchPost(url, params) {
    return new Promise((resolve, reject) => fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            credentials: 'include',
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(res => res.json())
            .then((data) => {
                if (data.code === 0) {
                    resolve(data.data)
                } else if (data.data.msg === '请登录') {
                    reject(data.data.msg )
                    message.info('重新登陆');
                    createHashHistory().push('/')
                } else {
                    reject(data.data.msg )
                    message.info(data.data.msg)
                }
            })
    )
}
