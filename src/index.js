import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import Detail from 'layouts/Certeficate';
import { ChakraProvider } from '@chakra-ui/react';
import Otp from 'layouts/otp';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  // Check if the user is logged in by inspecting your authentication state (e.g., checking for a token in localStorage)
  // Replace the following condition with your authentication logic
  return !!localStorage.getItem('token');
};

// Higher-order component (HOC) for protected routes
const ProtectedRoute = ({ component: Component, allowSignIn = false, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() || allowSignIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth/sign-in" />
      )
    }
  />
);

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/auth" component={AuthLayout} allowSignIn={true} />
            <ProtectedRoute path="/admin" component={AdminLayout} />
            <ProtectedRoute path="/rtl" component={RtlLayout} />
            <ProtectedRoute path="/detail" component={Detail} />
            <ProtectedRoute path="/auth" component={Otp} allowSignIn={true} />
            <Redirect from="/" to="/auth/sign-in" />
          </Switch>
        </BrowserRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
