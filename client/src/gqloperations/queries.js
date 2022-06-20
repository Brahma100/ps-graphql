import { gql } from '@apollo/client'
export const GET_ALL_ITEMS = gql`
  query getAllItems{
  items{
    _id
    name
		imageUrl
    price
  }
}
`

export const GET_MY_PROFILE = gql`
  query getMyProfile{
    user:myprofile{
      name
      email
    } 
  }

`


