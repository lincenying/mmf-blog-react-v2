import React from 'react'

const AsideOther = () => {
    return (
        <div className="card card-other">
            <div className="card-content">
                <ul className="other-item">
                    <li>当前版本: v2.0.2</li>
                    <li>
                        项目开源地址:{' '}
                        <a href="https://github.com/lincenying/mmf-blog-react-v2" target="_blank" rel="noopener noreferrer">
                            单页版(Spa+Pwa)
                        </a>
                    </li>
                    <li>
                        网站备案号:{' '}
                        <a href="http://www.beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
                            浙ICP备15010753号-1
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default AsideOther
