interface UserDetails {
  user_id: string,
  name: string,
  email: string
}
interface UserDetailsAndActivity {
  online: boolean,
  name: string,
  email: string
}
export interface UserDetailsAndActivityAndId {
  user_details: UserDetailsAndActivity,
  user_id: string,
}
export interface MessageInfo {
  message_id: string,
  message_details: Message,
}
export interface Message {
  from: string,
  text_field: string,
}

export interface ExampleStateInterface {
  user_details: UserDetails,
  users: [UserDetailsAndActivityAndId],
  messages: [MessageInfo],
}

function state(): ExampleStateInterface {
  return <ExampleStateInterface>{
    user_details: {},
    users: [{}],
    messages: [{}]
  }
}

export default state;
