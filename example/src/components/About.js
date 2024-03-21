import React from 'react';
import teamMemberImage from '../public/logo192.png'; // 确保路径正确

function About() {
   return (
      <div>
         <AboutSection />
         <TeamIntroduction />
         <OpportunitiesAndRecruitment />
         <ContactInfo />
      </div>
   );
}

function AboutSection() {
   return (
      <div className="container col-12 row justify-content-center mt-5 mb-5 pt-5">
         <div className="col-md-5 mb-5">
            <h1><b>關於</b></h1>
         </div>
         <div className="col-md-5">
            <h5>
               <b>“ </b>歡迎光臨<b>「艾格魯的店」</b>，我们的世界里最受欢迎的日常用品商店。
               这里提供从经典草药药剂到实用魔法工具的各种生活必需品，应有尽有。
               在艾格魯的店里，您可以找到优质的家居装饰，为您的家增添温馨与舒适。
               我们还提供多样化的服装和饰品，让您在日常生活中也能展现个性与风采。
               艾格魯的店，是您生活中的贴心伙伴，满足您对品质生活的追求。<b> ”</b>
            </h5>
         </div>
      </div>
   );
}

function TeamIntroduction() {
   return (
      <div className="col-12 row justify-content-center align-content-center text-center">
         <div className="col-12 container justify-content-center team-section rounded shadow-lg">
            <h1 className="col-12 pt-5 pb-5 text-center align-content-center"><b>團隊介紹</b></h1>
            <div className="row justify-content-evenly">
               <div className="col-md-6 team-member row justify-content-center">
                  <img src={teamMemberImage} alt="John Lee" className="img-fluid mb-3 col-6 shadow-lg rounded-lg" />
               </div>
               <div className="col-md-6 row justify-content-center align-content-center">
                  <h3 className="text-align-center">Emily Anderson（CEO）</h3>
                  <p>擁有超過5年在技術領域的豐富經驗...</p>
                  <a href="https://www.linkedin.com/in/%E5%BB%BA%E9%99%9E-%E6%9D%8E-3145931b2/" className="btn btn-primary">LinkedIn</a>
               </div>
            </div>
         </div>
      </div>
   );
}

function OpportunitiesAndRecruitment() {
   return (
      <div className="col-12 row justify-content-center align-content-center mt-5 mb-5 pt-5 pb-5 shadow-lg rounded-lg gap-5">
         <div className="col-md-6 row justify-content-center align-content-center text-center container contact-section">
            <h2 className="mb-4 text-align-center">合作機會和招聘信息</h2>
            <a href="https://www.canva.com/design/DAF4PrNLaIc/XBZqJm5EFzzmeLM4V6hkFQ/edit">
               <p>我们一直在寻找创新的合作伙伴...</p>
            </a>
            <a href="https://www.canva.com/design/DAF4PrNLaIc/XBZqJm5EFzzmeLM4V6hkFQ/edit">
               <p>加入我们的团队！目前我们正在寻找UI、UX设计师、前端工程师和市场营销专家...</p>
            </a>
         </div>
      </div>
   );
}

function ContactInfo() {
   return (
      <div className="col-md-6 row justify-content-center align-content-center text-center container contact-section">
         <h2 className="mb-4 text-align-center">聯繫方式</h2>
         <p>電子郵件：<a href="mailto:jj2016025j@gmail.com">jj2016025j@gmail.com</a></p>
         <p>社交媒體：<a href="https://www.facebook.com/lee871116/">Facebook</a> | <a href="https://www.instagram.com/lee_871116">Instagram</a> | <a href="https://www.linkedin.com/in/%E5%BB%BA%E9%99%9E-%E6%9D%8E-3145931b2/">LinkedIn</a></p>
      </div>
   );
}
export default About;