import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    selectedFile: null
  };

  selectFile = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  onUpload = e => {
    const formdata = new FormData();
    formdata.append("upload", this.state.selectedFile);
    axios({
      method: "post",
      url: "http://localhost:4000/upload",
      data: formdata
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <form encType="multipart/form-data">
          <label htmlFor="upload">Upload Image</label>
          <br />
          <input type="file" name="upload" onChange={this.selectFile} />
          <button type="button" onClick={this.onUpload}>
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default App;
