/* eslint-disable */
import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  setUserDetails (state, payload) {
    console.log(payload)
    state.user_details = payload
  }
};

export default mutation;
