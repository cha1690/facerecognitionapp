import React from 'react';

const Register = ({onRouteChange}) => {
	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		  <div action="sign-up_submit" method="get" accept-charset="utf-8">
		    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
		      <legend class="white ph0 mh0 fw2 f2">Register</legend>
		      <div class="mt3">
		        <label class="db fw4 lh-copy f5" htmlFor="Name">Name</label>
		        <input class="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="name"  id="name" />
		      </div>
		      <div class="mt3">
		        <label class="db fw4 lh-copy f5" htmlFor="email-address">Email address</label>
		        <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" />
		      </div>
		      <div class="mt3">
		        <label class="db fw4 lh-copy f5" htmlFor="password">Password</label>
		        <input class="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password" />
		      </div>
		    </fieldset>
		    <div class="mt3">
		    	<input 
		    	onClick = {() => onRouteChange('home')}
		    	class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5" 
		    	type="submit" 
		    	value="Register" />
		    </div>
		  </div>
		</article>
	);
}

export default Register;