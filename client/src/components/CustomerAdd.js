import React from 'react';
import { post } from 'axios'; //post 방식으로 고객추가 데이터를 보낼 수 있도록 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
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
            fileName: '',
            open: false
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

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClickClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} >고객 추가하기</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
                        <label htmlFor="raised-button-file" color="primary" component="span" name="file">
                            <Button variant="contained">{this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName }</Button>
                        </label>

                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> 
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> 
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />   
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /> 
                    </DialogContent>
                    <DialogActions>
                         <Button variant="contained" color="primary" onClick={this.handleFormSubmit} >추가</Button>
                         <Button variant="contained" color="primary" onClick={this.handleClickClose} >닫기</Button>
                    </DialogActions>
                </Dialog>

            </div>
            // <form onSubmit={this.handleFormSubmit}>
            //     <h1>고객 추가</h1>
            //     프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
            //     이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> 
            //     생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> 
            //     성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />   
            //     직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /> 
            //     <input type="submit" value="추가하기" />
            // </form>
        )
    }
}

export default CustomerAdd