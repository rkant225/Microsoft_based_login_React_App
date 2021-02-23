import logo from './logo.svg';
import './App.css';
import { config } from './Config';
import { PublicClientApplication } from '@azure/msal-browser';
import { Component } from 'react';
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {},
      file:null
    };
    this.login = this.login.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    
    // Initialize the MSAL application object
    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
      }
    });
  }

  onFileChange(event) {
    // capture file into state
    this.setState({file:event.target.files[0]});
    
  };
  async uploadFile() {
    let storageAccountName = 'carrentelstorage';
    let sasToken = 'sv=2019-12-12&ss=b&srt=sco&sp=rwlacx&se=2021-01-23T09:30:00Z&st=2021-01-23T09:02:32Z&spr=https&sig=spE6zcUr7bPGLoUNCQp5bXlVBHFVefnoI43277ujpM8%3D';
    const blobService = new BlobServiceClient(
      

      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
  
    // get Container - full public read access
    const containerClient = blobService.getContainerClient('files');
    await containerClient.createIfNotExists({
      access: 'container',
    });
      // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(this.state.file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: this.state.file.type } };

  // upload file
  await blobClient.uploadBrowserData(this.state.file, options);

  }

  async login() {
    try {
      // Login via popup  
      await this.publicClientApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
        });
      this.setState({ isAuthenticated: true })

    }
    catch (err) {

      this.setState({
        isAuthenticated: false,
        user: {},
        error: err
      });
    }
  }


  logout() {
    this.publicClientApplication.logout();
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.isAuthenticated ? <p>
            <input onChange={this.onFileChange} type="file" ></input>
            <button onClick={() => this.uploadFile()}>Upload</button>
          </p> :
            <p>
              <button onClick={() => this.login()} >Login in</button>
            </p>

          }

        </header>
      </div>
    );
  }
}

export default App;
