import React from 'react';

function Contact() {
    return (
        <React.Fragment>
            <div class="Container px-5 my-5 mt-5 d-flex justify-content-center align-items-center was-validated"
                style="margin-top: 300px;">
                <div class="formContainer px-5 my-5 d-flex justify-content-center align-items-center">
                    <form id="myForm">

                        <div class="form-floating mb-3">
                            <select class="form-select" id="問題分類" style="font-weight: 1000;">
                                <option value="用餐意見回饋"><b>用餐意見回饋</b></option>
                                <option value="會員疑問"><b>會員疑問</b></option>
                                <option value="加盟諮詢"><b>加盟諮詢</b></option>
                            </select>
                            <label for="問題分類"><b>問題分類 :</b></label>
                        </div>

                        <div class="form-floating mb-3">
                            <input class="form-control" id="姓名" type="text" placeholder="姓名 : " required />
                            <label for="姓名">姓名 :</label>
                        </div>


                        <div class="form-floating mb-3">
                            <input class="form-control" id="連絡電話" type="text" placeholder="連絡電話 : " required />
                            <label for="連絡電話">連絡電話 : </label>
                        </div>

                        <div class="form-floating mb-3">
                            <input class="form-control" id="email" type="email" placeholder="Email :" required />
                            <label for="email">Email : </label>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea class="form-control" id="需求說明" type="text" placeholder="需求說明 :" style="height: 10rem;"
                                required></textarea>
                            <label for="需求說明">需求說明 : </label>
                        </div>

                        <div>
                            <button class="btn btn-primary w-100" id="submitButton" type="submit">提交</button>
                            <div class="popup" id="popup">
                                <img src="./image/tick.png" />
                                <h2>感謝您建議!!</h2>
                                <p>提交成功</p>
                                <button type="button" onclick="closePopup()">完成</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment >
    );
}

export default Contact;