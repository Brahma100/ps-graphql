import {gql} from "apollo-server"

const typeDefs = gql`
 type Query{
    users:[User]
    user(_id:ID!):User
    items:[ItemWithName]
    iitem(by:ID!):[Item]
 }

 type ItemWithName{
     name:String
     imageUrl:String
     price:Int
     by:IdName
 }
 
 type IdName{
     _id:String
     name:String
 }

 type User{
     _id:ID!
     name:String!
     email:String!
     password:String!
     items:[Item]
 }
 type Item{
     name:String!
     by:ID!
 }

 type TokenWithUser{
     token:String!
     user:User
 }

 type Mutation{
     signupUser(userNew:UserInput!):User
     signinUser(userSignin:UserSigninInput!):TokenWithUser
     createItem(name:String!):String
 }

 input UserInput{
    name:String!
    email:String!
    password:String!
 }
 input UserSigninInput{
    email:String!
    password:String!
 }

`
export default typeDefs