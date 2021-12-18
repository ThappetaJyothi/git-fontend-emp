import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import TrainingCourseComponent from './components/TrainingCourseComponent';
import store from './redux/store';

beforeAll(() => {
  console.log('beforeAll');
});

beforeEach(() => {
  console.log('beforreEach');
});
test('render Data from course', () => {
  render(
    <Provider store={store} >
      <TrainingCourseComponent />
    </Provider>);
  const linkElement = screen.getByText('TrainingCourse Component');
  expect(linkElement).toBeInTheDocument();
});
test('render Data from course1', () => {
  render(
    <Provider store={store} >
      <TrainingCourseComponent />
    </Provider>);
  const linkElement = screen.getByText('Find course by id');
  expect(linkElement).toBeInTheDocument();
});
test('render Data from course2', () => {
  render(
    <Provider store={store} >
      <TrainingCourseComponent />
    </Provider>);
  const linkElement = screen.getByText('ID');
  expect(linkElement).toBeInTheDocument();
});
//---------------negitive cases-----------
// test('render Data from tc', () => {
//   render(
//     <Provider store={store} >
//       <TrainingCourseComponent />
//     </Provider>);
//   const linkElement = screen.findByText();
//   expect(linkElement).not.toBe('Some other text which is not present in the component.');
// });

