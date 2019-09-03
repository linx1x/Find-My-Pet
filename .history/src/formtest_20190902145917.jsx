/*This is the render of form popup created when clicked on the map */}
              <div className="popupFormDiv">
                <form className="popupFormArea" onSubmit={this.handleSubmit}>
                  {/* For animal type, if dog or cat, the form will adjust depending on this choice */}
                  <div className="FormAnimalType">
                    <h3>Did you lost a dog or a cat ?</h3>
                    <input
                      type="radio"
                      name="categorie-cat"
                      value="cat"
                      onChange={this.animalFormChangeHandler}
                    />
                    <label htmlFor="cat">Cat</label>
                    <input
                      type="radio"
                      name="categorie-dog"
                      value="dog"
                      onChange={this.animalFormChangeHandler}
                    />
                    <label htmlFor="dog">Dog</label>
                  </div>
                  {/* For the animal name */}
                  <div className="FormAnimalName">
                    <h3> Enter the name of your pet</h3>
                    <input
                      type="text"
                      className="animalNameInput"
                      onChange={this.animalFormChangeHandler}
                      placeholder="Name of the animal"
                    ></input>
                  </div>
                  {/* For the race of the animal */}
                  <div className="FormAnimalRace">
                    <h3>Enter the race of your pet</h3>
                    <input
                      type="text"
                      className="animalNameInput"
                      onChange={this.animalFormChangeHandler}
                      placeholder="Race of the animal"
                    ></input>
                  </div>
                  {/* For the age of the pet */}
                  <div className="FormAnimalAge">
                    <h3> Enter the age of your pet</h3>
                    <input
                      type="text"
                      className="animalAgeInput"
                      onChange={this.animalFormChangeHandler}
                      placeholder="Age of the animal"
                    ></input>
                  </div>
                  {/* For the gender of the pet */}
                  <div className="FormAnimalGender">
                    <h3>Enter the gender of your pet </h3>
                    <input
                      type="radio"
                      name="gender-female"
                      value="female"
                      onChange={this.animalFormChangeHandler}
                    />
                    <label htmlFor="female">female</label>
                    <input
                      type="radio"
                      name="gender-male"
                      value="male"
                      onChange={this.animalFormChangeHandler}
                    />
                    <label htmlFor="male">male</label>
                  </div>
                  <div className="FormAnimalEvent">
                    <h3> Write a description of how you lost your pet</h3>
                    <input
                      type="text"
                      className="animalEvent"
                      onChange={this.animalFormChangeHandler}
                      placeholder="Describe the event"
                    ></input>
                  </div>
                  <div className="FormAnimalDescription">
                    <h3> Write a description of your pet</h3>
                    <input
                      type="text"
                      className="animalEvent"
                      onChange={this.animalFormChangeHandler}
                      placeholder="Describe your pet"
                    ></input>
                  </div>
                  {/* For the uploaded pictures of the animals */}
                  <div className="animalPictures">
                    Upload an image:
                    <input
                      type="file"
                      id="input"
                      onChange={e => this.uploadPicture(e.target.files[0])}
                    />
                  </div>
                  <input type="submit" className="submitFormButton" />
                </form>
              </div>