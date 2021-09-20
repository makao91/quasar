/* eslint-disable */
import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  setUserDetails (state, payload) {
    state.user_details = payload
  },
  addUser(state, payload) {
    // console.log(payload)
    // state.users.user_id = payload.user_id
    // state.users.user_details = payload.user_details

    state.users.push(payload)
  }
};

export default mutation;
