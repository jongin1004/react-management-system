// import logo from './logo.svg';
import Customer from './components/Customer';
import './App.css';

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

function App() {
  return (
    <div>
      {
        customers.map(c => {
          return (
            <Customer 
              key={c.id} //for문이나 map같은 다수의 정보를 다루는 경우는 key값을 정의해줘야합니다. 
              id={c.id}
              name={c.name}
              image={c.image}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          )
        })
      }
    </div>
  );
}

export default App;
