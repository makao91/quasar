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

export interface ExampleStateInterface {
  user_details: UserDetails,
  users: [UserDetailsAndActivity]
}

function state(): ExampleStateInterface {
  // @ts-ignore
  return <ExampleStateInterface>{
    user_details: {},
    users: []
  }
}

export default state;
