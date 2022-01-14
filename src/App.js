import React from 'react';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/1',
  'name' : '최종인',
  'birthday': '941004',
  'gender' : '남자',
  'job' : 'IT엔지니어'
  },
  {
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/2',
  'name' : '곽재호',
  'birthday': '940104',
  'gender' : '남자',
  'job' : '삼서엔지니어'
  },
  {
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/3',
  'name' : '한규호',
  'birthday': '951004',
  'gender' : '남자',
  'job' : 'CAD마스터'
  },
]

class App extends React.Component {
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
            {customers.map(c => { return (
                <Customer 
                key={c.id} //for문이나 map같은 다수의 정보를 다루는 경우는 key값을 정의해줘야합니다. 
                id={c.id}
                name={c.name}
                image={c.image}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              /> )})}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
