export class AuthenticateResponse {
  email: string | null=null;
  emailConfirmed:  boolean=false;
  expiresOn: string | null=null;
  isAuthenticated:  boolean=false;
  isCompletData:  boolean=false;
  message: string | null=null;
  phoneNumberConfirmed:  boolean=false;
  roles: [ string | null]=[''];
  success: boolean=false;
  token: string | null=null;
  userId:  string | null=null;
  username:  string | null=null;
  patientId:number |null =null;
}
