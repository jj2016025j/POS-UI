import React from 'react';
import Message from '../../components/forWeb/Message';

function SignUp() {
    return (
        <React.Fragment>
            <div class="container mt-5" style="position: relative; top: 150px">
                <div class="row">
                    <div class="col-md-6 mx-auto">
                        <form action="/auth/signup" method="POST">
                            <h3>註冊</h3>
                            <Message />
                            <div class="form-group">
                                <label for="name" class="mb-2">姓名</label>
                                <input
                                    name="name"
                                    type="text"
                                    class="form-control email"
                                    id="name"
                                    required
                                    placeholder="請輸入姓名"
                                    minlength="3"
                                    maxlength="255"
                                />
                            </div>
                            <div class="form-group">
                                <label for="email" class="mb-2">電子郵件</label>
                                <input
                                    type="email"
                                    class="form-control email"
                                    id="email"
                                    placeholder="請輸入信箱"
                                    name="email"
                                />
                            </div>
                            <div class="form-group">
                                <label for="password" class="mb-2">密碼</label>
                                <div class="showPwd">
                                    <input
                                        type="password"
                                        class="form-control password me-2"
                                        id="password"
                                        placeholder="請輸入密碼"
                                        name="password"
                                    />
                                    <img src="/image/eye-close.png" id="eyeicon" />
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">註冊</button>

                            <div class="text-center mt-3">
                                <p>或使用社群媒體賬號登入:</p>
                                <a href="/auth/google" class="btn w-100 mb-3 btn-light"
                                ><img
                                        width="20"
                                        height="20"
                                        src="https://img.icons8.com/color/16/000000/google-logo.png"
                                        class="me-2"
                                    />Google</a>
                                <a
                                    href="/auth/line"
                                    class="btn w-100 aLine"
                                    style="background-color: #43eb43"
                                ><img
                                        width="30"
                                        height="30"
                                        src="https://img.icons8.com/color/48/line-me.png"
                                        class="me-2"
                                        alt="line-me"
                                    />Line</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default SignUp;