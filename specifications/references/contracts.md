
## Webservice API ##

POST /subscription //Unauthenticated
DELETE, PUT, GET /subscription //Authenticated
PUT, GET /profile //Authenticated
POST /support //Unauthenticated
POST /review //Authenticated
POST /contract //Authenticated
GET /contract/id //Authenticated
GET /contract //Authenticated, supports paging, sorting, filtering



## Data ##
subscription
userId //required: unique oAuth id of the user
subscription //required: free, starter, or pro

profile
id //unique id of the profile
userId //required: unique oAuth id of the user
firstName
lastName
state
email //required: valid email format

support
userId //not required
email //required: valid email format
subject //required
comment //required

review
userId //not required
email //required: valid email format
rating //required: number 1-5
comment //not required: < 1000 characters

contract
id //unique id of the contract
userId //required: unique oAuth id of the user
score //not required: number 1-100
upload //required: datetime
status //required: processing, processed
storage //file location in blob storage
