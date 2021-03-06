import React, { Component, Fragment } from 'react';
import InputWithLabel from 'components/common/InputWithLabel';
import Loading from 'components/common/Loading';
import * as IdentityAPI from 'lib/api/identity';
import * as CaverAuth from 'lib/caver/auth';
import certificateImage from 'static/images/certificate.svg';
import './AuthAgent.scss';

class AuthAgent extends Component {
  state = {
    file: null,
    certificateNo: '',
    username: '',
    birth: '',
    date: '',
    isAgent: false,
    isLoading: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleFileChange = event => {
    this.setState({
      ...this.state,
      file: URL.createObjectURL(event.target.files[0]),
      isLoading: true
    });

    const formData = new FormData();
    formData.append('identity', event.target.files[0]);
    IdentityAPI.ocr({ formData }).then(res => {
      console.log(res.data);
      const { agentNumber, agentName, birth, acquireDate } = res.data;
      this.setState({
        ...this.state,
        certificateNo: agentNumber,
        username: agentName,
        birth,
        date: acquireDate,
        isLoading: false
      });
    });
  };

  handleAuth = () => {
    const loggedInfo = JSON.parse(localStorage.getItem('loggedInfo'));
    IdentityAPI.setAgent({ email: loggedInfo.email }).then(res => {
      const result = res.data;
      this.setState({ isAgent: result });
    });
  };

  async componentDidMount() {
    const { accountInstance } = this.props;
    const isAgent = await CaverAuth.isAgent(accountInstance);

    this.setState({
      ...this.state,
      isAgent
    });
  }

  getCompleteMsg = () => {
    return (
      <div className="AuthAgent" style={{ margin: '41px auto' }}>
        <p className="complete">
          {this.props.username}
          님은 <span>중개인인증</span>을 완료하였습니다.
          <br />
          거래목록 페이지에서 <span>거래 등록</span>이 가능합니다.
        </p>
      </div>
    );
  };

  render() {
    const {
      file,
      certificateNo,
      username,
      birth,
      date,
      isAgent,
      isLoading
    } = this.state;

    if (isAgent) {
      return this.getCompleteMsg();
    }

    return (
      <div className="AuthAgent">
        <input
          type="file"
          ref={ref => {
            this.upload = ref;
          }}
          onChange={this.handleFileChange}
        />
        <div className="upload">
          <div
            className="icon-with-text"
            onClick={() => {
              this.upload.click();
            }}
          >
            {file && <img src={file} alt="certificate" />}
            {!file && (
              <Fragment>
                <img src={certificateImage} alt="certificate" />
                공인중개사자격증 등록
              </Fragment>
            )}
          </div>
        </div>
        <hr />

        <div className="loading-wrapper">
          {isLoading && <Loading />}

          <InputWithLabel
            label="자격증번호"
            name="certificateNo"
            value={certificateNo}
            placeholder="자격증번호"
            onChange={this.handleChange}
          />
          <InputWithLabel
            label="성명"
            name="username"
            value={username}
            placeholder="성명"
            onChange={this.handleChange}
          />
          <InputWithLabel
            label="생년월일"
            name="birth"
            value={birth}
            placeholder="생년월일"
            onChange={this.handleChange}
          />
          <InputWithLabel
            label="취득일자"
            name="date"
            value={date}
            placeholder="취득일자"
            onChange={this.handleChange}
          />
        </div>

        <p className="notice">
          거래 등록은 <span>중개인 인증</span>시 가능합니다.
        </p>
        <div className="action">
          <button onClick={() => this.handleAuth()}>확인</button>
        </div>
      </div>
    );
  }
}

export default AuthAgent;
