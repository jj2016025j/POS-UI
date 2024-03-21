import React, { useState } from 'react';
import Work from './Work';  

function DisplayArea() {
    // 使用 useState Hook 来管理状态
    const [works, setWorks] = useState([
        { title: "1", description: "我是描述" },
        { title: "2", description: "我是描述" },
        { title: "3", description: "我是描述" },
    ]);

    return (
        <React.Fragment>
            <h1 className="col-12 justify-content-center">作品展示</h1>
            <div className="d-flex justify-content-center image-overlay">
                {
                    // 映射 works 数组，并返回 Work 组件实例
                    works.map((work, index) => (
                        <Work
                            key={index}
                            title={work.title}
                            description={work.description}
                        />
                    ))
                }
            </div>
        </React.Fragment>
    );
}
export default DisplayArea;
