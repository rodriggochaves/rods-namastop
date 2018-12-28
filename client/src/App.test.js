import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

describe('request to API', () => {
  beforeEach(() => {
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
                "username": "kilmer",
                "userId": "U3QPKF69E",
                "text": "very thanks"
              },
            ]
          }
        })
      })
    })
  })

  it('renders 3 notes', async () => {
    const wrapper = await shallow(<App />);
    await wrapper.instance().callApi()
    expect(wrapper.find('.comment').length).toEqual(3)
  })

  it('renders to an user if clicked', async() => {
    const wrapper = await shallow(<App />);
    await wrapper.instance().callApi()
    wrapper.find('.author').at(0).simulate('click')
    wrapper.update()
    expect(wrapper.find('.comment').length).toEqual(2)
  })

  it('can go back after filtered', async() => {
    const wrapper = await shallow(<App />);
    await wrapper.instance().callApi()
    wrapper.find('.author').at(0).simulate('click')
    wrapper.update()
    expect(wrapper.find('.comment').length).toEqual(2)
    wrapper.find('button').simulate('click')
    await wrapper.instance().callApi()
    expect(wrapper.find('.comment').length).toEqual(3)
  })
})