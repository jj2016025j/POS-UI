import React, { useEffect } from 'react';
import TypingEffect from './TypingEffect';

function HomeCover() {
  useEffect(() => {
    document.title = '魔法商店 | 首頁';
  }, []);
  return (
    <main className="row justify-content-evenly g-0" style={{ overflow: "hidden" }}>
      <section id="home2" className="d-flex justify-content-center text-white image-container pt-5"
        style={{
          height: "100vh", backgroundImage: "url('../static/img/Fp0cxYQagAUt7tq.jfif')",
          backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center",
          position: "relative", backgroundAttachment: "fixed"
        }}>
        <div className="d-flex justify-content-center image-overlay" style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)"
        }}>
          <div className="d-flex flex-column justify-content-center ms-5 me-5 ps-5 pe-5">
            <TypingEffect />
            <p className="mt-3 fs-6">"歡迎來到創意的交匯點！我們是一群熱衷於技術和藝術的專業人士，涵蓋從前端工程師到3D建模師的各個範疇。無論是創造引人入勝的網站體驗、開發先進的後端解決方案、或是打造下一代遊戲和實現視覺震撼，我們都在這裡，準備將您的夢想轉化為現實。"</p>
            <p className="mt-5"><a href="../about.html" className="button text-dark"
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>了解更多</a></p>
          </div>
        </div>
      </section>
      <section className="container col-12 row justify-content-evenly align-content-evenly pt-5 pb-5 gap-5" id="home">
        {/* 更多內容 */}
      </section>
    </main>
  );
}

export default HomeCover;
