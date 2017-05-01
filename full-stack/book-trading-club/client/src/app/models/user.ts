export class User {
  _id: string;
  username:   string;
  firstName?: string;
  lastName?:  string;
  city?:      string;
  state?:     string;
  books:            string[];
  incomingRequests: string[];
  outgoingRequests: string[];
}
