export class Usersmodel {
	  totalCount:number;
	  code: number;	  
	  _id: number;
	  name: string;
	  firstName: string;
	  lastName: string;
	  email: string;
	  createdOn: string;
	  password: string;
	  profileImage: string;
	  status: number;
	  countryId: number;
	  result:Result;
}
export class Result {
  	  _id: number;
	  firstName: string;
	  lastName: string;
	  email: string;
	  createdOn: string;
	  password: string;
	  status: string;
	  countryId: string;
	  profileImage: string;
}
