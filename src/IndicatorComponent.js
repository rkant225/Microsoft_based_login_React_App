import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useState } from "react";
import instance from './MSALInstance';

const IndicatorComponent = (props)=> {
    // const {instance} = props;
    const [isLoading, setIsloading] = useState(false);

    const { accounts } = useMsal();

    const isAuthenticated = useIsAuthenticated();
  
    console.log('ACCOUNT', accounts)
    console.log('Is_Authenticated', isAuthenticated)


    const login = async ()=> {
        try {
            setIsloading(true);

            await instance.loginPopup(
                {
                scopes: ['user.read'],
                prompt: "select_account"
                }
            );

            setIsloading(false);
        }
        catch (err) {
          console.log('Login failed.....!!!')
        }
      }

    const logout = ()=> {
        instance.logout();
    }

  return (
    <div>

        {isLoading && <h1>Please wait...</h1>}

        {isAuthenticated && accounts && accounts.length > 0 
            ?
                <div>
                    <h1>Welcome, {accounts[0].name}</h1>
                    <button onClick={() => logout()} >Logout</button>
                </div>
            :
                <button onClick={() => login()} >Login in</button>
        }
    </div>
    );
  }

export default IndicatorComponent;
