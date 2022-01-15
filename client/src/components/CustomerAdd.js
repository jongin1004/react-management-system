import React from 'react';
import { post } from 'axios'; //post 방식으로 고객추가 데이터를 보낼 수 있도록 

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer().then((res) => {
            console.log(res.data)
            this.props.stateRefresh();
        });
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }) 
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData(); //form데이터를 전송하기 위한 객체 생성
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        // 파일이 포함되어있는 data를 전송하기 위한 header 추가 
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> 
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> 
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />   
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /> 
                <input type="submit" value="추가하기" />
            </form>
        )
    }
}

export default CustomerAdd