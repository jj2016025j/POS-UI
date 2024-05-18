import React from 'react';
import { Layout } from 'antd';
import MyRouter from './components/MyRouter';

const { Content } = Layout;

const RouterLayout = () => {
    const contentStyle = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        margin: '0 30px'
    };

    const layoutStyle = {
        borderRadius: 8,
        overflow: 'hidden',
        width: 'calc(100% - 8px)',
        maxWidth: 'calc(100% - 8px)',
    };

    return (
        <Layout style={layoutStyle}>
            <Content style={contentStyle}>
                <MyRouter />

            </Content>
        </Layout>
    )
}
export default RouterLayout;
