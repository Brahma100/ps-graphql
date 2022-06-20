import { gql } from '@apollo/client'
export const SIGNUP_USER = gql`
    mutation createUser($userNew:UserInput!){
        user:signupUser(userNew:$userNew){ 
          _id
          email
          name
        }
    }
`
export const LOGIN_USER = gql`
mutation SigninUser($userSignin:UserSigninInput!){
    user:signinUser(userSignin:$userSignin){ 
      token
      user{
        name
        email
      }
    }
  }
`

export const CREATE_ITEM = gql`
  mutation createItem($name:String!){
    item:createItem(name:$name)
  }
`