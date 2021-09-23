/* eslint-disable */
import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  setUserDetails (state, payload) {
    state.user_details = payload
  },
  addUser(state, payload) {
    state.users.push(payload)
  },
  addMessage(state, payload) {
    state.messages.push(payload)
  },
  updateUser(state, payload) {
     state.users.map((user) => {
       if (user.user_id === payload.user_id){
         user.user_details = payload.user_details
       }
      return user
    })
  },
  clearUsers(state, payload) {
    state.users = payload
  },
  clearMessages(state, payload) {
    state.messages = payload
  },
};

export default mutation;
