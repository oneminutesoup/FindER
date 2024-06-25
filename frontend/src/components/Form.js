import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genderHandler: props.genderHandler,
      situationHandler: props.situationHandler,
      addressHandler: props.addressHandler,
      address: props.address,
      submitHandler: props.submitHandler,
      ageHandler: props.ageHandler,
      situation: props.situation,
      gender: "",
      age: "",
      submitted: false,
    };
  }

  setGender = (e) => {
    this.setState({ gender: e.target.value });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    this.state.addressHandler(this.state.address);
    this.state.genderHandler(this.state.gender);
    this.state.situationHandler(this.state.situation);
    // calculate age
    const birthDate = new Date(this.state.age);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.state.ageHandler(age);
    await this.state.submitHandler(age, this.state.gender, this.state.address, this.state.situation);

    this.setState({ submitted: true });
    // setTimeout(() => {
    //   
    // }, 1500);
  };

  render() {
    return (
      <div className="testbox">
        <form action="/" className={this.state.submitted ? "form-submit" : ""}>
          <p id="h1">Emergency Information Form</p>
          <p id="h4">
            Current Location<span>*</span>
          </p>
          <input
            placeholder="Enter your address"
            type="text"
            className="input"
            value={this.state.address}
            onChange={(e) => this.setState({ address: e.target.value })}
          />

          <p id="h4">Enter the Individual's Date of Birth</p>
          <input
            type="date"
            className="input-age"
            value={this.state.age}
            onChange={(e) => this.setState({ age: e.target.value })}
          />
          <p id="h4">Select the Individual's Gender</p>
          <table>
            <tbody>
              <tr>
                <th className="first-col"></th>
                <th className="gender-options">Female</th>
                <th className="gender-options">Male</th>
                <th className="gender-options">Other</th>
                <th className="gender-options">Unknown</th>
              </tr>
              <tr>
                <td className="first-col">Gender</td>
                <td>
                  <input
                    name="point#2"
                    value="female"
                    type="radio"
                    onClickCapture={this.setGender}
                  />
                </td>
                <td>
                  <input
                    name="point#2"
                    value="male"
                    type="radio"
                    onClickCapture={this.setGender}
                  />
                </td>
                <td>
                  <input
                    name="point#2"
                    value="other"
                    type="radio"
                    onClickCapture={this.setGender}
                  />
                </td>
                <td>
                  <input
                    name="point#2"
                    value="prefer not to disclose"
                    type="radio"
                    onClickCapture={this.setGender}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p id="h4">Please describe the emergency situation:</p>
          <textarea
            rows="5"
            value={this.state.situation}
            onChange={(e) => this.setState({ situation: e.target.value })}
          ></textarea>
          <div className="btn-block">
            <button onClick={this.submitHandler}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
