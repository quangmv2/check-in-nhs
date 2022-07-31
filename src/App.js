import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import { Row, Col, List } from "antd";
import styles from "./App.module.css";
import Scanner from "./components/scanner";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";

const getListUserAttend = () => JSON.parse(localStorage.getItem('users-attends'))

const setListUser = (users) => localStorage.setItem('users-attends', JSON.stringify(users))

const users = [
    {
        id: 'DAIHOIVINHS1',
        name: 'Pham Dinh Quy'
    },
    {
        id: 'QUANGMV',
        name: 'Mai Van Quang'
    },
]

function App() {

    const [userCurrent, setUserCurrent] = useState(null)
    const [listAttend, setListAttend] = useState([])

    useEffect(() => {
        setListAttend(getListUserAttend() || [])
    }, [])

    const scan = useCallback((value) => {
        // const 
        const user = users.find(d => d.id == value)
        const attendInfo = {
            ...user,
            checkIn: moment().valueOf()
        }
        setUserCurrent(attendInfo)
        const userAttend = getListUserAttend() || []
        const check = userAttend?.find(d => d.id == value)
        if (!check) userAttend?.unshift(attendInfo)
        setListUser(userAttend)
        setListAttend(userAttend)
    }, [setUserCurrent])

    return (
        <Row className={`h-100-v`}>
            <Col span={18} className="h-100">
                <Row justify="center" align="middle" className="h-100">
                    Chào mừng đại biểu: {' '}
                    {
                        userCurrent?.name || ''
                    }
                    <br />
                    Thời gian: {userCurrent && moment(userCurrent.checkIn).format('DD-MM-YYYY HH:mm')}
                </Row>
            </Col>
            <Col span={6}>
                <Row>
                    <Col span={24} className={styles.camera}>
                        <Scanner onScan={scan} />
                    </Col>
                    <Col span={24}>
                        <List
                            size="large"
                            className="w-100"
                            header={<div>Đại biểu tham dự</div>}
                            bordered
                            dataSource={listAttend || []}
                            renderItem={item => <List.Item>{item?.name} {moment(item?.checkIn).format('DD-MM-YYYY HH:mm')}</List.Item>}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default App;
