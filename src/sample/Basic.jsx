const user = { firstName: 'A', lastName: 'K' };// Json 

function formatName(user) {
	return user.firstName + ' ' + user.lastName;
}

// JSX - can have either standard h1 or user-defined element.
function UserGreeting(props) {
  return <h1>Welcome back {formatName(user)}!</h1>;
}

function GuestGreeting(props) {
  return <h1>Sign up.</h1>;
}

// Conditional display
function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <UserGreeting />;
	}
	return <GuestGreeting />;
}

export default Greeting;