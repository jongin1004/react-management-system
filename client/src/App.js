import React from 'react';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

// react 라이프사이클
// 1) constructor()

// 2) componentWillMount()

// 3) render()

// 4) componentDidMount()

// props / state값이 변경 되면 -> shouldComponentUpdate()가 실행 -> render 실행


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: "",
      completed: 0,
    }
  }

  // 모든 컴포넌트가 mount된 이후에
  componentDidMount() {
    this.timer = setInterval(this.progress, 100)
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const config = {
      header: {
        'Accept': 'application/json'
      }
    }  

    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 3});
  }

  render() {
    const {classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(c => { return (
                <Customer 
                key={c.id} //for문이나 map같은 다수의 정보를 다루는 경우는 key값을 정의해줘야합니다. 
                id={c.id}
                name={c.name}
                image={c.image}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              /> )}):
              <TableRow>
                <TableCell colspan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>                
              }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
