import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    selectedFile: null,
    selectedFile1: null,
    selectedFile2: null,
    selectedFile3: null
  };

  selectFile = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  selectFiles = e => {
    this.setState({ [e.target.id]: e.target.files[0] });
  };

  // Handle Single Upload
  singleUpload = e => {
    const formdata = new FormData();
    formdata.append("upload", this.state.selectedFile);

    axios({
      method: "post",
      url: "http://localhost:4000/upload",
      data: formdata
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // Clear Fields After Upload
    this.setState({
      selectedFile: null
    });
  };

  // Handle Multiple Upload
  multipleUpload = e => {
    const formdata = new FormData();
    formdata.append("uploads", this.state.selectedFile1);
    formdata.append("uploads", this.state.selectedFile3);
    formdata.append("uploads", this.state.selectedFile2);

    axios({
      method: "post",
      url: "http://localhost:4000/uploads",
      data: formdata
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // Clear Fields After Upload
    this.setState({
      selectedFile1: null,
      selectedFile3: null,
      selectedFile2: null
    });
  };

  render() {
    return (
      <div className="App">
        <form encType="multipart/form-data">
          <label htmlFor="upload">Upload Single Image</label>
          <br />
          <input type="file" name="upload" onChange={this.selectFile} />
          <button type="button" onClick={this.singleUpload}>
            Upload
          </button>
        </form>
        <br />
        <br />
        <form encType="multipart/form-data">
          <label htmlFor="upload">Upload Multiple Image</label>
          <br />
          <input
            type="file"
            name="uploads"
            id="selectedFile1"
            onChange={this.selectFiles}
          />
          <br />
          <input
            type="file"
            name="uploads"
            id="selectedFile2"
            onChange={this.selectFiles}
          />
          <br />
          <input
            type="file"
            name="uploads"
            id="selectedFile3"
            onChange={this.selectFiles}
          />
          <button type="button" onClick={this.multipleUpload}>
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default App;
