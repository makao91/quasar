import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import {ExampleStateInterface, UserDetailsAndActivityAndId} from './state';

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  users: state => {
    const users_filtered : UserDetailsAndActivityAndId[] = []
    state.users.forEach((user) => {
      if (user.user_id !== state.user_details.user_id && !!user.user_id){
        users_filtered.push(user)
      }
    })

    return users_filtered
  },
  messages: state => {
    return state.messages.filter(item=>{
      return item.message_id
    })
  }
};

export default getters;
