class App extends React.Component {
  state = {
    name: "",
    calories: undefined,
    image: "",
    notes: "",
    foods: [],
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/foods", this.state).then((response) => {
      this.setState({
        foods: response.data,
        name: "",
        calories: "",
        image: "",
        notes: "",
      });
    });
  };

  updateFood = (event) => {
    event.preventDefault();
    axios.put("/foods/" + event.target.id, this.state).then((response) => {
      this.setState({
        foods: response.data,
        name: "",
        calories: "",
        image: "",
        notes: "",
      });
    });
  };

  deleteFood = (event) => {
    axios.delete("/foods/" + event.target.value).then((response) => {
      this.setState({
        foods: response.data,
      });
    });
  };

  componentDidMount = () => {
    axios.get("/foods").then((response) => {
      this.setState({
        foods: response.data,
      });
    });
  };

  render = () => {
    return (
      <div>
        <div id="title-div">
          <h1 className="title">Food Tracker</h1>
          <img
            className="title-img"
            src="https://images.vexels.com/media/users/3/162977/isolated/lists/e0e612280f12969593484ca3640895d5-chilli-pepper-green-flat.png"
          />
        </div>

        <div id="main-div">
          <form onSubmit={this.handleSubmit}>
            <div className="right-div">
              <h1 className="post-title">Track you're food!</h1>
              <label className="post-labels" htmlFor="name">
                Name
              </label>
              <input
                className="post-inputs"
                type="text"
                id="name"
                onChange={this.handleChange}
                value={this.state.name}
              />

              <label className="post-labels" htmlFor="calories">
                Calories
              </label>
              <input
                className="post-inputs"
                type="text"
                id="calories"
                onChange={this.handleChange}
                value={this.state.calories}
              />

              <label className="post-labels" htmlFor="notes">
                Notes
              </label>
              <textarea
                className="post-inputs-notes"
                type="text"
                id="notes"
                onChange={this.handleChange}
                value={this.state.notes}
              ></textarea>

              <label className="post-labels" htmlFor="image">
                Photo
              </label>
              <input
                className="post-inputs"
                type="text"
                id="image"
                onChange={this.handleChange}
                value={this.state.image}
              />

              <input className="post-btn" type="submit" value="Post Food" />
            </div>
          </form>

          <div id="right-div">
            {this.state.foods.map((foods) => {
              return (
                <div id="items-container">
                  <h1 className="food-name"> {foods.name} </h1>
                  <img className="food-image" src={foods.image} />
                  <h2 className="food-calories">Calories: {foods.calories}</h2>
                  <h3 className="food-notes"> {foods.notes} </h3>
                  <details>
                    <summary className="summary-title">
                      Edit {foods.name}
                    </summary>

                    <form id={foods._id} onSubmit={this.updateFood}>
                      <label className="edit-label" htmlFor="name">
                        {" "}
                        Name{" "}
                      </label>
                      <br />
                      <input
                        className="edit-input"
                        value={this.state.name}
                        type="text"
                        id="name"
                        onChange={this.handleChange}
                      />
                      <br />

                      <label className="edit-label" htmlFor="calories">
                        {" "}
                        Calories{" "}
                      </label>
                      <br />
                      <input
                        className="edit-input"
                        value={this.state.calories}
                        type="text"
                        id="calories"
                        onChange={this.handleChange}
                      />
                      <br />

                      <label className="edit-label" htmlFor="notes">
                        {" "}
                        Notes{" "}
                      </label>
                      <br />
                      <textarea
                        className="edit-input-textarea"
                        value={this.state.notes}
                        type="text"
                        id="notes"
                        onChange={this.handleChange}
                      ></textarea>
                      <br />

                      <label className="edit-label" htmlFor="image">
                        {" "}
                        Photo{" "}
                      </label>
                      <br />
                      <input
                        className="edit-input"
                        value={this.state.image}
                        type="text"
                        id="image"
                        onChange={this.handleChange}
                      />
                      <br />
                      <br />

                      <input className="update" type="submit" value="Update" />
                    </form>
                  </details>
                  <br />
                  <button
                    className="delete"
                    onClick={this.deleteFood}
                    value={foods._id}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
}
ReactDOM.render(<App />, document.querySelector("main"));
