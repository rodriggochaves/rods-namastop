import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders 3 notes', async () => {
  global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, _) => {
      resolve({
        json: () => {
          return [
            {
              "_id": "5c25769ff32d89bd1ccc54ed",
              "username": "rodrigochaves",
              "userId": "U48H4EH19",
              "text": "thanks"
            },
            {
              "_id": "5c2576b000e977bda9830bf6",
              "username": "rodrigochaves",
              "userId": "U48H4EH19",
              "text": "thanks"
            },
            {
              "_id": "5c2576b6271f61be28be904f",
              "username": "rodrigochaves",
              "userId": "U48H4EH19",
              "text": "thanks"
            },
          ]
        }
      })
    })
  })

  const wrapper = await shallow(<App />);
  await wrapper.instance().callApi()
  expect(wrapper.find('.comment').length).toEqual(3)
})